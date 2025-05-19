import { Directive, Input } from "@angular/core";
import { GeoBoundingBox, TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import BaseLayerDirective from "../BaseLayerDirective/BaseLayerDirective";

@Directive({
  selector: "TileLayerDirective",
})
export default class TileLayerDirective extends BaseLayerDirective<TileLayer> {
  @Input()
  TileSize: number = 256;
  @Input({ required: true })
  UrlTemplate!: string;

  PrepareLayer() {
    this.Layer = new TileLayer({
      id: this.Id,
      data: this.UrlTemplate,
      maxZoom: this.DeckGLComponent.MaxZoom,
      minZoom: this.DeckGLComponent.MinZoom,
      renderSubLayers: (props) => {
        const GeoBoundingBox = props.tile.bbox as GeoBoundingBox;
        return new BitmapLayer({
          id: props.id,
          image: props.data,
          bounds: [
            GeoBoundingBox.west,
            GeoBoundingBox.south,
            GeoBoundingBox.east,
            GeoBoundingBox.north,
          ],
        });
      },
      pickable: this.Pickable,
    });
  }
}
