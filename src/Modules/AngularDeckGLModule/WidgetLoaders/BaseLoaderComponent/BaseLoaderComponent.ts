import { Directive, HostListener, Input, OnInit } from "@angular/core";
import MapService from "../../Services/MapService/MapService";
import ToolbarWidgetComponent from "../../WidgetComponents/ToolbarWidgetComponent/ToolbarWidgetComponent";

@Directive({
  selector: "BaseLoaderComponent",
  host: { class: "FlexCenter Clicked" },
})
export default abstract class BaseLoaderComponent implements OnInit {
  constructor(
    protected MapService: MapService,
    protected ToolbarWidgetComponent: ToolbarWidgetComponent
  ) {}
  @Input({ required: true })
  Id!: string;
  @Input()
  Height: number = 15;
  @Input()
  Width: number = 15;
  @Input()
  Fill: string = "#ffffff";
  @Input()
  Stroke: string = "#ffffff";
  /*Переопределить загрузчик для каждого лоадера */
  @HostListener("click")
  ClickOnLoader() {
    const InternalWidgetIndex =
      this.ToolbarWidgetComponent.InternalWidgetOptions.findIndex((Options) => {
        return Options.Id === this.GetInternalWidgetOption?.Id;
      });
    if (InternalWidgetIndex !== -1) {
      this.ToolbarWidgetComponent.InternalWidgetOptions[
        InternalWidgetIndex
      ].IsShow =
        !this.ToolbarWidgetComponent.InternalWidgetOptions[InternalWidgetIndex]
          .IsShow;
    }
  }
  get GetInternalWidgetOption() {
    return this.ToolbarWidgetComponent.InternalWidgetOptions.find((Option) => {
      return Option.Id === this.Id;
    });
  }
  InitLoader() {
    const InternalWidgetOption = { Id: this.Id, IsShow: false };
    this.MapService.AddWidget(InternalWidgetOption);
    this.ToolbarWidgetComponent.AddInternalWidget(InternalWidgetOption);
  }
  ngOnInit(): void {
    this.InitLoader();
  }
}
