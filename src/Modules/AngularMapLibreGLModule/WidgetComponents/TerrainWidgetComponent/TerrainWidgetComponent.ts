import { Directive, ElementRef, Inject } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import { WidgetPlacement } from "@deck.gl/core";
import { TerrainLayer } from "@deck.gl/geo-layers";
import DeckGLComponent from "../../LayerComponents/DeckGLComponent/DeckGLComponent";
import MapService from "../../Services/MapService/MapService";

@Directive({
  selector: "TerrainWidgetComponent",
})
export default class TerrainWidgetComponent extends BaseWidgetComponent {
  constructor(
    @Inject(DeckGLComponent) DeckGLComponent: DeckGLComponent,
    @Inject(ElementRef) ElementRef: ElementRef,
    @Inject(MapService) MapService: MapService
  ) {
    super(DeckGLComponent, ElementRef, MapService);
  }
  TerrainLayer!: TerrainLayer;
  override Placement: WidgetPlacement = "fill";

  override PrepareInitWidget(): void {
    this.TerrainLayer = new TerrainLayer({ id: "TerrainLayer" });
    this.DeckGLComponent.AddLayers([this.TerrainLayer]);
  }

  override PrepareRemoveWidget(): void {
    this.DeckGLComponent.RemoveLayers([this.TerrainLayer]);
  }
}
