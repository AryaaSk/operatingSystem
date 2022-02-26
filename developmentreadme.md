# Operating System Developement readme
## Explaining how to add apps, maintain them and how the overall architecture works


# How to add new app:
1. Create a new component in the folder src/app/apps (this is where you write all your code for your app), and add the below code in the [appName].component.ts:
```
@Input() windowId: string = "";
@Input() data: string = "";
```

Add the below code (makes sure the window resizer is always visible) in [appName].component.html:
```
<div class="windowContainer">
    <div class="windowContent">
        <!-- Main HTML goes here -->
    </div>
</div>
```

(Optional): If you are planning to use a header bar to hold buttons such as "File" or "New" then use this structure instead:
```
<div class="windowContainer">
    <div class="windowContent windowOptionsGrid">
        <div>
            <!-- Header buttons go here (use <input type="button"> and don't put a <br> tag in between them) -->
        </div>
        <div>
            <!-- Main HTML goes here -->
        </div>
    </div>
</div>
```
2. Add the app icon in the src/assets/AppIcons folder
3. Add the app in the applications variable in dataserivce.ts, this should contain the app name, the app icon and the default data needed to start the app

+ If you are adding your app to open a specific file format, then add the app in the openWithDirectory variable in dataservice.ts, with the app name and extension which it opens (read the Data and File Paths sections to understand better how to read and write data).
4. In the window.component.html add:
```
<app-[appName] *ngIf="appType=='[appName]'" windowId={{windowId}} data={{data}}></app-[appName]>, and replace [appName] with what your app component name
```

## Data:
- Data is passed in from the dataService applications variable, this is the data which the app takes to load/initialize (height and width will be loaded in the windowComponent), or if you are loading a file it contains the data of that file.
- All of the data for the OS is stored in the dataService (other things are just for UI and apps), I stil haven't implemented the saveData and loadData functions which will enable persistant state. The storage variables are:

+ defaultHeight and defaultWidth: Just the default screen parameters for a window, if you pass in a width or height property in the data then that will override this.
+ applications: A list of all the applications installed on the OS.
+ openWithDirectory: A dictionary of file extensions and the respective application to open them with.
+ apps: A list of all the applications which are currently open, can have multiple instances of the same app.
+ files: A dictionary with all the files/documents stored on device (not including folders).
+ filePaths: A list of all the paths to every file/folder on the OS (to learn more read the File Paths section).

## File Paths:
- The filePaths variable contains every file path to every folder/file in the system, in the format string[].
- This is just used in the File Explorer to look through and open files.

1. When you open a file into an application (from file explorer), you will be given the files data in the form of string[], you can access the current app's data by using:
```
const dataParsed = JSON.parse(this.data); //this.data is from the @Input() data: string = ""; you should have created when creating your app
const filePath = dataParsed["filePath"]; //this will be in form of string[];
```
2. Then to convert it to a string use:
```
const filePathString = this.dataservice.convertArrayToPath(filePath); //using the convertArrayToPath from dataService, will be in form of string, e.g. "Root/Documents/data.txt".
```
3. You can then use this filePathString to read and write data to the dataService files variable, it is just a dictionary, here is an example:
```
this.text = this.dataservice.files[filePathString]; //reading the text from a .txt file
this.dataservice.files[filePathString] = this.text; //saving the text into the file
```