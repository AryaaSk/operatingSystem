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
    document.getElementById(this.windowId)!.remove();

    //also delete item from dataservice.apps
    var i = 0;
    while (i != this.dataservice.apps.length)
    {
      if (this.dataservice.apps[i].windowId == this.windowId)
      { 
        this.dataservice.apps.splice(i, 1); break; 
      }
      i += 1;
    }
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

    //check if the OS has specified a resize value for this window
    if (dataParsed["resize"] != null)
    {
      if (dataParsed["resize"] == "vertical")
      { document.getElementById(this.windowId)!.style.resize = "vertical"; }
      else if (dataParsed["resize"] == "horizontal")
      { document.getElementById(this.windowId)!.style.resize = "horizontal"; }
      else
      { document.getElementById(this.windowId)!.style.resize = "none"; }
    }

    //also set the index so windows don't stack on top of each other
    //inset = this.dataservice.apps.length * 10; //this doesnt work right now since the apps do not get deleted from the dataservice.apps
    const inset = document.getElementsByClassName("window").length * 10;
    document.getElementById(this.windowId)!.style.top = inset + "px";
    document.getElementById(this.windowId)!.style.left = inset + "px";
  }

}
