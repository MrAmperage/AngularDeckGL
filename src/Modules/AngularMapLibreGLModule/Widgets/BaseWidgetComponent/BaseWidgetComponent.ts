import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Widget, WidgetPlacement } from "@deck.gl/core";
import DeckGLComponent from "../../LayerComponents/DeckGLComponent/DeckGLComponent";
import MapService from "../../Services/MapService/MapService";
import { WidgetOption } from "../../Services/MapService/MapServiceTypes";

/*Базовый класс для виджетов */
@Component({
  selector: "BaseWidgetComponent",
  templateUrl: "BaseWidgetComponent.html",
  host: { class: "WidgetContainer" },
})
export default class BaseWidgetComponent implements OnInit {
  constructor(
    protected DeckGLComponent: DeckGLComponent,
    protected HostElement: ElementRef,
    protected MapService: MapService
  ) {
    this.Widget = this.GetBaseWidget();
  }
  WidgetOption!: WidgetOption;
  @Input()
  Placement: WidgetPlacement = "top-left";
  @Input({ required: true })
  Id!: string;
  Widget: Widget;
  /*Подготовка виджета.Переопределить если потребуется */
  PrepareWidget() {}
  InitWidget() {
    const CurrentWidget = this.MapService.WidgetsOptions.find(
      (WidgetOption) => {
        return WidgetOption.Id === this.Id;
      }
    );
    if (CurrentWidget === undefined) {
      this.MapService.AddWidget({ Id: this.Id, IsShow: true });
      this.DeckGLComponent.AddWidgets([this.Widget]);
    }
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
