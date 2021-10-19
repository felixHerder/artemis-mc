import { launchesDatabase, launchesBackupdb } from "./launches.mongo";
import planets from "./planets.mongo";
import axios from "axios";
import { FilterQuery } from "mongoose";

const DEFAULT_FLIGHT_NUMBER = 100;

export async function saveLaunch(launch: LaunchData) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}
export async function saveLaunchBackup(launch: LaunchData) {
  await launchesBackupdb.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
async function populateLaunchesBackup() {
  console.log("Downloading launch data...");
  const response = await axios.post<any>(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: { name: 1 },
        },
        {
          path: "payloads",
          select: { customers: 1 },
        },
      ],
    },
  });
  if (response.status !== 200) {
    console.log("problem downloading launch data");
    throw new Error("Launch data download failed");
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((pl: any) => pl["customers"]);
    const launch: LaunchData = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      destination: "",
      customers,
    };
    console.log(launch.flightNumber, launch.mission);
    //populate launches collection
    await saveLaunchBackup(launch);
  }
}

export async function resetLaunchData() {
  const docs = await launchesBackupdb.find({});
  await launchesDatabase.deleteMany({});
  await launchesDatabase.insertMany(docs, { lean: true });
}

export async function loadLaunchData() {
  const firstLaunchBackup = await launchesBackupdb.findOne({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunchBackup) {
    console.log("Launch api data allready loaded in backup");
  } else {
    await populateLaunchesBackup();
  }

  const firstLaunch = await launchesDatabase.findOne({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch data allready loaded from backup");
  } else {
    await resetLaunchData();
  }
}

export async function scheduleNewLaunch(launch: LaunchData) {
  const planet = await planets.findOne({
    keplerName: launch.destination,
  });
  if (!planet) {
    throw new Error("No matching planet was found");
  }
  const newFlightNumber = (await getLatestFLightNumber()) + 1;
  const newLaunch: LaunchData = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ESA", "NASA", "ISA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

export async function getLatestFLightNumber(): Promise<number> {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

export async function getAllLaunches(limit: number, page: number, upcoming = false, sort = "flightNumber", order = "desc") {
  return await launchesDatabase
    .find({ upcoming }, { _id: 0, __v: 0 })
    .sort({ [sort]: order })
    .skip(limit * page)
    .limit(limit);
}



export async function findLaunch(filter: FilterQuery<any>) {
  return await launchesDatabase.findOne(filter);
}

export async function existsLaunchWithId(launchId: number) {
  return await findLaunch({ flightNumer: launchId });
}

export async function abortLaunch(launchId: number) {
  const aborted = await launchesDatabase.updateOne({ flightNumber: launchId }, { upcoming: false, success: false });
  return aborted.acknowledged && aborted.modifiedCount === 1;
}
