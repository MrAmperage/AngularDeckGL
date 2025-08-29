import { Directive, Input } from "@angular/core";

/*Базовая родительская директива для SVG иконок-компонентов*/
@Directive({ selector: "BaseSVGIconDirective" })
export default class BaseSVGIconDirective {
  @Input()
  Height: string = "15px";
  @Input()
  Width: string = "15px";
  @Input()
  Fill: string = "#fff";
  @Input()
  Stroke: string = "#fff";
}
