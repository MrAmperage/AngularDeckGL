import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import MapService from "../../Services/MapService/MapService";
import { WidgetOption } from "../../Services/MapService/MapServiceTypes";

@Component({
  selector: "BaseLoaderComponent",
  templateUrl: "BaseLoaderComponent.html",
  host: { class: "FlexCenter Clicked" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default abstract class BaseLoaderComponent implements OnInit {
  WidgetOption!: WidgetOption;
  constructor(protected MapService: MapService) {}
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
  @HostListener("click")
  /*Переопределить загрузчик для каждого лоадера */
  ClickOnLoader() {
    this.WidgetOption.IsShow = !this.WidgetOption.IsShow;
  }

  InitLoader() {
    this.WidgetOption = { Id: this.Id, IsShow: false };
    this.MapService.AddWidget(this.WidgetOption);
  }
  ngOnInit(): void {
    this.InitLoader();
  }
}
