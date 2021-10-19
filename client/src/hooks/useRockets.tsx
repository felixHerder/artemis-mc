import { useCallback, useEffect, useState } from "react";

import { httpGetRockets } from "./requests";

function useRockets() : {name:string}[] {
  const [rockets, saveRockets] = useState<{name:string}[]>([]);
  
  const getRockets = useCallback(async () => {
    try{
      const fetchedRockets = await httpGetRockets();
      saveRockets(fetchedRockets);
    }
    catch(error){
      console.log("error Fetching Rockets",error);
    }
  }, []);

  useEffect(() => {
    getRockets();
  }, [getRockets]);

  return rockets;
}

export default useRockets;
