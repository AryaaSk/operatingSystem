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

  ngOnInit()
  {
    this.dataservice.loadApps();
  }
}
