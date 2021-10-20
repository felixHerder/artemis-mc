import axios from "axios";
import { launchpadsCol } from "./launchpads.mongo";

export async function getAllLaunchpads() {
  return await launchpadsCol.find({}, { _id: 0, __v: 0 });
}

const SPACEX_API_URL_LAUNCHPADS = "https://api.spacexdata.com/v4/launchpads/";
export async function loadLaunchpadData() {
  //check mongodb for rocket data
  const fr = await launchpadsCol.findOne({ name: "STLS" });
  if (fr) {
    console.log("Launchpads data allready loaded");
  } else {
    //load data from spacex api
    const response = await axios.get<any>(SPACEX_API_URL_LAUNCHPADS);
    if (response.status !== 200) {
      console.log("problem downloading launchpads data");
      throw new Error("Launchpads data download failed");
    }
    await launchpadsCol.deleteMany({});
    const launchpads = response.data;
    launchpads.forEach(async (launchpad: any) => {
      await launchpadsCol.create({
        name: launchpad.name,
      });
    });
  }
}
