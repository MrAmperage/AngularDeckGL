import { Component } from "@angular/core";
import BaseLoaderComponent from "../BaseLoaderComponent/BaseLoaderComponent";
@Component({
  selector: "TransportsLoaderComponent",
  templateUrl: "TransportsLoaderComponent.svg",
})
export default class TransportsLoaderComponent extends BaseLoaderComponent {
  override ClickOnLoader(): void {
    import(
      "../../WidgetComponents/TransportsWidgetComponent/TransportsWidgetComponent"
    ).then((Widget) => {
      super.ClickOnLoader();

      if (this.GetInternalWidgetOption?.IsShow) {
        Widget.default;
        this.ToolbarWidgetComponent.AddWidgetComponent(Widget.default);
      } else {
        if (this.GetInternalWidgetOption !== undefined) {
          this.ToolbarWidgetComponent.RemoveWidgetComponentById(
            this.GetInternalWidgetOption.Id
          );
        }
      }
    });
  }
}
