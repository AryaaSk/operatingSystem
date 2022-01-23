import { Component } from '@angular/core';
import { DataService } from './services/dataservice/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (public dataservice: DataService) {}

  title = 'operatingSystem';

  clickedApp(appType: string, appData: string)
  {
    //just add the appType with no data
    this.dataservice.apps.push({name: appType, windowId: this.dataservice.generateID(), data: appData});
  }
  showSearch()
  {
    if (this.dataservice.searchOpen != true) //can't open again
    {
      document.getElementById("search")!.style.visibility = "visible"
      setTimeout( () => { this.dataservice.searchOpen = true; }, 10); //10 milliseconds is just the tiny delay so that it doesnt close as soon as it opens
    }
  }

  ngOnInit()
  {
    this.dataservice.loadApps();
  }
}
