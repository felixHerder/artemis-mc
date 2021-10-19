const API_URL = process.env.API_URL;

export async function httpGetPlanets(): Promise<PlanetData[]> {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  // Load planets and return as JSON.
}

export async function httpGetRockets(): Promise<{name:string}[]> {
  const response = await fetch(`${API_URL}/rockets`);
  return await response.json();
  // Load planets and return as JSON.
}
export async function httpGetLaunches(limit = 0,page = 0,upcoming = false,sort="flightNumber",order="desc"): Promise<LaunchData[]> {
  const response = await fetch(`${API_URL}/launches?limit=${limit}&page=${page}&upcoming=${upcoming}&sort=${sort}&order=${order}`);
  const data: LaunchData[] = await response.json();

  //format launchdata date value string to Date obj
  data.map((d) => {
    d.launchDate = new Date(d.launchDate);
    return d;
  });

  return data;
}
// eslint-disable-next-line
export async function httpSubmitLaunch(launch: FormLaunchData) {
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
export async function httpAbortLaunch(id: number) {
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

// eslint-disable-next-line
export async function httpResetLaunchData(){
  try{
    return await fetch(`${API_URL}/launches?resetdata=true`, {
      method: "DELETE",
    });
  }
  catch(error){
    console.log("error reseting launch data:",error)
    return {
      ok:false
    }
  }
  // reset launch data
}


