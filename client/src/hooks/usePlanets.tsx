import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

export type PlanetData = {
  [k:string]: string;
}
function usePlanets() : PlanetData[] {
  const [planets, savePlanets] = useState<PlanetData[]>([]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets();
    savePlanets(fetchedPlanets as PlanetData[]);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
