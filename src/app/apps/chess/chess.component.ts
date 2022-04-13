import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {

  @Input() windowId: string = "";
  @Input() data: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  themeOrder = ["greenGrey", "original"];

  currentTheme = this.themeOrder[0]; //green and gray is default so you don't actually need this
  toggleTheme() {
    let themeIndex = this.themeOrder.indexOf(this.currentTheme) + 1;
    if (themeIndex == this.themeOrder.length) { themeIndex = 0; }
    this.currentTheme = this.themeOrder[themeIndex];
    this.reloadGameURL();
  }

  outlines2d = false;
  toggle2DOutlines() {
    if (this.outlines2d == true) { this.outlines2d = false; }
    else { this.outlines2d = true; }
    this.reloadGameURL();
  }

  reloadGameURL() {
    (<HTMLIFrameElement>document.getElementById("chessView")).src = `https://aryaask.github.io/3DChess/index.html?theme=${this.currentTheme}&&2doutlines=${this.outlines2d}`;
  }

}
