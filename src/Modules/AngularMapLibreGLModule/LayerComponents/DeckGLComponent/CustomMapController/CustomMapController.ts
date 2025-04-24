import { MapController } from "@deck.gl/core";
import { MjolnirEvent } from "mjolnir.js";

/*Кастомный MapController для DeckGL */
export default class CustomMapController extends MapController {
  override handleEvent(Event: MjolnirEvent): boolean {
    console.log(Event.type);
    return super.handleEvent(Event);
  }
}
