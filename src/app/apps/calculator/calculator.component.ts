import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }
  
  @Input() windowId: string = "";
  @Input() data: string = "";

  currentNumber: string = "0"
  calcList: string[] = [];

  addNum(number: number)
  {
    if (this.currentNumber == "0")
    { this.currentNumber = String(number) }
    else
    { this.currentNumber = this.currentNumber + String(number); }
  }
  addOperator(operator: string)
  {
    this.calcList.push(this.currentNumber);
    this.calcList.push(operator);
    this.currentNumber = "0";
  }
  equal()
  {
    this.calcList.push(this.currentNumber);

    //loop through and merge the first 3 items each time
    while (this.calcList.length != 1)
    {
      const num1 = Number(this.calcList[0])
      const operator = this.calcList[1]
      const num2 = Number(this.calcList[2])

      var answer = 0;
      if (operator == "+")
      { answer = num1 + num2; }
      if (operator == "-")
      { answer = num1 - num2; }
      if (operator == "*")
      { answer = num1 * num2; }
      if (operator == "/")
      { answer = num1 / num2; }
      
      this.calcList.splice(0, 2)
      this.calcList[0] = String(answer);
    }

    this.currentNumber = this.calcList[0];
    this.calcList = [];
  }
  C()
  {
    //stands for Clear
    this.currentNumber = "0";
  }
  AC()
  {
    //just the reset button, stands for All Clear
    this.calcList = [];
    this.currentNumber = "0";
  }

  ngOnInit(): void {
  }

}
