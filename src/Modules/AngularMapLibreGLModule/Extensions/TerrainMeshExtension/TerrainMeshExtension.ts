import {
  Layer,
  LayerContext,
  LayerExtension,
  UpdateParameters,
} from "@deck.gl/core";
import { TerrainMeshExtensionProps } from "./TerrainMeshExtensionTypes";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { Coordinates } from "../../Types/LibTypes";

/*Расширение  для слоев отображения 3D моделей на Terrain */
export default class TerrainMeshExtension extends LayerExtension {
  TerrainLayerId: string;
  constructor(TerrainMeshExtensionProps: TerrainMeshExtensionProps) {
    super();
    this.TerrainLayerId = TerrainMeshExtensionProps.TerrainLayerId;
  }
  override updateState(
    this: Layer,
    params: UpdateParameters<Layer>,
    extension: this
  ): void {
    extension.OnLoadTerrainLayer(5, 1, this.context).then((TerrainLayer) => {
      console.log(
        extension.GetElevation(
          TerrainLayer,
          [87.15609686851167, 54.22993514648337]
        )
      );
    });
    super.updateState(params, extension);
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
  GetElevation(TerrainLayer: TerrainLayer, Coordinates: Coordinates) {
    const subLayer = TerrainLayer.getSubLayers()[0];
    let Height = 0;
    //@ts-ignore
    const Tiles: any[] = subLayer.state["tileset"]["_tiles"];
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
        const positions = mesh.attributes.POSITION.value;
        const vertexCount = positions.length / 3;
        const GridSize = Math.round(Math.sqrt(vertexCount));

        const u = (Coordinates[1] - MinX) / (MaxX - MinX);
        const v = (MaxY - Coordinates[0]) / (MaxY - MinY);

        const x = u * (GridSize - 1);
        const y = v * (GridSize - 1);
        const i = Math.floor(x);
        const j = Math.floor(y);
        const dx = x - i;
        const dy = y - j;

        const z00 = positions[this.GetPositionIndex(i, j, GridSize) * 3 + 2];
        const z10 =
          positions[this.GetPositionIndex(i + 1, j, GridSize) * 3 + 2];
        const z01 =
          positions[this.GetPositionIndex(i, j + 1, GridSize) * 3 + 2];
        const z11 =
          positions[this.GetPositionIndex(i + 1, j + 1, GridSize) * 3 + 2];

        const z0 = z00 * (1 - dx) + z10 * dx;
        const z1 = z01 * (1 - dx) + z11 * dx;

        Height = z0 * (1 - dy) + z1 * dy;
        return Height !== 0;
      } else {
        return false;
      }
    });
    return Height;
  }

  GetPositionIndex(IndexI: number, IndexJ: number, GridSize: number) {
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
        TerrainLayer?.isLoaded;

        if (CheckCountExternal === CheckCount) {
          clearInterval(Interval);
          Reject("Загрузка слоя не произошла");
        }
      };
      Interval = setInterval(CheckLoadTileLayer, SecondsInterval * 1000);
    });
  }
}
