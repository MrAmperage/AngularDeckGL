import { Layer, LayerExtension } from "@deck.gl/core";

/*Расширение  для слоев отображения 3D моделей на Terrain */
export default class TerrainMeshExtension extends LayerExtension {
  override draw(this: Layer, params: any, extension: this): void {
    console.log("TerrainMeshExtension", this, params, extension);
  }
}
