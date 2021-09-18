import parse = require("csv-parse");
import fs = require("fs");
import path = require("path");

export type planetData = {
  [k: string]: number | string;
};
const habitablePlanes: planetData[] = [];
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
      .on("data", (data: planetData) => {
        if (isHabitablePlanet(data)) {
          habitablePlanes.push(data);
        }
      })
      .on("error", (err: Error) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(habitablePlanes.length, "planets found");
        resolve(undefined);
      });
  });
}
export { habitablePlanes as planets, loadPlanetsData };
