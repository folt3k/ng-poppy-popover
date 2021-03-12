import { InjectionToken, EventEmitter, ɵɵdirectiveInject, ElementRef, ɵɵdefineDirective, ɵɵclassProp, ɵsetClassMetadata, Directive, Input, Output, HostBinding, ɵɵprojection, ɵɵdefineComponent, ɵɵcontentQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵviewQuery, TemplateRef, ɵɵprojectionDef, ɵɵtemplate, Component, ChangeDetectionStrategy, ContentChildren, ViewChild, ViewContainerRef, ɵɵelementContainer, ViewEncapsulation, Inject, Injector, ɵɵinject, ComponentFactoryResolver, ApplicationRef, ɵɵdefineInjectable, Injectable, NgZone, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵnextContext, ɵɵadvance, ɵɵproperty, ɵɵtext, ɵɵtextInterpolate1, ChangeDetectorRef, ɵɵelementStart, ɵɵlistener, ɵɵtemplateRefExtractor, ɵɵelementEnd, ɵɵreference, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, ɵɵInheritDefinitionFeature, HostListener, ɵɵpureFunction1, ɵɵgetCurrentView, ɵɵrestoreView, ɵɵtextInterpolate, ɵɵelement, ɵɵProvidersFeature, forwardRef, ɵɵNgOnChangesFeature, Optional, Host, SkipSelf, ContentChild } from '@angular/core';
import { NgIf, NgTemplateOutlet, CommonModule, NgForOf } from '@angular/common';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { tap, takeUntil, debounceTime, skipUntil, switchMap, take, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ControlContainer, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const POPOVER_CONFIG = new InjectionToken('popover-config');

class PopoverAppendOptions {
    constructor(options) {
        this.type = options.type;
        this.triggeredBy = options.triggeredBy || 'click';
        this.closeOnScroll = options.closeOnScroll !== undefined ? options.closeOnScroll : true;
        this.delayClose = Number.isInteger(options.delayClose) ? options.delayClose : null;
        this.closeOnTriggerAgain = !!options.closeOnTriggerAgain;
        this.hideOnScroll = !!options.hideOnScroll;
    }
}

const fadeInAnimation = trigger('fadeIn', [
    state('open', style({
        transform: 'translateY(0px)',
        opacity: 1,
    })),
    state('close', style({
        transform: 'translateY(-6px)',
        opacity: 0.5,
    })),
    transition('close => open', [animate('0.15s')]),
]);

const SPACE_FROM_BOTTOM = 20;
const SPACE_FROM_TOP = 10;
const HORIZONTAL_SPACE = 10;
const POSITION_MEASURE_UNIT = 'px';
class PopoverStyles {
    constructor(popover) {
        this.initHostElementWidth = 0;
        this.popover = popover;
        this.hostElement = popover.element;
        this.config = popover.popoverConfig;
        this.type = this.config.type;
        this.position = this.config.position;
    }
    init() {
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
            const triggerBounds = triggerItem.getBoundingClientRect();
            this.hostElement.nativeElement.style.minWidth = 0;
            this.setPositionStyle('top', triggerBounds.top);
        }
        if (this.canAssignPadding) {
            const padding = this.isTooltip ? '8px 12px' : '15px 25px';
            this.popover.popoverWrapperEl.nativeElement.style.padding = padding;
        }
        this.hostElement.nativeElement.style.visibility = 'hidden';
        setTimeout(() => {
            this.initHostElementWidth = this.hostElement.nativeElement.offsetWidth + 1;
            this.hostElement.nativeElement.style.minWidth = this.initHostElementWidth + 'px';
        });
    }
    update() {
        this.setLeftPosition();
        this.setTopPosition();
        this.setWidth();
        this.hostElement.nativeElement.style.visibility = 'visible';
    }
    setTopPosition() {
        const windowHeight = window.innerHeight;
        const elementHeight = this.hostElement.nativeElement.getBoundingClientRect().height;
        const triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();
        if (this.config.triggerDirective) {
            const hostTopPosition = this.config.type === 'context' ? this.config.bounds.top : triggerBounds.top + triggerBounds.height;
            const isBelowWindowCenterHeight = elementHeight >= windowHeight - hostTopPosition - SPACE_FROM_BOTTOM;
            if (isBelowWindowCenterHeight) {
                if (this.config.type === 'context') {
                    this.setPositionStyle('top', +this.config.bounds.top - elementHeight + SPACE_FROM_TOP);
                }
                else {
                    const newPos = triggerBounds.top - elementHeight - SPACE_FROM_TOP;
                    if (newPos > 0) {
                        switch (this.position) {
                            case 'bottom':
                                this.setPositionStyle('top', triggerBounds.top - elementHeight - SPACE_FROM_TOP);
                                break;
                            case 'top':
                                this.setPositionStyle('top', triggerBounds.top - elementHeight - SPACE_FROM_TOP);
                        }
                    }
                    else {
                        this.hostElement.nativeElement.style.height =
                            windowHeight - hostTopPosition - SPACE_FROM_BOTTOM + POSITION_MEASURE_UNIT;
                    }
                }
            }
            else {
                if (this.config.type === 'context') {
                    this.setPositionStyle('top', +this.config.bounds.top + SPACE_FROM_TOP);
                }
                else {
                    switch (this.position) {
                        case 'bottom':
                            this.setPositionStyle('top', triggerBounds.top + triggerBounds.height + SPACE_FROM_TOP);
                            break;
                        case 'top':
                            this.setPositionStyle('top', triggerBounds.top - elementHeight - SPACE_FROM_TOP);
                            break;
                        case 'left':
                        case 'right':
                            this.setPositionStyle('top', triggerBounds.top - (elementHeight / 2 - triggerBounds.height / 2));
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
            }
            else {
                this.setPositionStyle('top', hostPosition);
            }
        }
    }
    setLeftPosition() {
        const windowWidth = window.innerWidth;
        const elementWidth = this.hostElement.nativeElement.getBoundingClientRect().width;
        const triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();
        if (this.isContextType) {
            if (+this.config.bounds.left >= windowWidth / 2) {
                this.setPositionStyle('left', +this.config.bounds.left - elementWidth);
            }
            else {
                this.setPositionStyle('left', this.defaultLeftPosition);
            }
        }
        else if (this.config.triggerDirective) {
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
        }
        else {
            const hostBounds = this.config.submenuTriggeredItem.element.nativeElement.getBoundingClientRect();
            if (elementWidth > windowWidth - hostBounds.right) {
                this.setPositionStyle('left', hostBounds.left - this.initHostElementWidth);
            }
            else {
                this.setPositionStyle('left', hostBounds.right);
            }
        }
    }
    setWidth() {
        const triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();
        if (!this.isContextType && !this.isSubmenuType) {
            const windowWidth = window.innerWidth;
            const hostElBounds = this.hostElement.nativeElement.getBoundingClientRect();
            this.hostElement.nativeElement.style.minWidth = this.initHostElementWidth + POSITION_MEASURE_UNIT;
            if (!this.isMenuType) {
                if (hostElBounds.width > windowWidth || this.initHostElementWidth > windowWidth - 30) {
                    this.hostElement.nativeElement.style.width = windowWidth - 30 + POSITION_MEASURE_UNIT;
                    this.hostElement.nativeElement.style.minWidth = windowWidth - 30 + POSITION_MEASURE_UNIT;
                    this.setPositionStyle('left', 15);
                }
            }
        }
    }
    setPositionStyle(property, value) {
        this.hostElement.nativeElement.style[property] = value + POSITION_MEASURE_UNIT;
    }
    get defaultLeftPosition() {
        return this.config.bounds.left;
    }
    get canAssignPadding() {
        return ((!this.isContextType && !this.isMenuType && !this.isSubmenuType) ||
            (this.isSubmenuType && !!this.config.content));
    }
    get isContextType() {
        return this.type === 'context';
    }
    get isMenuType() {
        return this.type === 'menu';
    }
    get isSubmenuType() {
        return this.type === 'submenu';
    }
    get isTooltip() {
        return this.type === 'tooltip';
    }
}

class PopoverMenuItemDirective {
    constructor(element) {
        this.element = element;
        this.selected = false;
        this.hidden = false;
        this.clicked = new EventEmitter();
    }
    get selectedClass() {
        return this.selected;
    }
    get hiddenClass() {
        return this.hidden;
    }
    ngOnInit() {
        this.clicked$ = fromEvent(this.element.nativeElement, 'click').pipe(tap(() => {
            this.clicked.emit();
        }));
        this.hovered$ = fromEvent(this.element.nativeElement, 'mousemove');
        // this.global$ = fromEvent<MouseEvent>(document, 'click').pipe(tap(() => console.log('clicked window')));
    }
    ngAfterViewInit() {
        this.element.nativeElement.classList.add('popover-menu-item');
    }
}
PopoverMenuItemDirective.ɵfac = function PopoverMenuItemDirective_Factory(t) { return new (t || PopoverMenuItemDirective)(ɵɵdirectiveInject(ElementRef)); };
PopoverMenuItemDirective.ɵdir = ɵɵdefineDirective({ type: PopoverMenuItemDirective, selectors: [["", "poppy-menu-item", ""]], hostVars: 4, hostBindings: function PopoverMenuItemDirective_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("popover-menu-item--selected", ctx.selectedClass)("popover-menu-item--hidden", ctx.hiddenClass);
    } }, inputs: { submenu: "submenu", selected: "selected", hidden: "hidden" }, outputs: { clicked: "clicked" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverMenuItemDirective, [{
        type: Directive,
        args: [{
                selector: '[poppy-menu-item]',
            }]
    }], function () { return [{ type: ElementRef }]; }, { submenu: [{
            type: Input
        }], selected: [{
            type: Input
        }], hidden: [{
            type: Input
        }], clicked: [{
            type: Output
        }], selectedClass: [{
            type: HostBinding,
            args: ['class.popover-menu-item--selected']
        }], hiddenClass: [{
            type: HostBinding,
            args: ['class.popover-menu-item--hidden']
        }] }); })();

function PopoverMenuComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵprojection(0);
} }
const _c0 = ["*"];
class PopoverMenuComponent {
    constructor() { }
}
PopoverMenuComponent.ɵfac = function PopoverMenuComponent_Factory(t) { return new (t || PopoverMenuComponent)(); };
PopoverMenuComponent.ɵcmp = ɵɵdefineComponent({ type: PopoverMenuComponent, selectors: [["poppy-menu"]], contentQueries: function PopoverMenuComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PopoverMenuItemDirective, false);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.menuItems = _t);
    } }, viewQuery: function PopoverMenuComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templateRef = _t.first);
    } }, exportAs: ["poppyMenu"], ngContentSelectors: _c0, decls: 1, vars: 0, template: function PopoverMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, PopoverMenuComponent_ng_template_0_Template, 1, 0, "ng-template");
    } }, encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverMenuComponent, [{
        type: Component,
        args: [{
                selector: 'poppy-menu',
                exportAs: 'poppyMenu',
                templateUrl: './popover-menu.component.html',
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return []; }, { menuItems: [{
            type: ContentChildren,
            args: [PopoverMenuItemDirective]
        }], templateRef: [{
            type: ViewChild,
            args: [TemplateRef]
        }] }); })();

class ActivePopover {
    constructor(popoverRef, parentPopoverRef, superParentPopoverRef, directiveRef, type, deepLevel) {
        this.popoverRef = popoverRef;
        this.parentPopoverRef = parentPopoverRef;
        this.superParentPopoverRef = superParentPopoverRef;
        this.directiveRef = directiveRef;
        this.type = type;
        this.deepLevel = deepLevel;
        this.isMenuParent = type === 'menu';
        this.isSubmenu = type === 'submenu';
        this.isSuperparent = this.popoverRef === this.superParentPopoverRef;
    }
}

class LayerAppendOptions {
    constructor(options = {}) {
        this.delayClose = Number.isInteger(options.delayClose) ? options.delayClose : null;
        this.overlay = !!options.overlay;
    }
}

const LAYER_CONFIG = new InjectionToken('layer-token');

const _c0$1 = ["container"];
class LayerComponent {
    constructor(config) {
        this.config = config;
    }
    get overlay() {
        return this.config.overlay;
    }
}
LayerComponent.ɵfac = function LayerComponent_Factory(t) { return new (t || LayerComponent)(ɵɵdirectiveInject(LAYER_CONFIG)); };
LayerComponent.ɵcmp = ɵɵdefineComponent({ type: LayerComponent, selectors: [["poppy-layer"]], viewQuery: function LayerComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$1, true, ViewContainerRef);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.container = _t.first);
    } }, hostVars: 2, hostBindings: function LayerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("poppy-layer--overlay", ctx.overlay);
    } }, decls: 2, vars: 0, consts: [["container", ""]], template: function LayerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementContainer(0, null, 0);
    } }, styles: ["poppy-layer{bottom:0;display:block;left:0;position:fixed;right:0;top:0;visibility:hidden;z-index:10000}.poppy-layer--overlay{background:rgba(0,0,0,.42);overflow-y:auto;visibility:visible}"], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LayerComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'poppy-layer',
                templateUrl: './layer.component.html',
                styleUrls: ['./layer.component.scss'],
                encapsulation: ViewEncapsulation.None,
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [LAYER_CONFIG]
            }] }]; }, { container: [{
            type: ViewChild,
            args: ['container', { read: ViewContainerRef }]
        }], overlay: [{
            type: HostBinding,
            args: ['class.poppy-layer--overlay']
        }] }); })();

class LayerService {
    constructor(componentFactoryResolver, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.activeLayers = [];
    }
    appendToBody(component, options, injector) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LayerComponent);
        const componentRef = componentFactory.create(Injector.create([
            {
                provide: LAYER_CONFIG,
                useValue: options,
            },
        ]));
        componentRef.changeDetectorRef.detectChanges();
        const appendComponentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const appendComponentRef = componentRef.instance.container.createComponent(appendComponentFactory, null, injector);
        this.activeLayers.push({
            ref: componentRef,
            appendComponentRef,
            options,
        });
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        return appendComponentRef;
    }
    removeFromBody(componentRef) {
        const layers = this.activeLayers.filter((layer) => layer.appendComponentRef === componentRef);
        layers.forEach((layer) => {
            const delayClose = layer.options.delayClose;
            if (delayClose !== null) {
                setTimeout(() => {
                    this.removeLayer(layer);
                }, delayClose);
            }
            else {
                this.removeLayer(layer);
            }
        });
        this.activeLayers = this.activeLayers.filter((layer) => layer.appendComponentRef !== componentRef);
    }
    removeLayer(layer) {
        this.appRef.detachView(layer.ref.hostView);
        layer.ref.changeDetectorRef.detectChanges();
        layer.ref.destroy();
    }
}
LayerService.ɵfac = function LayerService_Factory(t) { return new (t || LayerService)(ɵɵinject(ComponentFactoryResolver), ɵɵinject(ApplicationRef)); };
LayerService.ɵprov = ɵɵdefineInjectable({ token: LayerService, factory: LayerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LayerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: ComponentFactoryResolver }, { type: ApplicationRef }]; }, null); })();

