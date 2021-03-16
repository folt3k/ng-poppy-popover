import {
  Directive,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  Output,
  Input,
  TemplateRef,
  HostBinding,
  OnInit,
  OnChanges,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { PopoverMenuComponent } from '../components/popover-menu/popover-menu.component';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[poppy-menu-item]',
})
export class PopoverMenuItemDirective implements OnInit, AfterViewInit {
  @Input() submenu: PopoverMenuComponent | TemplateRef<any>;
  @Input() selected: boolean = false;
  @Input() hidden: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  @HostBinding('class.popover-menu-item--selected')
  get selectedClass(): boolean {
    return this.selected;
  }

  @HostBinding('class.popover-menu-item--hidden')
  get hiddenClass(): boolean {
    return this.hidden;
  }

  clicked$: Observable<MouseEvent>;
  hovered$: Observable<MouseEvent>;
  global$: Observable<MouseEvent>;

  constructor(public element: ElementRef) {}

  ngOnInit(): void {
    this.clicked$ = fromEvent<MouseEvent>(this.element.nativeElement, 'click').pipe(
      tap(() => {
        this.clicked.emit();
      })
    );
    this.hovered$ = fromEvent(this.element.nativeElement, 'mousemove');
    // this.global$ = fromEvent<MouseEvent>(document, 'click').pipe(tap(() => console.log('clicked window')));
  }

  ngAfterViewInit(): void {
    this.element.nativeElement.classList.add('popover-menu-item');
  }
}
