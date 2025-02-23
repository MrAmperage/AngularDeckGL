import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import MapService from "../../Services/MapService/MapService";

@Component({
  selector: "BaseLoaderComponent",
  templateUrl: "BaseLoaderComponent.html",
  host: { class: "FlexCenter Clicked" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default abstract class BaseLoaderComponent implements OnInit {
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
    if (this.GetLoaderOption !== undefined) {
      this.GetLoaderOption.IsShow = !this.GetLoaderOption.IsShow;
    }
  }

  get GetLoaderOption() {
    return this.MapService.GetLoaderOptionsById(this.Id);
  }
  InitLoader() {
    this.MapService.AddLoader({ Id: this.Id, IsShow: false });
  }
  ngOnInit(): void {
    this.InitLoader();
  }
}
