import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Map } from "maplibre-gl";

@Component({
  selector: "MapComponent",
  templateUrl: "MapComponent.html",
  styleUrls: ["./MapComponent.css"],
})
export default class MapComponent implements OnInit {
  @Input()
  Center: [number, number] = [0, 0];
  @Input()
  Zoom: number = 1;
  @ViewChild("MapContainer", { static: true })
  MapContainer!: ElementRef<HTMLElement>;
  Map!: Map;

  InitMap() {
    this.Map = new Map({
      container: this.MapContainer.nativeElement,
      center: this.Center,
      zoom: this.Zoom,
      style: "https://demotiles.maplibre.org/style.json",
    });
  }
  ngOnInit(): void {
    this.InitMap();
  }
}
