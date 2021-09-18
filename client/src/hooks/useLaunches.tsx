import React, { useCallback, useEffect, useState } from "react";

import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from "./requests";

function useLaunches()
: {
  launches: LaunchData[];
  isPendingLaunch: boolean;
  submitLaunch: (e: React.SyntheticEvent) => Promise<void>;
  abortLaunch: (e: number) => Promise<void>;
}
 {
   
  const [launches, saveLaunches] = useState<LaunchData[]>([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    try{
      const fetchedLaunches = await httpGetLaunches();
      saveLaunches(fetchedLaunches);
    }
    catch(error){
      console.log('Error fetching launches:',error)
    }
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setPendingLaunch(true);
      const eventTarget = e.target as HTMLFormElement;
      const data = new FormData(eventTarget);
      const launchDate = new Date(data.get("launchDate") as string);
      const mission = data.get("missionName") as string;
      const rocket = data.get("rocketType") as string;
      const destination = data.get("destination") as string;
      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        destination,
      });

      const success = response.ok;
      if (success) {
        getLaunches();
        setTimeout(() => {
           //TO DO implement pop-up with succes message
          setPendingLaunch(false);
        }, 300);
      }
      else {
        //TO DO implement pop-up with failure message
      }
    },
    [getLaunches]
  );

  const abortLaunch = useCallback(
    async (id: number) => {
      setPendingLaunch(true);
      const response = await httpAbortLaunch(id);
      const success = response.ok;
      if (success) {
        await getLaunches();
        setPendingLaunch(false);
        return;
      }else{
         //TO DO implement pop-up with failure message
         setPendingLaunch(false);
         return;
      }
    },
    [getLaunches]
  );

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}
export default useLaunches;
