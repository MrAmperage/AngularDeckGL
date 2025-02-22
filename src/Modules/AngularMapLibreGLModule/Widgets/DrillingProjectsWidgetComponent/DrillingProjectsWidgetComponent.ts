import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
@Component({
  selector: "DrillingProjectsWidgetComponent",
  templateUrl: "DrillingProjectsWidgetComponent.html",
  styleUrls: ["./DrillingProjectsWidgetComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DrillingProjectsWidgetComponent extends BaseWidgetComponent {
  override PrepareWidget(): void {}
}
