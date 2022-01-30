How to add new app:
1. Create a new component in the folder src/app/apps (this is where you write all your code for your app), and add the below code in the [appName].component.ts:
    @Input() windowId: string = "";
    @Input() data: string = "";
   Add the below code (makes sure the window resizer is always visible) in [appName].component.html:
    <div class="windowContainer">
        <div class="windowContent">
        </div>
    </div>
    (Optional): If you are planning to use a header bar to hold buttons such as "File" or "New" then change <div class="windowContent"> to <div class="windowContent windowOptionsGrid">, and then just add in buttons without a <br> tag inbetween

2. Add the app icon in the src/assets/AppIcons folder
3. Add the app in the applications variable in dataserivce.ts, this should contain the app name, the app icon and the default data needed to start the app
(Optional): If you are adding your app to open a specific file format, then add the app in the openWithDirectory variable in dataservice.ts, with the app name and extension which it opens
4. In the window.component.html add:
    <app-[appName] *ngIf="appType=='[appName]'" windowId={{windowId}} data={{data}}></app-[appName]>, and replace [appName] with what your app component name
