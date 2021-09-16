import { PlanetData } from "./usePlanets";

const API_URL = process.env.API_URL

async function httpGetPlanets(): Promise<PlanetData[]> {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches(): Promise<void> {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}
// eslint-disable-next-line
async function httpSubmitLaunch(launch: LaunchData): Promise<void> {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}
// eslint-disable-next-line
async function httpAbortLaunch(id: number): Promise<void> {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}
type LaunchData = {
  launchDate: Date;
  mission: string;
  rocket: string;
  target: string;
};

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
