import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import TitlePanelComponent from "../../Components/TitlePanelComponent/TitlePanelComponent";
import DrillingProjectsWidgetSwitchersComponent from "../../Components/DrillingProjectsWidgetSwitchersComponent/DrillingProjectsWidgetSwitchersComponent";
import { NzSelectComponent } from "ng-zorro-antd/select";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import DateTimeIntervalComponent from "../../Components/DateTimeIntervalComponent/DateTimeIntervalComponent";

@Component({
  selector: "DrillingProjectsWidgetComponent",
  templateUrl: "DrillingProjectsWidgetComponent.html",
  styleUrls: ["./DrillingProjectsWidgetComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitlePanelComponent,
    DrillingProjectsWidgetSwitchersComponent,
    NzSelectComponent,
    NzSwitchComponent,
    DateTimeIntervalComponent,
  ],
})
export default class DrillingProjectsWidgetComponent extends BaseWidgetComponent {
  override Id: string = "DrillingProjects";
  override PrepareWidget(): void {}
}
