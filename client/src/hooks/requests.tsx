const API_URL = process.env.API_URL

async function httpGetPlanets(): Promise<PlanetData[]> {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches(): Promise<LaunchData[]> {
  const response = await fetch(`${API_URL}/launches`);
  const data : LaunchData[] = await response.json();

  //format launchdata date value string to Date obj
  data.map((d)=>
  {d.launchDate= new Date(d.launchDate);
  return d});

  return data.sort((a,b)=>(a.flightNumber-b.flightNumber));
  // Load launches, sort by flight number, and return as JSON.
}
// eslint-disable-next-line
async function httpSubmitLaunch(launch: any): Promise<void> {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}
// eslint-disable-next-line
async function httpAbortLaunch(id: number): Promise<void> {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}


export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
