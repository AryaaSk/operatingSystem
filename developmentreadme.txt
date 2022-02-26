How to add new app:
1. Create a new component in the folder src/app/apps (this is where you write all your code for your app), and add the below code in the [appName].component.ts:
    @Input() windowId: string = "";
    @Input() data: string = "";
    
   Add the below code (makes sure the window resizer is always visible) in [appName].component.html:
    <div class="windowContainer">
        <div class="windowContent">
            <!-- Main HTML goes here -->
        </div>
    </div>

   (Optional): If you are planning to use a header bar to hold buttons such as "File" or "New" then use this structure instead:
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

2. Add the app icon in the src/assets/AppIcons folder
3. Add the app in the applications variable in dataserivce.ts, this should contain the app name, the app icon and the default data needed to start the app
(Optional): If you are adding your app to open a specific file format, then add the app in the openWithDirectory variable in dataservice.ts, with the app name and extension which it opens
4. In the window.component.html add:
    <app-[appName] *ngIf="appType=='[appName]'" windowId={{windowId}} data={{data}}></app-[appName]>, and replace [appName] with what your app component name


Data:
Data is passed in from the dataService applications variable, this is the data which the app takes to load (height and width will be loaded in the windowComponent), or if you are loading a file it contains the data of that file.
After creating a new app component (look above), you will be able to access the app's data by specifying it in the dataService applications variable, or when the user clicks a file from file explorer, and it gets the data from the files variable
If you are opening a file, then you will recieve the path to that file as a string[] e.g. ["Root", "Documents", "data.txt"], it is your job to convert that to a string e.g. "Root/Documents/data.txt". You can then use that string to access the file from the dataService files variable, get the data then use it in your app.
You should also specify a specific app to open a file extension with since otherwise the OS won't know what to open the file with.

File Paths:
The filePaths variable contains every file path to every folder/file in the system, in the format string[].
When you open a file into an application, you will be given the files data in the form of string[], you can access the current app's data by using:
    const dataParsed = JSON.parse(this.data);
    const filePath = dataParsed["filePath"]; //this will be in form of string[]
Then to convert it to a string use:
    const filePathString = this.dataservice.convertArrayToPath(filePath); //using the convertArrayToPath from dataService, will be in form of string, e.g. "Root/Documents/data.txt".
You can then use this filePathString to read and write data to the dataService files variable, it is just a dictionary, here is an example:
    this.text = this.dataservice.files[filePathString]; //reading the text from a .txt file
    this.dataservice.files[filePathString] = this.text; //saving the text into the file
