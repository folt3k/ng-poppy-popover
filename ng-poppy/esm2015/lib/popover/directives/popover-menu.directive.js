import { Directive, Injector, Input, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { POPOVER_CONFIG } from '../popover.token';
import { PopoverAppendOptions } from '../models/popover-append-options.model';
import { BasePopoverDirective } from './base-popover';
import * as i0 from "@angular/core";
import * as i1 from "../services/popover.service";
export class PopoverMenuDirective extends BasePopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        super(componentFactoryResolver, popoverService, hostElement, ngZone);
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.type = 'menu';
        this.closeOnClickItem = true;
    }
    ngAfterViewInit() {
        if (this.poppyMenu) {
            this.ngZone.runOutsideAngular(() => {
                if (this.trigger !== 'manual' && this.type === 'menu') {
                    this.listenEventsForClickTrigger();
                }
                if (this.type === 'context') {
                    this.listenEventsForContextTrigger();
                }
            });
        }
    }
    open() {
        if (this.canAppend()) {
            this.ngZone.run(() => {
                this.append();
            });
        }
    }
    // NOTE: It should be removed after upgrade to ng 9, because QueryList should emit changes
    // when elements is removed
    updateContentPosition() {
        if (this.popoverComponentRef) {
            this.popoverComponentRef.instance.componentStyles.update();
        }
    }
    getPopoverComponentInjector() {
        const providerValues = {
            bounds: this.getBounds(),
            type: this.type,
            triggerElement: this.hostElement,
            triggerDirective: this,
            closeOnClickOutside: this.closeOnClickOutside,
            closeOnClickItem: this.closeOnClickItem,
            menuRef: this.poppyMenu,
            innerClass: this.innerClass,
            position: this.position,
        };
        return Injector.create([
            {
                provide: POPOVER_CONFIG,
                useValue: providerValues,
            },
        ]);
    }
    canAppend() {
        return (!this.popoverComponentRef ||
            (this.popoverComponentRef && this.type === 'context') ||
            (this.popoverComponentRef && this.closeOnTriggerAgain));
    }
    listenEventsForClickTrigger() {
        fromEvent(this.hostElement.nativeElement, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.open();
        });
    }
    listenEventsForContextTrigger() {
        fromEvent(this.hostElement.nativeElement, 'contextmenu')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            event.preventDefault();
            this.contextMenuPosition = {
                top: event.clientY,
                left: event.clientX,
            };
            this.open();
        });
    }
    append() {
        const options = new PopoverAppendOptions({
            type: this.type,
        });
        this.appendToLayer(options);
    }
    getBounds() {
        if (this.type === 'context') {
            return { top: this.contextMenuPosition.top, left: this.contextMenuPosition.left };
        }
        else {
            return this.hostElement.nativeElement.getBoundingClientRect();
        }
    }
}
PopoverMenuDirective.ɵfac = function PopoverMenuDirective_Factory(t) { return new (t || PopoverMenuDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
PopoverMenuDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverMenuDirective, selectors: [["", "poppyMenu", ""]], inputs: { poppyMenu: "poppyMenu", type: "type", closeOnClickItem: "closeOnClickItem" }, exportAs: ["poppyMenu"], features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverMenuDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyMenu]',
                exportAs: 'poppyMenu',
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { poppyMenu: [{
            type: Input
        }], type: [{
            type: Input
        }], closeOnClickItem: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1tZW51LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9uZy1wb3BweS9zcmMvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9kaXJlY3RpdmVzL3BvcG92ZXItbWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFFVCxRQUFRLEVBQ1IsS0FBSyxHQUVOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQWlCLE1BQU0sa0JBQWtCLENBQUM7QUFHakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU90RCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsb0JBQW9CO0lBTzVELFlBQ3FCLHdCQUFrRCxFQUNsRCxjQUE4QixFQUNqQyxXQUF1QixFQUNwQixNQUFjO1FBRWpDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBTGxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFUMUIsU0FBSSxHQUFvQixNQUFNLENBQUM7UUFDL0IscUJBQWdCLEdBQVksSUFBSSxDQUFDO0lBVzFDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFF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Q2hCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLFNBQVM7UUFDZixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzNCLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25GO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDL0Q7SUFDSCxDQUFDOzt3RkE5R1Usb0JBQW9CO3lEQUFwQixvQkFBb0I7a0RBQXBCLG9CQUFvQjtjQUpoQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2FBQ3RCO3NKQUVVLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxnQkFBZ0I7a0JBQXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQT1BPVkVSX0NPTkZJRywgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4uL3BvcG92ZXIudG9rZW4nO1xuaW1wb3J0IHsgUG9wb3ZlckJvdW5kcywgUG9wb3ZlckNvbnRleHRNZW51UG9zaXRpb24sIFBvcG92ZXJNZW51VHlwZSB9IGZyb20gJy4uL3BvcG92ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBvcG92ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9wb3Zlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcG92ZXJBcHBlbmRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3BvcG92ZXItYXBwZW5kLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVBvcG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Jhc2UtcG9wb3Zlcic7XG5pbXBvcnQgeyBQb3BvdmVyTWVudUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcG9wb3Zlci1tZW51L3BvcG92ZXItbWVudS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcG9wcHlNZW51XScsXG4gIGV4cG9ydEFzOiAncG9wcHlNZW51Jyxcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3Zlck1lbnVEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlUG9wb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBwb3BweU1lbnU6IFBvcG92ZXJNZW51Q29tcG9uZW50O1xuICBASW5wdXQoKSB0eXBlOiBQb3BvdmVyTWVudVR5cGUgPSAnbWVudSc7XG4gIEBJbnB1dCgpIGNsb3NlT25DbGlja0l0ZW06IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHByaXZhdGUgY29udGV4dE1lbnVQb3NpdGlvbjogUG9wb3ZlckNvbnRleHRNZW51UG9zaXRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBwb3BvdmVyU2VydmljZTogUG9wb3ZlclNlcnZpY2UsXG4gICAgcHVibGljIHJlYWRvbmx5IGhvc3RFbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHBvcG92ZXJTZXJ2aWNlLCBob3N0RWxlbWVudCwgbmdab25lKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wb3BweU1lbnUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciAhPT0gJ21hbnVhbCcgJiYgdGhpcy50eXBlID09PSAnbWVudScpIHtcbiAgICAgICAgICB0aGlzLmxpc3RlbkV2ZW50c0ZvckNsaWNrVHJpZ2dlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NvbnRleHQnKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5FdmVudHNGb3JDb250ZXh0VHJpZ2dlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbkFwcGVuZCgpKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gTk9URTogSXQgc2hvdWxkIGJlIHJlbW92ZWQgYWZ0ZXIgdXBncmFkZSB0byBuZyA5LCBiZWNhdXNlIFF1ZXJ5TGlzdCBzaG91bGQgZW1pdCBjaGFuZ2VzXG4gIC8vIHdoZW4gZWxlbWVudHMgaXMgcmVtb3ZlZFxuICB1cGRhdGVDb250ZW50UG9zaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZikge1xuICAgICAgdGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmLmluc3RhbmNlLmNvbXBvbmVudFN0eWxlcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UG9wb3ZlckNvbXBvbmVudEluamVjdG9yKCk6IEluamVjdG9yIHtcbiAgICBjb25zdCBwcm92aWRlclZhbHVlczogUG9wb3ZlckNvbmZpZyA9IHtcbiAgICAgIGJvdW5kczogdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzLmhvc3RFbGVtZW50LFxuICAgICAgdHJpZ2dlckRpcmVjdGl2ZTogdGhpcyxcbiAgICAgIGNsb3NlT25DbGlja091dHNpZGU6IHRoaXMuY2xvc2VPbkNsaWNrT3V0c2lkZSxcbiAgICAgIGNsb3NlT25DbGlja0l0ZW06IHRoaXMuY2xvc2VPbkNsaWNrSXRlbSxcbiAgICAgIG1lbnVSZWY6IHRoaXMucG9wcHlNZW51LFxuICAgICAgaW5uZXJDbGFzczogdGhpcy5pbm5lckNsYXNzLFxuICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXG4gICAgfTtcblxuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoW1xuICAgICAge1xuICAgICAgICBwcm92aWRlOiBQT1BPVkVSX0NPTkZJRyxcbiAgICAgICAgdXNlVmFsdWU6IHByb3ZpZGVyVmFsdWVzLFxuICAgICAgfSxcbiAgICBdKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYW5BcHBlbmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYgfHxcbiAgICAgICh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYgJiYgdGhpcy50eXBlID09PSAnY29udGV4dCcpIHx8XG4gICAgICAodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmICYmIHRoaXMuY2xvc2VPblRyaWdnZXJBZ2FpbilcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5FdmVudHNGb3JDbGlja1RyaWdnZXIoKTogdm9pZCB7XG4gICAgZnJvbUV2ZW50KHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5FdmVudHNGb3JDb250ZXh0VHJpZ2dlcigpOiB2b2lkIHtcbiAgICBmcm9tRXZlbnQodGhpcy5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY29udGV4dG1lbnUnKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudVBvc2l0aW9uID0ge1xuICAgICAgICAgIHRvcDogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgICBsZWZ0OiBldmVudC5jbGllbnRYLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmQoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBQb3BvdmVyQXBwZW5kT3B0aW9ucyh7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgfSk7XG5cbiAgICB0aGlzLmFwcGVuZFRvTGF5ZXIob3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGdldEJvdW5kcygpOiBQb3BvdmVyQm91bmRzIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnY29udGV4dCcpIHtcbiAgICAgIHJldHVybiB7IHRvcDogdGhpcy5jb250ZXh0TWVudVBvc2l0aW9uLnRvcCwgbGVmdDogdGhpcy5jb250ZXh0TWVudVBvc2l0aW9uLmxlZnQgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==