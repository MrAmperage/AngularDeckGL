import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NzIconModule, NzIconService } from "ng-zorro-antd/icon";
import {
  CloseCircleFill,
  DownOutline,
  UpOutline,
} from "@ant-design/icons-angular/icons";
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
    this.IconService.addIcon(CloseCircleFill, UpOutline, DownOutline);
  }
  @Input()
  Title: string = "";
  @Input()
  IsShowCloseIcon: boolean = true;
  /*Отоброжать внутренний контент или нет? */
  IsShowInternalContent: boolean = false;
  /*Обработчик для переключения отображения внутреннего контента*/
  ChangeShowInternalContent(IsShow: boolean) {
    this.IsShowInternalContent = IsShow;
  }
  /*Отображать в панели иконку переключателя внутреннего контента? */
  @Input()
  IsShowInternalContentSwitchIcon: boolean = false;
}
