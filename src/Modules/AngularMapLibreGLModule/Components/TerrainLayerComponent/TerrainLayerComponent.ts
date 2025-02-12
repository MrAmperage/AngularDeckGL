import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { ElevationDecoder } from "./TerrainLayerComponentTypes";
import { RefinementStrategy } from "@deck.gl/geo-layers/dist/tileset-2d";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { IControl } from "maplibre-gl";
import MapComponent from "../MapComponent/MapComponent";

@Component({
  selector: "TerrainLayerComponent",
  templateUrl: "TerrainLayerComponent.html",
})
export default class TerrainLayerComponent implements OnInit, OnDestroy {
  TerrainLayer!: TerrainLayer;
  Overlay!: IControl;
  constructor(private MapComponent: MapComponent) {}
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
  Id: string = "TerrainLayer";
  @Input()
  Wireframe: boolean = false;
  @Input({ required: true })
  Texture!: string;
  @Input({ required: true })
  ElevationData!: string;
  @Input()
  Interleaved: boolean = false;

  InitLayer() {
    this.TerrainLayer = new TerrainLayer({
      refinementStrategy: this.RefinementStrategy,
      wireframe: this.Wireframe,
      id: this.Id,
      elevationDecoder: this.ElevationDecoder,
      texture: this.Texture,
      elevationData: this.ElevationData,
      bounds: this.Bounds,
    });
    this.Overlay = new MapboxOverlay({
      interleaved: this.Interleaved,
      id: this.Id,
      layers: [this.TerrainLayer],
    }) as IControl;
    this.MapComponent.Map.addControl(this.Overlay);
  }
  RemoveLayer() {
    this.MapComponent.Map.removeControl(this.Overlay);
  }
  ngOnInit(): void {
    this.InitLayer();
  }
  ngOnDestroy(): void {
    this.RemoveLayer();
  }
}
