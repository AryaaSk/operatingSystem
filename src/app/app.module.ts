import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './components/window/window.component';
import { NotepadComponent } from './apps/notepad/notepad.component';
import { CalculatorComponent } from './apps/calculator/calculator.component';
import { FileExplorerComponent } from './apps/file-explorer/file-explorer.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    NotepadComponent,
    CalculatorComponent,
    FileExplorerComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
