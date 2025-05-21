import { Coordinates } from "../../Types/LibTypes";

/*Опции для класса отображения 3D моделей на карте*/
export type MapModelOptions = {
  Position: Coordinates;
  Mesh: string;
  Color: [number, number, number];
};
