import { Component, OnInit, Input} from '@angular/core';
import { DataService } from 'src/app/services/dataservice/data.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  constructor(public dataService: DataService) { }

  @Input() windowId: string = "";
  @Input() data: string = "";

  selectedAppIndex?: number = undefined;

  appClicked(index: number)
  { this.selectedAppIndex = index; }

  killApp()
  {
    if (this.selectedAppIndex == undefined)
    {
      alert("Please select an app first");
      return;
    }

    const index = JSON.parse(JSON.stringify(this.selectedAppIndex)); 
    //now just remove this from apps
    this.dataService.apps.splice(index, 1);
    this.selectedAppIndex = undefined;
  }
  resetApp() //this can cause some problems if the user has created a file in an app such as notepad, after you reset the app the app's data does not contain the file path, and so the app thinks it has been opened from the search bar or the taskbar.
  {
    if (this.selectedAppIndex == undefined)
    {
      alert("Please select an app first");
      return;
    }

    const index = JSON.parse(JSON.stringify(this.selectedAppIndex)); 
    const app = JSON.parse(JSON.stringify(this.dataService.apps[index]));

    //just remove it and and add it back, to reset the position of the app
    this.killApp();
    this.dataService.apps.push(app);
  }

  ngOnInit(): void {
  }

}
