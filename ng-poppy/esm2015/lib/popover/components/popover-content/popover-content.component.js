import { Component, Inject, Injector, ViewChild, ViewEncapsulation, TemplateRef, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, skipUntil, takeUntil } from 'rxjs/operators';
import { POPOVER_CONFIG } from '../../popover.token';
import { PopoverAppendOptions } from '../../models/popover-append-options.model';
import { fadeInAnimation } from '../../popover.animations';
import { PopoverStyles } from '../../models/popover-styles.model';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/popover.service";
import * as i2 from "../../services/events.service";
import * as i3 from "@angular/common";
const _c0 = ["popoverWrapperEl"];
function PopoverContentComponent_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function PopoverContentComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, PopoverContentComponent_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 4);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r1.template);
} }
function PopoverContentComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.popoverConfig.content, " ");
} }
export class PopoverContentComponent {
    constructor(element, ngZone, componentFactoryResolver, popoverService, popoverEventsService, cdr, popoverConfig) {
        this.element = element;
        this.ngZone = ngZone;
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.popoverEventsService = popoverEventsService;
        this.cdr = cdr;
        this.popoverConfig = popoverConfig;
        this.animationState = 'close';
        this.animationEnd$ = new Subject();
        this.menuItemsChanged = new Subject();
        this.destroy$ = new Subject();
    }
    ngAfterViewInit() {
        var _a;
        this.applyStyles();
        if (this.popoverConfig.submenuTriggeredItem) {
            this.popoverConfig.submenuTriggeredItem.element.nativeElement.classList.add('popover-menu-item--focused');
        }
        if (this.popoverConfig.innerClass) {
            this.popoverWrapperEl.nativeElement.classList.add(this.popoverConfig.innerClass);
        }
        this.listenForMouseEventOnHost();
        if (this.canListenForClickOutside()) {
            this.ngZone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.listenForClickOutside();
                });
            });
        }
        if ((_a = this.popoverConfig.menuRef) === null || _a === void 0 ? void 0 : _a.menuItems) {
            this.listenForMenuItemTriggers();
            // Subscribe to click outside event again, when menu items changed - it's workaround to refresh host element content;
            this.popoverConfig.menuRef.menuItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.menuItemsChanged.next();
                this.listenForMenuItemTriggers();
                this.popoverEventsService.unregister('click-outside', this.popoverService.getActive(this.componentRef));
                setTimeout(() => {
                    this.listenForClickOutside();
                    this.componentStyles.update();
                }, 0);
            });
        }
    }
    ngOnDestroy() {
        if (this.popoverConfig.submenuTriggeredItem) {
            this.popoverConfig.submenuTriggeredItem.element.nativeElement.classList.remove('popover-menu-item--focused');
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    get template() {
        var _a;
        return ((this.popoverConfig.content instanceof TemplateRef &&
            this.popoverConfig.content) || ((_a = this.popoverConfig.menuRef) === null || _a === void 0 ? void 0 : _a.templateRef));
    }
    animationEnd(event) {
        if (event.toState === 'open') {
            this.animationEnd$.next();
        }
    }
    applyStyles() {
        this.componentStyles = new PopoverStyles(this);
        this.componentStyles.init();
        setTimeout(() => {
            this.componentStyles.update();
            this.animationState = 'open';
            this.detectChanges();
        });
    }
    onClickMenuItem(item) {
        const hasItemNestedSubpopovers = !!item.submenu;
        if (!hasItemNestedSubpopovers) {
            if (this.popoverConfig.closeOnClickItem) {
                this.close();
            }
        }
    }
    onHoverMenuItem(item) {
        const canRemoveNestedSubmenus = !this.popoverService.activePopovers.find((popover) => popover.popoverRef.instance.popoverConfig.submenuTriggeredItem === item);
        const hasItemNestedSubpopovers = !!item.submenu;
        if (canRemoveNestedSubmenus) {
            this.popoverService.removeAllNestedPopovers(this.componentRef);
            this.detectChanges();
        }
        const isSubmenuExists = this.popoverService.isPopoverSubmenuExits(this.componentRef, this.parentPopoverRef);
        if (!isSubmenuExists && hasItemNestedSubpopovers && canRemoveNestedSubmenus) {
            this.createSubpopover(item);
        }
    }
    listenForClickOutside() {
        const activePopover = this.popoverService.getActive(this.componentRef);
        this.popoverEventsService.register('click-outside', activePopover, (event) => {
            const clickedElement = event.target;
            let clickedOutside = clickedElement !== this.element.nativeElement &&
                !this.element.nativeElement.contains(clickedElement) &&
                clickedElement !== this.popoverConfig.triggerElement.nativeElement &&
                !this.popoverConfig.triggerElement.nativeElement.contains(clickedElement);
            if (this.popoverConfig.type === 'context' &&
                (clickedElement === this.popoverConfig.triggerElement.nativeElement ||
                    this.popoverConfig.triggerElement.nativeElement.contains(clickedElement))) {
                clickedOutside = true;
            }
            if (clickedOutside) {
                this.close();
            }
        });
    }
    listenForMouseEventOnHost() {
        fromEvent(this.element.nativeElement, 'mouseenter')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            const enteredPopover = this.popoverService.getActive(this.componentRef);
            if (enteredPopover === null || enteredPopover === void 0 ? void 0 : enteredPopover.deepLevel) {
                this.popoverService.activePopovers.forEach((popover, index) => {
                    if (index <= enteredPopover.deepLevel) {
                        this.popoverEventsService.unsubscribe('click-outside', popover);
                    }
                    else {
                        this.popoverEventsService.subscribe('click-outside', popover);
                    }
                });
            }
        });
        fromEvent(this.element.nativeElement, 'mouseleave')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.popoverService.activePopovers.forEach((popover) => {
                this.popoverEventsService.subscribe('click-outside', popover);
            });
        });
    }
    listenForMenuItemTriggers() {
        this.popoverConfig.menuRef.menuItems.forEach((item) => {
            item.clicked$.pipe(takeUntil(this.destroy$), takeUntil(this.menuItemsChanged)).subscribe(() => {
                this.onClickMenuItem(item);
            });
            item.hovered$
                .pipe(takeUntil(this.destroy$), takeUntil(this.menuItemsChanged), debounceTime(0), skipUntil(this.animationEnd$))
                .subscribe(() => {
                this.onHoverMenuItem(item);
            });
        });
    }
    close() {
        if (this.isMenu()) {
            this.popoverService.subscribeToClickOutsideEventForParentPopover(this.componentRef);
            this.popoverService.removeMenu(this.parentPopoverRef);
        }
        else {
            this.popoverService.remove(this.componentRef);
        }
    }
    createSubpopover(item) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(PopoverContentComponent);
        const bounds = item.element.nativeElement.getBoundingClientRect();
        const type = 'submenu';
        const options = new PopoverAppendOptions({ type });
        const providedValues = {
            bounds,
            type,
            submenuTriggeredItem: item,
            triggerElement: this.popoverConfig.triggerElement,
            closeOnClickItem: this.popoverConfig.closeOnClickItem,
        };
        if ((item === null || item === void 0 ? void 0 : item.submenu) instanceof PopoverMenuComponent) {
            providedValues.menuRef = item.submenu;
        }
        if ((item === null || item === void 0 ? void 0 : item.submenu) instanceof TemplateRef) {
            providedValues.content = item.submenu;
        }
        const injector = Injector.create([
            {
                provide: POPOVER_CONFIG,
                useValue: providedValues,
            },
        ]);
        this.subMenuComponentRef = this.popoverService.append(injector, null, options, this.parentPopoverRef);
        this.subMenuComponentRef.instance.componentRef = this.subMenuComponentRef;
        this.subMenuComponentRef.instance.parentPopoverRef = this.parentPopoverRef;
        this.subMenuComponentRef.hostView.detectChanges();
    }
    isMenu() {
        return (this.popoverConfig.type === 'menu' ||
            this.popoverConfig.type === 'context' ||
            this.popoverConfig.type === 'submenu');
    }
    canListenForClickOutside() {
        return (this.popoverConfig.closeOnClickOutside && (this.popoverConfig.trigger !== 'hover' || this.isMenu()));
    }
    detectChanges() {
        if (this.cdr && !this.cdr.destroyed) {
            this.cdr.detectChanges();
        }
    }
}
PopoverContentComponent.ɵfac = function PopoverContentComponent_Factory(t) { return new (t || PopoverContentComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PopoverService), i0.ɵɵdirectiveInject(i2.PopoverEventsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(POPOVER_CONFIG)); };
PopoverContentComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PopoverContentComponent, selectors: [["poppy-content"]], viewQuery: function PopoverContentComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.popoverWrapperEl = _t.first);
    } }, decls: 5, vars: 3, consts: [[1, "popover-content"], ["popoverWrapperEl", ""], [4, "ngIf", "ngIfElse"], ["textContent", ""], [4, "ngTemplateOutlet"]], template: function PopoverContentComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵlistener("@fadeIn.done", function PopoverContentComponent_Template_div_animation_fadeIn_done_0_listener($event) { return ctx.animationEnd($event); });
        i0.ɵɵtemplate(2, PopoverContentComponent_ng_container_2_Template, 2, 1, "ng-container", 2);
        i0.ɵɵtemplate(3, PopoverContentComponent_ng_template_3_Template, 1, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(4);
        i0.ɵɵproperty("@fadeIn", ctx.animationState);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.template)("ngIfElse", _r2);
    } }, directives: [i3.NgIf, i3.NgTemplateOutlet], styles: ["poppy-content{position:absolute;visibility:visible}.popover-content{background-color:#fff;border-radius:2px;box-shadow:0 3.2px 7.2px 0 rgba(0,0,0,.133),0 .6px 1.8px 0 rgba(0,0,0,.11);box-sizing:border-box;max-height:400px;max-width:600px;overflow:auto}.popover-menu-list{margin:0;padding:0}.popover-menu-item{align-items:center;background-color:transparent;border:0;box-sizing:border-box;color:#323130;cursor:pointer;display:flex;justify-content:space-between;list-style:none;outline:0;padding:9px 12px;position:relative;text-align:left;width:100%}.popover-menu-item:disabled{opacity:.5}.popover-menu-item--focused,.popover-menu-item--selected,.popover-menu-item:hover{background-color:#edebe9}.popover-menu-item--hidden{display:none}"], encapsulation: 2, data: { animation: [fadeInAnimation] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverContentComponent, [{
        type: Component,
        args: [{
                selector: 'poppy-content',
                templateUrl: './popover-content.component.html',
                styleUrls: ['./popover-content.component.scss'],
                animations: [fadeInAnimation],
                encapsulation: ViewEncapsulation.None,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ComponentFactoryResolver }, { type: i1.PopoverService }, { type: i2.PopoverEventsService }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [POPOVER_CONFIG]
            }] }]; }, { popoverWrapperEl: [{
            type: ViewChild,
            args: ['popoverWrapperEl']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9uZy1wb3BweS9zcmMvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9jb21wb25lbnRzL3BvcG92ZXItY29udGVudC9wb3BvdmVyLWNvbnRlbnQuY29tcG9uZW50LnRzIiwibGliL3BvcG92ZXIvY29tcG9uZW50cy9wb3BvdmVyLWNvbnRlbnQvcG9wb3Zlci1jb250ZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBSVQsTUFBTSxFQUNOLFFBQVEsRUFHUixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRSxPQUFPLEVBQUUsY0FBYyxFQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBR3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7Ozs7SUNyQjFFLHdCQUEwRDs7O0lBRDVELDZCQUNFO0lBQUEseUdBQTJDO0lBQzdDLDBCQUFlOzs7SUFEQyxlQUE0QjtJQUE1QixrREFBNEI7OztJQUkxQyxZQUNGOzs7SUFERSw2REFDRjs7QUR5QkYsTUFBTSxPQUFPLHVCQUF1QjtJQVlsQyxZQUNrQixPQUFtQixFQUNsQixNQUFjLEVBQ2Qsd0JBQWtELEVB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UUFFckMsMEZBQ0U7UUFHRix5SEFDRTtRQUVKLGlCQUFNOzs7UUFWSiw0Q0FBMEI7UUFHWixlQUFrQztRQUFsQyxtQ0FBa0MsaUJBQUE7czBCRDRCcEMsQ0FBQyxlQUFlLENBQUM7a0RBR2xCLHVCQUF1QjtjQVBuQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFdBQVcsRUFBRSxrQ0FBa0M7Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2dCQUMvQyxVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzdCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOztzQkFvQkksTUFBTTt1QkFBQyxjQUFjO3dCQWxCTyxnQkFBZ0I7a0JBQTlDLFNBQVM7bUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHNraXBVbnRpbCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQT1BPVkVSX0NPTkZJRywgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4uLy4uL3BvcG92ZXIudG9rZW4nO1xuaW1wb3J0IHsgUG9wb3ZlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wb3BvdmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wb3ZlclR5cGUgfSBmcm9tICcuLi8uLi9wb3BvdmVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQb3BvdmVyQXBwZW5kT3B0aW9ucyB9IGZyb20gJy4uLy4uL21vZGVscy9wb3BvdmVyLWFwcGVuZC1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IGZhZGVJbkFuaW1hdGlvbiB9IGZyb20gJy4uLy4uL3BvcG92ZXIuYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBQb3BvdmVyU3R5bGVzIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvcG92ZXItc3R5bGVzLm1vZGVsJztcbmltcG9ydCB7IFBvcG92ZXJFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9wb3BvdmVyLW1lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9wb3Zlck1lbnVDb21wb25lbnQgfSBmcm9tICcuLi9wb3BvdmVyLW1lbnUvcG9wb3Zlci1tZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BvcHB5LWNvbnRlbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci1jb250ZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcG9wb3Zlci1jb250ZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtmYWRlSW5BbmltYXRpb25dLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3BvcG92ZXJXcmFwcGVyRWwnKSBwb3BvdmVyV3JhcHBlckVsOiBFbGVtZW50UmVmO1xuXG4gIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50PjtcbiAgcGFyZW50UG9wb3ZlclJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50PjtcbiAgYW5pbWF0aW9uU3RhdGU6ICdvcGVuJyB8ICdjbG9zZScgPSAnY2xvc2UnO1xuICBjb21wb25lbnRTdHlsZXM6IFBvcG92ZXJTdHlsZXM7XG4gIHByaXZhdGUgc3ViTWVudUNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBhbmltYXRpb25FbmQkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBtZW51SXRlbXNDaGFuZ2VkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcG9wb3ZlclNlcnZpY2U6IFBvcG92ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcG9wb3ZlckV2ZW50c1NlcnZpY2U6IFBvcG92ZXJFdmVudHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KFBPUE9WRVJfQ09ORklHKSBwdWJsaWMgcmVhZG9ubHkgcG9wb3ZlckNvbmZpZzogUG9wb3ZlckNvbmZpZ1xuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcblxuICAgIGlmICh0aGlzLnBvcG92ZXJDb25maWcuc3VibWVudVRyaWdnZXJlZEl0ZW0pIHtcbiAgICAgIHRoaXMucG9wb3ZlckNvbmZpZy5zdWJtZW51VHJpZ2dlcmVkSXRlbS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3BvcG92ZXItbWVudS1pdGVtLS1mb2N1c2VkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3BvdmVyQ29uZmlnLmlubmVyQ2xhc3MpIHtcbiAgICAgIHRoaXMucG9wb3ZlcldyYXBwZXJFbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5wb3BvdmVyQ29uZmlnLmlubmVyQ2xhc3MpO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuRm9yTW91c2VFdmVudE9uSG9zdCgpO1xuXG4gICAgaWYgKHRoaXMuY2FuTGlzdGVuRm9yQ2xpY2tPdXRzaWRlKCkpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5Gb3JDbGlja091dHNpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3BvdmVyQ29uZmlnLm1lbnVSZWY/Lm1lbnVJdGVtcykge1xuICAgICAgdGhpcy5saXN0ZW5Gb3JNZW51SXRlbVRyaWdnZXJzKCk7XG5cbiAgICAgIC8vIFN1YnNjcmliZSB0byBjbGljayBvdXRzaWRlIGV2ZW50IGFnYWluLCB3aGVuIG1lbnUgaXRlbXMgY2hhbmdlZCAtIGl0J3Mgd29ya2Fyb3VuZCB0byByZWZyZXNoIGhvc3QgZWxlbWVudCBjb250ZW50O1xuICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLm1lbnVSZWYubWVudUl0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubWVudUl0ZW1zQ2hhbmdlZC5uZXh0KCk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Gb3JNZW51SXRlbVRyaWdnZXJzKCk7XG4gICAgICAgIHRoaXMucG9wb3ZlckV2ZW50c1NlcnZpY2UudW5yZWdpc3RlcihcbiAgICAgICAgICAnY2xpY2stb3V0c2lkZScsXG4gICAgICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5nZXRBY3RpdmUodGhpcy5jb21wb25lbnRSZWYpXG4gICAgICAgICk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubGlzdGVuRm9yQ2xpY2tPdXRzaWRlKCk7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnRTdHlsZXMudXBkYXRlKCk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wb3ZlckNvbmZpZy5zdWJtZW51VHJpZ2dlcmVkSXRlbSkge1xuICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLnN1Ym1lbnVUcmlnZ2VyZWRJdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAncG9wb3Zlci1tZW51LWl0ZW0tLWZvY3VzZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMucG9wb3ZlckNvbmZpZy5jb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYgJiZcbiAgICAgICAgKHRoaXMucG9wb3ZlckNvbmZpZy5jb250ZW50IGFzIFRlbXBsYXRlUmVmPGFueT4pKSB8fFxuICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLm1lbnVSZWY/LnRlbXBsYXRlUmVmXG4gICAgKTtcbiAgfVxuXG4gIGFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbkVuZCQubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wb25lbnRTdHlsZXMgPSBuZXcgUG9wb3ZlclN0eWxlcyh0aGlzKTtcbiAgICB0aGlzLmNvbXBvbmVudFN0eWxlcy5pbml0KCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY29tcG9uZW50U3R5bGVzLnVwZGF0ZSgpO1xuICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdvcGVuJztcbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNsaWNrTWVudUl0ZW0oaXRlbTogUG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgaGFzSXRlbU5lc3RlZFN1YnBvcG92ZXJzID0gISFpdGVtLnN1Ym1lbnU7XG5cbiAgICBpZiAoIWhhc0l0ZW1OZXN0ZWRTdWJwb3BvdmVycykge1xuICAgICAgaWYgKHRoaXMucG9wb3ZlckNvbmZpZy5jbG9zZU9uQ2xpY2tJdGVtKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uSG92ZXJNZW51SXRlbShpdGVtOiBQb3BvdmVyTWVudUl0ZW1EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBjYW5SZW1vdmVOZXN0ZWRTdWJtZW51cyA9ICF0aGlzLnBvcG92ZXJTZXJ2aWNlLmFjdGl2ZVBvcG92ZXJzLmZpbmQoXG4gICAgICAocG9wb3ZlcikgPT4gcG9wb3Zlci5wb3BvdmVyUmVmLmluc3RhbmNlLnBvcG92ZXJDb25maWcuc3VibWVudVRyaWdnZXJlZEl0ZW0gPT09IGl0ZW1cbiAgICApO1xuICAgIGNvbnN0IGhhc0l0ZW1OZXN0ZWRTdWJwb3BvdmVycyA9ICEhaXRlbS5zdWJtZW51O1xuXG4gICAgaWYgKGNhblJlbW92ZU5lc3RlZFN1Ym1lbnVzKSB7XG4gICAgICB0aGlzLnBvcG92ZXJTZXJ2aWNlLnJlbW92ZUFsbE5lc3RlZFBvcG92ZXJzKHRoaXMuY29tcG9uZW50UmVmKTtcbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzU3VibWVudUV4aXN0cyA9IHRoaXMucG9wb3ZlclNlcnZpY2UuaXNQb3BvdmVyU3VibWVudUV4aXRzKFxuICAgICAgdGhpcy5jb21wb25lbnRSZWYsXG4gICAgICB0aGlzLnBhcmVudFBvcG92ZXJSZWZcbiAgICApO1xuXG4gICAgaWYgKCFpc1N1Ym1lbnVFeGlzdHMgJiYgaGFzSXRlbU5lc3RlZFN1YnBvcG92ZXJzICYmIGNhblJlbW92ZU5lc3RlZFN1Ym1lbnVzKSB7XG4gICAgICB0aGlzLmNyZWF0ZVN1YnBvcG92ZXIoaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDbGlja091dHNpZGUoKTogdm9pZCB7XG4gICAgY29uc3QgYWN0aXZlUG9wb3ZlciA9IHRoaXMucG9wb3ZlclNlcnZpY2UuZ2V0QWN0aXZlKHRoaXMuY29tcG9uZW50UmVmKTtcblxuICAgIHRoaXMucG9wb3ZlckV2ZW50c1NlcnZpY2UucmVnaXN0ZXIoJ2NsaWNrLW91dHNpZGUnLCBhY3RpdmVQb3BvdmVyLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgbGV0IGNsaWNrZWRPdXRzaWRlID1cbiAgICAgICAgY2xpY2tlZEVsZW1lbnQgIT09IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhjbGlja2VkRWxlbWVudCkgJiZcbiAgICAgICAgY2xpY2tlZEVsZW1lbnQgIT09IHRoaXMucG9wb3ZlckNvbmZpZy50cmlnZ2VyRWxlbWVudC5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICF0aGlzLnBvcG92ZXJDb25maWcudHJpZ2dlckVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhjbGlja2VkRWxlbWVudCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLnR5cGUgPT09ICdjb250ZXh0JyAmJlxuICAgICAgICAoY2xpY2tlZEVsZW1lbnQgPT09IHRoaXMucG9wb3ZlckNvbmZpZy50cmlnZ2VyRWxlbWVudC5uYXRpdmVFbGVtZW50IHx8XG4gICAgICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLnRyaWdnZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoY2xpY2tlZEVsZW1lbnQpKVxuICAgICAgKSB7XG4gICAgICAgIGNsaWNrZWRPdXRzaWRlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjbGlja2VkT3V0c2lkZSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvck1vdXNlRXZlbnRPbkhvc3QoKTogdm9pZCB7XG4gICAgZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgZW50ZXJlZFBvcG92ZXIgPSB0aGlzLnBvcG92ZXJTZXJ2aWNlLmdldEFjdGl2ZSh0aGlzLmNvbXBvbmVudFJlZik7XG5cbiAgICAgICAgaWYgKGVudGVyZWRQb3BvdmVyPy5kZWVwTGV2ZWwpIHtcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTZXJ2aWNlLmFjdGl2ZVBvcG92ZXJzLmZvckVhY2goKHBvcG92ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPD0gZW50ZXJlZFBvcG92ZXIuZGVlcExldmVsKSB7XG4gICAgICAgICAgICAgIHRoaXMucG9wb3ZlckV2ZW50c1NlcnZpY2UudW5zdWJzY3JpYmUoJ2NsaWNrLW91dHNpZGUnLCBwb3BvdmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucG9wb3ZlckV2ZW50c1NlcnZpY2Uuc3Vic2NyaWJlKCdjbGljay1vdXRzaWRlJywgcG9wb3Zlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGZyb21FdmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucG9wb3ZlclNlcnZpY2UuYWN0aXZlUG9wb3ZlcnMuZm9yRWFjaCgocG9wb3ZlcikgPT4ge1xuICAgICAgICAgIHRoaXMucG9wb3ZlckV2ZW50c1NlcnZpY2Uuc3Vic2NyaWJlKCdjbGljay1vdXRzaWRlJywgcG9wb3Zlcik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvck1lbnVJdGVtVHJpZ2dlcnMoKTogdm9pZCB7XG4gICAgdGhpcy5wb3BvdmVyQ29uZmlnLm1lbnVSZWYubWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uY2xpY2tlZCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCksIHRha2VVbnRpbCh0aGlzLm1lbnVJdGVtc0NoYW5nZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uQ2xpY2tNZW51SXRlbShpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgaXRlbS5ob3ZlcmVkJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMubWVudUl0ZW1zQ2hhbmdlZCksXG4gICAgICAgICAgZGVib3VuY2VUaW1lKDApLFxuICAgICAgICAgIHNraXBVbnRpbCh0aGlzLmFuaW1hdGlvbkVuZCQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vbkhvdmVyTWVudUl0ZW0oaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc01lbnUoKSkge1xuICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5zdWJzY3JpYmVUb0NsaWNrT3V0c2lkZUV2ZW50Rm9yUGFyZW50UG9wb3Zlcih0aGlzLmNvbXBvbmVudFJlZik7XG4gICAgICB0aGlzLnBvcG92ZXJTZXJ2aWNlLnJlbW92ZU1lbnUodGhpcy5wYXJlbnRQb3BvdmVyUmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5yZW1vdmUodGhpcy5jb21wb25lbnRSZWYpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU3VicG9wb3ZlcihpdGVtOiBQb3BvdmVyTWVudUl0ZW1EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUG9wb3ZlckNvbnRlbnRDb21wb25lbnQpO1xuICAgIGNvbnN0IGJvdW5kcyA9IGl0ZW0uZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHR5cGU6IFBvcG92ZXJUeXBlID0gJ3N1Ym1lbnUnO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgUG9wb3ZlckFwcGVuZE9wdGlvbnMoeyB0eXBlIH0pO1xuXG4gICAgY29uc3QgcHJvdmlkZWRWYWx1ZXM6IFBvcG92ZXJDb25maWcgPSB7XG4gICAgICBib3VuZHMsXG4gICAgICB0eXBlLFxuICAgICAgc3VibWVudVRyaWdnZXJlZEl0ZW06IGl0ZW0sXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpcy5wb3BvdmVyQ29uZmlnLnRyaWdnZXJFbGVtZW50LFxuICAgICAgY2xvc2VPbkNsaWNrSXRlbTogdGhpcy5wb3BvdmVyQ29uZmlnLmNsb3NlT25DbGlja0l0ZW0sXG4gICAgfTtcblxuICAgIGlmIChpdGVtPy5zdWJtZW51IGluc3RhbmNlb2YgUG9wb3Zlck1lbnVDb21wb25lbnQpIHtcbiAgICAgIHByb3ZpZGVkVmFsdWVzLm1lbnVSZWYgPSBpdGVtLnN1Ym1lbnU7XG4gICAgfVxuICAgIGlmIChpdGVtPy5zdWJtZW51IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHByb3ZpZGVkVmFsdWVzLmNvbnRlbnQgPSBpdGVtLnN1Ym1lbnU7XG4gICAgfVxuXG4gICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoW1xuICAgICAge1xuICAgICAgICBwcm92aWRlOiBQT1BPVkVSX0NPTkZJRyxcbiAgICAgICAgdXNlVmFsdWU6IHByb3ZpZGVkVmFsdWVzLFxuICAgICAgfSxcbiAgICBdKTtcblxuICAgIHRoaXMuc3ViTWVudUNvbXBvbmVudFJlZiA9IHRoaXMucG9wb3ZlclNlcnZpY2UuYXBwZW5kKGluamVjdG9yLCBudWxsLCBvcHRpb25zLCB0aGlzLnBhcmVudFBvcG92ZXJSZWYpO1xuICAgIHRoaXMuc3ViTWVudUNvbXBvbmVudFJlZi5pbnN0YW5jZS5jb21wb25lbnRSZWYgPSB0aGlzLnN1Yk1lbnVDb21wb25lbnRSZWY7XG4gICAgdGhpcy5zdWJNZW51Q29tcG9uZW50UmVmLmluc3RhbmNlLnBhcmVudFBvcG92ZXJSZWYgPSB0aGlzLnBhcmVudFBvcG92ZXJSZWY7XG4gICAgdGhpcy5zdWJNZW51Q29tcG9uZW50UmVmLmhvc3RWaWV3LmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNNZW51KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnBvcG92ZXJDb25maWcudHlwZSA9PT0gJ21lbnUnIHx8XG4gICAgICB0aGlzLnBvcG92ZXJDb25maWcudHlwZSA9PT0gJ2NvbnRleHQnIHx8XG4gICAgICB0aGlzLnBvcG92ZXJDb25maWcudHlwZSA9PT0gJ3N1Ym1lbnUnXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FuTGlzdGVuRm9yQ2xpY2tPdXRzaWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnBvcG92ZXJDb25maWcuY2xvc2VPbkNsaWNrT3V0c2lkZSAmJiAodGhpcy5wb3BvdmVyQ29uZmlnLnRyaWdnZXIgIT09ICdob3ZlcicgfHwgdGhpcy5pc01lbnUoKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RDaGFuZ2VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNkciAmJiAhKHRoaXMuY2RyIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdlxuICAjcG9wb3ZlcldyYXBwZXJFbFxuICBjbGFzcz1cInBvcG92ZXItY29udGVudFwiXG4gIFtAZmFkZUluXT1cImFuaW1hdGlvblN0YXRlXCJcbiAgKEBmYWRlSW4uZG9uZSk9XCJhbmltYXRpb25FbmQoJGV2ZW50KVwiXG4+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0ZW1wbGF0ZTsgZWxzZSB0ZXh0Q29udGVudFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctdGVtcGxhdGUgI3RleHRDb250ZW50PlxuICAgIHt7IHBvcG92ZXJDb25maWcuY29udGVudCB9fVxuICA8L25nLXRlbXBsYXRlPlxuPC9kaXY+XG4iXX0=