class PopoverEventsService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.registeredEvents = [];
    }
    register(type, activePopover, callback) {
        let sub;
        this.ngZone.runOutsideAngular(() => {
            const obs = this.getEventObservable(type);
            sub = obs.subscribe((event) => {
                callback(event);
            });
        });
        this.registeredEvents.push({ popover: activePopover, type, sub, callback });
    }
    unregister(type, activePopover) {
        this.registeredEvents
            .filter((event) => event.type === type)
            .forEach((event) => {
            if (event.popover === activePopover) {
                event.sub.unsubscribe();
            }
        });
        this.registeredEvents = this.registeredEvents.filter((event) => event.type === type ? event.popover !== activePopover : true);
    }
    subscribe(type, popover) {
        const obs = this.getEventObservable(type);
        this.registeredEvents
            .filter((event) => { var _a; return event.type === type && event.popover === popover && ((_a = event.sub) === null || _a === void 0 ? void 0 : _a.closed); })
            .forEach((event) => {
            event.sub = obs.subscribe((e) => event.callback(e));
        });
    }
    unsubscribe(type, popover) {
        this.registeredEvents
            .filter((event) => event.type === type && event.popover === popover)
            .forEach((event) => {
            event.sub.unsubscribe();
        });
    }
    getEventObservable(type) {
        switch (type) {
            case 'click-outside':
                return merge(fromEvent(document, 'click'), fromEvent(document, 'contextmenu'))
                    .pipe();
            case 'capture-scroll':
                return fromEvent(document, 'scroll').pipe(tap(() => {
                    // console.log('Capturing scroll event..');
                }));
            case 'resize':
                return fromEvent(window, 'resize').pipe(tap(() => {
                    // console.log('Resize event..');
                }));
        }
    }
}
PopoverEventsService.ɵfac = function PopoverEventsService_Factory(t) { return new (t || PopoverEventsService)(ɵɵinject(NgZone)); };
PopoverEventsService.ɵprov = ɵɵdefineInjectable({ token: PopoverEventsService, factory: PopoverEventsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverEventsService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: NgZone }]; }, null); })();

class PopoverService {
    constructor(layerService, eventsService) {
        this.layerService = layerService;
        this.eventsService = eventsService;
        this.activePopovers = [];
    }
    append(injector, directive, options, parentPopoverRef) {
        const existedPopover = this.activePopovers.find((popover) => popover.directiveRef === directive);
        if (options.closeOnTriggerAgain && existedPopover) {
            this.remove(existedPopover.popoverRef);
            return existedPopover.popoverRef;
        }
        else {
            return this.appendToBody(injector, directive, options, parentPopoverRef);
        }
    }
    remove(popoverRef) {
        const active = this.activePopovers.find((p) => p.popoverRef === popoverRef);
        if (active) {
            if (active.directiveRef) {
                active.directiveRef.popoverComponentRef = null;
                active.directiveRef.afterClose.emit();
            }
            active.popoverRef.destroy();
            this.layerService.removeFromBody(active.popoverRef);
            this.eventsService.unregister('click-outside', active);
            this.eventsService.unregister('capture-scroll', active);
            this.eventsService.unregister('resize', active);
            this.activePopovers = this.activePopovers.filter((a) => a.popoverRef !== popoverRef);
        }
    }
    removeByNativeElementRef(element) {
        const activePopover = this.activePopovers.find((active) => active.popoverRef.location.nativeElement === element);
        if (activePopover) {
            this.remove(activePopover.popoverRef);
        }
    }
    getActive(popoverRef) {
        return this.activePopovers.find((active) => active.popoverRef === popoverRef);
    }
    isPopoverSubmenuExits(precendingRef, parentRef) {
        const precendingActivePopover = this.getActive(precendingRef);
        if (!precendingActivePopover || (precendingActivePopover && !precendingActivePopover.deepLevel)) {
            return false;
        }
        return !!this.activePopovers.find((popover) => popover.parentPopoverRef === parentRef && popover.deepLevel === precendingActivePopover.deepLevel + 1);
    }
    removeAllNestedPopovers(popoverRef) {
        const activePopover = this.getActive(popoverRef);
        if (activePopover) {
            this.activePopovers
                .filter((popover) => popover.deepLevel > activePopover.deepLevel)
                .forEach((popover) => {
                this.remove(popover.popoverRef);
            });
        }
    }
    removeMenu(componentRef) {
        this.activePopovers
            .filter((popover) => popover.parentPopoverRef === componentRef || popover.popoverRef === componentRef)
            .forEach((popover) => {
            this.remove(popover.popoverRef);
        });
    }
    subscribeToClickOutsideEventForParentPopover(componentRef) {
        const currentPopover = this.getActive(componentRef);
        if (currentPopover) {
            const parentPopover = this.activePopovers.find((popover) => popover.superParentPopoverRef === currentPopover.superParentPopoverRef &&
                popover.deepLevel === currentPopover.deepLevel - 1);
            if (parentPopover) {
                setTimeout(() => {
                    this.eventsService.subscribe('click-outside', parentPopover);
                });
            }
        }
    }
    appendToBody(injector, directive, options, parentPopoverRef) {
        const layerOptions = new LayerAppendOptions({ delayClose: options.delayClose });
        const popover = this.layerService.appendToBody(PopoverContentComponent, layerOptions, injector);
        const { superparent, deepLevel } = this.prepareSuperparentAndDeepLevel(popover, parentPopoverRef, directive);
        const newPopover = new ActivePopover(popover, parentPopoverRef, superparent, directive, options.type, deepLevel);
        popover.instance.componentRef = popover;
        popover.instance.parentPopoverRef = popover;
        popover.changeDetectorRef.detectChanges();
        this.activePopovers.push(newPopover);
        if (newPopover.directiveRef) {
            newPopover.directiveRef.afterShow.emit();
        }
        if (this.canRegisterScrollCaptureEvent(newPopover, options)) {
            this.registerScrollCaptureEvent(newPopover, options);
        }
        if (this.canRegisterResizeEvent(newPopover, options)) {
            this.registerResizeEvent(newPopover, options);
        }
        return popover;
    }
    prepareSuperparentAndDeepLevel(popover, parentPopover, directive) {
        let deepLevel = 0;
        let superparent = null;
        if (directive) {
            const parentPopover = this.activePopovers.find((p) => {
                return p.popoverRef.instance.element.nativeElement.contains(directive.hostElement.nativeElement);
            });
            if (!parentPopover) {
                superparent = popover;
                deepLevel = 0;
            }
            else {
                superparent = parentPopover.superParentPopoverRef || parentPopover.popoverRef;
                deepLevel = parentPopover.deepLevel + 1;
            }
        }
        else {
            const closestParent = this.activePopovers.find((p) => p.popoverRef === parentPopover);
            if (closestParent) {
                const popoverGroup = this.activePopovers.filter((p) => p.superParentPopoverRef === closestParent.superParentPopoverRef);
                superparent = closestParent.superParentPopoverRef;
                deepLevel = popoverGroup[popoverGroup.length - 1].deepLevel + 1;
            }
        }
        return {
            deepLevel,
            superparent,
        };
    }
    canRegisterScrollCaptureEvent(popover, options) {
        const { triggeredBy, type, closeOnScroll } = options;
        return (popover.directiveRef &&
            popover.deepLevel === 0 &&
            triggeredBy !== 'hover' &&
            type !== 'submenu' &&
            closeOnScroll);
    }
    canRegisterResizeEvent(popover, options) {
        const { triggeredBy, type } = options;
        return popover.directiveRef && popover.deepLevel === 0 && triggeredBy !== 'hover' && type !== 'submenu';
    }
    registerResizeEvent(popover, options) {
        this.eventsService.register('resize', popover, () => {
            if (options.type === 'context') {
                this.hideGroup(popover);
            }
            else {
                this.updateGroupPosition(popover);
            }
        });
    }
    registerScrollCaptureEvent(popover, options) {
        this.eventsService.register('capture-scroll', popover, (event) => {
            const captured = popover.directiveRef.hostElement.nativeElement === event.target ||
                event.target.contains(popover.directiveRef.hostElement.nativeElement);
            if ((captured && options.hideOnScroll) || options.type === 'context') {
                this.hideGroup(popover);
            }
            if (captured && !options.hideOnScroll && options.type !== 'context') {
                this.updateGroupPosition(popover);
            }
        });
    }
    hideGroup(popover) {
        this.activePopovers.forEach((active) => {
            if (active.superParentPopoverRef === popover.superParentPopoverRef) {
                this.remove(active.popoverRef);
            }
        });
    }
    updateGroupPosition(popover) {
        this.activePopovers
            .filter((active) => active.superParentPopoverRef === popover.popoverRef)
            .forEach((active) => {
            if (active.popoverRef.instance.componentStyles) {
                active.popoverRef.instance.componentStyles.update();
            }
        });
    }
}
PopoverService.ɵfac = function PopoverService_Factory(t) { return new (t || PopoverService)(ɵɵinject(LayerService), ɵɵinject(PopoverEventsService)); };
PopoverService.ɵprov = ɵɵdefineInjectable({ token: PopoverService, factory: PopoverService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: LayerService }, { type: PopoverEventsService }]; }, null); })();

