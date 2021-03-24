import { ElementRef } from '@angular/core';
import { PopoverConfig } from '../popover.token';
import { PopoverPosition, PopoverType } from '../popover.interface';
import { PopoverContentComponent } from '../components/popover-content/popover-content.component';

const SPACE_FROM_BOTTOM = 20;
const SPACE_FROM_TOP = 10;
const HORIZONTAL_SPACE = 10;
const POSITION_MEASURE_UNIT = 'px';

export class PopoverStyles {
  private popover: PopoverContentComponent;
  private hostElement: ElementRef<any>;
  private config: PopoverConfig;
  private type: PopoverType;
  private position: PopoverPosition;
  private initHostElementWidth: number = 0;

  constructor(popover: PopoverContentComponent) {
    this.popover = popover;
    this.hostElement = popover.element;
    this.config = popover.popoverConfig;
    this.type = this.config.type;
    this.position = this.config.position;
  }

  init(): void {
    const hostBounds = this.config.bounds;

    this.hostElement.nativeElement.style.zIndex = 10000;

    this.setPositionStyle('left', 0);
    this.setPositionStyle('top', +hostBounds.top + hostBounds.height + SPACE_FROM_TOP);

    if (!this.isContextType && !this.isSubmenuType) {
      this.hostElement.nativeElement.style.minWidth = hostBounds.width + 'px';
    }

    if (this.isContextType) {
      this.setPositionStyle('top', +hostBounds.top);
      this.hostElement.nativeElement.style.minWidth = 0;
    }

    if (this.isSubmenuType) {
      const triggerItem = this.config.submenuTriggeredItem.element.nativeElement;
      const triggerBounds: ClientRect = triggerItem.getBoundingClientRect();

      this.hostElement.nativeElement.style.minWidth = 0;
      this.setPositionStyle('top', triggerBounds.top);
    }

    if (this.canAssignPadding) {
      const padding = this.isTooltip ? '8px 12px' : '15px 25px';
      this.popover.popoverWrapperEl.nativeElement.style.padding = padding;
    }

    if (this.config.stickyToTrigger) {
      this.popover.popoverWrapperEl.nativeElement.style.maxWidth = 'unset';
    }

    this.hostElement.nativeElement.style.visibility = 'hidden';

    setTimeout(() => {
      this.initHostElementWidth = this.hostElement.nativeElement.offsetWidth + 1;
      this.hostElement.nativeElement.style.minWidth = this.initHostElementWidth + 'px';
    });
  }

  update(): void {
    this.setLeftPosition();
    this.setTopPosition();
    this.setWidth();

    this.hostElement.nativeElement.style.visibility = 'visible';
  }

  private setTopPosition(): void {
    const windowHeight = window.innerHeight;
    const elementHeight = this.hostElement.nativeElement.getBoundingClientRect().height;
    const triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();

    if (this.config.triggerDirective) {
      const hostTopPosition =
        this.config.type === 'context' ? this.config.bounds.top : triggerBounds.top + triggerBounds.height;
      const isBelowWindowCenterHeight = elementHeight >= windowHeight - hostTopPosition - SPACE_FROM_BOTTOM;

      if (isBelowWindowCenterHeight) {
        if (this.config.type === 'context') {
          this.setPositionStyle('top', +this.config.bounds.top - elementHeight + SPACE_FROM_TOP);
        } else {
          const newPos = triggerBounds.top - elementHeight - SPACE_FROM_TOP;
          if (newPos > 0) {
            switch (this.position) {
              case 'bottom':
                this.setPositionStyle('top', triggerBounds.top - elementHeight - SPACE_FROM_TOP);
                break;
              case 'top':
                this.setPositionStyle('top', triggerBounds.top - elementHeight - SPACE_FROM_TOP);
            }
          } else {
            this.hostElement.nativeElement.style.height =
              windowHeight - hostTopPosition - SPACE_FROM_BOTTOM + POSITION_MEASURE_UNIT;
          }
        }
      } else {
        if (this.config.type === 'context') {
          this.setPositionStyle('top', +this.config.bounds.top + SPACE_FROM_TOP);
        } else {
          switch (this.position) {
            case 'bottom':
              this.setPositionStyle('top', triggerBounds.top + triggerBounds.height + SPACE_FROM_TOP);
              break;
            case 'top':
              this.setPositionStyle('top', triggerBounds.top - elementHeight - SPACE_FROM_TOP);
              break;
            case 'left':
            case 'right':
              this.setPositionStyle(
                'top',
                triggerBounds.top - (elementHeight / 2 - triggerBounds.height / 2)
              );
              break;
          }
        }
      }
    }

    if (!this.config.triggerDirective) {
      const hostBounds = this.config.submenuTriggeredItem.element.nativeElement.getBoundingClientRect();
      const hostPosition = hostBounds.top;

      if (elementHeight >= windowHeight - hostPosition - SPACE_FROM_BOTTOM) {
        const diff = elementHeight - (windowHeight - hostPosition);
        this.setPositionStyle('top', hostPosition - diff - SPACE_FROM_BOTTOM);
      } else {
        this.setPositionStyle('top', hostPosition);
      }
    }
  }

