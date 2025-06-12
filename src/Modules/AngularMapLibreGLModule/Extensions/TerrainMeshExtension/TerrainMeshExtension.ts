import { LayerContext, LayerExtension } from "@deck.gl/core";
import { TerrainMeshExtensionProps } from "./TerrainMeshExtensionTypes";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { Tile2DHeader } from "@deck.gl/geo-layers/dist/tileset-2d";
import { SimpleMeshLayer } from "@deck.gl/mesh-layers";

/*Расширение  для слоев отображения 3D моделей на Terrain */
export default class TerrainMeshExtension extends LayerExtension {
  TerrainLayerId: string;
  constructor(TerrainMeshExtensionProps: TerrainMeshExtensionProps) {
    super();
    this.TerrainLayerId = TerrainMeshExtensionProps.TerrainLayerId;
  }
  override initializeState(
    this: SimpleMeshLayer,
    context: LayerContext,
    extension: this
  ): void {
    extension.ReInitSimpleMeshLayer(this, context, extension);
    extension.ReInitTerrainLayer(this, context, extension);
  }
  /*Расширяем TerrainLayer и заново его инициализируем*/
  ReInitTerrainLayer(
    Layer: SimpleMeshLayer,
    context: LayerContext,
    extension: this
  ) {
    if (context.deck !== undefined) {
      const TerrainLayerIndex = context.deck.props.layers.findIndex((Layer) => {
        return (
          Layer instanceof TerrainLayer && Layer.id === extension.TerrainLayerId
        );
      });

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
    console.log("TerrainLayerHandler", Tile);
  };

  SimpleMeshDataLoadHandler = (Data: any, Context: any) => {
    console.log("SimpleMeshLayerHandler", Data);
  };
  /*Расширяем SimpleMeshLayer и заново его инициализируем*/
  ReInitSimpleMeshLayer(
    Layer: SimpleMeshLayer,
    context: LayerContext,
    extension: this
  ) {
    if (context.deck !== undefined) {
      const SimpleMeshLayerIndex = context.deck.props.layers.findIndex(
        (LayerObject) => {
          return (
            LayerObject instanceof SimpleMeshLayer &&
            LayerObject.id === Layer.id
          );
        }
      );

      if (SimpleMeshLayerIndex !== -1) {
        const NewSimpleMeshLayerInstance = (
          context.deck.props.layers[SimpleMeshLayerIndex] as SimpleMeshLayer
        ).clone({
          onDataLoad(data, context) {
            extension.SimpleMeshDataLoadHandler(data, context);
          },
        });
        const NewLayers = context.deck.props.layers;
        NewLayers[SimpleMeshLayerIndex] = NewSimpleMeshLayerInstance;
        context.deck.setProps({ layers: NewLayers });
      }
    }
  }
}