const _c0$2 = ["popoverWrapperEl"];
function PopoverContentComponent_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function PopoverContentComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PopoverContentComponent_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.template);
} }
function PopoverContentComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵtext(0);
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵtextInterpolate1(" ", ctx_r3.popoverConfig.content, " ");
} }
class PopoverContentComponent {
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
PopoverContentComponent.ɵfac = function PopoverContentComponent_Factory(t) { return new (t || PopoverContentComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ComponentFactoryResolver), ɵɵdirectiveInject(PopoverService), ɵɵdirectiveInject(PopoverEventsService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(POPOVER_CONFIG)); };
PopoverContentComponent.ɵcmp = ɵɵdefineComponent({ type: PopoverContentComponent, selectors: [["poppy-content"]], viewQuery: function PopoverContentComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$2, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.popoverWrapperEl = _t.first);
    } }, decls: 5, vars: 3, consts: [[1, "popover-content"], ["popoverWrapperEl", ""], [4, "ngIf", "ngIfElse"], ["textContent", ""], [4, "ngTemplateOutlet"]], template: function PopoverContentComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0, 1);
        ɵɵlistener("@fadeIn.done", function PopoverContentComponent_Template_div_animation_fadeIn_done_0_listener($event) { return ctx.animationEnd($event); });
        ɵɵtemplate(2, PopoverContentComponent_ng_container_2_Template, 2, 1, "ng-container", 2);
        ɵɵtemplate(3, PopoverContentComponent_ng_template_3_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
    } if (rf & 2) {
        const _r2 = ɵɵreference(4);
        ɵɵproperty("@fadeIn", ctx.animationState);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.template)("ngIfElse", _r2);
    } }, directives: [NgIf, NgTemplateOutlet], styles: ["poppy-content{position:absolute;visibility:visible}.popover-content{background-color:#fff;border-radius:2px;box-shadow:0 3.2px 7.2px 0 rgba(0,0,0,.133),0 .6px 1.8px 0 rgba(0,0,0,.11);box-sizing:border-box;max-height:400px;max-width:600px;overflow:auto}.popover-menu-list{margin:0;padding:0}.popover-menu-item{align-items:center;background-color:transparent;border:0;box-sizing:border-box;color:#323130;cursor:pointer;display:flex;justify-content:space-between;list-style:none;outline:0;padding:9px 12px;position:relative;text-align:left;width:100%}.popover-menu-item:disabled{opacity:.5}.popover-menu-item--focused,.popover-menu-item--selected,.popover-menu-item:hover{background-color:#edebe9}.popover-menu-item--hidden{display:none}"], encapsulation: 2, data: { animation: [fadeInAnimation] } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverContentComponent, [{
        type: Component,
        args: [{
                selector: 'poppy-content',
                templateUrl: './popover-content.component.html',
                styleUrls: ['./popover-content.component.scss'],
                animations: [fadeInAnimation],
                encapsulation: ViewEncapsulation.None,
            }]
    }], function () { return [{ type: ElementRef }, { type: NgZone }, { type: ComponentFactoryResolver }, { type: PopoverService }, { type: PopoverEventsService }, { type: ChangeDetectorRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [POPOVER_CONFIG]
            }] }]; }, { popoverWrapperEl: [{
            type: ViewChild,
            args: ['popoverWrapperEl']
        }] }); })();

