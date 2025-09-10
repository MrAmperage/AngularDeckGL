import {
  ChangeDetectionStrategy,
  Component,
  Type,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import { WidgetOption } from "../../Services/MapService/MapServiceTypes";
import { InternalWidgetOption } from "../../WidgetLoaders/BaseLoaderComponent/BaseLoaderComponentTypes";

/*Виджет тулбара с кнопками для тругих виджетов */
@Component({
  selector: "ToolbarWidgetComponent",
  templateUrl: "ToolbarWidgetComponent.html",
  styleUrls: ["./ToolbarWidgetComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "WidgetContainer WidgetContainerMargin" },
})
export default class ToolbarWidgetComponent extends BaseWidgetComponent {
  InternalWidgetOptions: InternalWidgetOption[] = [];

  @ViewChild("WidgetsContainer", { static: true, read: ViewContainerRef })
  WidgetsContainer!: ViewContainerRef;
  /*Добавление виджета в тулбар */
  AddWidgetComponent(WidgetComponent: Type<BaseWidgetComponent>) {
    this.WidgetsContainer.createComponent(WidgetComponent);
  }
  AddInternalWidget(WidgetOption: WidgetOption) {
    this.InternalWidgetOptions.push({ Id: WidgetOption.Id, IsShow: false });
    return this.InternalWidgetOptions[this.InternalWidgetOptions.length - 1];
  }
  RemoveWidgetComponentById(WidgetComponentId: string) {
    const RemoveIndex = this.InternalWidgetOptions.findIndex((Option) => {
      return Option.Id === WidgetComponentId;
    });
    if (RemoveIndex !== -1) {
      this.WidgetsContainer.remove(RemoveIndex);
    }
  }

  override PrepareInitWidget(): void {}
}
