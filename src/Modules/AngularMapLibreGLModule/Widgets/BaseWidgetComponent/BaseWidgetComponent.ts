import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Widget, WidgetPlacement } from "@deck.gl/core";
import DeckGLComponent from "../../Components/DeckGLComponent/DeckGLComponent";
import MapService from "../../Services/MapService/MapService";

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

  @Input()
  Placement: WidgetPlacement = "top-left";
  @Input({ required: true })
  Id!: string;
  Widget: Widget;
  /*Подготовка виджета.Переопределить если потребуется */
  PrepareWidget() {}
  InitWidget() {
    const CurrentLoader = this.MapService.LoadersOptions.find((Loader) => {
      return Loader.Id === this.Id;
    });
    if (CurrentLoader === undefined) {
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
