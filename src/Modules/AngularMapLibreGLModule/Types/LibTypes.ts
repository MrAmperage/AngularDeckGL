/*Общие типы для виджетов */

/*Цвет */
export type HexColor = `#${string}`;

/*Опции для отображения легенды индикаций */
export type IndicationColorLegendOption = {
  Title: string;
  ColumnsCount: number;
  Legends: ColorLegendOption[];
};
/*Еденичный элемент легенды индикации */
export type ColorLegendOption = {
  Color: HexColor;
  Label: string;
};
/*Координаты*/
export type Coordinates = [Latitude, Longitude, Height];
/*Тип для возможных измерений*/
export type Dimension = "Three" | "Two";
/*Широта*/
export type Latitude = number;
/*Долгота */
export type Longitude = number;
/*Высота*/
export type Height = number;
