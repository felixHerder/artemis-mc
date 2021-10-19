import axios from "axios";
import { rocketsCol } from "./rockets.mongo";

export async function getAllRockets() {
  return await rocketsCol.find({}, { _id: 0, __v: 0 });
}

const SPACEX_API_URL_ROCKETS = "https://api.spacexdata.com/v4/rockets/";
export async function loadRocketData() {
  //check mongodb for rocket data
  const fr = await rocketsCol.findOne({ name: "Falcon 1" });
  if (fr) {
    console.log("Rockets data allready loaded");
  } else {
    //load data from spacex api
    const response = await axios.get<any>(SPACEX_API_URL_ROCKETS);
    if (response.status !== 200) {
      console.log("problem downloading rocket data");
      throw new Error("Rocket data download failed");
    }
    await rocketsCol.deleteMany({});
    const rockets = response.data;
    rockets.forEach(async (rocket: any) => {
      await rocketsCol.create({
        name: rocket.name,
      });
    });
  }
}
