import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import BaseLayerDirective from "../BaseLayerDirective/BaseLayerDirective";
import { Directive, Inject, Input } from "@angular/core";
import { MapModelOptions } from "../../AbstractionModels/MapModel/MapModelTypes";
import DeckGLComponent from "../DeckGLComponent/DeckGLComponent";

/*Слой для отображения статичных моделей */
@Directive({
  selector: "SimpleMeshLayerDirective",
})
export default class SimpleMeshLayerDirective extends BaseLayerDirective<SimpleMeshLayer> {
  constructor(@Inject(DeckGLComponent) DeckGLComponent: DeckGLComponent) {
    super(DeckGLComponent);
  }
  @Input()
  GetPosition = (MapModel: MapModelOptions) => {
    return MapModel.Coordinates;
  };
  @Input()
  GetColor = (MapModel: MapModelOptions) => {
    return MapModel.Color;
  };
  @Input()
  SizeScale: number = 1;
  @Input()
  Mesh!: string;
  @Input()
  Data: any;
  override PrepareLayer(): void {
    this.Layer = new SimpleMeshLayer({
      id: this.Id,
      pickable: this.Pickable,
      loaders: this.Loaders,
      sizeScale: this.SizeScale,
      mesh: this.Mesh,
      data: this.Data,
      getColor: this.GetColor,
      getPosition: this.GetPosition,
    });
  }
}
