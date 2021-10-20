import { useCallback, useEffect, useState } from "react";

import { httpGetLaunchpads } from "./requests";

function useLaunchpads() : {name:string}[] {
  const [launchpads, saveLaunchpads] = useState<{name:string}[]>([]);
  
  const getRockets = useCallback(async () => {
    try{
      const fetchedLaunchpads = await httpGetLaunchpads();
      saveLaunchpads(fetchedLaunchpads);
    }
    catch(error){
      console.log("error Fetching Launchpads",error);
    }
  }, []);

  useEffect(() => {
    getRockets();
  }, [getRockets]);

  return launchpads;
}

export default useLaunchpads;
