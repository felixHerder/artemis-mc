import parse = require("csv-parse");
import fs = require("fs");
import path = require("path");
import planets from "./planets.mongo";
export type planetData = {
  [k: string]: number | string;
};

function isHabitablePlanet(planet: planetData) {
  return planet["koi_disposition"] === "CONFIRMED" && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11 && planet["koi_prad"] < 1.6;
}

 function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data: planetData) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err: Error) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetFound = (await getAllPlanets()).length
        console.log(countPlanetFound, "planets found");
        resolve(undefined);
      });
  });
}
export async function getAllPlanets():Promise<planetData[]> {
  return await planets.find({},{'_id':0,'__v':0});
}

async function savePlanet(planet: planetData) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      { keplerName: planet.kepler_name },
      {
        upsert: true,
      }
    );
  } catch(err) {
    console.error('Error updating planet model in Mongodb',err)
  }
}

export { loadPlanetsData };
