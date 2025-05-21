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

export type Coordinates = [number, number, number];