  private setLeftPosition(): void {
    const windowWidth = window.innerWidth;
    const elementWidth = this.hostElement.nativeElement.getBoundingClientRect().width;
    const triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();

    if (this.isContextType) {
      if (+this.config.bounds.left >= windowWidth / 2) {
        this.setPositionStyle('left', +this.config.bounds.left - elementWidth);
      } else {
        this.setPositionStyle('left', this.defaultLeftPosition);
      }
    } else if (this.config.triggerDirective) {
      switch (this.position) {
        case 'bottom':
        case 'top':
          this.setPositionStyle('left', triggerBounds.left);
          break;
        case 'left':
          this.setPositionStyle('left', triggerBounds.left - elementWidth - HORIZONTAL_SPACE);
          break;
        case 'right':
          this.setPositionStyle('left', triggerBounds.left + triggerBounds.width + HORIZONTAL_SPACE);
          break;
      }

      const hostRecBounds = this.hostElement.nativeElement.getBoundingClientRect();

      if (hostRecBounds.right > windowWidth - 20) {
        this.setPositionStyle('left', hostRecBounds.left - (hostRecBounds.right - windowWidth + 20));
      }

      if (hostRecBounds.left < 0) {
        this.setPositionStyle('left', 15);
      }
    } else {
      const hostBounds = this.config.submenuTriggeredItem.element.nativeElement.getBoundingClientRect();

      if (elementWidth > windowWidth - hostBounds.right) {
        this.setPositionStyle('left', hostBounds.left - this.initHostElementWidth);
      } else {
        this.setPositionStyle('left', hostBounds.right);
      }
    }
  }

  private setWidth(): void {
    const triggerBounds: ClientRect = this.config.triggerElement.nativeElement.getBoundingClientRect();

    if (!this.isContextType && !this.isSubmenuType) {
      const windowWidth = window.innerWidth;
      const hostElBounds = this.hostElement.nativeElement.getBoundingClientRect();

      this.hostElement.nativeElement.style.minWidth = this.initHostElementWidth + POSITION_MEASURE_UNIT;

      if (this.config.stickyToTrigger) {
        this.hostElement.nativeElement.style.minWidth = triggerBounds.width + POSITION_MEASURE_UNIT;
        this.setPositionStyle('left', triggerBounds.left);
      } else if (!this.isMenuType) {
        if (hostElBounds.width > windowWidth || this.initHostElementWidth > windowWidth - 30) {
          this.hostElement.nativeElement.style.width = windowWidth - 30 + POSITION_MEASURE_UNIT;
          this.hostElement.nativeElement.style.minWidth = windowWidth - 30 + POSITION_MEASURE_UNIT;
          this.setPositionStyle('left', 15);
        }
      }
    }
  }

  private setPositionStyle(property: 'top' | 'left', value: number): void {
    this.hostElement.nativeElement.style[property] = value + POSITION_MEASURE_UNIT;
  }

  private get defaultLeftPosition(): number {
    return this.config.bounds.left;
  }

  private get canAssignPadding(): boolean {
    return (
      (!this.isContextType && !this.isMenuType && !this.isSubmenuType) ||
      (this.isSubmenuType && !!this.config.content)
    );
  }

  private get isContextType(): boolean {
    return this.type === 'context';
  }

  private get isMenuType(): boolean {
    return this.type === 'menu';
  }

  private get isSubmenuType(): boolean {
    return this.type === 'submenu';
  }

  private get isTooltip(): boolean {
    return this.type === 'tooltip';
  }
}
