import { Injectable } from "@angular/core";
import { LoaderOption, WidgetOption } from "./MapServiceTypes";
/*Сервис для хранения настроек карты и виджетов */
@Injectable()
export default class MapService {
  /*Настройки для лоадеров */
  LoadersOptions: LoaderOption[] = [];
  AddLoader(LoaderOption: LoaderOption) {
    this.LoadersOptions.push(LoaderOption);
  }
  /*Настройкки для виджетов */
  WidgetsOptions: WidgetOption[] = [];
  AddWidget() {}
  GetLoaderOptionsById(Id: string) {
    return this.LoadersOptions.find((LoaderOption) => {
      return LoaderOption.Id === Id;
    });
  }
}
