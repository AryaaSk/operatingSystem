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
  }

  ngOnInit(): void {
    this.height = this.dataservice.defaultHeight;
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
  }

}
