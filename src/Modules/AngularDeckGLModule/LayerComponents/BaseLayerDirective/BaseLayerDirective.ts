import { Directive, Input, OnInit } from "@angular/core";
import { Layer, LayerExtension, LayerProps } from "@deck.gl/core";
import DeckGLComponent from "../DeckGLComponent/DeckGLComponent";
import { StatefulComponentProps } from "@deck.gl/core/dist/lifecycle/component";

/*Базовая родительская директива для слоев карты */
@Directive({
  selector: "BaseLayerDirective",
})
export default abstract class BaseLayerDirective<LayerClass extends Layer>
  implements OnInit
{
  constructor(protected DeckGLComponent: DeckGLComponent) {}
  protected Layer!: LayerClass;

  /*Отслеживать ли эвенты кликов на карте */
  @Input()
  Pickable: boolean = false;
  /*Id слоя */
  @Input({ required: true })
  Id!: string;
  abstract PrepareLayer(): void;
  InitLayer() {
    this.DeckGLComponent.AddLayers([this.Layer]);
  }
  AddExtension(Extension: LayerExtension) {
    const OldExtensions = this.Layer.props.extensions;
    this.Layer = this.Layer.clone({
      ...this.Layer.props,
      extensions: OldExtensions.concat(Extension),
    });
    this.DeckGLComponent.UpdateLayer(this.Layer);
  }
  UpdateLayerProps(Props: StatefulComponentProps<Required<LayerProps>>) {
    this.Layer = this.Layer.clone({ ...this.Layer.props, ...Props });
    this.DeckGLComponent.UpdateLayer(this.Layer);
  }
  RemoveLayer() {}
  ngOnInit(): void {
    this.PrepareLayer();
    this.InitLayer();
  }
}
