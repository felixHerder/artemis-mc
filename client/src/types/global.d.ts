declare  type LaunchData = {
    flightNumber: number
    launchDate: Date;
    mission: string;
    rocket: string;
    destination: string,
    customers: string[],
    upcoming: boolean,
    success: boolean
  };

  declare  type FormLaunchData = {
    launchDate: Date;
    mission: string;
    rocket: string;
    destination: string,
  };


declare type PlanetData = {
    [k:string]: string;
  }