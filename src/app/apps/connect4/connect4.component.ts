import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-connect4',
  templateUrl: './connect4.component.html',
  styleUrls: ['./connect4.component.css']
})
export class Connect4Component implements OnInit {

  @Input() windowId: string = "";
  @Input() data: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
