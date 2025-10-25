import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import BaseLayerDirective from "../BaseLayerDirective/BaseLayerDirective";
import {
  Directive,
  DoCheck,
  Inject,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
} from "@angular/core";
import DeckGLComponent from "../DeckGLComponent/DeckGLComponent";
import { Coordinates } from "../../Types/LibTypes";

/*Слой для отображения статичных моделей */
@Directive({
  selector: "SimpleMeshLayerDirective",
})
export default class SimpleMeshLayerDirective
  extends BaseLayerDirective<SimpleMeshLayer>
  implements DoCheck
{
  constructor(
    @Inject(DeckGLComponent) DeckGLComponent: DeckGLComponent,
    private IterableDiffer: IterableDiffers
  ) {
    super(DeckGLComponent);
    this.DataDiffer = this.IterableDiffer.find([]).create();
  }
  DataDiffer: IterableDiffer<any[]>;

  @Input({ required: true })
  GetPosition: ((Model: any) => Required<Coordinates>) | undefined = undefined;
  @Input({ required: true })
  GetColor: ((Model: any) => [number, number, number]) | undefined = undefined;
  @Input()
  SizeScale: number = 1;
  @Input()
  Mesh!: string;
  @Input()
  Data: any[] = [];
  override PrepareLayer(): void {
    this.Layer = new SimpleMeshLayer({
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
  ngDoCheck() {
    const Changes = this.DataDiffer.diff(this.Data);
    this.GeometryHandler(Changes);
  }
  GeometryHandler(Changes: IterableChanges<any> | null) {
    if (Changes !== null) {
      this.UpdateLayerProps({ data: this.Data });
    }
  }
}
