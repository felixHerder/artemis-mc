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
      // setPendingLaunch(true);
      const eventTarget = e.target as HTMLFormElement;
      const data = new FormData(eventTarget);
      console.log('Launch Submited with:',...data)
      const launchDate = new Date(data.get("launchDate") as string);
      const mission = data.get("missionBame") as string;
      const rocket = data.get("rocketType") as string;
      const destination = data.get("destination") as string;
      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        destination,
      });

      // TODO: Set success based on response.
      const success = false;
      if (success) {
        getLaunches();
        setTimeout(() => {
          setPendingLaunch(false);
        }, 800);
      }
    },
    [getLaunches]
  );

  const abortLaunch = useCallback(
    async (id: number) => {
      const response = await httpAbortLaunch(id);

      // TODO: Set success based on response.
      const success = false;
      if (success) {
        getLaunches();
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
