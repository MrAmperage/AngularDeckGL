import { Component } from "@angular/core";
import ToolbarWidgetComponent from "../../WidgetComponents/ToolbarWidgetComponent/ToolbarWidgetComponent";
import MapService from "../../Services/MapService/MapService";
import BaseLoaderComponent from "../BaseLoaderComponent/BaseLoaderComponent";

@Component({
  selector: "TerrainLoaderComponent",
  templateUrl: "TerrainLoaderComponent.svg",
})
export default class TerrainLoaderComponent extends BaseLoaderComponent {
  constructor(
    MapService: MapService,
    ToolbarWidgetComponent: ToolbarWidgetComponent
  ) {
    super(MapService, ToolbarWidgetComponent);
  }

  override ClickOnLoader(): void {}
}
