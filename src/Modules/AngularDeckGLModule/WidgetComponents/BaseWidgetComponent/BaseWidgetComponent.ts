import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { Widget, WidgetPlacement } from "@deck.gl/core";
import DeckGLComponent from "../../LayerComponents/DeckGLComponent/DeckGLComponent";
import MapService from "../../Services/MapService/MapService";
import { WidgetOption } from "../../Services/MapService/MapServiceTypes";

/*Базовый класс для виджетов */
@Directive({
  selector: "BaseWidgetComponent",
  host: { class: "WidgetContainer" },
})
export default abstract class BaseWidgetComponent implements OnInit, OnDestroy {
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
  PrepareInitWidget() {}
  InitWidget() {
    this.WidgetOption = { Id: this.Id };
    const WidgetOption = this.MapService.GetWidgetOptionById(this.Id);
    if (WidgetOption === undefined) {
      this.MapService.AddWidget(this.WidgetOption);
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
    this.PrepareInitWidget();
    this.InitWidget();
  }
  /*Удаление виджета.Переопределить если потребуется*/
  PrepareRemoveWidget() {}
  ngOnDestroy(): void {
    this.PrepareRemoveWidget();
  }
}
