import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';

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
      label: 'Nested menu',
      path: '/components/nested-menu',
    },
    {
      label: 'Context menu',
      path: '/components/context-menu',
    },
    {
      label: 'Tooltip',
      path: '/components/tooltip',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e: RouterEvent) => e.url)
      )
      .subscribe((path) => {
        this.updateActiveMenuItem(path);
      });
  }

  private updateActiveMenuItem(path: string): void {
    this.schema = this.schema.map((item) => ({ ...item, active: path === item.path }));
  }
}
