import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Widget, WidgetPlacement } from "@deck.gl/core";
import DeckGLComponent from "../DeckGLComponent/DeckGLComponent";

/*Базовый класс для виджетов */
@Component({
  selector: "BaseWidgetComponent",
  templateUrl: "BaseWidgetComponent.html",
})
export default abstract class BaseWidgetComponent implements OnInit {
  constructor(
    protected DeckGLComponent: DeckGLComponent,
    protected HostElement: ElementRef
  ) {}
  @Input({ required: true })
  Id!: string;
  Widget!: Widget;
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
