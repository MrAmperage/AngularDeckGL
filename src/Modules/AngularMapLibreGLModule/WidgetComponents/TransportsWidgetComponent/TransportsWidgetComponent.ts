import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import TitlePanelComponent from "../../Components/TitlePanelComponent/TitlePanelComponent";
import TransportsWidgetSwitchersComponent from "../../Components/TransportsWidgetSwitchersComponent/TransportsWidgetSwitchersComponent";

@Component({
  selector: "TransportsWidgetComponent",
  templateUrl: "TransportsWidgetComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitlePanelComponent, TransportsWidgetSwitchersComponent],
})
export default class TransportsWidgetComponent extends BaseWidgetComponent {
  override Id: string = "Transports";
}
