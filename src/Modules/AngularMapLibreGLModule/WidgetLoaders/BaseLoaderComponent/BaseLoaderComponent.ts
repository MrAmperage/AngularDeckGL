import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: "BaseLoaderComponent",
  templateUrl: "BaseLoaderComponent.html",
})
export default abstract class BaseLoaderComponent {
  constructor() {}
  @Input()
  Height: number = 15;
  @Input()
  Width: number = 15;
  @Input()
  Fill: string = "#000000";
  @Input()
  Stroke: string = "#ffffff";
  @HostListener("click")
  Click() {
    console.log(123);
  }
}
