How to add new app:
1. Create a new component in the folder src/app/apps (this is where you write all your code for your app), and add the below code in the [appName].component.ts
    @Input() windowId: string = "";
    @Input() data: string = "";
2. Add the app icon in the src/assets/AppIcons folder
3. Add the app in the applications variable in dataserivce.ts, this should contain the app name, the app icon and the default data needed to start the app
4. In the window.component.html add a <app-[appName] *ngIf="appType=='[appName]'" windowId={{windowId}} data={{data}}></app-[appName]>, and replace [appName] with what your app component name
(Optional): If you are adding your app to open a specific file format, then add the app in the openWithDirectory variable in dataservice.ts, with the app name and extension which it opens