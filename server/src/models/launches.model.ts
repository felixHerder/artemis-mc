const launches: Map<number,LaunchData> = new Map();

let latestFlightNumber = 100;
const launch: LaunchData = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customers: ["ESA", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function addNewLaunch(launch: LaunchData) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      succes: true,
      upcoming: true,
      customers: ["ESA, ISA"],
      flightNumber: latestFlightNumber,
    })
  );
}
function getAllLaunches(){
  return Array.from(launches.values())
}
function abortLaunch(id:number){
  const aborted = launches.get(id);
  if(!aborted){
    return false;
  }
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
export { getAllLaunches, addNewLaunch,abortLaunch };
