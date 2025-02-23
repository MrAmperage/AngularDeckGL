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
    @Inject(MapService) MapService: MapService,
    private ToolbarWidgetComponent: ToolbarWidgetComponent
  ) {
    super(MapService);
  }

  override ClickOnLoader(): void {

  
  import("../../Widgets/DrillingProjectsWidgetComponent/DrillingProjectsWidgetComponent").then((Widget)=>{
     this.ToolbarWidgetComponent.AddWidgetComponent(Widget.default)
  })
   super.ClickOnLoader()
  }
}
