import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() : PlanetData[] {
  const [planets, savePlanets] = useState<PlanetData[]>([]);
  
  const getPlanets = useCallback(async () => {
    try{
      const fetchedPlanets = await httpGetPlanets();
      savePlanets(fetchedPlanets as PlanetData[]);
    }
    catch(error){
      console.log("error Fetching planets",error);
    }
  }, []);

  useEffect(() => {
    
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
