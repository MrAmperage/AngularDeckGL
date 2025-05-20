import TerrainMeshExtension from "../TerrainMeshExtension/TerrainMeshExtension";
import BaseExtensionDirective from "../BaseExtensionDirective/BaseExtensionDirective";
import { Directive, Inject } from "@angular/core";
import SimpleMeshLayerDirective from "../../LayerComponents/SimpleMeshLayerDirective/SimpleMeshLayerDirective";
@Directive({
  selector: "TerrainMeshExtensionDirective",
})
export default class TerrainMeshExtensionDirective extends BaseExtensionDirective<TerrainMeshExtension> {
  constructor(
    @Inject(SimpleMeshLayerDirective)
    DeckGLLayer: SimpleMeshLayerDirective
  ) {
    super(DeckGLLayer);
  }
  override PrepareExtension(): void {
    this.Extension = new TerrainMeshExtension();
  }
}
