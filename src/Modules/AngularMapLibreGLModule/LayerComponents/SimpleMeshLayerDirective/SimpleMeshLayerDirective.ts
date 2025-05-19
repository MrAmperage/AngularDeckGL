import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import BaseLayerComponent from "../BaseLayerDirective/BaseLayerDirective";
import { Directive } from "@angular/core";
/*Слой для отображения статичных моделей */
@Directive({
  selector: "SimpleMeshLayerDirective",
})
export default class SimpleMeshLayerDirective extends BaseLayerComponent<SimpleMeshLayer> {
  override PrepareLayer(): void {}
}
