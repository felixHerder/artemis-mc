import launchesDatabase from "./launches.mongo";
import planets from "./planets.mongo";

const DEFAULT_FLIGHT_NUMBER = 100;

const launch: LaunchData = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customers: ["ESA", "NASA"],
  upcoming: true,
  success: true,
};

async function saveLaunch(launch: LaunchData) {
  const planet = await planets.findOne({
    keplerName: launch.destination,
  });
  if (!planet) {
    throw new Error("No matching planet was found");
  }
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

saveLaunch(launch);

async function scheduleNewLaunch(launch: LaunchData) {
  const newFlightNumber = (await getLatestFLightNumber()) + 1;
  const newLaunch: LaunchData = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ESA", "NASA", "ISA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function getLatestFLightNumber(): Promise<number> {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function existsLaunchWithId(launchId : number){
  const launch: LaunchData = await launchesDatabase.findOne({ flightNumer: launchId });
  if (!launch) {
    return false;
  }
  return true;
}

async function abortLaunch(launchId: number) {

  console.log("before find one and update");
  const aborted = await launchesDatabase.updateOne({ flightNumber: launchId }, { upcoming: false, success: false });
  return aborted.acknowledged  && aborted.modifiedCount === 1;
}
export { getAllLaunches, scheduleNewLaunch, abortLaunch,existsLaunchWithId };
