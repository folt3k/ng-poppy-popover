(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('@angular/animations'), require('@angular/forms'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('@ng-poppy/popover', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators', '@angular/animations', '@angular/forms', '@angular/platform-browser/animations'], factory) :
    (global = global || self, factory((global['ng-poppy'] = global['ng-poppy'] || {}, global['ng-poppy'].popover = {}), global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators, global.ng.animations, global.ng.forms, global.ng.platformBrowser.animations));
}(this, (function (exports, i0, i3, rxjs, operators, animations, i1, animations$1) { 'use strict';

    var POPOVER_CONFIG = new i0.InjectionToken('popover-config');

    var PopoverAppendOptions = /** @class */ (function () {
        function PopoverAppendOptions(options) {
            this.type = options.type;
            this.triggeredBy = options.triggeredBy || 'click';
            this.closeOnScroll = options.closeOnScroll !== undefined ? options.closeOnScroll : true;
            this.delayClose = Number.isInteger(options.delayClose) ? options.delayClose : null;
            this.closeOnTriggerAgain = !!options.closeOnTriggerAgain;
            this.hideOnScroll = !!options.hideOnScroll;
        }
        return PopoverAppendOptions;
    }());

    var fadeInAnimation = animations.trigger('fadeIn', [
        animations.state('open', animations.style({
            transform: 'translateY(0px)',
            opacity: 1,
        })),
        animations.state('close', animations.style({
            transform: 'translateY(-6px)',
            opacity: 0.5,
        })),
        animations.transition('close => open', [animations.animate('0.15s')]),
    ]);

    var SPACE_FROM_BOTTOM = 20;
    var SPACE_FROM_TOP = 10;
    var HORIZONTAL_SPACE = 10;
    var POSITION_MEASURE_UNIT = 'px';
    var PopoverStyles = /** @class */ (function () {
        function PopoverStyles(popover) {
            this.initHostElementWidth = 0;
            this.popover = popover;
            this.hostElement = popover.element;
            this.config = popover.popoverConfig;
            this.type = this.config.type;
            this.position = this.config.position;
        }
        PopoverStyles.prototype.init = function () {
            var _this = this;
            var hostBounds = this.config.bounds;
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
                var triggerItem = this.config.submenuTriggeredItem.element.nativeElement;
                var triggerBounds = triggerItem.getBoundingClientRect();
                this.hostElement.nativeElement.style.minWidth = 0;
                this.setPositionStyle('top', triggerBounds.top);
            }
            if (this.canAssignPadding) {
                var padding = this.isTooltip ? '8px 12px' : '15px 25px';
                this.popover.popoverWrapperEl.nativeElement.style.padding = padding;
            }
            this.hostElement.nativeElement.style.visibility = 'hidden';
            setTimeout(function () {
                _this.initHostElementWidth = _this.hostElement.nativeElement.offsetWidth + 1;
                _this.hostElement.nativeElement.style.minWidth = _this.initHostElementWidth + 'px';
            });
        };
        PopoverStyles.prototype.update = function () {
            this.setLeftPosition();
            this.setTopPosition();
            this.setWidth();
            this.hostElement.nativeElement.style.visibility = 'visible';
        };
        PopoverStyles.prototype.setTopPosition = function () {
            var windowHeight = window.innerHeight;
            var elementHeight = this.hostElement.nativeElement.getBoundingClientRect().height;
            var triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();
            if (this.config.triggerDirective) {
                var hostTopPosition = this.config.type === 'context' ? this.config.bounds.top : triggerBounds.top + triggerBounds.height;
                var isBelowWindowCenterHeight = elementHeight >= windowHeight - hostTopPosition - SPACE_FROM_BOTTOM;
                if (isBelowWindowCenterHeight) {
                    if (this.config.type === 'context') {
                        this.setPositionStyle('top', +this.config.bounds.top - elementHeight + SPACE_FROM_TOP);
                    }
                    else {
                        var newPos = triggerBounds.top - elementHeight - SPACE_FROM_TOP;
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
                var hostBounds = this.config.submenuTriggeredItem.element.nativeElement.getBoundingClientRect();
                var hostPosition = hostBounds.top;
                if (elementHeight >= windowHeight - hostPosition - SPACE_FROM_BOTTOM) {
                    var diff = elementHeight - (windowHeight - hostPosition);
                    this.setPositionStyle('top', hostPosition - diff - SPACE_FROM_BOTTOM);
                }
                else {
                    this.setPositionStyle('top', hostPosition);
                }
            }
        };
        PopoverStyles.prototype.setLeftPosition = function () {
            var windowWidth = window.innerWidth;
            var elementWidth = this.hostElement.nativeElement.getBoundingClientRect().width;
            var triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();
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
                var hostRecBounds = this.hostElement.nativeElement.getBoundingClientRect();
                if (hostRecBounds.right > windowWidth - 20) {
                    this.setPositionStyle('left', hostRecBounds.left - (hostRecBounds.right - windowWidth + 20));
                }
                if (hostRecBounds.left < 0) {
                    this.setPositionStyle('left', 15);
                }
            }
            else {
                var hostBounds = this.config.submenuTriggeredItem.element.nativeElement.getBoundingClientRect();
                if (elementWidth > windowWidth - hostBounds.right) {
                    this.setPositionStyle('left', hostBounds.left - this.initHostElementWidth);
                }
                else {
                    this.setPositionStyle('left', hostBounds.right);
                }
            }
        };
        PopoverStyles.prototype.setWidth = function () {
            var triggerBounds = this.config.triggerElement.nativeElement.getBoundingClientRect();
            if (!this.isContextType && !this.isSubmenuType) {
                var windowWidth = window.innerWidth;
                var hostElBounds = this.hostElement.nativeElement.getBoundingClientRect();
                this.hostElement.nativeElement.style.minWidth = this.initHostElementWidth + POSITION_MEASURE_UNIT;
                if (!this.isMenuType) {
                    if (hostElBounds.width > windowWidth || this.initHostElementWidth > windowWidth - 30) {
                        this.hostElement.nativeElement.style.width = windowWidth - 30 + POSITION_MEASURE_UNIT;
                        this.hostElement.nativeElement.style.minWidth = windowWidth - 30 + POSITION_MEASURE_UNIT;
                        this.setPositionStyle('left', 15);
                    }
                }
            }
        };
        PopoverStyles.prototype.setPositionStyle = function (property, value) {
            this.hostElement.nativeElement.style[property] = value + POSITION_MEASURE_UNIT;
        };
        Object.defineProperty(PopoverStyles.prototype, "defaultLeftPosition", {
            get: function () {
                return this.config.bounds.left;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PopoverStyles.prototype, "canAssignPadding", {
            get: function () {
                return ((!this.isContextType && !this.isMenuType && !this.isSubmenuType) ||
                    (this.isSubmenuType && !!this.config.content));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PopoverStyles.prototype, "isContextType", {
            get: function () {
                return this.type === 'context';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PopoverStyles.prototype, "isMenuType", {
            get: function () {
                return this.type === 'menu';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PopoverStyles.prototype, "isSubmenuType", {
            get: function () {
                return this.type === 'submenu';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PopoverStyles.prototype, "isTooltip", {
            get: function () {
                return this.type === 'tooltip';
            },
            enumerable: false,
            configurable: true
        });
        return PopoverStyles;
    }());

    var PopoverMenuItemDirective = /** @class */ (function () {
        function PopoverMenuItemDirective(element) {
            this.element = element;
            this.selected = false;
            this.hidden = false;
            this.clicked = new i0.EventEmitter();
        }
        Object.defineProperty(PopoverMenuItemDirective.prototype, "selectedClass", {
            get: function () {
                return this.selected;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PopoverMenuItemDirective.prototype, "hiddenClass", {
            get: function () {
                return this.hidden;
            },
            enumerable: false,
            configurable: true
        });
        PopoverMenuItemDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.clicked$ = rxjs.fromEvent(this.element.nativeElement, 'click').pipe(operators.tap(function () {
                _this.clicked.emit();
            }));
            this.hovered$ = rxjs.fromEvent(this.element.nativeElement, 'mousemove');
            // this.global$ = fromEvent<MouseEvent>(document, 'click').pipe(tap(() => console.log('clicked window')));
        };
        PopoverMenuItemDirective.prototype.ngAfterViewInit = function () {
            this.element.nativeElement.classList.add('popover-menu-item');
        };
        return PopoverMenuItemDirective;
    }());
    PopoverMenuItemDirective.ɵfac = function PopoverMenuItemDirective_Factory(t) { return new (t || PopoverMenuItemDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    PopoverMenuItemDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverMenuItemDirective, selectors: [["", "poppy-menu-item", ""]], hostVars: 4, hostBindings: function PopoverMenuItemDirective_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("popover-menu-item--selected", ctx.selectedClass)("popover-menu-item--hidden", ctx.hiddenClass);
            }
        }, inputs: { submenu: "submenu", selected: "selected", hidden: "hidden" }, outputs: { clicked: "clicked" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverMenuItemDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppy-menu-item]',
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { submenu: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], hidden: [{
                    type: i0.Input
                }], clicked: [{
                    type: i0.Output
                }], selectedClass: [{
                    type: i0.HostBinding,
                    args: ['class.popover-menu-item--selected']
                }], hiddenClass: [{
                    type: i0.HostBinding,
                    args: ['class.popover-menu-item--hidden']
                }] });
    })();

    function PopoverMenuComponent_ng_template_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵprojection(0);
        }
    }
    var _c0 = ["*"];
    var PopoverMenuComponent = /** @class */ (function () {
        function PopoverMenuComponent() {
        }
        return PopoverMenuComponent;
    }());
    PopoverMenuComponent.ɵfac = function PopoverMenuComponent_Factory(t) { return new (t || PopoverMenuComponent)(); };
    PopoverMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PopoverMenuComponent, selectors: [["poppy-menu"]], contentQueries: function PopoverMenuComponent_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, PopoverMenuItemDirective, false);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuItems = _t);
            }
        }, viewQuery: function PopoverMenuComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(i0.TemplateRef, true);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.templateRef = _t.first);
            }
        }, exportAs: ["poppyMenu"], ngContentSelectors: _c0, decls: 1, vars: 0, template: function PopoverMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵtemplate(0, PopoverMenuComponent_ng_template_0_Template, 1, 0, "ng-template");
            }
        }, encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'poppy-menu',
                        exportAs: 'poppyMenu',
                        templateUrl: './popover-menu.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    }]
            }], function () { return []; }, { menuItems: [{
                    type: i0.ContentChildren,
                    args: [PopoverMenuItemDirective]
                }], templateRef: [{
                    type: i0.ViewChild,
                    args: [i0.TemplateRef]
                }] });
    })();

    var ActivePopover = /** @class */ (function () {
        function ActivePopover(popoverRef, parentPopoverRef, superParentPopoverRef, directiveRef, type, deepLevel) {
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
        return ActivePopover;
    }());

    var LayerAppendOptions = /** @class */ (function () {
        function LayerAppendOptions(options) {
            if (options === void 0) { options = {}; }
            this.delayClose = Number.isInteger(options.delayClose) ? options.delayClose : null;
            this.overlay = !!options.overlay;
        }
        return LayerAppendOptions;
    }());

    var LAYER_CONFIG = new i0.InjectionToken('layer-token');

    var _c0$1 = ["container"];
    var LayerComponent = /** @class */ (function () {
        function LayerComponent(config) {
            this.config = config;
        }
        Object.defineProperty(LayerComponent.prototype, "overlay", {
            get: function () {
                return this.config.overlay;
            },
            enumerable: false,
            configurable: true
        });
        return LayerComponent;
    }());
    LayerComponent.ɵfac = function LayerComponent_Factory(t) { return new (t || LayerComponent)(i0.ɵɵdirectiveInject(LAYER_CONFIG)); };
    LayerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LayerComponent, selectors: [["poppy-layer"]], viewQuery: function LayerComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$1, true, i0.ViewContainerRef);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
            }
        }, hostVars: 2, hostBindings: function LayerComponent_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("poppy-layer--overlay", ctx.overlay);
            }
        }, decls: 2, vars: 0, consts: [["container", ""]], template: function LayerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementContainer(0, null, 0);
            }
        }, styles: ["poppy-layer{bottom:0;display:block;left:0;position:fixed;right:0;top:0;visibility:hidden;z-index:10000}.poppy-layer--overlay{background:rgba(0,0,0,.42);overflow-y:auto;visibility:visible}"], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LayerComponent, [{
                type: i0.Component,
                args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'poppy-layer',
                        templateUrl: './layer.component.html',
                        styleUrls: ['./layer.component.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [LAYER_CONFIG]
                        }] }];
        }, { container: [{
                    type: i0.ViewChild,
                    args: ['container', { read: i0.ViewContainerRef }]
                }], overlay: [{
                    type: i0.HostBinding,
                    args: ['class.poppy-layer--overlay']
                }] });
    })();

    var LayerService = /** @class */ (function () {
        function LayerService(componentFactoryResolver, appRef) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.activeLayers = [];
        }
        LayerService.prototype.appendToBody = function (component, options, injector) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(LayerComponent);
            var componentRef = componentFactory.create(i0.Injector.create([
                {
                    provide: LAYER_CONFIG,
                    useValue: options,
                },
            ]));
            componentRef.changeDetectorRef.detectChanges();
            var appendComponentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            var appendComponentRef = componentRef.instance.container.createComponent(appendComponentFactory, null, injector);
            this.activeLayers.push({
                ref: componentRef,
                appendComponentRef: appendComponentRef,
                options: options,
            });
            this.appRef.attachView(componentRef.hostView);
            var domElem = componentRef.hostView.rootNodes[0];
            document.body.appendChild(domElem);
            return appendComponentRef;
        };
        LayerService.prototype.removeFromBody = function (componentRef) {
            var _this = this;
            var layers = this.activeLayers.filter(function (layer) { return layer.appendComponentRef === componentRef; });
            layers.forEach(function (layer) {
                var delayClose = layer.options.delayClose;
                if (delayClose !== null) {
                    setTimeout(function () {
                        _this.removeLayer(layer);
                    }, delayClose);
                }
                else {
                    _this.removeLayer(layer);
                }
            });
            this.activeLayers = this.activeLayers.filter(function (layer) { return layer.appendComponentRef !== componentRef; });
        };
        LayerService.prototype.removeLayer = function (layer) {
            this.appRef.detachView(layer.ref.hostView);
            layer.ref.changeDetectorRef.detectChanges();
            layer.ref.destroy();
        };
        return LayerService;
    }());
    LayerService.ɵfac = function LayerService_Factory(t) { return new (t || LayerService)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.ApplicationRef)); };
    LayerService.ɵprov = i0.ɵɵdefineInjectable({ token: LayerService, factory: LayerService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LayerService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }]; }, null);
    })();

    var PopoverEventsService = /** @class */ (function () {
        function PopoverEventsService(ngZone) {
            this.ngZone = ngZone;
            this.registeredEvents = [];
        }
        PopoverEventsService.prototype.register = function (type, activePopover, callback) {
            var _this = this;
            var sub;
            this.ngZone.runOutsideAngular(function () {
                var obs = _this.getEventObservable(type);
                sub = obs.subscribe(function (event) {
                    callback(event);
                });
            });
            this.registeredEvents.push({ popover: activePopover, type: type, sub: sub, callback: callback });
        };
        PopoverEventsService.prototype.unregister = function (type, activePopover) {
            this.registeredEvents
                .filter(function (event) { return event.type === type; })
                .forEach(function (event) {
                if (event.popover === activePopover) {
                    event.sub.unsubscribe();
                }
            });
            this.registeredEvents = this.registeredEvents.filter(function (event) { return event.type === type ? event.popover !== activePopover : true; });
        };
        PopoverEventsService.prototype.subscribe = function (type, popover) {
            var obs = this.getEventObservable(type);
            this.registeredEvents
                .filter(function (event) { var _a; return event.type === type && event.popover === popover && ((_a = event.sub) === null || _a === void 0 ? void 0 : _a.closed); })
                .forEach(function (event) {
                event.sub = obs.subscribe(function (e) { return event.callback(e); });
            });
        };
        PopoverEventsService.prototype.unsubscribe = function (type, popover) {
            this.registeredEvents
                .filter(function (event) { return event.type === type && event.popover === popover; })
                .forEach(function (event) {
                event.sub.unsubscribe();
            });
        };
        PopoverEventsService.prototype.getEventObservable = function (type) {
            switch (type) {
                case 'click-outside':
                    return rxjs.merge(rxjs.fromEvent(document, 'click'), rxjs.fromEvent(document, 'contextmenu'))
                        .pipe();
                case 'capture-scroll':
                    return rxjs.fromEvent(document, 'scroll').pipe(operators.tap(function () {
                        // console.log('Capturing scroll event..');
                    }));
                case 'resize':
                    return rxjs.fromEvent(window, 'resize').pipe(operators.tap(function () {
                        // console.log('Resize event..');
                    }));
            }
        };
        return PopoverEventsService;
    }());
    PopoverEventsService.ɵfac = function PopoverEventsService_Factory(t) { return new (t || PopoverEventsService)(i0.ɵɵinject(i0.NgZone)); };
    PopoverEventsService.ɵprov = i0.ɵɵdefineInjectable({ token: PopoverEventsService, factory: PopoverEventsService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverEventsService, [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], function () { return [{ type: i0.NgZone }]; }, null);
    })();

    var PopoverService = /** @class */ (function () {
        function PopoverService(layerService, eventsService) {
            this.layerService = layerService;
            this.eventsService = eventsService;
            this.activePopovers = [];
        }
        PopoverService.prototype.append = function (injector, directive, options, parentPopoverRef) {
            var existedPopover = this.activePopovers.find(function (popover) { return popover.directiveRef === directive; });
            if (options.closeOnTriggerAgain && existedPopover) {
                this.remove(existedPopover.popoverRef);
                return existedPopover.popoverRef;
            }
            else {
                return this.appendToBody(injector, directive, options, parentPopoverRef);
            }
        };
        PopoverService.prototype.remove = function (popoverRef) {
            var active = this.activePopovers.find(function (p) { return p.popoverRef === popoverRef; });
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
                this.activePopovers = this.activePopovers.filter(function (a) { return a.popoverRef !== popoverRef; });
            }
        };
        PopoverService.prototype.removeByNativeElementRef = function (element) {
            var activePopover = this.activePopovers.find(function (active) { return active.popoverRef.location.nativeElement === element; });
            if (activePopover) {
                this.remove(activePopover.popoverRef);
            }
        };
        PopoverService.prototype.getActive = function (popoverRef) {
            return this.activePopovers.find(function (active) { return active.popoverRef === popoverRef; });
        };
        PopoverService.prototype.isPopoverSubmenuExits = function (precendingRef, parentRef) {
            var precendingActivePopover = this.getActive(precendingRef);
            if (!precendingActivePopover || (precendingActivePopover && !precendingActivePopover.deepLevel)) {
                return false;
            }
            return !!this.activePopovers.find(function (popover) { return popover.parentPopoverRef === parentRef && popover.deepLevel === precendingActivePopover.deepLevel + 1; });
        };
        PopoverService.prototype.removeAllNestedPopovers = function (popoverRef) {
            var _this = this;
            var activePopover = this.getActive(popoverRef);
            if (activePopover) {
                this.activePopovers
                    .filter(function (popover) { return popover.deepLevel > activePopover.deepLevel; })
                    .forEach(function (popover) {
                    _this.remove(popover.popoverRef);
                });
            }
        };
        PopoverService.prototype.removeMenu = function (componentRef) {
            var _this = this;
            this.activePopovers
                .filter(function (popover) { return popover.parentPopoverRef === componentRef || popover.popoverRef === componentRef; })
                .forEach(function (popover) {
                _this.remove(popover.popoverRef);
            });
        };
        PopoverService.prototype.subscribeToClickOutsideEventForParentPopover = function (componentRef) {
            var _this = this;
            var currentPopover = this.getActive(componentRef);
            if (currentPopover) {
                var parentPopover_1 = this.activePopovers.find(function (popover) { return popover.superParentPopoverRef === currentPopover.superParentPopoverRef &&
                    popover.deepLevel === currentPopover.deepLevel - 1; });
                if (parentPopover_1) {
                    setTimeout(function () {
                        _this.eventsService.subscribe('click-outside', parentPopover_1);
                    });
                }
            }
        };
        PopoverService.prototype.appendToBody = function (injector, directive, options, parentPopoverRef) {
            var layerOptions = new LayerAppendOptions({ delayClose: options.delayClose });
            var popover = this.layerService.appendToBody(PopoverContentComponent, layerOptions, injector);
            var _a = this.prepareSuperparentAndDeepLevel(popover, parentPopoverRef, directive), superparent = _a.superparent, deepLevel = _a.deepLevel;
            var newPopover = new ActivePopover(popover, parentPopoverRef, superparent, directive, options.type, deepLevel);
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
        };
        PopoverService.prototype.prepareSuperparentAndDeepLevel = function (popover, parentPopover, directive) {
            var deepLevel = 0;
            var superparent = null;
            if (directive) {
                var parentPopover_2 = this.activePopovers.find(function (p) {
                    return p.popoverRef.instance.element.nativeElement.contains(directive.hostElement.nativeElement);
                });
                if (!parentPopover_2) {
                    superparent = popover;
                    deepLevel = 0;
                }
                else {
                    superparent = parentPopover_2.superParentPopoverRef || parentPopover_2.popoverRef;
                    deepLevel = parentPopover_2.deepLevel + 1;
                }
            }
            else {
                var closestParent_1 = this.activePopovers.find(function (p) { return p.popoverRef === parentPopover; });
                if (closestParent_1) {
                    var popoverGroup = this.activePopovers.filter(function (p) { return p.superParentPopoverRef === closestParent_1.superParentPopoverRef; });
                    superparent = closestParent_1.superParentPopoverRef;
                    deepLevel = popoverGroup[popoverGroup.length - 1].deepLevel + 1;
                }
            }
            return {
                deepLevel: deepLevel,
                superparent: superparent,
            };
        };
        PopoverService.prototype.canRegisterScrollCaptureEvent = function (popover, options) {
            var triggeredBy = options.triggeredBy, type = options.type, closeOnScroll = options.closeOnScroll;
            return (popover.directiveRef &&
                popover.deepLevel === 0 &&
                triggeredBy !== 'hover' &&
                type !== 'submenu' &&
                closeOnScroll);
        };
        PopoverService.prototype.canRegisterResizeEvent = function (popover, options) {
            var triggeredBy = options.triggeredBy, type = options.type;
            return popover.directiveRef && popover.deepLevel === 0 && triggeredBy !== 'hover' && type !== 'submenu';
        };
        PopoverService.prototype.registerResizeEvent = function (popover, options) {
            var _this = this;
            this.eventsService.register('resize', popover, function () {
                if (options.type === 'context') {
                    _this.hideGroup(popover);
                }
                else {
                    _this.updateGroupPosition(popover);
                }
            });
        };
        PopoverService.prototype.registerScrollCaptureEvent = function (popover, options) {
            var _this = this;
            this.eventsService.register('capture-scroll', popover, function (event) {
                var captured = popover.directiveRef.hostElement.nativeElement === event.target ||
                    event.target.contains(popover.directiveRef.hostElement.nativeElement);
                if ((captured && options.hideOnScroll) || options.type === 'context') {
                    _this.hideGroup(popover);
                }
                if (captured && !options.hideOnScroll && options.type !== 'context') {
                    _this.updateGroupPosition(popover);
                }
            });
        };
        PopoverService.prototype.hideGroup = function (popover) {
            var _this = this;
            this.activePopovers.forEach(function (active) {
                if (active.superParentPopoverRef === popover.superParentPopoverRef) {
                    _this.remove(active.popoverRef);
                }
            });
        };
        PopoverService.prototype.updateGroupPosition = function (popover) {
            this.activePopovers
                .filter(function (active) { return active.superParentPopoverRef === popover.popoverRef; })
                .forEach(function (active) {
                if (active.popoverRef.instance.componentStyles) {
                    active.popoverRef.instance.componentStyles.update();
                }
            });
        };
        return PopoverService;
    }());
    PopoverService.ɵfac = function PopoverService_Factory(t) { return new (t || PopoverService)(i0.ɵɵinject(LayerService), i0.ɵɵinject(PopoverEventsService)); };
    PopoverService.ɵprov = i0.ɵɵdefineInjectable({ token: PopoverService, factory: PopoverService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return [{ type: LayerService }, { type: PopoverEventsService }]; }, null);
    })();

    var _c0$2 = ["popoverWrapperEl"];
    function PopoverContentComponent_ng_container_2_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function PopoverContentComponent_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, PopoverContentComponent_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 4);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r1.template);
        }
    }
    function PopoverContentComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtext(0);
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵtextInterpolate1(" ", ctx_r3.popoverConfig.content, " ");
        }
    }
    var PopoverContentComponent = /** @class */ (function () {
        function PopoverContentComponent(element, ngZone, componentFactoryResolver, popoverService, popoverEventsService, cdr, popoverConfig) {
            this.element = element;
            this.ngZone = ngZone;
            this.componentFactoryResolver = componentFactoryResolver;
            this.popoverService = popoverService;
            this.popoverEventsService = popoverEventsService;
            this.cdr = cdr;
            this.popoverConfig = popoverConfig;
            this.animationState = 'close';
            this.animationEnd$ = new rxjs.Subject();
            this.menuItemsChanged = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
        }
        PopoverContentComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
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
                this.ngZone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.listenForClickOutside();
                    });
                });
            }
            if ((_a = this.popoverConfig.menuRef) === null || _a === void 0 ? void 0 : _a.menuItems) {
                this.listenForMenuItemTriggers();
                // Subscribe to click outside event again, when menu items changed - it's workaround to refresh host element content;
                this.popoverConfig.menuRef.menuItems.changes.pipe(operators.takeUntil(this.destroy$)).subscribe(function () {
                    _this.menuItemsChanged.next();
                    _this.listenForMenuItemTriggers();
                    _this.popoverEventsService.unregister('click-outside', _this.popoverService.getActive(_this.componentRef));
                    setTimeout(function () {
                        _this.listenForClickOutside();
                        _this.componentStyles.update();
                    }, 0);
                });
            }
        };
        PopoverContentComponent.prototype.ngOnDestroy = function () {
            if (this.popoverConfig.submenuTriggeredItem) {
                this.popoverConfig.submenuTriggeredItem.element.nativeElement.classList.remove('popover-menu-item--focused');
            }
            this.destroy$.next();
            this.destroy$.complete();
        };
        Object.defineProperty(PopoverContentComponent.prototype, "template", {
            get: function () {
                var _a;
                return ((this.popoverConfig.content instanceof i0.TemplateRef &&
                    this.popoverConfig.content) || ((_a = this.popoverConfig.menuRef) === null || _a === void 0 ? void 0 : _a.templateRef));
            },
            enumerable: false,
            configurable: true
        });
        PopoverContentComponent.prototype.animationEnd = function (event) {
            if (event.toState === 'open') {
                this.animationEnd$.next();
            }
        };
        PopoverContentComponent.prototype.applyStyles = function () {
            var _this = this;
            this.componentStyles = new PopoverStyles(this);
            this.componentStyles.init();
            setTimeout(function () {
                _this.componentStyles.update();
                _this.animationState = 'open';
                _this.detectChanges();
            });
        };
        PopoverContentComponent.prototype.onClickMenuItem = function (item) {
            var hasItemNestedSubpopovers = !!item.submenu;
            if (!hasItemNestedSubpopovers) {
                if (this.popoverConfig.closeOnClickItem) {
                    this.close();
                }
            }
        };
        PopoverContentComponent.prototype.onHoverMenuItem = function (item) {
            var canRemoveNestedSubmenus = !this.popoverService.activePopovers.find(function (popover) { return popover.popoverRef.instance.popoverConfig.submenuTriggeredItem === item; });
            var hasItemNestedSubpopovers = !!item.submenu;
            if (canRemoveNestedSubmenus) {
                this.popoverService.removeAllNestedPopovers(this.componentRef);
                this.detectChanges();
            }
            var isSubmenuExists = this.popoverService.isPopoverSubmenuExits(this.componentRef, this.parentPopoverRef);
            if (!isSubmenuExists && hasItemNestedSubpopovers && canRemoveNestedSubmenus) {
                this.createSubpopover(item);
            }
        };
        PopoverContentComponent.prototype.listenForClickOutside = function () {
            var _this = this;
            var activePopover = this.popoverService.getActive(this.componentRef);
            this.popoverEventsService.register('click-outside', activePopover, function (event) {
                var clickedElement = event.target;
                var clickedOutside = clickedElement !== _this.element.nativeElement &&
                    !_this.element.nativeElement.contains(clickedElement) &&
                    clickedElement !== _this.popoverConfig.triggerElement.nativeElement &&
                    !_this.popoverConfig.triggerElement.nativeElement.contains(clickedElement);
                if (_this.popoverConfig.type === 'context' &&
                    (clickedElement === _this.popoverConfig.triggerElement.nativeElement ||
                        _this.popoverConfig.triggerElement.nativeElement.contains(clickedElement))) {
                    clickedOutside = true;
                }
                if (clickedOutside) {
                    _this.close();
                }
            });
        };
        PopoverContentComponent.prototype.listenForMouseEventOnHost = function () {
            var _this = this;
            rxjs.fromEvent(this.element.nativeElement, 'mouseenter')
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () {
                var enteredPopover = _this.popoverService.getActive(_this.componentRef);
                if (enteredPopover === null || enteredPopover === void 0 ? void 0 : enteredPopover.deepLevel) {
                    _this.popoverService.activePopovers.forEach(function (popover, index) {
                        if (index <= enteredPopover.deepLevel) {
                            _this.popoverEventsService.unsubscribe('click-outside', popover);
                        }
                        else {
                            _this.popoverEventsService.subscribe('click-outside', popover);
                        }
                    });
                }
            });
            rxjs.fromEvent(this.element.nativeElement, 'mouseleave')
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () {
                _this.popoverService.activePopovers.forEach(function (popover) {
                    _this.popoverEventsService.subscribe('click-outside', popover);
                });
            });
        };
        PopoverContentComponent.prototype.listenForMenuItemTriggers = function () {
            var _this = this;
            this.popoverConfig.menuRef.menuItems.forEach(function (item) {
                item.clicked$.pipe(operators.takeUntil(_this.destroy$), operators.takeUntil(_this.menuItemsChanged)).subscribe(function () {
                    _this.onClickMenuItem(item);
                });
                item.hovered$
                    .pipe(operators.takeUntil(_this.destroy$), operators.takeUntil(_this.menuItemsChanged), operators.debounceTime(0), operators.skipUntil(_this.animationEnd$))
                    .subscribe(function () {
                    _this.onHoverMenuItem(item);
                });
            });
        };
        PopoverContentComponent.prototype.close = function () {
            if (this.isMenu()) {
                this.popoverService.subscribeToClickOutsideEventForParentPopover(this.componentRef);
                this.popoverService.removeMenu(this.parentPopoverRef);
            }
            else {
                this.popoverService.remove(this.componentRef);
            }
        };
        PopoverContentComponent.prototype.createSubpopover = function (item) {
            var factory = this.componentFactoryResolver.resolveComponentFactory(PopoverContentComponent);
            var bounds = item.element.nativeElement.getBoundingClientRect();
            var type = 'submenu';
            var options = new PopoverAppendOptions({ type: type });
            var providedValues = {
                bounds: bounds,
                type: type,
                submenuTriggeredItem: item,
                triggerElement: this.popoverConfig.triggerElement,
                closeOnClickItem: this.popoverConfig.closeOnClickItem,
            };
            if ((item === null || item === void 0 ? void 0 : item.submenu) instanceof PopoverMenuComponent) {
                providedValues.menuRef = item.submenu;
            }
            if ((item === null || item === void 0 ? void 0 : item.submenu) instanceof i0.TemplateRef) {
                providedValues.content = item.submenu;
            }
            var injector = i0.Injector.create([
                {
                    provide: POPOVER_CONFIG,
                    useValue: providedValues,
                },
            ]);
            this.subMenuComponentRef = this.popoverService.append(injector, null, options, this.parentPopoverRef);
            this.subMenuComponentRef.instance.componentRef = this.subMenuComponentRef;
            this.subMenuComponentRef.instance.parentPopoverRef = this.parentPopoverRef;
            this.subMenuComponentRef.hostView.detectChanges();
        };
        PopoverContentComponent.prototype.isMenu = function () {
            return (this.popoverConfig.type === 'menu' ||
                this.popoverConfig.type === 'context' ||
                this.popoverConfig.type === 'submenu');
        };
        PopoverContentComponent.prototype.canListenForClickOutside = function () {
            return (this.popoverConfig.closeOnClickOutside && (this.popoverConfig.trigger !== 'hover' || this.isMenu()));
        };
        PopoverContentComponent.prototype.detectChanges = function () {
            if (this.cdr && !this.cdr.destroyed) {
                this.cdr.detectChanges();
            }
        };
        return PopoverContentComponent;
    }());
    PopoverContentComponent.ɵfac = function PopoverContentComponent_Factory(t) { return new (t || PopoverContentComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(PopoverService), i0.ɵɵdirectiveInject(PopoverEventsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(POPOVER_CONFIG)); };
    PopoverContentComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PopoverContentComponent, selectors: [["poppy-content"]], viewQuery: function PopoverContentComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$2, true);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.popoverWrapperEl = _t.first);
            }
        }, decls: 5, vars: 3, consts: [[1, "popover-content"], ["popoverWrapperEl", ""], [4, "ngIf", "ngIfElse"], ["textContent", ""], [4, "ngTemplateOutlet"]], template: function PopoverContentComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0, 1);
                i0.ɵɵlistener("@fadeIn.done", function PopoverContentComponent_Template_div_animation_fadeIn_done_0_listener($event) { return ctx.animationEnd($event); });
                i0.ɵɵtemplate(2, PopoverContentComponent_ng_container_2_Template, 2, 1, "ng-container", 2);
                i0.ɵɵtemplate(3, PopoverContentComponent_ng_template_3_Template, 1, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                var _r2 = i0.ɵɵreference(4);
                i0.ɵɵproperty("@fadeIn", ctx.animationState);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.template)("ngIfElse", _r2);
            }
        }, directives: [i3.NgIf, i3.NgTemplateOutlet], styles: ["poppy-content{position:absolute;visibility:visible}.popover-content{background-color:#fff;border-radius:2px;box-shadow:0 3.2px 7.2px 0 rgba(0,0,0,.133),0 .6px 1.8px 0 rgba(0,0,0,.11);box-sizing:border-box;max-height:400px;max-width:600px;overflow:auto}.popover-menu-list{margin:0;padding:0}.popover-menu-item{align-items:center;background-color:transparent;border:0;box-sizing:border-box;color:#323130;cursor:pointer;display:flex;justify-content:space-between;list-style:none;outline:0;padding:9px 12px;position:relative;text-align:left;width:100%}.popover-menu-item:disabled{opacity:.5}.popover-menu-item--focused,.popover-menu-item--selected,.popover-menu-item:hover{background-color:#edebe9}.popover-menu-item--hidden{display:none}"], encapsulation: 2, data: { animation: [fadeInAnimation] } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverContentComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'poppy-content',
                        templateUrl: './popover-content.component.html',
                        styleUrls: ['./popover-content.component.scss'],
                        animations: [fadeInAnimation],
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], function () {
            return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ComponentFactoryResolver }, { type: PopoverService }, { type: PopoverEventsService }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [POPOVER_CONFIG]
                        }] }];
        }, { popoverWrapperEl: [{
                    type: i0.ViewChild,
                    args: ['popoverWrapperEl']
                }] });
    })();

    var LayerModule = /** @class */ (function () {
        function LayerModule() {
        }
        return LayerModule;
    }());
    LayerModule.ɵmod = i0.ɵɵdefineNgModule({ type: LayerModule });
    LayerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LayerModule_Factory(t) { return new (t || LayerModule)(); }, imports: [[i3.CommonModule]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LayerModule, { declarations: [LayerComponent], imports: [i3.CommonModule] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LayerModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [LayerComponent],
                        imports: [i3.CommonModule],
                    }]
            }], null, null);
    })();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var BasePopoverDirective = /** @class */ (function () {
        function BasePopoverDirective(componentFactoryResolver, popoverService, hostElement, ngZone) {
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
            this.afterClose = new i0.EventEmitter();
            this.afterShow = new i0.EventEmitter();
            this.type = 'popover';
            this.destroy$ = new rxjs.Subject();
        }
        BasePopoverDirective.prototype.ngOnInit = function () {
            this.setOptions();
        };
        BasePopoverDirective.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.unsubscribe();
        };
        BasePopoverDirective.prototype.close = function () {
            if (this.popoverComponentRef) {
                this.remove(this.popoverComponentRef);
            }
        };
        BasePopoverDirective.prototype.appendToLayer = function (options) {
            var injector = this.getPopoverComponentInjector();
            var opts = Object.assign(Object.assign({}, options), { delayClose: this.delayClose, closeOnTriggerAgain: this.closeOnTriggerAgain, hideOnScroll: this.hideOnScroll });
            this.popoverComponentRef = this.popoverService.append(injector, this, opts);
        };
        BasePopoverDirective.prototype.remove = function (popoverRef) {
            var _this = this;
            this.ngZone.run(function () {
                _this.popoverService.remove(popoverRef);
            });
        };
        BasePopoverDirective.prototype.setOptions = function () {
            if (this.closeOnTriggerAgain === undefined) {
                this.closeOnTriggerAgain = !(this.type === 'tooltip' ||
                    this.trigger === 'hover' ||
                    this.type === 'context');
            }
        };
        return BasePopoverDirective;
    }());
    BasePopoverDirective.ɵfac = function BasePopoverDirective_Factory(t) { return new (t || BasePopoverDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
    BasePopoverDirective.ɵdir = i0.ɵɵdefineDirective({ type: BasePopoverDirective, inputs: { trigger: "trigger", delayClose: "delayClose", closeOnTriggerAgain: "closeOnTriggerAgain", closeOnClickOutside: "closeOnClickOutside", hideOnScroll: "hideOnScroll", innerClass: "innerClass", position: "position" }, outputs: { afterClose: "afterClose", afterShow: "afterShow" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BasePopoverDirective, [{
                type: i0.Directive
            }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { trigger: [{
                    type: i0.Input
                }], delayClose: [{
                    type: i0.Input
                }], closeOnTriggerAgain: [{
                    type: i0.Input
                }], closeOnClickOutside: [{
                    type: i0.Input
                }], hideOnScroll: [{
                    type: i0.Input
                }], innerClass: [{
                    type: i0.Input
                }], position: [{
                    type: i0.Input
                }], afterClose: [{
                    type: i0.Output
                }], afterShow: [{
                    type: i0.Output
                }] });
    })();

    var PopoverDirective = /** @class */ (function (_super) {
        __extends(PopoverDirective, _super);
        function PopoverDirective(componentFactoryResolver, popoverService, hostElement, ngZone) {
            var _this = _super.call(this, componentFactoryResolver, popoverService, hostElement, ngZone) || this;
            _this.componentFactoryResolver = componentFactoryResolver;
            _this.popoverService = popoverService;
            _this.hostElement = hostElement;
            _this.ngZone = ngZone;
            return _this;
        }
        PopoverDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.poppyPopover) {
                this.ngZone.runOutsideAngular(function () {
                    if (_this.trigger === 'click') {
                        _this.listenEventsForClickTrigger();
                    }
                    if (_this.trigger === 'hover') {
                        _this.listenEventsForHoverTrigger();
                    }
                });
            }
        };
        PopoverDirective.prototype.open = function () {
            var _this = this;
            if (this.canAppend()) {
                this.ngZone.run(function () {
                    _this.append();
                });
            }
        };
        PopoverDirective.prototype.getPopoverComponentInjector = function () {
            var providerValues = {
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
            return i0.Injector.create([
                {
                    provide: POPOVER_CONFIG,
                    useValue: providerValues,
                },
            ]);
        };
        PopoverDirective.prototype.canAppend = function () {
            return !this.popoverComponentRef || (this.popoverComponentRef && this.closeOnTriggerAgain);
        };
        PopoverDirective.prototype.listenEventsForClickTrigger = function () {
            var _this = this;
            rxjs.fromEvent(this.hostElement.nativeElement, 'click')
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () {
                _this.open();
            });
        };
        PopoverDirective.prototype.listenEventsForHoverTrigger = function () {
            var _this = this;
            var popoverHovered = false;
            var hostHovered = false;
            var isMouseLeftBeforeDelayTimePast = false;
            rxjs.merge(rxjs.fromEvent(this.hostElement.nativeElement, 'mouseenter'), rxjs.fromEvent(this.hostElement.nativeElement, 'click'))
                .pipe(operators.takeUntil(this.destroy$), operators.tap(function () {
                rxjs.fromEvent(_this.hostElement.nativeElement, 'mouseleave')
                    .pipe(operators.takeUntil(_this.destroy$), operators.takeUntil(_this.afterClose), operators.debounceTime(200))
                    .subscribe(function () {
                    hostHovered = false;
                    isMouseLeftBeforeDelayTimePast = true;
                    setTimeout(function () {
                        isMouseLeftBeforeDelayTimePast = false;
                    }, 200);
                    if (!popoverHovered) {
                        _this.remove(_this.popoverComponentRef);
                    }
                });
            }), operators.switchMap(function () { return rxjs.timer(300); }))
                .subscribe(function () {
                var isHostElementStillInDOM = document.body.contains(_this.hostElement.nativeElement);
                popoverHovered = false;
                hostHovered = true;
                if (isHostElementStillInDOM && !isMouseLeftBeforeDelayTimePast) {
                    _this.open();
                }
                setTimeout(function () {
                    if (_this.popoverComponentRef) {
                        rxjs.fromEvent(_this.popoverComponentRef.instance.element.nativeElement, 'mouseenter')
                            .pipe(operators.takeUntil(_this.afterClose))
                            .subscribe(function () {
                            popoverHovered = true;
                        });
                        rxjs.fromEvent(_this.popoverComponentRef.instance.element.nativeElement, 'mouseleave')
                            .pipe(operators.takeUntil(_this.afterClose))
                            .subscribe(function () {
                            popoverHovered = false;
                            if (!hostHovered) {
                                _this.remove(_this.popoverComponentRef);
                            }
                        });
                    }
                }, 0);
            });
            this.destroy$.pipe(operators.take(1)).subscribe(function () {
                if (_this.popoverComponentRef) {
                    _this.remove(_this.popoverComponentRef);
                }
            });
        };
        PopoverDirective.prototype.append = function () {
            var options = new PopoverAppendOptions({
                type: 'popover',
                triggeredBy: this.trigger,
            });
            this.appendToLayer(options);
        };
        return PopoverDirective;
    }(BasePopoverDirective));
    PopoverDirective.ɵfac = function PopoverDirective_Factory(t) { return new (t || PopoverDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
    PopoverDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverDirective, selectors: [["", "poppyPopover", ""]], inputs: { poppyPopover: "poppyPopover" }, exportAs: ["poppyPopover"], features: [i0.ɵɵInheritDefinitionFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppyPopover]',
                        exportAs: 'poppyPopover',
                    }]
            }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { poppyPopover: [{
                    type: i0.Input
                }] });
    })();

    var PopoverChipDirective = /** @class */ (function () {
        function PopoverChipDirective(template) {
            this.template = template;
        }
        return PopoverChipDirective;
    }());
    PopoverChipDirective.ɵfac = function PopoverChipDirective_Factory(t) { return new (t || PopoverChipDirective)(i0.ɵɵdirectiveInject(i0.TemplateRef)); };
    PopoverChipDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverChipDirective, selectors: [["", "poppy-chip", ""]], exportAs: ["poppyChip"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverChipDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppy-chip]',
                        exportAs: 'poppyChip'
                    }]
            }], function () { return [{ type: i0.TemplateRef }]; }, null);
    })();

    var PopoverChipRemoveDirective = /** @class */ (function () {
        function PopoverChipRemoveDirective(selectComponentRef) {
            this.selectComponentRef = selectComponentRef;
        }
        PopoverChipRemoveDirective.prototype.onClick = function (event) {
            this.remove(event);
        };
        PopoverChipRemoveDirective.prototype.remove = function (event) {
            if (this.selectComponentRef) {
                this.selectComponentRef.closeChip(this.poppyChipRemove, event);
            }
        };
        return PopoverChipRemoveDirective;
    }());
    PopoverChipRemoveDirective.ɵfac = function PopoverChipRemoveDirective_Factory(t) { return new (t || PopoverChipRemoveDirective)(i0.ɵɵdirectiveInject(PopoverSelectComponent)); };
    PopoverChipRemoveDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverChipRemoveDirective, selectors: [["", "poppyChipRemove", ""]], hostBindings: function PopoverChipRemoveDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function PopoverChipRemoveDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
            }
        }, inputs: { poppyChipRemove: "poppyChipRemove" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverChipRemoveDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppyChipRemove]'
                    }]
            }], function () { return [{ type: PopoverSelectComponent }]; }, { poppyChipRemove: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }] });
    })();

    var PopoverMenuDirective = /** @class */ (function (_super) {
        __extends(PopoverMenuDirective, _super);
        function PopoverMenuDirective(componentFactoryResolver, popoverService, hostElement, ngZone) {
            var _this = _super.call(this, componentFactoryResolver, popoverService, hostElement, ngZone) || this;
            _this.componentFactoryResolver = componentFactoryResolver;
            _this.popoverService = popoverService;
            _this.hostElement = hostElement;
            _this.ngZone = ngZone;
            _this.type = 'menu';
            _this.closeOnClickItem = true;
            return _this;
        }
        PopoverMenuDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.poppyMenu) {
                this.ngZone.runOutsideAngular(function () {
                    if (_this.trigger !== 'manual' && _this.type === 'menu') {
                        _this.listenEventsForClickTrigger();
                    }
                    if (_this.type === 'context') {
                        _this.listenEventsForContextTrigger();
                    }
                });
            }
        };
        PopoverMenuDirective.prototype.open = function () {
            var _this = this;
            if (this.canAppend()) {
                this.ngZone.run(function () {
                    _this.append();
                });
            }
        };
        // NOTE: It should be removed after upgrade to ng 9, because QueryList should emit changes
        // when elements is removed
        PopoverMenuDirective.prototype.updateContentPosition = function () {
            if (this.popoverComponentRef) {
                this.popoverComponentRef.instance.componentStyles.update();
            }
        };
        PopoverMenuDirective.prototype.getPopoverComponentInjector = function () {
            var providerValues = {
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
            return i0.Injector.create([
                {
                    provide: POPOVER_CONFIG,
                    useValue: providerValues,
                },
            ]);
        };
        PopoverMenuDirective.prototype.canAppend = function () {
            return (!this.popoverComponentRef ||
                (this.popoverComponentRef && this.type === 'context') ||
                (this.popoverComponentRef && this.closeOnTriggerAgain));
        };
        PopoverMenuDirective.prototype.listenEventsForClickTrigger = function () {
            var _this = this;
            rxjs.fromEvent(this.hostElement.nativeElement, 'click')
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function () {
                _this.open();
            });
        };
        PopoverMenuDirective.prototype.listenEventsForContextTrigger = function () {
            var _this = this;
            rxjs.fromEvent(this.hostElement.nativeElement, 'contextmenu')
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (event) {
                event.preventDefault();
                _this.contextMenuPosition = {
                    top: event.clientY,
                    left: event.clientX,
                };
                _this.open();
            });
        };
        PopoverMenuDirective.prototype.append = function () {
            var options = new PopoverAppendOptions({
                type: this.type,
            });
            this.appendToLayer(options);
        };
        PopoverMenuDirective.prototype.getBounds = function () {
            if (this.type === 'context') {
                return { top: this.contextMenuPosition.top, left: this.contextMenuPosition.left };
            }
            else {
                return this.hostElement.nativeElement.getBoundingClientRect();
            }
        };
        return PopoverMenuDirective;
    }(BasePopoverDirective));
    PopoverMenuDirective.ɵfac = function PopoverMenuDirective_Factory(t) { return new (t || PopoverMenuDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
    PopoverMenuDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverMenuDirective, selectors: [["", "poppyMenu", ""]], inputs: { poppyMenu: "poppyMenu", type: "type", closeOnClickItem: "closeOnClickItem" }, exportAs: ["poppyMenu"], features: [i0.ɵɵInheritDefinitionFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverMenuDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppyMenu]',
                        exportAs: 'poppyMenu',
                    }]
            }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { poppyMenu: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], closeOnClickItem: [{
                    type: i0.Input
                }] });
    })();

    var PopoverOptionDirective = /** @class */ (function () {
        function PopoverOptionDirective(template) {
            this.template = template;
        }
        return PopoverOptionDirective;
    }());
    PopoverOptionDirective.ɵfac = function PopoverOptionDirective_Factory(t) { return new (t || PopoverOptionDirective)(i0.ɵɵdirectiveInject(i0.TemplateRef)); };
    PopoverOptionDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverOptionDirective, selectors: [["", "poppy-option", ""]], exportAs: ["poppyOption"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverOptionDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppy-option]',
                        exportAs: 'poppyOption',
                    }]
            }], function () { return [{ type: i0.TemplateRef }]; }, null);
    })();

    var PopoverRemoveOnClickDirective = /** @class */ (function () {
        function PopoverRemoveOnClickDirective(host, popoverService) {
            this.host = host;
            this.popoverService = popoverService;
        }
        PopoverRemoveOnClickDirective.prototype.onClick = function () {
            this.remove();
        };
        PopoverRemoveOnClickDirective.prototype.remove = function () {
            var _this = this;
            setTimeout(function () {
                var parentElement = _this.host.nativeElement.closest('poppy-content');
                _this.popoverService.removeByNativeElementRef(parentElement);
            });
        };
        return PopoverRemoveOnClickDirective;
    }());
    PopoverRemoveOnClickDirective.ɵfac = function PopoverRemoveOnClickDirective_Factory(t) { return new (t || PopoverRemoveOnClickDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(PopoverService)); };
    PopoverRemoveOnClickDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverRemoveOnClickDirective, selectors: [["", "poppyRemoveOnClick", ""]], hostBindings: function PopoverRemoveOnClickDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function PopoverRemoveOnClickDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
            }
        } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverRemoveOnClickDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppyRemoveOnClick]',
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: PopoverService }]; }, { onClick: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }] });
    })();

    var TooltipDirective = /** @class */ (function (_super) {
        __extends(TooltipDirective, _super);
        function TooltipDirective(componentFactoryResolver, popoverService, hostElement, ngZone) {
            var _this = _super.call(this, componentFactoryResolver, popoverService, hostElement, ngZone) || this;
            _this.componentFactoryResolver = componentFactoryResolver;
            _this.popoverService = popoverService;
            _this.hostElement = hostElement;
            _this.ngZone = ngZone;
            _this.trigger = 'hover';
            _this.type = 'tooltip';
            return _this;
        }
        TooltipDirective.prototype.ngOnInit = function () {
            this.poppyPopover = this.poppyTooltip;
        };
        return TooltipDirective;
    }(PopoverDirective));
    TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
    TooltipDirective.ɵdir = i0.ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "poppyTooltip", ""]], inputs: { poppyTooltip: "poppyTooltip" }, features: [i0.ɵɵInheritDefinitionFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(TooltipDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[poppyTooltip]',
                    }]
            }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { poppyTooltip: [{
                    type: i0.Input
                }] });
    })();

    var _c0$3 = ["input"];
    var _c1 = function (a0) { return { $implicit: a0 }; };
    function PopoverSelectComponent_div_2_div_1_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementContainer(1, 16);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var chip_r10 = i0.ɵɵnextContext().$implicit;
            var ctx_r11 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r11.chipTemplate.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, chip_r10));
        }
    }
    function PopoverSelectComponent_div_2_div_1_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r16_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 17);
            i0.ɵɵelementStart(1, "div", 18);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 19);
            i0.ɵɵlistener("click", function PopoverSelectComponent_div_2_div_1_div_2_Template_div_click_3_listener($event) { i0.ɵɵrestoreView(_r16_1); var chip_r10 = i0.ɵɵnextContext().$implicit; var ctx_r14 = i0.ɵɵnextContext(2); return ctx_r14.closeChip(chip_r10, $event); });
            i0.ɵɵtext(4, " \u2716 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var chip_r10 = i0.ɵɵnextContext().$implicit;
            var ctx_r12 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx_r12.getDisplayLabel(chip_r10));
        }
    }
    function PopoverSelectComponent_div_2_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 14);
            i0.ɵɵtemplate(1, PopoverSelectComponent_div_2_div_1_ng_container_1_Template, 2, 4, "ng-container", 7);
            i0.ɵɵtemplate(2, PopoverSelectComponent_div_2_div_1_div_2_Template, 5, 1, "div", 15);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r8 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r8.chipTemplate);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r8.chipTemplate);
        }
    }
    function PopoverSelectComponent_div_2_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 20);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r9 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r9.placeholder);
        }
    }
    function PopoverSelectComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 11);
            i0.ɵɵtemplate(1, PopoverSelectComponent_div_2_div_1_Template, 3, 2, "div", 12);
            i0.ɵɵtemplate(2, PopoverSelectComponent_div_2_span_2_Template, 2, 1, "span", 13);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.displayedChips);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r0.selectedOptions.length);
        }
    }
    function PopoverSelectComponent_div_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r19_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 21);
            i0.ɵɵelementStart(1, "button", 22);
            i0.ɵɵlistener("click", function PopoverSelectComponent_div_5_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r19_1); var ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.clear($event); });
            i0.ɵɵtext(2, "\u00D7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
    }
    function PopoverSelectComponent_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 23);
        }
    }
    function PopoverSelectComponent_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 24);
            i0.ɵɵtext(2, " loader.. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
    }
    function PopoverSelectComponent_li_10_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementContainer(1, 16);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var option_r20 = i0.ɵɵnextContext().$implicit;
            var ctx_r21 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r21.optionTemplate.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, option_r20));
        }
    }
    function PopoverSelectComponent_li_10_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtext(1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var option_r20 = i0.ɵɵnextContext().$implicit;
            var ctx_r22 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", ctx_r22.getDisplayLabel(option_r20), " ");
        }
    }
    function PopoverSelectComponent_li_10_Template(rf, ctx) {
        if (rf & 1) {
            var _r26_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 25);
            i0.ɵɵlistener("clicked", function PopoverSelectComponent_li_10_Template_li_clicked_0_listener() { i0.ɵɵrestoreView(_r26_1); var option_r20 = ctx.$implicit; var ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.onClickItem(option_r20); });
            i0.ɵɵtemplate(1, PopoverSelectComponent_li_10_ng_container_1_Template, 2, 4, "ng-container", 7);
            i0.ɵɵtemplate(2, PopoverSelectComponent_li_10_ng_container_2_Template, 2, 1, "ng-container", 7);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var option_r20 = ctx.$implicit;
            var ctx_r6 = i0.ɵɵnextContext();
            i0.ɵɵproperty("hidden", option_r20.hidden)("selected", option_r20.selected);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r6.optionTemplate);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r6.optionTemplate);
        }
    }
    function PopoverSelectComponent_div_11_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 26);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r7 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r7.notFoundText);
        }
    }
    var PopoverSelectComponent = /** @class */ (function () {
        function PopoverSelectComponent(cdr, controlContainer) {
            this.cdr = cdr;
            this.controlContainer = controlContainer;
            this.options = [];
            this.bindLabel = 'label';
            this.multiselect = false;
            this.clearable = true;
            this.searchable = true;
            this.placeholder = 'Wybierz..';
            this.notFoundText = 'Nie znaleziono wyników';
            this.changed = new i0.EventEmitter();
            this.selectedOptions = [];
            this.displayedOptions = [];
            this.displayedChips = [];
            this.asyncLoading = false;
            this.isMenuOpen = false;
            this.destroy$ = new rxjs.Subject();
            this.propagateChange = function (value) { };
        }
        PopoverSelectComponent.prototype.ngOnInit = function () { };
        PopoverSelectComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options && changes.options.previousValue !== changes.options.currentValue) {
                this.onOptionsChange();
            }
            if (changes.value && changes.value.previousValue !== changes.value.currentValue) {
                this.writeValue(this.value);
            }
        };
        PopoverSelectComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.menuRef.afterClose.pipe(operators.takeUntil(this.destroy$)).subscribe(function () {
                _this.isMenuOpen = false;
                if (!_this.multiselect) {
                    _this.onCloseMenu();
                }
                _this.cdr.detectChanges();
            });
            this.menuRef.afterShow.pipe(operators.takeUntil(this.destroy$)).subscribe(function () {
                _this.isMenuOpen = true;
                _this.cdr.detectChanges();
            });
            this.menuRef.afterClose.pipe(operators.take(1)).subscribe(function () {
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
        };
        PopoverSelectComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        Object.defineProperty(PopoverSelectComponent.prototype, "noItemsFound", {
            get: function () {
                return !this.displayedOptions.length || !!this.displayedOptions.every(function (opt) { return opt.hidden; });
            },
            enumerable: false,
            configurable: true
        });
        PopoverSelectComponent.prototype.writeValue = function (value) {
            var _this = this;
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
            setTimeout(function () {
                _this.cdr.detectChanges();
            });
        };
        PopoverSelectComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        PopoverSelectComponent.prototype.registerOnTouched = function () { };
        PopoverSelectComponent.prototype.setDisabledState = function (isDisabled) { };
        PopoverSelectComponent.prototype.getDisplayLabel = function (option) {
            return this.bindLabel ? option[this.bindLabel] : '';
        };
        PopoverSelectComponent.prototype.onClickItem = function (clickedOption) {
            var _this = this;
            this.selectedOptions = [];
            this.displayedOptions.forEach(function (option, index) {
                if (_this.matchByValueOrReference(option, clickedOption)) {
                    _this.displayedOptions[index].selected = _this.multiselect ? !option.selected : true;
                    _this.displayedOptions[index].hidden = _this.multiselect ? !option.hidden : false;
                }
                else {
                    if (!_this.multiselect) {
                        _this.displayedOptions[index].selected = false;
                    }
                }
                if (_this.displayedOptions[index].selected) {
                    _this.selectedOptions.push(_this.options[index]);
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
        };
        PopoverSelectComponent.prototype.onChangeInput = function (target) {
            var _this = this;
            var value = target.value;
            if (this.bindLabel) {
                if (this.async) {
                    this.loadAsyncOptions(value);
                }
                else {
                    this.displayedOptions.forEach(function (option, index) {
                        _this.displayedOptions[index].hidden = !option[_this.bindLabel].includes(value);
                    });
                    this.cdr.detectChanges();
                }
            }
        };
        PopoverSelectComponent.prototype.clear = function (event) {
            event.stopPropagation();
            this.reset();
            this.emitChange();
        };
        PopoverSelectComponent.prototype.getDisplayValue = function () {
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
        };
        PopoverSelectComponent.prototype.closeChip = function (chip, event) {
            var _this = this;
            this.selectedOptions = [];
            this.displayedOptions.forEach(function (option, index) {
                if (_this.matchByValueOrReference(option, chip)) {
                    _this.displayedOptions[index].selected = false;
                    _this.displayedOptions[index].hidden = false;
                }
                if (_this.displayedOptions[index].selected) {
                    _this.selectedOptions.push(_this.options[index]);
                }
            });
            this.updateDisplayedChips();
            this.emitChange();
            if (event) {
                event.stopPropagation();
            }
            this.cdr.detectChanges();
        };
        PopoverSelectComponent.prototype.onOptionsChange = function () {
            this.displayedOptions = __spread(this.options).map(function (option) { return (Object.assign(Object.assign({}, option), { selected: false, hidden: false })); });
        };
        PopoverSelectComponent.prototype.onInputKeyUp = function () {
            var _this = this;
            rxjs.fromEvent(this.inputEl.nativeElement, 'keyup')
                .pipe(operators.tap(function () {
                if (_this.async) {
                    _this.asyncLoading = true;
                }
            }), operators.debounceTime(!!this.async ? 500 : 0), operators.map(function (event) { return event.target; }), operators.takeUntil(this.destroy$))
                .subscribe(function (target) {
                _this.onChangeInput(target);
            });
        };
        PopoverSelectComponent.prototype.reset = function () {
            var _this = this;
            this.displayedOptions.forEach(function (option, index) {
                _this.displayedOptions[index].hidden = false;
                _this.displayedOptions[index].selected = false;
            });
            this.selectedOptions = [];
            if (this.multiselect) {
                this.displayedChips = [];
            }
        };
        PopoverSelectComponent.prototype.emitChange = function () {
            var value = this.getPropagateValue();
            this.propagateChange(value);
            this.changed.emit(value);
        };
        PopoverSelectComponent.prototype.getPropagateValue = function () {
            var _this = this;
            if (!this.selectedOptions.length) {
                return this.multiselect ? [] : null;
            }
            if (this.multiselect) {
                return this.bindValue
                    ? this.selectedOptions.map(function (option) { return option[_this.bindValue]; })
                    : this.selectedOptions;
            }
            return this.bindValue ? this.selectedOptions[0][this.bindValue] : this.selectedOptions[0];
        };
        PopoverSelectComponent.prototype.onCloseMenu = function () {
            var _this = this;
            this.inputEl.nativeElement.value = !!this.selectedOptions.length
                ? this.selectedOptions[0][this.bindLabel]
                : null;
            this.displayedOptions.forEach(function (option, index) {
                _this.displayedOptions[index].hidden = false;
            });
        };
        PopoverSelectComponent.prototype.loadAsyncOptions = function (searchPhrase, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.asyncLoading = !options.firstLoad;
            this.async(searchPhrase).subscribe(function (results) {
                _this.options = results;
                _this.onOptionsChange();
                _this.asyncLoading = false;
                _this.cdr.detectChanges();
            });
        };
        PopoverSelectComponent.prototype.updateSelectedItemsForMultiSelection = function (value) {
            var _this = this;
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
            this.options.forEach(function (option, index) {
                var matchOption = !!value.find(function (v) { return _this.matchByValueOrReference(option, v); });
                if (matchOption) {
                    _this.selectedOptions.push(option);
                    _this.displayedOptions[index].selected = true;
                    _this.displayedOptions[index].hidden = true;
                }
                else {
                    _this.displayedOptions[index].selected = false;
                    _this.displayedOptions[index].hidden = false;
                }
            });
            this.updateDisplayedChips();
        };
        PopoverSelectComponent.prototype.updateSelectedItemsForSingleSelection = function (value) {
            var _this = this;
            this.options.forEach(function (option, index) {
                if (_this.matchByValueOrReference(option, value)) {
                    _this.selectedOptions = [option];
                    _this.displayedOptions[index].selected = true;
                }
                else {
                    _this.displayedOptions[index].selected = false;
                }
            });
            if (!value) {
                this.selectedOptions = [];
            }
        };
        PopoverSelectComponent.prototype.updateDisplayedChips = function () {
            var _this = this;
            this.displayedOptions
                .filter(function (option) { return option.selected; })
                .forEach(function (option) {
                var chipIndex = _this.displayedChips.findIndex(function (chip) { return _this.matchByValueOrReference(chip, option); });
                if (chipIndex === -1) {
                    _this.displayedChips.push(option);
                }
            });
            this.displayedChips.forEach(function (chip, index) {
                var option = _this.displayedOptions
                    .filter(function (opt) { return opt.selected; })
                    .find(function (opt) { return _this.matchByValueOrReference(chip, opt); });
                if (!option) {
                    _this.displayedChips.splice(index, 1);
                }
            });
            if (this.menuRef) {
                setTimeout(function () {
                    _this.menuRef.updateContentPosition();
                });
            }
        };
        PopoverSelectComponent.prototype.matchByValueOrReference = function (item, comparedTo) {
            if (this.bindValue) {
                if (comparedTo && comparedTo[this.bindValue] !== undefined) {
                    // tslint:disable-next-line:triple-equals
                    return item[this.bindValue] == comparedTo[this.bindValue];
                }
                // tslint:disable-next-line:triple-equals
                return item[this.bindValue] == comparedTo;
            }
            return item === comparedTo;
        };
        return PopoverSelectComponent;
    }());
    PopoverSelectComponent.ɵfac = function PopoverSelectComponent_Factory(t) { return new (t || PopoverSelectComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.ControlContainer, 13)); };
    PopoverSelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PopoverSelectComponent, selectors: [["poppy-select"]], contentQueries: function PopoverSelectComponent_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, PopoverChipDirective, true);
                i0.ɵɵcontentQuery(dirIndex, PopoverOptionDirective, true);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chipTemplate = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.optionTemplate = _t.first);
            }
        }, viewQuery: function PopoverSelectComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$3, true);
                i0.ɵɵviewQuery(PopoverMenuDirective, true);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.inputEl = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuRef = _t.first);
            }
        }, inputs: { options: "options", async: "async", value: "value", bindLabel: "bindLabel", bindValue: "bindValue", multiselect: "multiselect", clearable: "clearable", searchable: "searchable", placeholder: "placeholder", notFoundText: "notFoundText" }, outputs: { changed: "changed" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: i1.NG_VALUE_ACCESSOR,
                    useExisting: i0.forwardRef(function () { return PopoverSelectComponent; }),
                    multi: true,
                },
                {
                    provide: i1.NG_VALIDATORS,
                    useExisting: i0.forwardRef(function () { return PopoverSelectComponent; }),
                    multi: true,
                },
            ]), i0.ɵɵNgOnChangesFeature], decls: 12, vars: 12, consts: [[1, "poppy-select", 3, "poppyMenu", "closeOnClickItem"], [1, "poppy-select__content"], ["class", "poppy-select__multiselect", 4, "ngIf"], ["type", "text", 3, "hidden", "placeholder", "value", "readOnly"], ["input", ""], ["class", "poppy-select__clear", 4, "ngIf"], ["class", "poppy-select__arrow", 4, "ngIf"], [4, "ngIf"], ["menu", "poppyMenu"], ["poppy-menu-item", "", 3, "hidden", "selected", "clicked", 4, "ngFor", "ngForOf"], ["class", "poppy__no-items", 4, "ngIf"], [1, "poppy-select__multiselect"], ["class", "poppy-select__chip", 4, "ngFor", "ngForOf"], ["class", "poppy-select__placeholder", 4, "ngIf"], [1, "poppy-select__chip"], ["class", "poppy-chip", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "poppy-chip"], [1, "poppy-chip__content"], [1, "poppy-chip__close", 3, "click"], [1, "poppy-select__placeholder"], [1, "poppy-select__clear"], [1, "clear-btn", 3, "click"], [1, "poppy-select__arrow"], [1, "poppy-select__loader"], ["poppy-menu-item", "", 3, "hidden", "selected", "clicked"], [1, "poppy__no-items"]], template: function PopoverSelectComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵtemplate(2, PopoverSelectComponent_div_2_Template, 3, 2, "div", 2);
                i0.ɵɵelement(3, "input", 3, 4);
                i0.ɵɵtemplate(5, PopoverSelectComponent_div_5_Template, 3, 0, "div", 5);
                i0.ɵɵtemplate(6, PopoverSelectComponent_div_6_Template, 1, 0, "div", 6);
                i0.ɵɵtemplate(7, PopoverSelectComponent_ng_container_7_Template, 3, 0, "ng-container", 7);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(8, "poppy-menu", null, 8);
                i0.ɵɵtemplate(10, PopoverSelectComponent_li_10_Template, 3, 4, "li", 9);
                i0.ɵɵtemplate(11, PopoverSelectComponent_div_11_Template, 2, 1, "div", 10);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                var _r5 = i0.ɵɵreference(9);
                i0.ɵɵproperty("poppyMenu", _r5)("closeOnClickItem", !ctx.multiselect);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.multiselect);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("hidden", ctx.multiselect)("placeholder", ctx.placeholder)("value", ctx.getDisplayValue())("readOnly", !ctx.searchable);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.clearable && !ctx.multiselect && !!ctx.getDisplayValue());
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.asyncLoading);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.asyncLoading);
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.displayedOptions);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.noItemsFound);
            }
        }, directives: [PopoverMenuDirective, i3.NgIf, PopoverMenuComponent, i3.NgForOf, i3.NgTemplateOutlet, PopoverMenuItemDirective], styles: [".poppy-select{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;border:1px solid #acacac;border-radius:3px;box-sizing:border-box;cursor:pointer;display:flex;min-height:42px;user-select:none}.poppy-select__content{height:100%;min-height:18px;position:relative;width:100%}.poppy-select__content input{background-color:transparent;border:0;box-sizing:border-box;cursor:pointer;height:100%;outline:0;padding:0 2rem 0 .8rem;width:100%}.poppy-select__chips{height:100%;margin-bottom:-6px}.poppy-select__multiselect{align-items:center;border-radius:4px;box-sizing:border-box;display:flex;flex-wrap:wrap;height:100%;padding:0 .8rem;width:100%}.poppy-select__chip{display:inline-block;margin-bottom:4px;margin-right:6px;margin-top:4px}.poppy-select__arrow{color:#f6f6f6;position:absolute;right:8px;top:12px}.poppy-select__clear{color:#f6f6f6;position:absolute;right:4px;top:-2px}.poppy-chip{align-items:stretch;background-color:#edebe9;border-radius:16px;cursor:pointer;display:flex;font-size:.92em;height:26px;line-height:1;overflow:hidden}.poppy-chip__content{align-items:center;display:flex;font-size:inherit;line-height:1rem;margin-right:4px;padding:0 0 0 10px}.poppy-chip__close{align-items:center;background-color:#cfcfcf;border-radius:16px;display:flex;font-size:.86em;justify-content:center;padding-top:1px;width:26px}.poppy-chip__close:hover{background-color:#c2c2c2}.poppy__no-items{padding:14px 10px}.poppy-select__placeholder{color:#767676}.poppy-select__loader{position:absolute;right:15px;top:12px}"], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverSelectComponent, [{
                type: i0.Component,
                args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'poppy-select',
                        templateUrl: './popover-select.component.html',
                        styleUrls: ['./popover-select.component.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [
                            {
                                provide: i1.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return PopoverSelectComponent; }),
                                multi: true,
                            },
                            {
                                provide: i1.NG_VALIDATORS,
                                useExisting: i0.forwardRef(function () { return PopoverSelectComponent; }),
                                multi: true,
                            },
                        ],
                    }]
            }], function () {
            return [{ type: i0.ChangeDetectorRef }, { type: i1.ControlContainer, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Host
                        }, {
                            type: i0.SkipSelf
                        }] }];
        }, { options: [{
                    type: i0.Input
                }], async: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], bindLabel: [{
                    type: i0.Input
                }], bindValue: [{
                    type: i0.Input
                }], multiselect: [{
                    type: i0.Input
                }], clearable: [{
                    type: i0.Input
                }], searchable: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], notFoundText: [{
                    type: i0.Input
                }], changed: [{
                    type: i0.Output
                }], inputEl: [{
                    type: i0.ViewChild,
                    args: ['input']
                }], menuRef: [{
                    type: i0.ViewChild,
                    args: [PopoverMenuDirective]
                }], chipTemplate: [{
                    type: i0.ContentChild,
                    args: [PopoverChipDirective]
                }], optionTemplate: [{
                    type: i0.ContentChild,
                    args: [PopoverOptionDirective]
                }] });
    })();

    var PopoverModule = /** @class */ (function () {
        function PopoverModule() {
        }
        return PopoverModule;
    }());
    PopoverModule.ɵmod = i0.ɵɵdefineNgModule({ type: PopoverModule });
    PopoverModule.ɵinj = i0.ɵɵdefineInjector({ factory: function PopoverModule_Factory(t) { return new (t || PopoverModule)(); }, imports: [[i3.CommonModule, animations$1.BrowserAnimationsModule, LayerModule]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PopoverModule, { declarations: [PopoverDirective,
                PopoverMenuDirective,
                PopoverContentComponent,
                PopoverMenuItemDirective,
                PopoverMenuComponent,
                PopoverSelectComponent,
                PopoverChipDirective,
                PopoverChipRemoveDirective,
                PopoverRemoveOnClickDirective,
                PopoverOptionDirective,
                TooltipDirective], imports: [i3.CommonModule, animations$1.BrowserAnimationsModule, LayerModule], exports: [PopoverDirective,
                PopoverMenuDirective,
                PopoverMenuItemDirective,
                PopoverMenuComponent,
                PopoverSelectComponent,
                PopoverChipDirective,
                PopoverChipRemoveDirective,
                PopoverRemoveOnClickDirective,
                PopoverOptionDirective,
                TooltipDirective] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PopoverModule, [{
                type: i0.NgModule,
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
                        imports: [i3.CommonModule, animations$1.BrowserAnimationsModule, LayerModule],
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
            }], null, null);
    })();

    /*
     * Public API Surface of lib
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PopoverChipDirective = PopoverChipDirective;
    exports.PopoverChipRemoveDirective = PopoverChipRemoveDirective;
    exports.PopoverDirective = PopoverDirective;
    exports.PopoverMenuComponent = PopoverMenuComponent;
    exports.PopoverMenuDirective = PopoverMenuDirective;
    exports.PopoverMenuItemDirective = PopoverMenuItemDirective;
    exports.PopoverModule = PopoverModule;
    exports.PopoverOptionDirective = PopoverOptionDirective;
    exports.PopoverRemoveOnClickDirective = PopoverRemoveOnClickDirective;
    exports.PopoverSelectComponent = PopoverSelectComponent;
    exports.TooltipDirective = TooltipDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-poppy-popover.umd.js.map
