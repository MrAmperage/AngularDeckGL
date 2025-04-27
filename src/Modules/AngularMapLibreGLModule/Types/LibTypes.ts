/*Общие типы для виджетов */

/*Цвет */
export type Color = `#${string}`;

/*Опции для отображения легенды индикаций */
export type IndicationColorLegendOption = {
  Title: string;
  ColumnsCount: number;
  Legends: ColorLegendOption[];
};
/*Еденичный элемент легенды индикации */
export type ColorLegendOption = {
  Color?: Color;
  Label: string;
};
