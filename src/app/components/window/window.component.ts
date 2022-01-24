import { Component, OnInit, Input} from '@angular/core';
import { DataService } from 'src/app/services/dataservice/data.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  constructor(public dataservice: DataService) { }

  @Input() appType: string = ""; //which type of application this window will run
  @Input() windowId: string = "";
  @Input() data: string = "";

  height: number = 10;
  width: number = 10;

  closeWindow()
  {
    //delete item from dataservice.apps, not working right now but will need to fix in the future
    /*
    var i = 0;
    while (i != this.dataservice.apps.length)
    {
      if (this.dataservice.apps[i].windowId = this.windowId)
      { 
        this.dataservice.apps.splice(i, 1); break 
      }
      i += 1;
    }*/
    
    document.getElementById(this.windowId)!.remove();
  }

  ngOnInit(): void {
    this.height = this.dataservice.defaultHeight; //check if the window data contains a width or height, if not then just use the default height and width
    this.width = this.dataservice.defaultWidth;

    const dataParsed = JSON.parse(this.data)
    const height = dataParsed["height"]
    const width = dataParsed["width"]

    if (height)
    { this.height =  height}
    if (width)
    { this.width =  width}
  }

  ngAfterViewInit()
  {
    const dataParsed = JSON.parse(this.data) //this has to be in viewAfterInit as it uses document.getElementByID
    const height = dataParsed["height"]
    const width = dataParsed["width"]
    if (height == null && width != null)
    { document.getElementById(this.windowId)!.style.resize = "horizontal"; }
    if (height != null && width == null)
    { document.getElementById(this.windowId)!.style.resize = "vertical"; }
    if (height != null && width != null)
    { document.getElementById(this.windowId)!.style.resize = "none"; }


    //also set the index so windows don't stack on top of each other
    //inset = this.dataservice.apps.length * 10; //this doesnt work right now since the apps do not get deleted from the dataservice.apps
    const inset = document.getElementsByClassName("window").length * 10;
    document.getElementById(this.windowId)!.style.top = inset + "px";
    document.getElementById(this.windowId)!.style.left = inset + "px";
  }

}
