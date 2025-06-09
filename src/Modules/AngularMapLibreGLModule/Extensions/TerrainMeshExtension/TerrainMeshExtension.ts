import { Layer, LayerContext, LayerExtension } from "@deck.gl/core";
import { TerrainMeshExtensionProps } from "./TerrainMeshExtensionTypes";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { Tile2DHeader } from "@deck.gl/geo-layers/dist/tileset-2d";

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
    if (context.deck !== undefined) {
      const TerrainLayerIndex = context.deck?.props.layers.findIndex(
        (Layer) => {
          return (
            Layer instanceof TerrainLayer &&
            Layer.id === extension.TerrainLayerId
          );
        }
      );

      if (TerrainLayerIndex !== -1) {
        const NewTerrainLayerInstance = (
          context.deck.props.layers[TerrainLayerIndex] as TerrainLayer
        ).clone({
          onTileLoad(Tile) {
            extension.TerrainLayerTileHandler(Tile);
          },
        });
        const NewLayers = context.deck.props.layers;
        NewLayers[TerrainLayerIndex] = NewTerrainLayerInstance;
        context.deck.setProps({ layers: NewLayers });
      }
    }
  }
  /*Обработчик загрузки тайлов TerrainLayer*/
  TerrainLayerTileHandler = (Tile: Tile2DHeader) => {
    console.log(444, Tile);
  };
}
