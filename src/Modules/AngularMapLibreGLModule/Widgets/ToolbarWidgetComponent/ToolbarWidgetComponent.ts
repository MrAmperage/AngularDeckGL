import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import BaseLoaderComponent from "../BaseWidgetComponent/BaseLoaderComponent/BaseLoaderComponent";
/*Виджет тулбара с кнопками для тругих виджетов */
@Component({
  selector: "ToolbarWidgetComponent",
  templateUrl: "ToolbarWidgetComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToolbarWidgetComponent extends BaseWidgetComponent {
  /*Добавляем лоадер с иконкой для виджета */
  AddWidgetLoader(LoaderComponent: BaseLoaderComponent) {
    console.log(LoaderComponent);
  }
  override PrepareWidget(): void {}
  /*Лоадер не требуется */
  override get GetWidgetLoader(): Component | undefined {
    return;
  }
}
