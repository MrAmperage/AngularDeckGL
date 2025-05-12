import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import BaseLayerComponent from "../BaseLayerDirective/BaseLayerDirective";
/*Слой для отображения статичных моделей */
export default class SimpleMeshLayerComponent extends BaseLayerComponent<SimpleMeshLayer> {
  override PrepareLayer(): void {}
}
