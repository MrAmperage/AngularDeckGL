import { MapController } from "@deck.gl/core";

/*Кастомный MapController для DeckGL */
export default class CustomMapController extends MapController {
  //TODO Типизировать
  constructor(MapControllerProps: any) {
    CustomMapController.DisableCanvasContextMenu(MapControllerProps);
    super(MapControllerProps);
  }
  /*Отключает контекстное меню канваса */
  static DisableCanvasContextMenu(MapControllerProps: any) {
    (
      MapControllerProps.eventManager.contextmenuInput
        .element as HTMLCanvasElement
    ).oncontextmenu = () => false;
  }
}
