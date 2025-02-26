import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NzIconModule, NzIconService } from "ng-zorro-antd/icon";
import { CloseCircleFill } from "@ant-design/icons-angular/icons";
import { CommonModule } from "@angular/common";

/*Верхняя панель с кнопками у виджета */
@Component({
  imports: [NzIconModule, CommonModule],
  selector: "TitlePanelComponent",
  templateUrl: "TitlePanelComponent.html",
  providers: [NzIconService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TitlePanelComponent {
  constructor(private IconService: NzIconService) {
    this.IconService.addIcon(CloseCircleFill);
  }
  @Input()
  Title: string = "";
  @Input()
  IsShowCloseIcon: boolean = true;
}
