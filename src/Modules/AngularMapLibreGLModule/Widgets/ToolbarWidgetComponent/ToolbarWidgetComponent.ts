import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";

/*Виджет тулбара с кнопками для тругих виджетов */
@Component({
  selector: "ToolbarWidgetComponent",
  templateUrl: "ToolbarWidgetComponent.html",
  styleUrls: ["./ToolbarWidgetComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToolbarWidgetComponent extends BaseWidgetComponent {
  @ViewChild("WidgetsContainer", { static: true, read: ViewContainerRef })
  WidgetsContainer!: ViewContainerRef
  /*Добавление виджета в тулбар */
  AddWidgetComponent(WidgetComponent:typeof BaseWidgetComponent){
   this.WidgetsContainer.createComponent(WidgetComponent)
  }
  RemoveWidgetComponent(){}
  override PrepareWidget(): void { }


}
