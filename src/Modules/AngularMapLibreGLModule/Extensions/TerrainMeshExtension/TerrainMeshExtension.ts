import { LayerContext, LayerExtension } from "@deck.gl/core";
import { TerrainMeshExtensionProps } from "./TerrainMeshExtensionTypes";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { Coordinates } from "../../Types/LibTypes";
import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import MapModel from "../../AbstractionModels/MapModel/MapModel";

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
    extension.OnLoadTerrainLayer(5, 1, this.context).then((TerrainLayer) => {
      if (context.deck !== undefined) {
        const SimpleMeshLayerIndex = context.deck.props.layers.findIndex(
          (Layer) => {
            return Layer instanceof SimpleMeshLayer && this.id === Layer.id;
          }
        );
        if (SimpleMeshLayerIndex !== -1) {
          const Layers = [...context.deck.props.layers];
          const SimpleMeshLayerInstance = this.clone({
            getPosition: (Model: MapModel) => {
              Model.Coordinates[2] = extension.GetElevation(
                TerrainLayer,
                Model.Coordinates
              );
              return Model.Coordinates;
            },
            updateTriggers: {
              getPosition: Math.random(),
            },
          }) as SimpleMeshLayer;

          Layers[SimpleMeshLayerIndex] = SimpleMeshLayerInstance;
          context.deck.setProps({ layers: Layers });
        }
      }

      super.initializeState(context, extension);
    });
  }

  GetTerrainLayer(LayerContext: LayerContext) {
    if (LayerContext.deck !== undefined) {
      return LayerContext.deck.props.layers.find((Layer) => {
        return (
          Layer instanceof TerrainLayer && Layer.id === this.TerrainLayerId
        );
      }) as undefined | TerrainLayer;
    } else {
      return undefined;
    }
  }
  GetElevation(TerrainLayer: TerrainLayer, Coordinates: Required<Coordinates>) {
    const SubLayer = TerrainLayer.getSubLayers()[0];
    let Height = 0;
    //@ts-ignore
    const Tiles: any[] = SubLayer.state["tileset"]["_tiles"];
    Tiles.some((Tile) => {
      const bounds = Tile["boundingBox"];
      const mesh = Tile["content"][0];
      const MinX = bounds[0][0];
      const MinY = bounds[0][1];
      const MaxX = bounds[1][0];
      const MaxY = bounds[1][1];
      if (
        Coordinates[1] < MinX ||
        Coordinates[1] > MaxX ||
        Coordinates[0] < MinY ||
        Coordinates[0] > MaxY
      ) {
        const Positions = mesh.attributes.POSITION.value;
        const VertexCount = Positions.length / 3;
        const GridSize = Math.round(Math.sqrt(VertexCount));
        const U = (Coordinates[1] - MinX) / (MaxX - MinX);
        const V = (MaxY - Coordinates[0]) / (MaxY - MinY);
        const X = U * (GridSize - 1);
        const Y = V * (GridSize - 1);
        const I = Math.floor(X);
        const J = Math.floor(Y);
        Height =
          Positions[this.GetPositionIndex(I, J, GridSize) * 3 + 2] -
          80 +
          Coordinates[2];
        return Height !== 0;
      } else {
        return false;
      }
    });
    return Height + Coordinates[2];
  }

  private GetPositionIndex(IndexI: number, IndexJ: number, GridSize: number) {
    return (
      Math.min(Math.max(IndexI, 0), GridSize - 1) +
      Math.min(Math.max(IndexJ, 0), GridSize - 1) * GridSize
    );
  }
  OnLoadTerrainLayer(
    CheckCount: number,
    SecondsInterval: number,
    LayerContext: LayerContext
  ) {
    let CheckCountExternal = 1;
    const TerrainLayer = this.GetTerrainLayer(LayerContext);
    let Interval: NodeJS.Timeout;
    return new Promise<TerrainLayer>((Resolve, Reject) => {
      const CheckLoadTileLayer = () => {
        if (TerrainLayer !== undefined) {
          CheckCountExternal == CheckCountExternal + 1;
          if (TerrainLayer.isLoaded) {
            clearInterval(Interval);
            Resolve(TerrainLayer);
          }
        } else {
          clearInterval(Interval);
          Reject("Не найден TerrainLayer");
        }

        if (CheckCountExternal === CheckCount) {
          clearInterval(Interval);
          Reject("Загрузка слоя не произошла");
        }
      };
      Interval = setInterval(CheckLoadTileLayer, SecondsInterval * 1000);
    });
  }
}
