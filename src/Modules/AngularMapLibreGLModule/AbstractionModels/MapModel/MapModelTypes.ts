import { Coordinates } from "../../Types/LibTypes";

/*Опции для класса отображения 3D моделей на карте*/
export type MapModelOptions = {
  Coordinates: Required<Coordinates>;
  Mesh: string;
  Color: [number, number, number];
};