class LayerModule {
}
LayerModule.ɵmod = ɵɵdefineNgModule({ type: LayerModule });
LayerModule.ɵinj = ɵɵdefineInjector({ factory: function LayerModule_Factory(t) { return new (t || LayerModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(LayerModule, { declarations: [LayerComponent], imports: [CommonModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(LayerModule, [{
        type: NgModule,
        args: [{
                declarations: [LayerComponent],
                imports: [CommonModule],
            }]
    }], null, null); })();

class BasePopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.trigger = 'click';
        // Options
        this.delayClose = null;
        this.closeOnTriggerAgain = undefined;
        this.closeOnClickOutside = true;
        this.hideOnScroll = false;
        this.position = 'bottom';
        // Emitters
        this.afterClose = new EventEmitter();
        this.afterShow = new EventEmitter();
        this.type = 'popover';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.setOptions();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
    close() {
        if (this.popoverComponentRef) {
            this.remove(this.popoverComponentRef);
        }
    }
    appendToLayer(options) {
        const injector = this.getPopoverComponentInjector();
        const opts = Object.assign(Object.assign({}, options), { delayClose: this.delayClose, closeOnTriggerAgain: this.closeOnTriggerAgain, hideOnScroll: this.hideOnScroll });
        this.popoverComponentRef = this.popoverService.append(injector, this, opts);
    }
    remove(popoverRef) {
        this.ngZone.run(() => {
            this.popoverService.remove(popoverRef);
        });
    }
    setOptions() {
        if (this.closeOnTriggerAgain === undefined) {
            this.closeOnTriggerAgain = !(this.type === 'tooltip' ||
                this.trigger === 'hover' ||
                this.type === 'context');
        }
    }
}
BasePopoverDirective.ɵfac = function BasePopoverDirective_Factory(t) { return new (t || BasePopoverDirective)(ɵɵdirectiveInject(ComponentFactoryResolver), ɵɵdirectiveInject(PopoverService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone)); };
BasePopoverDirective.ɵdir = ɵɵdefineDirective({ type: BasePopoverDirective, inputs: { trigger: "trigger", delayClose: "delayClose", closeOnTriggerAgain: "closeOnTriggerAgain", closeOnClickOutside: "closeOnClickOutside", hideOnScroll: "hideOnScroll", innerClass: "innerClass", position: "position" }, outputs: { afterClose: "afterClose", afterShow: "afterShow" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BasePopoverDirective, [{
        type: Directive
    }], function () { return [{ type: ComponentFactoryResolver }, { type: PopoverService }, { type: ElementRef }, { type: NgZone }]; }, { trigger: [{
            type: Input
        }], delayClose: [{
            type: Input
        }], closeOnTriggerAgain: [{
            type: Input
        }], closeOnClickOutside: [{
            type: Input
        }], hideOnScroll: [{
            type: Input
        }], innerClass: [{
            type: Input
        }], position: [{
            type: Input
        }], afterClose: [{
            type: Output
        }], afterShow: [{
            type: Output
        }] }); })();

class PopoverDirective extends BasePopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        super(componentFactoryResolver, popoverService, hostElement, ngZone);
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
    }
    ngAfterViewInit() {
        if (this.poppyPopover) {
            this.ngZone.runOutsideAngular(() => {
                if (this.trigger === 'click') {
                    this.listenEventsForClickTrigger();
                }
                if (this.trigger === 'hover') {
                    this.listenEventsForHoverTrigger();
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
    getPopoverComponentInjector() {
        const providerValues = {
            bounds: this.hostElement.nativeElement.getBoundingClientRect(),
            type: this.type,
            trigger: this.trigger,
            triggerElement: this.hostElement,
            triggerDirective: this,
            content: this.poppyPopover,
            closeOnClickOutside: this.closeOnClickOutside,
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
        return !this.popoverComponentRef || (this.popoverComponentRef && this.closeOnTriggerAgain);
    }
    listenEventsForClickTrigger() {
        fromEvent(this.hostElement.nativeElement, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.open();
        });
    }
    listenEventsForHoverTrigger() {
        let popoverHovered = false;
        let hostHovered = false;
        let isMouseLeftBeforeDelayTimePast = false;
        merge(fromEvent(this.hostElement.nativeElement, 'mouseenter'), fromEvent(this.hostElement.nativeElement, 'click'))
            .pipe(takeUntil(this.destroy$), tap(() => {
            fromEvent(this.hostElement.nativeElement, 'mouseleave')
                .pipe(takeUntil(this.destroy$), takeUntil(this.afterClose), debounceTime(200))
                .subscribe(() => {
                hostHovered = false;
                isMouseLeftBeforeDelayTimePast = true;
                setTimeout(() => {
                    isMouseLeftBeforeDelayTimePast = false;
                }, 200);
                if (!popoverHovered) {
                    this.remove(this.popoverComponentRef);
                }
            });
        }), switchMap(() => timer(300)))
            .subscribe(() => {
            const isHostElementStillInDOM = document.body.contains(this.hostElement.nativeElement);
            popoverHovered = false;
            hostHovered = true;
            if (isHostElementStillInDOM && !isMouseLeftBeforeDelayTimePast) {
                this.open();
            }
            setTimeout(() => {
                if (this.popoverComponentRef) {
                    fromEvent(this.popoverComponentRef.instance.element.nativeElement, 'mouseenter')
                        .pipe(takeUntil(this.afterClose))
                        .subscribe(() => {
                        popoverHovered = true;
                    });
                    fromEvent(this.popoverComponentRef.instance.element.nativeElement, 'mouseleave')
                        .pipe(takeUntil(this.afterClose))
                        .subscribe(() => {
                        popoverHovered = false;
                        if (!hostHovered) {
                            this.remove(this.popoverComponentRef);
                        }
                    });
                }
            }, 0);
        });
        this.destroy$.pipe(take(1)).subscribe(() => {
            if (this.popoverComponentRef) {
                this.remove(this.popoverComponentRef);
            }
        });
    }
    append() {
        const options = new PopoverAppendOptions({
            type: 'popover',
            triggeredBy: this.trigger,
        });
        this.appendToLayer(options);
    }
}
PopoverDirective.ɵfac = function PopoverDirective_Factory(t) { return new (t || PopoverDirective)(ɵɵdirectiveInject(ComponentFactoryResolver), ɵɵdirectiveInject(PopoverService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone)); };
PopoverDirective.ɵdir = ɵɵdefineDirective({ type: PopoverDirective, selectors: [["", "poppyPopover", ""]], inputs: { poppyPopover: "poppyPopover" }, exportAs: ["poppyPopover"], features: [ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyPopover]',
                exportAs: 'poppyPopover',
            }]
    }], function () { return [{ type: ComponentFactoryResolver }, { type: PopoverService }, { type: ElementRef }, { type: NgZone }]; }, { poppyPopover: [{
            type: Input
        }] }); })();

class PopoverChipDirective {
    constructor(template) {
        this.template = template;
    }
}
PopoverChipDirective.ɵfac = function PopoverChipDirective_Factory(t) { return new (t || PopoverChipDirective)(ɵɵdirectiveInject(TemplateRef)); };
PopoverChipDirective.ɵdir = ɵɵdefineDirective({ type: PopoverChipDirective, selectors: [["", "poppy-chip", ""]], exportAs: ["poppyChip"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverChipDirective, [{
        type: Directive,
        args: [{
                selector: '[poppy-chip]',
                exportAs: 'poppyChip'
            }]
    }], function () { return [{ type: TemplateRef }]; }, null); })();

class PopoverChipRemoveDirective {
    constructor(selectComponentRef) {
        this.selectComponentRef = selectComponentRef;
    }
    onClick(event) {
        this.remove(event);
    }
    remove(event) {
        if (this.selectComponentRef) {
            this.selectComponentRef.closeChip(this.poppyChipRemove, event);
        }
    }
}
PopoverChipRemoveDirective.ɵfac = function PopoverChipRemoveDirective_Factory(t) { return new (t || PopoverChipRemoveDirective)(ɵɵdirectiveInject(PopoverSelectComponent)); };
PopoverChipRemoveDirective.ɵdir = ɵɵdefineDirective({ type: PopoverChipRemoveDirective, selectors: [["", "poppyChipRemove", ""]], hostBindings: function PopoverChipRemoveDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function PopoverChipRemoveDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
    } }, inputs: { poppyChipRemove: "poppyChipRemove" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverChipRemoveDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyChipRemove]'
            }]
    }], function () { return [{ type: PopoverSelectComponent }]; }, { poppyChipRemove: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();

class PopoverMenuDirective extends BasePopoverDirective {
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
PopoverMenuDirective.ɵfac = function PopoverMenuDirective_Factory(t) { return new (t || PopoverMenuDirective)(ɵɵdirectiveInject(ComponentFactoryResolver), ɵɵdirectiveInject(PopoverService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone)); };
PopoverMenuDirective.ɵdir = ɵɵdefineDirective({ type: PopoverMenuDirective, selectors: [["", "poppyMenu", ""]], inputs: { poppyMenu: "poppyMenu", type: "type", closeOnClickItem: "closeOnClickItem" }, exportAs: ["poppyMenu"], features: [ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverMenuDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyMenu]',
                exportAs: 'poppyMenu',
            }]
    }], function () { return [{ type: ComponentFactoryResolver }, { type: PopoverService }, { type: ElementRef }, { type: NgZone }]; }, { poppyMenu: [{
            type: Input
        }], type: [{
            type: Input
        }], closeOnClickItem: [{
            type: Input
        }] }); })();

class PopoverOptionDirective {
    constructor(template) {
        this.template = template;
    }
}
PopoverOptionDirective.ɵfac = function PopoverOptionDirective_Factory(t) { return new (t || PopoverOptionDirective)(ɵɵdirectiveInject(TemplateRef)); };
PopoverOptionDirective.ɵdir = ɵɵdefineDirective({ type: PopoverOptionDirective, selectors: [["", "poppy-option", ""]], exportAs: ["poppyOption"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverOptionDirective, [{
        type: Directive,
        args: [{
                selector: '[poppy-option]',
                exportAs: 'poppyOption',
            }]
    }], function () { return [{ type: TemplateRef }]; }, null); })();

