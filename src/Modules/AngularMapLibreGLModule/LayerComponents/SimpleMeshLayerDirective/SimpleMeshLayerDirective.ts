import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import BaseLayerComponent from "../BaseLayerDirective/BaseLayerDirective";
import { Directive, Input } from "@angular/core";
import { OBJLoader } from "@loaders.gl/obj";
/*Слой для отображения статичных моделей */
@Directive({
  selector: "SimpleMeshLayerDirective",
})
export default class SimpleMeshLayerDirective extends BaseLayerComponent<SimpleMeshLayer> {
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
      loaders: [OBJLoader],
      sizeScale: this.SizeScale,
      mesh: this.Mesh,
      data: this.Data,
    });
  }
}
