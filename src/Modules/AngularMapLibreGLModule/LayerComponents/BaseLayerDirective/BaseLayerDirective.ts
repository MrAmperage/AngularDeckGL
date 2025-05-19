import { Directive, Input, OnInit } from "@angular/core";
import { Layer } from "@deck.gl/core";
import DeckGLComponent from "../DeckGLComponent/DeckGLComponent";

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
  RemoveLayer() {}
  ngOnInit(): void {
    this.PrepareLayer();
    this.InitLayer();
  }
}
