import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Deck, Layer, View, Widget } from "@deck.gl/core";

@Component({
  selector: "DeckGLComponent",
  templateUrl: "DeckGLComponent.html",
  styleUrls: ["./DeckGLComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeckGLComponent implements OnInit {
  @Input()
  Controller: View["props"]["controller"];
  DeckGL!: Deck;
  @Input()
  Center: [number, number] = [0, 0];
  @Input()
  Zoom: number = 14;
  @Input()
  Bearing: number = 0;
  @Input()
  Pitch: number = 0;
  @Input()
  MaxZoom: number = 22;
  @Input()
  MinZoom: number = 0;
  @ViewChild("Canvas", { static: true })
  Canvas!: ElementRef<HTMLCanvasElement>;

  /*Добавление виджетов в DeckGL*/
  AddWidgets(Widgets: Widget[]) {
    const OldWigets = this.DeckGL.props.widgets;
    this.DeckGL.setProps({ widgets: OldWigets.concat(Widgets) });
  }
  /*Добавление слоев в DeckGL*/
  AddLayer(Layer: Layer) {
    const OldLayers = this.DeckGL.props.layers;
    this.DeckGL.setProps({ layers: OldLayers.concat(Layer) });
  }
  UpdateLayer(UpdateLayer: Layer) {
    let Layers = this.DeckGL.props.layers;
    const UpdateLayerIndex = Layers.findIndex((LayerObject) => {
      return LayerObject instanceof Layer && LayerObject.id == UpdateLayer.id;
    });
    if (UpdateLayerIndex !== -1) {
      Layers[UpdateLayerIndex] = UpdateLayer;
    }
    this.DeckGL.setProps({ layers: Layers });
  }
  DeckGLInit() {
    this.DeckGL = new Deck({
      canvas: this.Canvas.nativeElement,
      initialViewState: {
        longitude: this.Center[0],
        latitude: this.Center[1],
        zoom: this.Zoom,
        maxZoom: this.MaxZoom,
        pitch: this.Pitch,
        bearing: this.Bearing,
        minZoom: this.MinZoom,
      },
      controller: this.Controller,
    });
  }
  ngOnInit(): void {
    this.DeckGLInit();
  }
}
