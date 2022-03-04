import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchOpen = false;

  defaultHeight = 400;
  defaultWidth = 700;

  //array of all apps available, their icon and the data which is used to initilize the app
  applications: {name: string, icon: string, data: string}[] = [
    {name: "file-explorer", icon: "/assets/AppIcons/file-explorer.png", data: JSON.stringify({})},
    {name: "notepad", icon: "/assets/AppIcons/notepad.png", data: JSON.stringify({})},
    {name: "calculator", icon: "/assets/AppIcons/calculator.png", data: JSON.stringify({"width": 300, "height" : 500, resize: "none"})},
    {name: "connect4", icon: "/assets/AppIcons/connect4.png", data: JSON.stringify({"width": 600, "height" : 715, resize: "none"})},
    {name: "taskManager", icon: "/assets/AppIcons/taskManager.png", data: JSON.stringify({})}
];
  openWithDirectory: {[k: string]: any} = {"txt" : "notepad"}; //tells the os how to open certain files, such as notepad for .txt files

  apps: {name: string, windowId: string, data: string}[] = []; //array of all apps open at the moment

  //both of these are now filled with default data in the loadStartupApps() function
  files: {[k: string]: any} = {} //a dictionary of data files with their paths and their actual data (need to use string for paths as you cant have a path array in a dictionary)
  filePaths: string[][] = [];//an array of all files and folders and their paths to access them in file explorer
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

  createFile(fileName: string, fileExtension: string, creationData: any) //used for applications that need to open files, such as notepad. When you first open you will not have a filePath
  {
    //fileName is the name of the file
    //fileExtension is the file's extension, e.g. txt
    //creationData is the data which the file is created with, e.g. a notepad file is created with data ""
    
    //first ask the user where they want to save the file
    let path = prompt("Please input a path to save the file", "Root/Documents");
    path = path + "/" + fileName + "." + fileExtension; //not displaying the fileName and fileExtension to the user incase they change it
    if (path == null)
    { return null; }

    const pathArray = path!.split("/")

    //need to check if the folder exists
    var pathArrayCopy = JSON.parse(JSON.stringify(pathArray));
    pathArrayCopy.pop(); //remove the actual file, and only look for the enclosing folder
    var contained = false;
    var i = 0;
    while (i != this.filePaths.length)
    {
      if (String(this.filePaths[i]) == String(pathArrayCopy)) //use String() since javascript is werid about comparing 2 lists
      { contained = true; } 
      i += 1; 
    }
    if (contained == false)
    { alert("Directory doesn't exist"); return null; } 

    //need to add the files to the files and filePaths variables
    const filePath = path!
    this.files[filePath] = creationData;
    this.filePaths.push(pathArray) //dataservice.filePaths still uses old paths structure in string[], so we need to use the pathArray
    this.saveFiles();

    return pathArray; //return in form of string[], to simulate as if it were being opened from file explorer
  }

  saveFiles()
  {
    //everytime the files or filePaths variable is changed we need to save it to local storage
    const filesJSON = JSON.stringify(this.files);
    const filePathsJSON = JSON.stringify(this.filePaths);

    localStorage.setItem("files", filesJSON);
    localStorage.setItem("filePaths", filePathsJSON);
  }
  loadStartupApps()
  {
    //can load apps on startup here
    //From Local Storage:
    const filesJSON = localStorage.getItem("files")
    const filePathsJSON = localStorage.getItem("filePaths")

    if (filesJSON == null || filePathsJSON == null)
    {
      //give the files and filePaths some default data, since it has never been saved before
      this.files = {"Root/Documents/data.txt": "This is a sample text file", "Root/Documents/file.txt" : "This is the file I just created"};
      this.filePaths= [["Root"], ["Root", "Desktop"], ["Root", "Documents"], ["Root", "Documents", "data.txt"], ["Root", "Documents", "file.txt"], ["Root", "Downloads"]];
      this.saveFiles();
    }
    else
    {
      this.files = JSON.parse(filesJSON);
      this.filePaths = JSON.parse(filePathsJSON);
    }

    //Default Apps
    //this.apps.push({name: "file-explorer", windowId: this.generateID(), data: JSON.stringify({})});
    this.apps.push({name: "taskManager", windowId: this.generateID(), data: JSON.stringify({})});
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
