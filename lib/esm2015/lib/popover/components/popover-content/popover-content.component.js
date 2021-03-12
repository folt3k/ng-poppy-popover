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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL3BvcG92ZXIvY29tcG9uZW50cy9wb3BvdmVyLWNvbnRlbnQvcG9wb3Zlci1jb250ZW50LmNvbXBvbmVudC50cyIsImxpYi9wb3BvdmVyL2NvbXBvbmVudHMvcG9wb3Zlci1jb250ZW50L3BvcG92ZXItY29udGVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUlULE1BQU0sRUFDTixRQUFRLEVBR1IsU0FBUyxFQUVULGlCQUFpQixFQUNqQixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEUsT0FBTyxFQUFFLGNBQWMsRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUdwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBR2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7Ozs7O0lDckIxRSx3QkFBMEQ7OztJQUQ1RCw2QkFDRTtJQUFBLHlHQUEyQztJQUM3QywwQkFBZTs7O0lBREMsZUFBNEI7SUFBNUIsa0RBQTRCOzs7SUFJMUMsWUFDRjs7O0lBREUsNkRBQ0Y7O0FEeUJGLE1BQU0sT0FBTyx1QkFBdUI7SUFZbEMsWUFDa0IsT0FBbUIsRUFDbEIsTUFBYyxFQUNkLHdCQUFrRCxFQUNsRCxj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LDBGQUNFO1FBR0YseUhBQ0U7UUFFSixpQkFBTTs7O1FBVkosNENBQTBCO1FBR1osZUFBa0M7UUFBbEMsbUNBQWtDLGlCQUFBO3MwQkQ0QnBDLENBQUMsZUFBZSxDQUFDO2tEQUdsQix1QkFBdUI7Y0FQbkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztnQkFDL0MsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUM3QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7c0JBb0JJLE1BQU07dUJBQUMsY0FBYzt3QkFsQk8sZ0JBQWdCO2tCQUE5QyxTQUFTO21CQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBWaWV3UmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBza2lwVW50aWwsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUE9QT1ZFUl9DT05GSUcsIFBvcG92ZXJDb25maWcgfSBmcm9tICcuLi8uLi9wb3BvdmVyLnRva2VuJztcbmltcG9ydCB7IFBvcG92ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcG9wb3Zlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcG92ZXJUeXBlIH0gZnJvbSAnLi4vLi4vcG9wb3Zlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUG9wb3ZlckFwcGVuZE9wdGlvbnMgfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9wb3Zlci1hcHBlbmQtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBmYWRlSW5BbmltYXRpb24gfSBmcm9tICcuLi8uLi9wb3BvdmVyLmFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUG9wb3ZlclN0eWxlcyB9IGZyb20gJy4uLy4uL21vZGVscy9wb3BvdmVyLXN0eWxlcy5tb2RlbCc7XG5pbXBvcnQgeyBQb3BvdmVyRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcG92ZXJNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcG9wb3Zlci1tZW51LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFBvcG92ZXJNZW51Q29tcG9uZW50IH0gZnJvbSAnLi4vcG9wb3Zlci1tZW51L3BvcG92ZXItbWVudS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwb3BweS1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXItY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BvcG92ZXItY29udGVudC5jb21wb25lbnQuc2NzcyddLFxuICBhbmltYXRpb25zOiBbZmFkZUluQW5pbWF0aW9uXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdwb3BvdmVyV3JhcHBlckVsJykgcG9wb3ZlcldyYXBwZXJFbDogRWxlbWVudFJlZjtcblxuICBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD47XG4gIHBhcmVudFBvcG92ZXJSZWY6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD47XG4gIGFuaW1hdGlvblN0YXRlOiAnb3BlbicgfCAnY2xvc2UnID0gJ2Nsb3NlJztcbiAgY29tcG9uZW50U3R5bGVzOiBQb3BvdmVyU3R5bGVzO1xuICBwcml2YXRlIHN1Yk1lbnVDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD47XG4gIHByaXZhdGUgYW5pbWF0aW9uRW5kJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgbWVudUl0ZW1zQ2hhbmdlZCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBvcG92ZXJTZXJ2aWNlOiBQb3BvdmVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBvcG92ZXJFdmVudHNTZXJ2aWNlOiBQb3BvdmVyRXZlbnRzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChQT1BPVkVSX0NPTkZJRykgcHVibGljIHJlYWRvbmx5IHBvcG92ZXJDb25maWc6IFBvcG92ZXJDb25maWdcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XG5cbiAgICBpZiAodGhpcy5wb3BvdmVyQ29uZmlnLnN1Ym1lbnVUcmlnZ2VyZWRJdGVtKSB7XG4gICAgICB0aGlzLnBvcG92ZXJDb25maWcuc3VibWVudVRyaWdnZXJlZEl0ZW0uZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICdwb3BvdmVyLW1lbnUtaXRlbS0tZm9jdXNlZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9wb3ZlckNvbmZpZy5pbm5lckNsYXNzKSB7XG4gICAgICB0aGlzLnBvcG92ZXJXcmFwcGVyRWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMucG9wb3ZlckNvbmZpZy5pbm5lckNsYXNzKTtcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RlbkZvck1vdXNlRXZlbnRPbkhvc3QoKTtcblxuICAgIGlmICh0aGlzLmNhbkxpc3RlbkZvckNsaWNrT3V0c2lkZSgpKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubGlzdGVuRm9yQ2xpY2tPdXRzaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9wb3ZlckNvbmZpZy5tZW51UmVmPy5tZW51SXRlbXMpIHtcbiAgICAgIHRoaXMubGlzdGVuRm9yTWVudUl0ZW1UcmlnZ2VycygpO1xuXG4gICAgICAvLyBTdWJzY3JpYmUgdG8gY2xpY2sgb3V0c2lkZSBldmVudCBhZ2Fpbiwgd2hlbiBtZW51IGl0ZW1zIGNoYW5nZWQgLSBpdCdzIHdvcmthcm91bmQgdG8gcmVmcmVzaCBob3N0IGVsZW1lbnQgY29udGVudDtcbiAgICAgIHRoaXMucG9wb3ZlckNvbmZpZy5tZW51UmVmLm1lbnVJdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1lbnVJdGVtc0NoYW5nZWQubmV4dCgpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuRm9yTWVudUl0ZW1UcmlnZ2VycygpO1xuICAgICAgICB0aGlzLnBvcG92ZXJFdmVudHNTZXJ2aWNlLnVucmVnaXN0ZXIoXG4gICAgICAgICAgJ2NsaWNrLW91dHNpZGUnLFxuICAgICAgICAgIHRoaXMucG9wb3ZlclNlcnZpY2UuZ2V0QWN0aXZlKHRoaXMuY29tcG9uZW50UmVmKVxuICAgICAgICApO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxpc3RlbkZvckNsaWNrT3V0c2lkZSgpO1xuICAgICAgICAgIHRoaXMuY29tcG9uZW50U3R5bGVzLnVwZGF0ZSgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBvcG92ZXJDb25maWcuc3VibWVudVRyaWdnZXJlZEl0ZW0pIHtcbiAgICAgIHRoaXMucG9wb3ZlckNvbmZpZy5zdWJtZW51VHJpZ2dlcmVkSXRlbS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgJ3BvcG92ZXItbWVudS1pdGVtLS1mb2N1c2VkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnBvcG92ZXJDb25maWcuY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmICYmXG4gICAgICAgICh0aGlzLnBvcG92ZXJDb25maWcuY29udGVudCBhcyBUZW1wbGF0ZVJlZjxhbnk+KSkgfHxcbiAgICAgIHRoaXMucG9wb3ZlckNvbmZpZy5tZW51UmVmPy50ZW1wbGF0ZVJlZlxuICAgICk7XG4gIH1cblxuICBhbmltYXRpb25FbmQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgdGhpcy5hbmltYXRpb25FbmQkLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50U3R5bGVzID0gbmV3IFBvcG92ZXJTdHlsZXModGhpcyk7XG4gICAgdGhpcy5jb21wb25lbnRTdHlsZXMuaW5pdCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNvbXBvbmVudFN0eWxlcy51cGRhdGUoKTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnb3Blbic7XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25DbGlja01lbnVJdGVtKGl0ZW06IFBvcG92ZXJNZW51SXRlbURpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IGhhc0l0ZW1OZXN0ZWRTdWJwb3BvdmVycyA9ICEhaXRlbS5zdWJtZW51O1xuXG4gICAgaWYgKCFoYXNJdGVtTmVzdGVkU3VicG9wb3ZlcnMpIHtcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJDb25maWcuY2xvc2VPbkNsaWNrSXRlbSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkhvdmVyTWVudUl0ZW0oaXRlbTogUG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgY2FuUmVtb3ZlTmVzdGVkU3VibWVudXMgPSAhdGhpcy5wb3BvdmVyU2VydmljZS5hY3RpdmVQb3BvdmVycy5maW5kKFxuICAgICAgKHBvcG92ZXIpID0+IHBvcG92ZXIucG9wb3ZlclJlZi5pbnN0YW5jZS5wb3BvdmVyQ29uZmlnLnN1Ym1lbnVUcmlnZ2VyZWRJdGVtID09PSBpdGVtXG4gICAgKTtcbiAgICBjb25zdCBoYXNJdGVtTmVzdGVkU3VicG9wb3ZlcnMgPSAhIWl0ZW0uc3VibWVudTtcblxuICAgIGlmIChjYW5SZW1vdmVOZXN0ZWRTdWJtZW51cykge1xuICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5yZW1vdmVBbGxOZXN0ZWRQb3BvdmVycyh0aGlzLmNvbXBvbmVudFJlZik7XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1N1Ym1lbnVFeGlzdHMgPSB0aGlzLnBvcG92ZXJTZXJ2aWNlLmlzUG9wb3ZlclN1Ym1lbnVFeGl0cyhcbiAgICAgIHRoaXMuY29tcG9uZW50UmVmLFxuICAgICAgdGhpcy5wYXJlbnRQb3BvdmVyUmVmXG4gICAgKTtcblxuICAgIGlmICghaXNTdWJtZW51RXhpc3RzICYmIGhhc0l0ZW1OZXN0ZWRTdWJwb3BvdmVycyAmJiBjYW5SZW1vdmVOZXN0ZWRTdWJtZW51cykge1xuICAgICAgdGhpcy5jcmVhdGVTdWJwb3BvdmVyKGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yQ2xpY2tPdXRzaWRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGFjdGl2ZVBvcG92ZXIgPSB0aGlzLnBvcG92ZXJTZXJ2aWNlLmdldEFjdGl2ZSh0aGlzLmNvbXBvbmVudFJlZik7XG5cbiAgICB0aGlzLnBvcG92ZXJFdmVudHNTZXJ2aWNlLnJlZ2lzdGVyKCdjbGljay1vdXRzaWRlJywgYWN0aXZlUG9wb3ZlciwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGxldCBjbGlja2VkT3V0c2lkZSA9XG4gICAgICAgIGNsaWNrZWRFbGVtZW50ICE9PSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoY2xpY2tlZEVsZW1lbnQpICYmXG4gICAgICAgIGNsaWNrZWRFbGVtZW50ICE9PSB0aGlzLnBvcG92ZXJDb25maWcudHJpZ2dlckVsZW1lbnQubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAhdGhpcy5wb3BvdmVyQ29uZmlnLnRyaWdnZXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoY2xpY2tlZEVsZW1lbnQpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbmZpZy50eXBlID09PSAnY29udGV4dCcgJiZcbiAgICAgICAgKGNsaWNrZWRFbGVtZW50ID09PSB0aGlzLnBvcG92ZXJDb25maWcudHJpZ2dlckVsZW1lbnQubmF0aXZlRWxlbWVudCB8fFxuICAgICAgICAgIHRoaXMucG9wb3ZlckNvbmZpZy50cmlnZ2VyRWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGNsaWNrZWRFbGVtZW50KSlcbiAgICAgICkge1xuICAgICAgICBjbGlja2VkT3V0c2lkZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoY2xpY2tlZE91dHNpZGUpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JNb3VzZUV2ZW50T25Ib3N0KCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudGVyZWRQb3BvdmVyID0gdGhpcy5wb3BvdmVyU2VydmljZS5nZXRBY3RpdmUodGhpcy5jb21wb25lbnRSZWYpO1xuXG4gICAgICAgIGlmIChlbnRlcmVkUG9wb3Zlcj8uZGVlcExldmVsKSB7XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5hY3RpdmVQb3BvdmVycy5mb3JFYWNoKChwb3BvdmVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4IDw9IGVudGVyZWRQb3BvdmVyLmRlZXBMZXZlbCkge1xuICAgICAgICAgICAgICB0aGlzLnBvcG92ZXJFdmVudHNTZXJ2aWNlLnVuc3Vic2NyaWJlKCdjbGljay1vdXRzaWRlJywgcG9wb3Zlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBvcG92ZXJFdmVudHNTZXJ2aWNlLnN1YnNjcmliZSgnY2xpY2stb3V0c2lkZScsIHBvcG92ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZWxlYXZlJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnBvcG92ZXJTZXJ2aWNlLmFjdGl2ZVBvcG92ZXJzLmZvckVhY2goKHBvcG92ZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnBvcG92ZXJFdmVudHNTZXJ2aWNlLnN1YnNjcmliZSgnY2xpY2stb3V0c2lkZScsIHBvcG92ZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JNZW51SXRlbVRyaWdnZXJzKCk6IHZvaWQge1xuICAgIHRoaXMucG9wb3ZlckNvbmZpZy5tZW51UmVmLm1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmNsaWNrZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLCB0YWtlVW50aWwodGhpcy5tZW51SXRlbXNDaGFuZ2VkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5vbkNsaWNrTWVudUl0ZW0oaXRlbSk7XG4gICAgICB9KTtcbiAgICAgIGl0ZW0uaG92ZXJlZCRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLm1lbnVJdGVtc0NoYW5nZWQpLFxuICAgICAgICAgIGRlYm91bmNlVGltZSgwKSxcbiAgICAgICAgICBza2lwVW50aWwodGhpcy5hbmltYXRpb25FbmQkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25Ib3Zlck1lbnVJdGVtKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNNZW51KCkpIHtcbiAgICAgIHRoaXMucG9wb3ZlclNlcnZpY2Uuc3Vic2NyaWJlVG9DbGlja091dHNpZGVFdmVudEZvclBhcmVudFBvcG92ZXIodGhpcy5jb21wb25lbnRSZWYpO1xuICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5yZW1vdmVNZW51KHRoaXMucGFyZW50UG9wb3ZlclJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9wb3ZlclNlcnZpY2UucmVtb3ZlKHRoaXMuY29tcG9uZW50UmVmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVN1YnBvcG92ZXIoaXRlbTogUG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBvcG92ZXJDb250ZW50Q29tcG9uZW50KTtcbiAgICBjb25zdCBib3VuZHMgPSBpdGVtLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB0eXBlOiBQb3BvdmVyVHlwZSA9ICdzdWJtZW51JztcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IFBvcG92ZXJBcHBlbmRPcHRpb25zKHsgdHlwZSB9KTtcblxuICAgIGNvbnN0IHByb3ZpZGVkVmFsdWVzOiBQb3BvdmVyQ29uZmlnID0ge1xuICAgICAgYm91bmRzLFxuICAgICAgdHlwZSxcbiAgICAgIHN1Ym1lbnVUcmlnZ2VyZWRJdGVtOiBpdGVtLFxuICAgICAgdHJpZ2dlckVsZW1lbnQ6IHRoaXMucG9wb3ZlckNvbmZpZy50cmlnZ2VyRWxlbWVudCxcbiAgICAgIGNsb3NlT25DbGlja0l0ZW06IHRoaXMucG9wb3ZlckNvbmZpZy5jbG9zZU9uQ2xpY2tJdGVtLFxuICAgIH07XG5cbiAgICBpZiAoaXRlbT8uc3VibWVudSBpbnN0YW5jZW9mIFBvcG92ZXJNZW51Q29tcG9uZW50KSB7XG4gICAgICBwcm92aWRlZFZhbHVlcy5tZW51UmVmID0gaXRlbS5zdWJtZW51O1xuICAgIH1cbiAgICBpZiAoaXRlbT8uc3VibWVudSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBwcm92aWRlZFZhbHVlcy5jb250ZW50ID0gaXRlbS5zdWJtZW51O1xuICAgIH1cblxuICAgIGNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKFtcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogUE9QT1ZFUl9DT05GSUcsXG4gICAgICAgIHVzZVZhbHVlOiBwcm92aWRlZFZhbHVlcyxcbiAgICAgIH0sXG4gICAgXSk7XG5cbiAgICB0aGlzLnN1Yk1lbnVDb21wb25lbnRSZWYgPSB0aGlzLnBvcG92ZXJTZXJ2aWNlLmFwcGVuZChpbmplY3RvciwgbnVsbCwgb3B0aW9ucywgdGhpcy5wYXJlbnRQb3BvdmVyUmVmKTtcbiAgICB0aGlzLnN1Yk1lbnVDb21wb25lbnRSZWYuaW5zdGFuY2UuY29tcG9uZW50UmVmID0gdGhpcy5zdWJNZW51Q29tcG9uZW50UmVmO1xuICAgIHRoaXMuc3ViTWVudUNvbXBvbmVudFJlZi5pbnN0YW5jZS5wYXJlbnRQb3BvdmVyUmVmID0gdGhpcy5wYXJlbnRQb3BvdmVyUmVmO1xuICAgIHRoaXMuc3ViTWVudUNvbXBvbmVudFJlZi5ob3N0Vmlldy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIGlzTWVudSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLnR5cGUgPT09ICdtZW51JyB8fFxuICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLnR5cGUgPT09ICdjb250ZXh0JyB8fFxuICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLnR5cGUgPT09ICdzdWJtZW51J1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNhbkxpc3RlbkZvckNsaWNrT3V0c2lkZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wb3BvdmVyQ29uZmlnLmNsb3NlT25DbGlja091dHNpZGUgJiYgKHRoaXMucG9wb3ZlckNvbmZpZy50cmlnZ2VyICE9PSAnaG92ZXInIHx8IHRoaXMuaXNNZW51KCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jZHIgJiYgISh0aGlzLmNkciBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXZcbiAgI3BvcG92ZXJXcmFwcGVyRWxcbiAgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIlxuICBbQGZhZGVJbl09XCJhbmltYXRpb25TdGF0ZVwiXG4gIChAZmFkZUluLmRvbmUpPVwiYW5pbWF0aW9uRW5kKCRldmVudClcIlxuPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidGVtcGxhdGU7IGVsc2UgdGV4dENvbnRlbnRcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLXRlbXBsYXRlICN0ZXh0Q29udGVudD5cbiAgICB7eyBwb3BvdmVyQ29uZmlnLmNvbnRlbnQgfX1cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuIl19