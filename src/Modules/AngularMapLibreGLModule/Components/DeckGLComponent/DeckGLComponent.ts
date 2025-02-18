import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Deck, Layer } from "@deck.gl/core";

@Component({
  selector: "DeckGLComponent",
  templateUrl: "DeckGLComponent.html",
  styleUrls: ["./DeckGLComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeckGLComponent implements OnInit {
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

  /*Добавление слоя в DeckGL*/
  AddLayers(Layers: Layer[]) {
    const OldLayers = this.DeckGL.props.layers;
    this.DeckGL.setProps({ layers: OldLayers.concat(Layers) });
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
      controller: true,
    });
  }
  ngOnInit(): void {
    this.DeckGLInit();
  }
}
