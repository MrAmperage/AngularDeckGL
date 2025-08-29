import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NzSwitchModule } from "ng-zorro-antd/switch";

@Component({
  selector: "DrillingProjectsWidgetSwitchersComponent",
  templateUrl: "DrillingProjectsWidgetSwitchersComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzSwitchModule],
})
export default class DrillingProjectsWidgetSwitchersComponent {}
