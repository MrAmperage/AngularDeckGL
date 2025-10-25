import {
  Directive,
  DoCheck,
  Inject,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
} from "@angular/core";
import BaseLayerDirective from "../BaseLayerDirective/BaseLayerDirective";
import { ScenegraphLayer } from "@deck.gl/mesh-layers";
import DeckGLComponent from "../DeckGLComponent/DeckGLComponent";
import { Coordinates } from "../../Types/LibTypes";

/*Слой для отображения моделей с анимацией*/
@Directive({
  selector: "ScenegraphLayerDirective",
})
export default class ScenegraphLayerDirective
  extends BaseLayerDirective<ScenegraphLayer>
  implements DoCheck
{
  constructor(
    @Inject(DeckGLComponent) DeckGLComponent: DeckGLComponent,
    private IterableDiffer: IterableDiffers
  ) {
    super(DeckGLComponent);
    this.DataDiffer = this.IterableDiffer.find([]).create();
  }
  @Input()
  Data: any[] = [];
  @Input({ required: true })
  GetPosition: ((Model: any) => Required<Coordinates>) | undefined = undefined;
  @Input({ required: true })
  GetColor: ((Model: any) => [number, number, number]) | undefined = undefined;
  @Input()
  SizeScale: number = 1;
  @Input()
  Mesh!: string;
  DataDiffer: IterableDiffer<any[]>;
  override PrepareLayer(): void {
    this.Layer = new ScenegraphLayer({
      id: this.Id,
      pickable: this.Pickable,
      loaders: this.Loaders,
      sizeScale: this.SizeScale,
      mesh: this.Mesh,
      data: this.Data,
      getColor: this.GetColor,
      getPosition: this.GetPosition,
    });
  }
  GeometryHandler(Changes: IterableChanges<any> | null) {
    if (Changes !== null) {
      this.UpdateLayerProps({ data: this.Data });
    }
  }
  ngDoCheck() {
    const Changes = this.DataDiffer.diff(this.Data);
    this.GeometryHandler(Changes);
  }
}
