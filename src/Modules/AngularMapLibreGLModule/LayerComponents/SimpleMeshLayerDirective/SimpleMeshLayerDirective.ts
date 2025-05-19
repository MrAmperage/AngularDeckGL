import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import BaseLayerComponent from "../BaseLayerDirective/BaseLayerDirective";
import { Directive } from "@angular/core";
import { OBJLoader } from "@loaders.gl/obj";
/*Слой для отображения статичных моделей */
@Directive({
  selector: "SimpleMeshLayerDirective",
})
export default class SimpleMeshLayerDirective extends BaseLayerComponent<SimpleMeshLayer> {
  override PrepareLayer(): void {
    this.Layer = new SimpleMeshLayer({
      id: this.Id,
      pickable: this.Pickable,
      loaders: [OBJLoader],
    });
  }
}
