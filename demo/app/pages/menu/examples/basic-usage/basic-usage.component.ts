import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-basic-usage-example',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.scss'],
})
export class BasicUsageComponent implements OnInit {
  options = ['Warsaw', 'London', 'Paris'];
  selectedOption: string;

  constructor() {}

  ngOnInit(): void {}

  onOptionClick(option: string): void {
    this.selectedOption = option;
  }
}
