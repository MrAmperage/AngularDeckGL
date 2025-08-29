import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NzSwitchModule } from "ng-zorro-antd/switch";

@Component({
  selector: "TransportsWidgetSwitchersComponent",
  templateUrl: "TransportsWidgetSwitchersComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzSwitchModule],
})
export default class TransportsWidgetSwitchersComponent {}
