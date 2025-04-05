import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NzIconModule, NzIconService } from "ng-zorro-antd/icon";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import {
  StepBackwardFill,
  StepForwardFill,
} from "@ant-design/icons-angular/icons";

@Component({
  selector: "DateTimeIntervalComponent",
  templateUrl: "DateTimeIntervalComponent.html",
  imports: [NzIconModule, NzDatePickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*Компонент для указания даты и времени в виджетах */
export default class DateTimeIntervalComponent {
  constructor(private IconService: NzIconService) {
    this.IconService.addIcon(StepBackwardFill, StepForwardFill);
  }
}
