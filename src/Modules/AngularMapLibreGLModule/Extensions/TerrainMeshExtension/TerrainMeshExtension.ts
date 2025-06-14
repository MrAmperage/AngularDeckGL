import { LayerContext, LayerExtension } from "@deck.gl/core";
import { TerrainMeshExtensionProps } from "./TerrainMeshExtensionTypes";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { Tile2DHeader } from "@deck.gl/geo-layers/dist/tileset-2d";
import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import { Coordinates } from "../../Types/LibTypes";

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
        const OldSimpleMeshLayer = context.deck.props.layers[
          SimpleMeshLayerIndex
        ] as SimpleMeshLayer;
        const Data = OldSimpleMeshLayer.props.data as any[];
        console.log(
          "Elevation",
          extension.GetElevation(Data[0].Coordinates, 14)
        );
      }
    }
  }
  //TODO Дописать
  GetElevation(Coordinates: Coordinates, Zoom: number) {
    const TileSize = 256;
    const TileCount = Math.pow(2, Zoom);
    const xTile = Math.floor(((Coordinates[0] + 180) / 360) * TileCount);
    const yTile = Math.floor(
      ((1 -
        Math.log(
          Math.tan((Coordinates[1] * Math.PI) / 180) +
            1 / Math.cos((Coordinates[1] * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
        TileCount
    );

    const LoadURL = `https://s3.amazonaws.com/elevation-tiles-prod/normal/${Zoom}/${xTile}/${yTile}.png`;
    fetch(LoadURL).then((TileData) => {
      console.log(TileData);
    });
  }
}