class PopoverRemoveOnClickDirective {
    constructor(host, popoverService) {
        this.host = host;
        this.popoverService = popoverService;
    }
    onClick() {
        this.remove();
    }
    remove() {
        setTimeout(() => {
            const parentElement = this.host.nativeElement.closest('poppy-content');
            this.popoverService.removeByNativeElementRef(parentElement);
        });
    }
}
PopoverRemoveOnClickDirective.ɵfac = function PopoverRemoveOnClickDirective_Factory(t) { return new (t || PopoverRemoveOnClickDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(PopoverService)); };
PopoverRemoveOnClickDirective.ɵdir = ɵɵdefineDirective({ type: PopoverRemoveOnClickDirective, selectors: [["", "poppyRemoveOnClick", ""]], hostBindings: function PopoverRemoveOnClickDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function PopoverRemoveOnClickDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
    } } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverRemoveOnClickDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyRemoveOnClick]',
            }]
    }], function () { return [{ type: ElementRef }, { type: PopoverService }]; }, { onClick: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();

class TooltipDirective extends PopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        super(componentFactoryResolver, popoverService, hostElement, ngZone);
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.trigger = 'hover';
        this.type = 'tooltip';
    }
    ngOnInit() {
        this.poppyPopover = this.poppyTooltip;
    }
}
TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(ɵɵdirectiveInject(ComponentFactoryResolver), ɵɵdirectiveInject(PopoverService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone)); };
TooltipDirective.ɵdir = ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "poppyTooltip", ""]], inputs: { poppyTooltip: "poppyTooltip" }, features: [ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(TooltipDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyTooltip]',
            }]
    }], function () { return [{ type: ComponentFactoryResolver }, { type: PopoverService }, { type: ElementRef }, { type: NgZone }]; }, { poppyTooltip: [{
            type: Input
        }] }); })();

const _c0$3 = ["input"];
const _c1 = function (a0) { return { $implicit: a0 }; };
function PopoverSelectComponent_div_2_div_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementContainer(1, 16);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const chip_r10 = ɵɵnextContext().$implicit;
    const ctx_r11 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r11.chipTemplate.template)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, chip_r10));
} }
function PopoverSelectComponent_div_2_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 17);
    ɵɵelementStart(1, "div", 18);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 19);
    ɵɵlistener("click", function PopoverSelectComponent_div_2_div_1_div_2_Template_div_click_3_listener($event) { ɵɵrestoreView(_r16); const chip_r10 = ɵɵnextContext().$implicit; const ctx_r14 = ɵɵnextContext(2); return ctx_r14.closeChip(chip_r10, $event); });
    ɵɵtext(4, " \u2716 ");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const chip_r10 = ɵɵnextContext().$implicit;
    const ctx_r12 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r12.getDisplayLabel(chip_r10));
} }
function PopoverSelectComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵtemplate(1, PopoverSelectComponent_div_2_div_1_ng_container_1_Template, 2, 4, "ng-container", 7);
    ɵɵtemplate(2, PopoverSelectComponent_div_2_div_1_div_2_Template, 5, 1, "div", 15);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r8.chipTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r8.chipTemplate);
} }
function PopoverSelectComponent_div_2_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 20);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r9.placeholder);
} }
function PopoverSelectComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, PopoverSelectComponent_div_2_div_1_Template, 3, 2, "div", 12);
    ɵɵtemplate(2, PopoverSelectComponent_div_2_span_2_Template, 2, 1, "span", 13);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.displayedChips);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.selectedOptions.length);
} }
function PopoverSelectComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r19 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 21);
    ɵɵelementStart(1, "button", 22);
    ɵɵlistener("click", function PopoverSelectComponent_div_5_Template_button_click_1_listener($event) { ɵɵrestoreView(_r19); const ctx_r18 = ɵɵnextContext(); return ctx_r18.clear($event); });
    ɵɵtext(2, "\u00D7");
    ɵɵelementEnd();
    ɵɵelementEnd();
} }
function PopoverSelectComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 23);
} }
function PopoverSelectComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 24);
    ɵɵtext(2, " loader.. ");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} }
