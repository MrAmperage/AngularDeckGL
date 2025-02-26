import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from "@angular/core";
import BaseWidgetComponent from "../BaseWidgetComponent/BaseWidgetComponent";
import { WidgetOption } from "../../Services/MapService/MapServiceTypes";

/*Виджет тулбара с кнопками для тругих виджетов */
@Component({
  selector: "ToolbarWidgetComponent",
  templateUrl: "ToolbarWidgetComponent.html",
  styleUrls: ["./ToolbarWidgetComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToolbarWidgetComponent extends BaseWidgetComponent {
InternalWidgetOptions:WidgetOption[]=[]

  @ViewChild("WidgetsContainer", { static: true, read: ViewContainerRef })
  WidgetsContainer!: ViewContainerRef
  /*Добавление виджета в тулбар */
  AddWidgetComponent(WidgetComponent:typeof BaseWidgetComponent,WidgetOption:WidgetOption){
   this.WidgetsContainer.createComponent(WidgetComponent)
   this.AddInternalWidget(WidgetOption)
  }
 private AddInternalWidget(WidgetOption:WidgetOption){
  this.InternalWidgetOptions.push(WidgetOption)
 }
  RemoveWidgetComponentById(WidgetComponentId:string){
const RemoveIndex= this.InternalWidgetOptions.findIndex((Option)=>{
  return Option.Id === WidgetComponentId
})
if(RemoveIndex!==-1){
 this.WidgetsContainer.remove(RemoveIndex) 
}
  }

  override PrepareWidget(): void { }


}
