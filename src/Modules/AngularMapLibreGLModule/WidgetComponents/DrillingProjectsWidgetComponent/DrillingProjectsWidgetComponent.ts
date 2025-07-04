import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
} from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import TitlePanelComponent from "../../Components/TitlePanelComponent/TitlePanelComponent";
import DrillingProjectsWidgetSwitchersComponent from "../../Components/DrillingProjectsWidgetSwitchersComponent/DrillingProjectsWidgetSwitchersComponent";
import DateTimeIntervalComponent from "../../Components/DateTimeIntervalComponent/DateTimeIntervalComponent";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzIconModule, NzIconService } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { ClearOutline, EyeOutline } from "@ant-design/icons-angular/icons";
import DeckGLComponent from "../../LayerComponents/DeckGLComponent/DeckGLComponent";
import MapService from "../../Services/MapService/MapService";
import { DrillingProjectActualWellsIndication } from "./DrillingProjectsWidgetTypes";
import { FormsModule } from "@angular/forms";
import DrillingRigSVGIconComponent from "../../SVGIconComponents/DrillingRigSVGIconComponent/DrillingRigSVGIconComponent";

@Component({
  selector: "DrillingProjectsWidgetComponent",
  templateUrl: "DrillingProjectsWidgetComponent.html",
  styleUrls: ["./DrillingProjectsWidgetComponent.css"],
  host: { class: "WidgetContainer WidgetHostContainerMargin" },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TitlePanelComponent,
    DrillingProjectsWidgetSwitchersComponent,
    NzSelectModule,
    NzSwitchModule,
    DateTimeIntervalComponent,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    DrillingRigSVGIconComponent,
  ],
})
export default class DrillingProjectsWidgetComponent extends BaseWidgetComponent {
  constructor(
    @Inject(DeckGLComponent) DeckGLComponent: DeckGLComponent,
    @Inject(ElementRef) ElementRef: ElementRef,
    @Inject(MapService) MapService: MapService,
    private IconService: NzIconService
  ) {
    super(DeckGLComponent, ElementRef, MapService);
    this.IconService.addIcon(EyeOutline, ClearOutline);
  }
  override Id: string = "DrillingProjects";
  //TODO Перенести индикацию в сервис
  Indication: DrillingProjectActualWellsIndication = "Guidance";

  ChangeIndication(Indication: DrillingProjectActualWellsIndication) {
    this.Indication = Indication;
  }
}
