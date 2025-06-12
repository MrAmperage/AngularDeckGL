import { Coordinates } from "../../Types/LibTypes";
import { MapModelOptions } from "./MapModelTypes";

/*Класс для отображения моделей на карте */
export default class MapModel {
  Coordinates: Coordinates;
  Color: [number, number, number];
  constructor(ModelOptions: MapModelOptions) {
    this.Coordinates = ModelOptions.Coordinates;
    this.Color = ModelOptions.Color;
  }
}
