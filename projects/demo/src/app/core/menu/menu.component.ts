import { Component, OnInit } from '@angular/core';

export interface MenuItem {
  label: string;
  path: string;
  active?: boolean;
}

export type MenuSchema = MenuItem[];

@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  schema: MenuSchema = [
    {
      label: 'Basic popover',
      path: '/components/basic',
    },
    {
      label: 'Menu',
      path: '/components/menu',
    },
    {
      label: 'Select',
      path: '/components/select',
    },
    {
      label: 'Multiselect',
      path: '/components/multiselect',
    },
    {
      label: 'Tooltip',
      path: '/components/tooltip',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
