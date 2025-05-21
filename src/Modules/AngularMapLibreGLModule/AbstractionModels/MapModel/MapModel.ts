import { Coordinates } from "../../Types/LibTypes";
import { MapModelOptions } from "./MapModelTypes";

/*Класс для отображения моделей на карте */
export default class MapModel {
  Position: Coordinates;
  Color: [number, number, number];
  constructor(ModelOptions: MapModelOptions) {
    this.Position = ModelOptions.Position;
    this.Color = ModelOptions.Color;
  }
}
