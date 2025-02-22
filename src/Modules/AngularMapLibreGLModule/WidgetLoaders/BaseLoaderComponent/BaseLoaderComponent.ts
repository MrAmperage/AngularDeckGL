import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: "BaseLoaderComponent",
  templateUrl: "BaseLoaderComponent.html",
  host: { class: "WidgetContainer" },
})
export default abstract class BaseLoaderComponent {
  constructor() {}
  @Input()
  Height: number = 15;
  @Input()
  Width: number = 15;
  @Input()
  Fill: string = "#ffffff";
  @Input()
  Stroke: string = "#ffffff";
  @HostListener("click")
  Click() {
    console.log(123);
  }
}
