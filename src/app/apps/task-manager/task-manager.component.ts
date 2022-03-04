import { Component, OnInit, Input} from '@angular/core';
import { DataService } from 'src/app/services/dataservice/data.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  constructor(private dataService: DataService) { }

  @Input() windowId: string = "";
  @Input() data: string = "";

  selectedAppIndex?: number = undefined;
  currentAppsOpen: {name: string, windowId: string, data: string}[] = []; //can't directly look at the dataService.apps as it could some problems

  getData()
  {
    //get data about current apps open with the dataService.apps variable
    this.currentAppsOpen = JSON.parse(JSON.stringify(this.dataService.apps));
    console.log(this.currentAppsOpen);
  }

  appClicked(index: number)
  { this.selectedAppIndex = index; }

  ngOnInit(): void {
    this.getData();
  }

}
