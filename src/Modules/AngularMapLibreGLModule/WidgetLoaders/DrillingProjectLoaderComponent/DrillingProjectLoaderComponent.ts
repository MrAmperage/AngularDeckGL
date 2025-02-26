import { Component, Inject } from "@angular/core";
import BaseLoaderComponent from "../BaseLoaderComponent/BaseLoaderComponent";
import MapService from "../../Services/MapService/MapService";
import ToolbarWidgetComponent from "../../Widgets/ToolbarWidgetComponent/ToolbarWidgetComponent";

@Component({
  selector: "DrillingProjectLoaderComponent",
  templateUrl: "DrillingProjectLoaderComponent.svg",
})
export default class DrillingProjectLoaderComponent extends BaseLoaderComponent {
  constructor(
    MapService: MapService,
    ToolbarWidgetComponent: ToolbarWidgetComponent
  ) {
    super(MapService, ToolbarWidgetComponent);
  }

  override ClickOnLoader(): void {
    import(
      "../../Widgets/DrillingProjectsWidgetComponent/DrillingProjectsWidgetComponent"
    ).then((Widget) => {
      super.ClickOnLoader();

      if (this.GetInternalWidgetOption?.IsShow) {
        Widget.default;
        this.ToolbarWidgetComponent.AddWidgetComponent(Widget.default);
      } else {
        if (this.GetInternalWidgetOption !== undefined) {
          this.ToolbarWidgetComponent.RemoveWidgetComponentById(
            this.GetInternalWidgetOption.Id
          );
        }
      }
    });
  }
}
