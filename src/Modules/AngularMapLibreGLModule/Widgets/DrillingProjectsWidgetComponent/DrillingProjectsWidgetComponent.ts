import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseWidgetComponent from "../../Components/BaseWidgetComponent/BaseWidgetComponent";
@Component({
  selector: "DrillingProjectsWidgetComponent",
  templateUrl: "DrillingProjectsWidgetComponent.html",
  styleUrls: ["./DrillingProjectsWidgetComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DrillingProjectsWidgetComponent extends BaseWidgetComponent {
  override PrepareWidget(): void {
    this.Widget = {
      _element: this.HostElement.nativeElement,
      id: this.Id,
      props: {},
      placement: this.Placement,
      onAdd: (params) => {
        return this.HostElement.nativeElement;
      },
      setProps: (props) => {},
    };
  }
}
