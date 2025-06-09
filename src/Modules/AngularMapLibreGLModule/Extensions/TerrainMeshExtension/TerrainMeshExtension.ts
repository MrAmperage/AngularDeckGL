import { Layer, LayerContext, LayerExtension } from "@deck.gl/core";
import { TerrainMeshExtensionProps } from "./TerrainMeshExtensionTypes";
import { TerrainLayer } from "@deck.gl/geo-layers";

/*Расширение  для слоев отображения 3D моделей на Terrain */
export default class TerrainMeshExtension extends LayerExtension {
  TerrainLayerId: string;
  constructor(TerrainMeshExtensionProps: TerrainMeshExtensionProps) {
    super();
    this.TerrainLayerId = TerrainMeshExtensionProps.TerrainLayerId;
  }
  override initializeState(
    this: Layer,
    context: LayerContext,
    extension: this
  ): void {
    extension.ReInitTerrainLayer(this, context, extension);
  }
  /*Расширяем TerrainLayer и заново его инициализируем*/
  ReInitTerrainLayer(Layer: Layer, context: LayerContext, extension: this) {
    const TerrainLayerInstance = context.deck?.props.layers.find((Layer) => {
      return (
        Layer instanceof TerrainLayer && Layer.id === extension.TerrainLayerId
      );
    });
  }
}
