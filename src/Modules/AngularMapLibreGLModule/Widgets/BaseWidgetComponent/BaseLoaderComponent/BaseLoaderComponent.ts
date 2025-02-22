import { Component } from "@angular/core";

@Component({
  selector: "BaseLoaderComponent",
  templateUrl: "BaseLoaderComponent.html",
  host: { class: "FlexCenter" },
})
/*Базовый лоадер для виджетов */
export default abstract class BaseLoaderComponent {}
