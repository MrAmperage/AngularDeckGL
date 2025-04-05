import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NzIconModule, NzIconService } from "ng-zorro-antd/icon";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import {
  ClockCircleOutline,
  StepBackwardFill,
  StepForwardFill,
} from "@ant-design/icons-angular/icons";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { CommonModule } from "@angular/common";

@Component({
  selector: "DateTimeIntervalComponent",
  templateUrl: "DateTimeIntervalComponent.html",
  imports: [
    NzIconModule,
    NzDatePickerModule,
    NzSelectModule,
    NzSwitchModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*Компонент для указания даты и времени в виджетах */
export default class DateTimeIntervalComponent {
  constructor(private IconService: NzIconService) {
    this.IconService.addIcon(
      StepBackwardFill,
      StepForwardFill,
      ClockCircleOutline
    );
  }
  /*Отображать дополнительные опции для выбора времени? */
  @Input()
  IsShowShiftOptions: boolean = false;
}
