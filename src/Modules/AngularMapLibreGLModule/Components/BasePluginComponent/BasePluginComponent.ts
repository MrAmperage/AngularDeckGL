import { Component, OnDestroy, OnInit } from "@angular/core";
import { IControl } from "maplibre-gl";

/*Базовый компонент плагина для карты */
@Component({
  selector: "BasePluginComponent",
  templateUrl: "BasePluginComponent.html",
})
export default class BasePluginComponent implements OnInit, OnDestroy {
  /*Control для плагина */
  Control!: IControl;
  /*Контейнер для плагина */
  ControlContainer!: HTMLDivElement;
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
