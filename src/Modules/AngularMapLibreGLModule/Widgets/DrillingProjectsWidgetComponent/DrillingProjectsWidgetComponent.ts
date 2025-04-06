import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import TitlePanelComponent from "../../Components/TitlePanelComponent/TitlePanelComponent";
import DrillingProjectsWidgetSwitchersComponent from "../../Components/DrillingProjectsWidgetSwitchersComponent/DrillingProjectsWidgetSwitchersComponent";
import DateTimeIntervalComponent from "../../Components/DateTimeIntervalComponent/DateTimeIntervalComponent";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzButtonModule } from "ng-zorro-antd/button";

@Component({
  selector: "DrillingProjectsWidgetComponent",
  templateUrl: "DrillingProjectsWidgetComponent.html",
  styleUrls: ["./DrillingProjectsWidgetComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitlePanelComponent,
    DrillingProjectsWidgetSwitchersComponent,
    NzSelectModule,
    NzSwitchModule,
    DateTimeIntervalComponent,
    NzButtonModule,
  ],
})
export default class DrillingProjectsWidgetComponent extends BaseWidgetComponent {
  override Id: string = "DrillingProjects";
  override PrepareWidget(): void {}
}
