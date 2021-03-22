import { Component } from '@angular/core';

@Component({
  selector: 'select-basic-usage-example',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.scss'],
})
export class BasicUsageComponent {
  options = [
    { value: 'Warsaw', label: 'Warsaw' },
    { value: 'London', label: 'London' },
  ];
  selectedOption = ['Warsaw'];

  constructor() {}
}
