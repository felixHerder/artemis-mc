const API_URL = process.env.API_URL;

async function httpGetPlanets(): Promise<PlanetData[]> {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches(): Promise<LaunchData[]> {
  const response = await fetch(`${API_URL}/launches`);
  const data: LaunchData[] = await response.json();

  //format launchdata date value string to Date obj
  data.map((d) => {
    d.launchDate = new Date(d.launchDate);
    return d;
  });

  return data.sort((a, b) => a.flightNumber - b.flightNumber);
  // Load launches, sort by flight number, and return as JSON.
}
// eslint-disable-next-line
async function httpSubmitLaunch(launch: FormLaunchData) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    console.log("error submiting launch:",error)
    return {
      ok:false
    }
  }
  // Submit given launch data to launch system.
}
// eslint-disable-next-line
async function httpAbortLaunch(id: number) {
  try{
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
  }
  catch(error){
    console.log("error aborting launch:",error)
    return {
      ok:false
    }
  }
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
