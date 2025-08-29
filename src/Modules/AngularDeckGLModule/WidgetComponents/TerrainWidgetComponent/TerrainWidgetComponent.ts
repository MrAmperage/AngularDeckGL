import { Component, Directive, ElementRef, Inject } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import { WidgetPlacement } from "@deck.gl/core";
import { TerrainLayer } from "@deck.gl/geo-layers";
import DeckGLComponent from "../../LayerComponents/DeckGLComponent/DeckGLComponent";
import MapService from "../../Services/MapService/MapService";

@Component({
  selector: "TerrainWidgetComponent",
  template: "",
})
export default class TerrainWidgetComponent extends BaseWidgetComponent {
  constructor(
    @Inject(DeckGLComponent) DeckGLComponent: DeckGLComponent,
    @Inject(ElementRef) ElementRef: ElementRef,
    @Inject(MapService) MapService: MapService
  ) {
    super(DeckGLComponent, ElementRef, MapService);
  }
  override Id: string = "Terrain";
  TerrainProps = {
    id: "TerrainLayer",
    texture: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    elevationData:
      "https://s3.amazonaws.com/elevation-tiles-prod/normal/{z}/{x}/{y}.png",
    elevationDecoder: {
      rScaler: 2,
      gScaler: 0,
      bScaler: 0,
      offset: 0,
    },
  };
  TerrainLayer!: TerrainLayer;

  override PrepareInitWidget(): void {
    this.TerrainLayer = new TerrainLayer(this.TerrainProps);
    this.DeckGLComponent.AddLayers([this.TerrainLayer]);
  }

  override PrepareRemoveWidget(): void {
    this.DeckGLComponent.RemoveLayers([this.TerrainLayer]);
  }
}