function PopoverSelectComponent_li_10_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementContainer(1, 16);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const option_r20 = ɵɵnextContext().$implicit;
    const ctx_r21 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r21.optionTemplate.template)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, option_r20));
} }
function PopoverSelectComponent_li_10_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const option_r20 = ɵɵnextContext().$implicit;
    const ctx_r22 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r22.getDisplayLabel(option_r20), " ");
} }
function PopoverSelectComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    const _r26 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 25);
    ɵɵlistener("clicked", function PopoverSelectComponent_li_10_Template_li_clicked_0_listener() { ɵɵrestoreView(_r26); const option_r20 = ctx.$implicit; const ctx_r25 = ɵɵnextContext(); return ctx_r25.onClickItem(option_r20); });
    ɵɵtemplate(1, PopoverSelectComponent_li_10_ng_container_1_Template, 2, 4, "ng-container", 7);
    ɵɵtemplate(2, PopoverSelectComponent_li_10_ng_container_2_Template, 2, 1, "ng-container", 7);
    ɵɵelementEnd();
} if (rf & 2) {
    const option_r20 = ctx.$implicit;
    const ctx_r6 = ɵɵnextContext();
    ɵɵproperty("hidden", option_r20.hidden)("selected", option_r20.selected);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r6.optionTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r6.optionTemplate);
} }
function PopoverSelectComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 26);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r7.notFoundText);
} }
class PopoverSelectComponent {
    constructor(cdr, controlContainer) {
        this.cdr = cdr;
        this.controlContainer = controlContainer;
        this.options = [];
        this.bindLabel = 'label';
        this.multiselect = false;
        this.clearable = true;
        this.searchable = true;
        this.placeholder = 'Wybierz..';
        this.notFoundText = 'Nie znaleziono wyników';
        this.changed = new EventEmitter();
        this.selectedOptions = [];
        this.displayedOptions = [];
        this.displayedChips = [];
        this.asyncLoading = false;
        this.isMenuOpen = false;
        this.destroy$ = new Subject();
        this.propagateChange = (value) => { };
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (changes.options && changes.options.previousValue !== changes.options.currentValue) {
            this.onOptionsChange();
        }
        if (changes.value && changes.value.previousValue !== changes.value.currentValue) {
            this.writeValue(this.value);
        }
    }
    ngAfterViewInit() {
        this.menuRef.afterClose.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.isMenuOpen = false;
            if (!this.multiselect) {
                this.onCloseMenu();
            }
            this.cdr.detectChanges();
        });
        this.menuRef.afterShow.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.isMenuOpen = true;
            this.cdr.detectChanges();
        });
        this.menuRef.afterClose.pipe(take(1)).subscribe(() => {
            // TODO: mark as touched..
            // if (this.control) {
            //   this.control.markAsTouched();
            //   this.control.updateValueAndValidity();
            // }
        });
        if (this.async) {
            this.loadAsyncOptions(null, { firstLoad: true });
        }
        if (this.searchable) {
            this.onInputKeyUp();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    get noItemsFound() {
        return !this.displayedOptions.length || !!this.displayedOptions.every((opt) => opt.hidden);
    }
    writeValue(value) {
        if (value !== undefined) {
            if (this.multiselect) {
                this.updateSelectedItemsForMultiSelection(value);
            }
            else {
                this.updateSelectedItemsForSingleSelection(value);
            }
        }
        else {
            this.reset();
        }
        setTimeout(() => {
            this.cdr.detectChanges();
        });
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    setDisabledState(isDisabled) { }
    getDisplayLabel(option) {
        return this.bindLabel ? option[this.bindLabel] : '';
    }
    onClickItem(clickedOption) {
        this.selectedOptions = [];
        this.displayedOptions.forEach((option, index) => {
            if (this.matchByValueOrReference(option, clickedOption)) {
                this.displayedOptions[index].selected = this.multiselect ? !option.selected : true;
                this.displayedOptions[index].hidden = this.multiselect ? !option.hidden : false;
            }
            else {
                if (!this.multiselect) {
                    this.displayedOptions[index].selected = false;
                }
            }
            if (this.displayedOptions[index].selected) {
                this.selectedOptions.push(this.options[index]);
            }
        });
        if (this.multiselect) {
            this.updateDisplayedChips();
        }
        if (!this.multiselect) {
            this.inputEl.nativeElement.value = this.bindLabel ? this.selectedOptions[0][this.bindLabel] : '';
        }
        this.emitChange();
        this.cdr.detectChanges();
    }
    onChangeInput(target) {
        const value = target.value;
        if (this.bindLabel) {
            if (this.async) {
                this.loadAsyncOptions(value);
            }
            else {
                this.displayedOptions.forEach((option, index) => {
                    this.displayedOptions[index].hidden = !option[this.bindLabel].includes(value);
                });
                this.cdr.detectChanges();
            }
        }
    }
    clear(event) {
        event.stopPropagation();
        this.reset();
        this.emitChange();
    }
    getDisplayValue() {
        if (!!this.selectedOptions.length) {
            if (this.multiselect) {
                return '';
            }
            if (typeof this.selectedOptions[0] === 'object' && this.bindLabel) {
                return this.selectedOptions[0][this.bindLabel];
            }
            return '';
        }
        return '';
    }
    closeChip(chip, event) {
        this.selectedOptions = [];
        this.displayedOptions.forEach((option, index) => {
            if (this.matchByValueOrReference(option, chip)) {
                this.displayedOptions[index].selected = false;
                this.displayedOptions[index].hidden = false;
            }
            if (this.displayedOptions[index].selected) {
                this.selectedOptions.push(this.options[index]);
            }
        });
        this.updateDisplayedChips();
        this.emitChange();
        if (event) {
            event.stopPropagation();
        }
        this.cdr.detectChanges();
    }
    onOptionsChange() {
        this.displayedOptions = [...this.options].map((option) => (Object.assign(Object.assign({}, option), { selected: false, hidden: false })));
    }
    onInputKeyUp() {
        fromEvent(this.inputEl.nativeElement, 'keyup')
            .pipe(tap(() => {
            if (this.async) {
                this.asyncLoading = true;
            }
        }), debounceTime(!!this.async ? 500 : 0), map((event) => event.target), takeUntil(this.destroy$))
            .subscribe((target) => {
            this.onChangeInput(target);
        });
    }
    reset() {
        this.displayedOptions.forEach((option, index) => {
            this.displayedOptions[index].hidden = false;
            this.displayedOptions[index].selected = false;
        });
        this.selectedOptions = [];
        if (this.multiselect) {
            this.displayedChips = [];
        }
    }
    emitChange() {
        const value = this.getPropagateValue();
        this.propagateChange(value);
        this.changed.emit(value);
    }
    getPropagateValue() {
        if (!this.selectedOptions.length) {
            return this.multiselect ? [] : null;
        }
        if (this.multiselect) {
            return this.bindValue
                ? this.selectedOptions.map((option) => option[this.bindValue])
                : this.selectedOptions;
        }
        return this.bindValue ? this.selectedOptions[0][this.bindValue] : this.selectedOptions[0];
    }
    onCloseMenu() {
        this.inputEl.nativeElement.value = !!this.selectedOptions.length
            ? this.selectedOptions[0][this.bindLabel]
            : null;
        this.displayedOptions.forEach((option, index) => {
            this.displayedOptions[index].hidden = false;
        });
    }
    loadAsyncOptions(searchPhrase, options = {}) {
        this.asyncLoading = !options.firstLoad;
        this.async(searchPhrase).subscribe((results) => {
            this.options = results;
            this.onOptionsChange();
            this.asyncLoading = false;
            this.cdr.detectChanges();
        });
    }
    updateSelectedItemsForMultiSelection(value) {
        if (!Array.isArray(value)) {
            if (value !== null) {
                throw Error('Initial value for multiselect must be an array!');
            }
            else {
                value = [];
            }
        }
        this.selectedOptions = [];
        this.displayedChips = [];
        this.options.forEach((option, index) => {
            const matchOption = !!value.find((v) => this.matchByValueOrReference(option, v));
            if (matchOption) {
                this.selectedOptions.push(option);
                this.displayedOptions[index].selected = true;
                this.displayedOptions[index].hidden = true;
            }
            else {
                this.displayedOptions[index].selected = false;
                this.displayedOptions[index].hidden = false;
            }
        });
        this.updateDisplayedChips();
    }
    updateSelectedItemsForSingleSelection(value) {
        this.options.forEach((option, index) => {
            if (this.matchByValueOrReference(option, value)) {
                this.selectedOptions = [option];
                this.displayedOptions[index].selected = true;
            }
            else {
                this.displayedOptions[index].selected = false;
            }
        });
        if (!value) {
            this.selectedOptions = [];
        }
    }
    updateDisplayedChips() {
        this.displayedOptions
            .filter((option) => option.selected)
            .forEach((option) => {
            const chipIndex = this.displayedChips.findIndex((chip) => this.matchByValueOrReference(chip, option));
            if (chipIndex === -1) {
                this.displayedChips.push(option);
            }
        });
        this.displayedChips.forEach((chip, index) => {
            const option = this.displayedOptions
                .filter((opt) => opt.selected)
                .find((opt) => this.matchByValueOrReference(chip, opt));
            if (!option) {
                this.displayedChips.splice(index, 1);
            }
        });
        if (this.menuRef) {
            setTimeout(() => {
                this.menuRef.updateContentPosition();
            });
        }
    }
    matchByValueOrReference(item, comparedTo) {
        if (this.bindValue) {
            if (comparedTo && comparedTo[this.bindValue] !== undefined) {
                // tslint:disable-next-line:triple-equals
                return item[this.bindValue] == comparedTo[this.bindValue];
            }
            // tslint:disable-next-line:triple-equals
            return item[this.bindValue] == comparedTo;
        }
        return item === comparedTo;
    }
}
PopoverSelectComponent.ɵfac = function PopoverSelectComponent_Factory(t) { return new (t || PopoverSelectComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ControlContainer, 13)); };
PopoverSelectComponent.ɵcmp = ɵɵdefineComponent({ type: PopoverSelectComponent, selectors: [["poppy-select"]], contentQueries: function PopoverSelectComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PopoverChipDirective, true);
        ɵɵcontentQuery(dirIndex, PopoverOptionDirective, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.chipTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.optionTemplate = _t.first);
    } }, viewQuery: function PopoverSelectComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$3, true);
        ɵɵviewQuery(PopoverMenuDirective, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.inputEl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.menuRef = _t.first);
    } }, inputs: { options: "options", async: "async", value: "value", bindLabel: "bindLabel", bindValue: "bindValue", multiselect: "multiselect", clearable: "clearable", searchable: "searchable", placeholder: "placeholder", notFoundText: "notFoundText" }, outputs: { changed: "changed" }, features: [ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => PopoverSelectComponent),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => PopoverSelectComponent),
                multi: true,
            },
        ]), ɵɵNgOnChangesFeature], decls: 12, vars: 12, consts: [[1, "poppy-select", 3, "poppyMenu", "closeOnClickItem"], [1, "poppy-select__content"], ["class", "poppy-select__multiselect", 4, "ngIf"], ["type", "text", 3, "hidden", "placeholder", "value", "readOnly"], ["input", ""], ["class", "poppy-select__clear", 4, "ngIf"], ["class", "poppy-select__arrow", 4, "ngIf"], [4, "ngIf"], ["menu", "poppyMenu"], ["poppy-menu-item", "", 3, "hidden", "selected", "clicked", 4, "ngFor", "ngForOf"], ["class", "poppy__no-items", 4, "ngIf"], [1, "poppy-select__multiselect"], ["class", "poppy-select__chip", 4, "ngFor", "ngForOf"], ["class", "poppy-select__placeholder", 4, "ngIf"], [1, "poppy-select__chip"], ["class", "poppy-chip", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "poppy-chip"], [1, "poppy-chip__content"], [1, "poppy-chip__close", 3, "click"], [1, "poppy-select__placeholder"], [1, "poppy-select__clear"], [1, "clear-btn", 3, "click"], [1, "poppy-select__arrow"], [1, "poppy-select__loader"], ["poppy-menu-item", "", 3, "hidden", "selected", "clicked"], [1, "poppy__no-items"]], template: function PopoverSelectComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵtemplate(2, PopoverSelectComponent_div_2_Template, 3, 2, "div", 2);
        ɵɵelement(3, "input", 3, 4);
        ɵɵtemplate(5, PopoverSelectComponent_div_5_Template, 3, 0, "div", 5);
        ɵɵtemplate(6, PopoverSelectComponent_div_6_Template, 1, 0, "div", 6);
        ɵɵtemplate(7, PopoverSelectComponent_ng_container_7_Template, 3, 0, "ng-container", 7);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(8, "poppy-menu", null, 8);
        ɵɵtemplate(10, PopoverSelectComponent_li_10_Template, 3, 4, "li", 9);
        ɵɵtemplate(11, PopoverSelectComponent_div_11_Template, 2, 1, "div", 10);
        ɵɵelementEnd();
    } if (rf & 2) {
        const _r5 = ɵɵreference(9);
        ɵɵproperty("poppyMenu", _r5)("closeOnClickItem", !ctx.multiselect);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.multiselect);
        ɵɵadvance(1);
        ɵɵproperty("hidden", ctx.multiselect)("placeholder", ctx.placeholder)("value", ctx.getDisplayValue())("readOnly", !ctx.searchable);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.clearable && !ctx.multiselect && !!ctx.getDisplayValue());
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.asyncLoading);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.asyncLoading);
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.displayedOptions);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.noItemsFound);
    } }, directives: [PopoverMenuDirective, NgIf, PopoverMenuComponent, NgForOf, NgTemplateOutlet, PopoverMenuItemDirective], styles: [".poppy-select{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;border:1px solid #acacac;border-radius:3px;box-sizing:border-box;cursor:pointer;display:flex;min-height:42px;user-select:none}.poppy-select__content{height:100%;min-height:18px;position:relative;width:100%}.poppy-select__content input{background-color:transparent;border:0;box-sizing:border-box;cursor:pointer;height:100%;outline:0;padding:0 2rem 0 .8rem;width:100%}.poppy-select__chips{height:100%;margin-bottom:-6px}.poppy-select__multiselect{align-items:center;border-radius:4px;box-sizing:border-box;display:flex;flex-wrap:wrap;height:100%;padding:0 .8rem;width:100%}.poppy-select__chip{display:inline-block;margin-bottom:4px;margin-right:6px;margin-top:4px}.poppy-select__arrow{color:#f6f6f6;position:absolute;right:8px;top:12px}.poppy-select__clear{color:#f6f6f6;position:absolute;right:4px;top:-2px}.poppy-chip{align-items:stretch;background-color:#edebe9;border-radius:16px;cursor:pointer;display:flex;font-size:.92em;height:26px;line-height:1;overflow:hidden}.poppy-chip__content{align-items:center;display:flex;font-size:inherit;line-height:1rem;margin-right:4px;padding:0 0 0 10px}.poppy-chip__close{align-items:center;background-color:#cfcfcf;border-radius:16px;display:flex;font-size:.86em;justify-content:center;padding-top:1px;width:26px}.poppy-chip__close:hover{background-color:#c2c2c2}.poppy__no-items{padding:14px 10px}.poppy-select__placeholder{color:#767676}.poppy-select__loader{position:absolute;right:15px;top:12px}"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverSelectComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'poppy-select',
                templateUrl: './popover-select.component.html',
                styleUrls: ['./popover-select.component.scss'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => PopoverSelectComponent),
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => PopoverSelectComponent),
                        multi: true,
                    },
                ],
            }]
    }], function () { return [{ type: ChangeDetectorRef }, { type: ControlContainer, decorators: [{
                type: Optional
            }, {
                type: Host
            }, {
                type: SkipSelf
            }] }]; }, { options: [{
            type: Input
        }], async: [{
            type: Input
        }], value: [{
            type: Input
        }], bindLabel: [{
            type: Input
        }], bindValue: [{
            type: Input
        }], multiselect: [{
            type: Input
        }], clearable: [{
            type: Input
        }], searchable: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], notFoundText: [{
            type: Input
        }], changed: [{
            type: Output
        }], inputEl: [{
            type: ViewChild,
            args: ['input']
        }], menuRef: [{
            type: ViewChild,
            args: [PopoverMenuDirective]
        }], chipTemplate: [{
            type: ContentChild,
            args: [PopoverChipDirective]
        }], optionTemplate: [{
            type: ContentChild,
            args: [PopoverOptionDirective]
        }] }); })();

