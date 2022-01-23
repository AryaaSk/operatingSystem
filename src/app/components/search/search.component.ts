import { Component, OnInit, ElementRef, HostListener} from '@angular/core';
import { DataService } from 'src/app/services/dataservice/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  searchText: string = "";
  suggestion: {name: string, icon: string, data: string} = {name: "", icon: "", data: ""};
  getSuggestion()
  {
    //loop through dataservice.applications and find a name which matches the searchText
    var i = 0;
    var didSet = false;
    while (i != this.dataservice.applications.length)
    {
      if (this.dataservice.applications[i].name.includes(this.searchText.toLowerCase()))
      { this.suggestion = this.dataservice.applications[i]; didSet = true; break }
      i += 1;
    }
    if (didSet == false || this.searchText == "")
    {
      //nothing was set to reset the suggestion
      this.suggestion = {name: "", icon: "", data: ""};
    }
  }
  search()
  {
    if (this.suggestion.data != "")
    {
      //just open the suggestion
      this.dataservice.apps.push({name: this.suggestion.name, windowId: this.dataservice.generateID(), data: this.suggestion.data})
      document.getElementById("search")!.style.visibility = "hidden";
    }
  }

  private wasInside = false;
  
  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }
  @HostListener('document:click')
  clickout() {
    if (!this.wasInside && this.dataservice.searchOpen == true) {
      document.getElementById("search")!.style.visibility = "hidden"; //hide search if the user clicks outside of it
      this.dataservice.searchOpen = false;
    }
    this.wasInside = false;
  }

  ngOnInit(): void {
    this.getSuggestion()
  }

}
