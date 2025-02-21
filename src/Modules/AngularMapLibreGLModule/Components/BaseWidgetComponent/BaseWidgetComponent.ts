import { Component, Input, OnInit } from "@angular/core";
import { Widget, WidgetPlacement } from "@deck.gl/core";
import DeckGLComponent from "../DeckGLComponent/DeckGLComponent";

/*Базовый класс для виджетов */
@Component({
  selector: "BaseWidgetComponent",
  templateUrl: "BaseWidgetComponent.html",
})
export default abstract class BaseWidgetComponent<WidgetClass extends Widget>
  implements OnInit
{
  constructor(protected DeckGLComponent: DeckGLComponent) {}
  Widget!: WidgetClass;
  @Input({ required: true })
  Id!: string;
  @Input()
  Placement: WidgetPlacement = "top-left";

  abstract PrepareWidget(): void;
  InitWidget() {
    this.DeckGLComponent.AddWidgets([this.Widget]);
  }

  ngOnInit(): void {
    this.PrepareWidget();
    this.InitWidget();
  }
}