class PopoverModule {
}
PopoverModule.ɵmod = ɵɵdefineNgModule({ type: PopoverModule });
PopoverModule.ɵinj = ɵɵdefineInjector({ factory: function PopoverModule_Factory(t) { return new (t || PopoverModule)(); }, imports: [[CommonModule, BrowserAnimationsModule, LayerModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(PopoverModule, { declarations: [PopoverDirective,
        PopoverMenuDirective,
        PopoverContentComponent,
        PopoverMenuItemDirective,
        PopoverMenuComponent,
        PopoverSelectComponent,
        PopoverChipDirective,
        PopoverChipRemoveDirective,
        PopoverRemoveOnClickDirective,
        PopoverOptionDirective,
        TooltipDirective], imports: [CommonModule, BrowserAnimationsModule, LayerModule], exports: [PopoverDirective,
        PopoverMenuDirective,
        PopoverMenuItemDirective,
        PopoverMenuComponent,
        PopoverSelectComponent,
        PopoverChipDirective,
        PopoverChipRemoveDirective,
        PopoverRemoveOnClickDirective,
        PopoverOptionDirective,
        TooltipDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(PopoverModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    PopoverDirective,
                    PopoverMenuDirective,
                    PopoverContentComponent,
                    PopoverMenuItemDirective,
                    PopoverMenuComponent,
                    PopoverSelectComponent,
                    PopoverChipDirective,
                    PopoverChipRemoveDirective,
                    PopoverRemoveOnClickDirective,
                    PopoverOptionDirective,
                    TooltipDirective,
                ],
                imports: [CommonModule, BrowserAnimationsModule, LayerModule],
                exports: [
                    PopoverDirective,
                    PopoverMenuDirective,
                    PopoverMenuItemDirective,
                    PopoverMenuComponent,
                    PopoverSelectComponent,
                    PopoverChipDirective,
                    PopoverChipRemoveDirective,
                    PopoverRemoveOnClickDirective,
                    PopoverOptionDirective,
                    TooltipDirective,
                ],
            }]
    }], null, null); })();

/*
 * Public API Surface of lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PopoverChipDirective, PopoverChipRemoveDirective, PopoverDirective, PopoverMenuComponent, PopoverMenuDirective, PopoverMenuItemDirective, PopoverModule, PopoverOptionDirective, PopoverRemoveOnClickDirective, PopoverSelectComponent, TooltipDirective };
//# sourceMappingURL=ng-poppy-popover.js.map
