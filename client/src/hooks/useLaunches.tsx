import React, { useCallback, useEffect, useState } from "react";

import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from "./requests";

function useLaunches(): {
  launches: LaunchData[];
  isPendingLaunch: boolean;
  submitResponse: {
    message: string;
    ok: boolean;
  };

  submitLaunch: (e: React.SyntheticEvent) => Promise<void>;
  abortLaunch: (e: number) => Promise<void>;
} {
  const [launches, saveLaunches] = useState<LaunchData[]>([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({ message: "", ok: false });
  const timer = React.useRef<NodeJS.Timeout>();

  const getLaunches = useCallback(async () => {
    try {
      const fetchedLaunches = await httpGetLaunches();
      saveLaunches(fetchedLaunches);
    } catch (error) {
      console.log("Error fetching launches:", error);
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
      if(timer.current)clearTimeout(timer.current);
      if (response.ok) {
        await getLaunches();
        setPendingLaunch(false);
        setSubmitResponse({ message: "Launch submited", ok: true });
        timer.current = setTimeout(async () => {
          setSubmitResponse({ message: "", ok: true });
        }, 2000);
      } else {
        console.log("in ELSE BLOCK Response:", response.ok);
        setPendingLaunch(false);
        setSubmitResponse({ message: "Launch submit failed", ok: false });
        timer.current = setTimeout(async () => {
          setSubmitResponse({ message: "", ok: false });
        }, 2000);
      }
    },
    [getLaunches]
  );

  const abortLaunch = useCallback(
    async (id: number) => {
      setPendingLaunch(true);
      const response = await httpAbortLaunch(id);
      if (timer.current) clearTimeout(timer.current);
      if (response.ok) {
        await getLaunches();
        setPendingLaunch(false);
        setSubmitResponse({ message: "Lauch aborted", ok: true });
        timer.current = setTimeout(async () => {
          setSubmitResponse({ message: "", ok: true });
        }, 2000);
        return;
      } else {
        setSubmitResponse({ message: "Launch abort failed", ok: false });
        setPendingLaunch(false);
        timer.current = setTimeout(async () => {
          setSubmitResponse({ message: "", ok: false });
        }, 2000);
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
    submitResponse,
  };
}
export default useLaunches;
