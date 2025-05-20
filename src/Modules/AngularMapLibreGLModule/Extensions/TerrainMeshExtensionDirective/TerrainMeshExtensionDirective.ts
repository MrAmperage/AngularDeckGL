import TerrainMeshExtension from "../TerrainMeshExtension/TerrainMeshExtension";
import BaseExtensionDirective from "../BaseExtensionDirective/BaseExtensionDirective";
import { Directive } from "@angular/core";
@Directive({
  selector: "TerrainMeshExtensionDirective",
})
export default class TerrainMeshExtensionDirective extends BaseExtensionDirective<TerrainMeshExtension> {
  override PrepareExtension(): void {
    this.Extension = new TerrainMeshExtension();
  }
}
