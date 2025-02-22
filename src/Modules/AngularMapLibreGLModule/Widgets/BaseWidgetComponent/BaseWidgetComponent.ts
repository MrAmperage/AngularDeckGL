import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Widget, WidgetPlacement } from "@deck.gl/core";
import DeckGLComponent from "../../Components/DeckGLComponent/DeckGLComponent";
import ToolbarWidgetComponent from "../../Widgets/ToolbarWidgetComponent/ToolbarWidgetComponent";

/*Базовый класс для виджетов */
@Component({
  selector: "BaseWidgetComponent",
  templateUrl: "BaseWidgetComponent.html",
})
export default abstract class BaseWidgetComponent implements OnInit {
  constructor(
    protected DeckGLComponent: DeckGLComponent,
    protected HostElement: ElementRef,
    protected ToolbarWidgetComponent: ToolbarWidgetComponent
  ) {
    this.Widget = this.GetBaseWidget();
  }
  @Input({ required: true })
  @Input()
  Placement: WidgetPlacement = "top-left";
  Id!: string;
  Widget: Widget;
  /*Подготовка виджета.Переопределить если потребуется */
  abstract PrepareWidget(): void;
  InitWidget() {
    this.DeckGLComponent.AddWidgets([this.Widget]);
  }
  /*Возвращает лоадер для виджета */
  abstract get GetWidgetLoader(): Component | undefined;
  ngOnInit(): void {
    this.PrepareWidget();
    this.InitWidget();
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
}
