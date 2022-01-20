import { Component, OnInit, Input} from '@angular/core';
import { DataService } from 'src/app/services/dataservice/data.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  @Input() windowId: string = "";
  @Input() data: string = "";

  currentPath = ["Root"]
  pathLevel = 2; //1 is the base level (root), but we need to show all items inside root so we make it 2
  currentItems: string[][] = []; //list of paths and items displayed in the file explorer at the current location

  getCurrentData()
  {
    //get all items in dataservice.filePaths with length matching path level, then filter out with paths matching root/...
    this.currentItems = [];
    var i = 0;
    while (i != this.dataservice.filePaths.length)
    {
      if (this.dataservice.filePaths[i].length == this.pathLevel)
      {
        const pathCopy = JSON.parse(JSON.stringify(this.dataservice.filePaths[i])); //use the json so that it doesnt just make a reference and edit the actual file data
        const pathCopySliced = pathCopy.slice(0, pathCopy.length - 1)

        //now remove the last item in this.dataservice.filePaths[i], and check if it maths the currentPath
        if (String(pathCopySliced) == String(this.currentPath)) //need to use String() since we stringify and parse the data which turns it into a type any
        { this.currentItems.push(pathCopy); } //only pushing the copy since otherwise when we edit it, it will edit the main fileData
      }
      i += 1;
    }
  }

  selectedData(path: string[])
  {
    //when the user clicks on something, we need to get the new data
    //first check if it is a file, otherwise it is a folder and we just navigate inside it
    if (path[path.length - 1].indexOf('.') > -1)
    {
      //check the file extension
      const fileExtension = path[path.length - 1].split(".")[1]
      //now use the openWithDirectory to check what app to open it with
      const appType = this.dataservice.openWithDirectory[fileExtension];
      //and finally add it to the global apps array, with the file path in the app data
      this.dataservice.apps.push({name: appType, windowId: this.dataservice.generateID(), data: JSON.stringify({"filePath" : path}) })
    }
    else
    {
      this.currentPath = path;
      this.pathLevel += 1;
      this.getCurrentData();
    }
  }
  goBack()
  {
    //go back one level
    this.currentPath.pop();
    this.pathLevel -= 1;
    this.getCurrentData();
  }
  createNewFolder()
  {
    const folderName = prompt("Give a name for the new folder", "New Folder")
    if (folderName == null)
    { return }
    //now just need to add a new path in dataservice.filePaths
    var newPath = JSON.parse(JSON.stringify(this.currentPath));
    newPath.push(folderName);

    this.dataservice.filePaths.push(newPath);
    this.dataservice.saveFiles();
    this.getCurrentData();
  }

  ngOnInit(): void {
    this.getCurrentData()
  }

}
