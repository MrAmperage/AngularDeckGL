import { Directive, OnInit } from "@angular/core";
import { Layer, LayerExtension } from "@deck.gl/core";
import BaseLayerDirective from "../../LayerComponents/BaseLayerDirective/BaseLayerDirective";
/*Базовый абстрактный класс для  расширений слоев */
@Directive({ selector: "BaseExtensionDirective" })
export default abstract class BaseExtensionDirective<
  ExtensionClass extends LayerExtension
> implements OnInit
{
  constructor(protected DeckGLLayer: BaseLayerDirective<Layer>) {}
  Extension!: ExtensionClass;

  abstract PrepareExtension(): void;
  InitExtension() {
    this.DeckGLLayer.AddExtension(this.Extension);
  }

  ngOnInit(): void {
    this.PrepareExtension();
    this.InitExtension();
  }
}
