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

  closeWindow()
  {
    document.getElementById(this.windowId)!.remove();
  }

  ngOnInit(): void {
  }

}
