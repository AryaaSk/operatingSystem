import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  defaultHeight = 400;
  defaultWidth = 700;
  searchOpen = false;

  applications: {name: string, icon: string, data: string}[] = [{name: "file-explorer", icon: "/assets/AppIcons/file-explorer.png", data: JSON.stringify({})}, {name: "notepad", icon: "/assets/AppIcons/notepad.png", data: JSON.stringify({})}, {name: "calculator", icon: "/assets/AppIcons/calculator.png", data: JSON.stringify({"width": 300, "height" : 500})}];
  //array of all apps available, their icon and the data which is used to initilize the app

  apps: {name: string, windowId: string, data: string}[] = []; //array of all apps open at the moment
  openWithDirectory: {[k: string]: any} = {"txt" : "notepad"}; //tells the os how to open certain files, such as notepad for .txt files

  files: {[k: string]: any} = {"Root/Documents/data.txt": "This is a sample text file", "Root/Documents/file.txt" : "This is the file I just created"} //a dictionary of data files with their paths and their actual data (need to use string for paths as you cant have a path array in a dictionary)
  filePaths: string[][] = [["Root"], ["Root", "Desktop"], ["Root", "Documents"], ["Root", "Documents", "data.txt"], ["Root", "Documents", "file.txt"], ["Root", "Downloads"]];//an array of all files and folders and their paths to access them in file explorer
  //paths are in the format ['...', '...', '...'], instead of .../.../...

  convertArrayToPath(path: string[])
  {
    var filePathString = "";
    var i = 0;
    while (i != path.length)
    { filePathString = filePathString + path[i] + "/"; i += 1; }
    filePathString = filePathString.slice(0, -1); //remove last /
    return filePathString
  }

  saveFiles()
  {
    //everytime the files or filePaths variable is changed we need to save it to local storage

  }
  loadApps()
  {
    //can load apps on startup here
    //this.apps.push({name: "file-explorer", windowId: this.generateID(), data: JSON.stringify({})});
  }

  generateID()
  {
    var id = ""; //need to find a completely unique id
    while (true)
    {
      id = this.makeid(16);
      //loop through apps to check if anything else has the same id
      var contained = false; var i = 0;
      while (i != this.apps.length)
      {
        if (this.apps[i].windowId == id)
        { contained = true; }
        i += 1;
      }
      if (contained == false)
      { break; }
    }
    return id;
  }
  private makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) 
    {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  constructor() { }
}
