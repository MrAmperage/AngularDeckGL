import { Component, Input } from "@angular/core";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { ElevationDecoder } from "./TerrainLayerComponentTypes";
import { RefinementStrategy } from "@deck.gl/geo-layers/dist/tileset-2d";
import BaseLayerComponent from "../BaseLayerComponent/BaseLayerComponent";

@Component({
  selector: "TerrainLayerComponent",
  templateUrl: "TerrainLayerComponent.html",
})
export default class TerrainLayerComponent extends BaseLayerComponent<TerrainLayer> {
  @Input() ElevationDecoder: ElevationDecoder = {
    rScaler: 6553.6,
    gScaler: 25.6,
    bScaler: 0.1,
    offset: -10000,
  };
  @Input()
  Bounds!: [number, number, number, number];
  @Input()
  RefinementStrategy: RefinementStrategy = "no-overlap";
  @Input()
  Wireframe: boolean = false;
  @Input({ required: true })
  Texture!: string;
  @Input({ required: true })
  ElevationData!: string;

  PrepareLayer() {
    this.Layer = new TerrainLayer({
      refinementStrategy: this.RefinementStrategy,
      wireframe: this.Wireframe,
      id: this.Id,
      elevationDecoder: this.ElevationDecoder,
      texture: this.Texture,
      elevationData: this.ElevationData,
      bounds: this.Bounds,
    });
  }
}
