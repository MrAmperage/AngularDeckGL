import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
/*Виджет тулбара с кнопками для тругих виджетов */
@Component({
  selector: "ToolbarWidgetComponent",
  templateUrl: "ToolbarWidgetComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToolbarWidgetComponent extends BaseWidgetComponent {
  override PrepareWidget(): void { }


}
