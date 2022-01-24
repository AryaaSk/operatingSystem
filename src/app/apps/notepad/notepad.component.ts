import { Component, OnInit, Input} from '@angular/core';
import { DataService } from 'src/app/services/dataservice/data.service';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  @Input() windowId: string = "";
  @Input() data: string = "";
  //data should be in this format: JSON.stringify({"filePath" : ["Root", "Documents", "data.txt"]}) //path stays as array since it is sent directly from file explorer
  filePath?: string = ""; //file path is always in the .../.../... format, not list as it is used to save data to the dataservice.files variable
  text: string = "";

  save()
  {
    //save the data to the main files
    this.dataservice.files[this.filePath!] = this.text;
    this.dataservice.saveFiles()
  }
  newFile()
  {
    //just create another notepad window
    this.dataservice.apps.push({name: "notepad", windowId: this.dataservice.generateID(), data: JSON.stringify({})}) //since we aren't giving any filePath in the data notepad will create a new file
  }

  newFileName = "";
  createFile()
  {
    //NEED TO CHANGE TO NEW FILE SYSTEM

    //for now just save to documents by default
    //const path = ["Root", "Desktop", this.newFileName + ".txt"]
    //this.filePath = this.dataservice.convertArrayToPath(path);
    const path = prompt("Please input a path to save the file", "Root/Documents/" + this.newFileName + ".txt");
    if (path == null)
    { return }
    const pathArray = path!.split("/")

    //need to check if the folder exists
    var pathArrayCopy = JSON.parse(JSON.stringify(pathArray));
    pathArrayCopy.pop()
    var contained = false;
    var i = 0;
    while (i != this.dataservice.filePaths.length)
    {
      if (String(this.dataservice.filePaths[i]) == String(pathArrayCopy)) //use String() since javascript is werid about comparing 2 lists
      { contained = true; } 
      i += 1; 
    }
    if (contained == false)
    { alert("Directory doesn't exist"); return }

    this.filePath = path!
    //need to add the files to the files and filePaths variables
    this.dataservice.files[this.filePath] = "";
    this.dataservice.filePaths.push(pathArray) //dataservice.filePaths still uses old paths structure
    this.dataservice.saveFiles();

    this.data = JSON.stringify({"filePath" : pathArray}); //the data needs to be in the array form
    this.initialize();
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize()
  {
    const dataParsed = JSON.parse(this.data);
    const filePath = dataParsed["filePath"]; //converting the path list back into string so we can use it directly on the files directory
    if (filePath != undefined)
    {
      //need to convert the filePath to a path
      var filePathString = this.dataservice.convertArrayToPath(filePath);
      this.filePath = filePathString

      //here we can check whether it is a new file or an existing file
      this.text = this.dataservice.files[this.filePath]; 
    }
    else 
    {
      this.filePath = undefined;
    }
  }

}
