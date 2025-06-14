import { Coordinates, Dimension } from "../../Types/LibTypes";
import { MapModelOptions } from "./MapModelTypes";

/*Класс для отображения моделей на карте */
export default class MapModel {
  /*Дочерние модели*/
  Childrens: MapModel[] = [];
  Dimension: Dimension;
  Coordinates: Coordinates;
  Color: [number, number, number];
  constructor(ModelOptions: MapModelOptions, Dimension: Dimension) {
    this.Coordinates = ModelOptions.Coordinates;
    this.Color = ModelOptions.Color;
    this.Dimension = Dimension;
  }

  ChangeDimension(Dimension: Dimension) {
    this.Dimension = Dimension;
  }
}
