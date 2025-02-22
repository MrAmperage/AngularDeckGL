import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Widget, WidgetPlacement } from "@deck.gl/core";
import DeckGLComponent from "../../Components/DeckGLComponent/DeckGLComponent";

/*Базовый класс для виджетов */
@Component({
  selector: "BaseWidgetComponent",
  templateUrl: "BaseWidgetComponent.html",
  host: { class: "WidgetContainer" },
})
export default abstract class BaseWidgetComponent implements OnInit {
  constructor(
    protected DeckGLComponent: DeckGLComponent,
    protected HostElement: ElementRef
  ) {
    this.Widget = this.GetBaseWidget();
  }

  @Input()
  Placement: WidgetPlacement = "top-left";
  @Input({ required: true })
  Id!: string;
  Widget: Widget;
  /*Подготовка виджета.Переопределить если потребуется */
  abstract PrepareWidget(): void;
  InitWidget() {
    this.DeckGLComponent.AddWidgets([this.Widget]);
  }
  GetBaseWidget(): Widget {
    return {
      _element: this.HostElement.nativeElement,
      id: this.Id,
      props: {},
      placement: this.Placement,
      onAdd: (Params) => {
        return this.HostElement.nativeElement;
      },
      setProps: (Props) => {},
    };
  }
  ngOnInit(): void {
    this.PrepareWidget();
    this.InitWidget();
  }
}
