import { Injectable } from "@angular/core";
import { WidgetOption } from "./MapServiceTypes";
/*Сервис для хранения настроек карты и виджетов */
@Injectable()
export default class MapService {
  /*Настройкки для виджетов */
  WidgetsOptions: WidgetOption[] = [];
  AddWidget(WidgetOption: WidgetOption) {
    this.WidgetsOptions.push(WidgetOption);
  }
}
