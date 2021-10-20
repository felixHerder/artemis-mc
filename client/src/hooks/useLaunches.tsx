import React, { useCallback, useState } from "react";

import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch, httpResetLaunchData } from "./requests";

export interface useLaunchesInterface {
  launchesHistory: LaunchData[];
  saveLaunchesHistory: React.Dispatch<React.SetStateAction<LaunchData[]>>;
  launchesUpcoming: LaunchData[];
  saveLaunchesUpcoming: React.Dispatch<React.SetStateAction<LaunchData[]>>;
  isPendingLaunch: boolean;
  setPendingLaunch: React.Dispatch<React.SetStateAction<boolean>>;
  submitResponse: {
    message: string;
    ok: boolean;
  };
  submitLaunch: (e: React.SyntheticEvent) => Promise<void>;
  abortLaunch: (e: number) => Promise<void>;
  resetLaunchData: () => Promise<void>;
  getLaunches: (limit?: number, page?: number, upcoming?: boolean, sort?: string, order?: string) => Promise<void>;
  badgeInv: { [k: string]: boolean };
  setBadgeInv: React.Dispatch<React.SetStateAction<{ [k: string]: boolean }>>;
}

function useLaunches(): useLaunchesInterface {
  const [launchesHistory, saveLaunchesHistory] = useState<LaunchData[]>([]);
  const [launchesUpcoming, saveLaunchesUpcoming] = useState<LaunchData[]>([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({ message: "", ok: false });
  const [badgeInv, setBadgeInv] = useState({ upcoming: true, history: true } as { [k: string]: boolean });
  const timer = React.useRef<NodeJS.Timeout>();

  const getLaunches = useCallback(async (limit = 0, page = 0, upcoming = true, sort = "flightNumber", order = "desc") => {
    try {
      setPendingLaunch(true);
      const launchData = await httpGetLaunches(limit, page, upcoming, sort, order);

      upcoming ? saveLaunchesUpcoming(launchData) : saveLaunchesHistory(launchData);
      setPendingLaunch(false);
    } catch (error) {
      console.log("Error fetching launches:", error);
    }
  }, []);

  const submitLaunch = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPendingLaunch(true);
    const eventTarget = e.target as HTMLFormElement;
    const data = new FormData(eventTarget);
    const rawDate  = String(data.get("launchDate")); 
    const dateParts = rawDate.split('/');
    const launchDate = new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
    const launchpad = data.get("launchPad") as string;
    const rocket = data.get("rocketType") as string;
    const destination = data.get("destination") as string;
    const response = await httpSubmitLaunch({
      launchDate,
      mission: launchpad + " - " + rocket,
      rocket,
      destination,
    });
    if (timer.current) clearTimeout(timer.current);
    if (response.ok) {
      setPendingLaunch(false);
      setBadgeInv((prev) => ({ ...prev, upcoming: false }));
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
  }, []);

  const abortLaunch = useCallback(
    async (id: number) => {
      setPendingLaunch(true);
      const response = await httpAbortLaunch(id);
      if (timer.current) clearTimeout(timer.current);
      if (response.ok) {
        await getLaunches();
        setPendingLaunch(false);
        setBadgeInv((prev) => ({ ...prev, history: false }));
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

  const resetLaunchData = useCallback(async () => {
    setPendingLaunch(true);
    const response = await httpResetLaunchData();
    if (timer.current) clearTimeout(timer.current);
    if (response.ok) {
      await getLaunches();
      setPendingLaunch(false);
      setBadgeInv((prev) => ({ ...prev, history: true }));
      setSubmitResponse({ message: "Lauch data reset", ok: true });
      timer.current = setTimeout(async () => {
        setSubmitResponse({ message: "", ok: true });
      }, 2000);
      return;
    } else {
      setSubmitResponse({ message: "Launch data reset failed", ok: false });
      setPendingLaunch(false);
      timer.current = setTimeout(async () => {
        setSubmitResponse({ message: "", ok: false });
      }, 2000);
      return;
    }
  }, [getLaunches]);

  return {
    launchesHistory,
    saveLaunchesHistory,
    launchesUpcoming,
    saveLaunchesUpcoming,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    submitResponse,
    resetLaunchData,
    getLaunches,
    setPendingLaunch,
    badgeInv,
    setBadgeInv,
  };
}
export default useLaunches;
