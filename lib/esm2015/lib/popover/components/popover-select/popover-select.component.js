import { Component, ViewEncapsulation, forwardRef, Input, ViewChild, ContentChild, ChangeDetectionStrategy, Output, EventEmitter, Optional, Host, SkipSelf, } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { debounceTime, map, take, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { PopoverChipDirective, PopoverMenuDirective, PopoverOptionDirective } from '../../directives';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../directives/popover-menu.directive";
import * as i3 from "@angular/common";
import * as i4 from "../popover-menu/popover-menu.component";
import * as i5 from "../../directives/popover-menu-item.directive";
const _c0 = ["input"];
const _c1 = function (a0) { return { $implicit: a0 }; };
function PopoverSelectComponent_div_2_div_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementContainer(1, 16);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const chip_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r11.chipTemplate.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, chip_r10));
} }
function PopoverSelectComponent_div_2_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 19);
    i0.ɵɵlistener("click", function PopoverSelectComponent_div_2_div_1_div_2_Template_div_click_3_listener($event) { i0.ɵɵrestoreView(_r16); const chip_r10 = i0.ɵɵnextContext().$implicit; const ctx_r14 = i0.ɵɵnextContext(2); return ctx_r14.closeChip(chip_r10, $event); });
    i0.ɵɵtext(4, " \u2716 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const chip_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r12.getDisplayLabel(chip_r10));
} }
function PopoverSelectComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, PopoverSelectComponent_div_2_div_1_ng_container_1_Template, 2, 4, "ng-container", 7);
    i0.ɵɵtemplate(2, PopoverSelectComponent_div_2_div_1_div_2_Template, 5, 1, "div", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.chipTemplate);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.chipTemplate);
} }
function PopoverSelectComponent_div_2_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r9.placeholder);
} }
function PopoverSelectComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtemplate(1, PopoverSelectComponent_div_2_div_1_Template, 3, 2, "div", 12);
    i0.ɵɵtemplate(2, PopoverSelectComponent_div_2_span_2_Template, 2, 1, "span", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.displayedChips);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.selectedOptions.length);
} }
function PopoverSelectComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelementStart(1, "button", 22);
    i0.ɵɵlistener("click", function PopoverSelectComponent_div_5_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.clear($event); });
    i0.ɵɵtext(2, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function PopoverSelectComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 23);
} }
function PopoverSelectComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 24);
    i0.ɵɵtext(2, " loader.. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function PopoverSelectComponent_li_10_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementContainer(1, 16);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const option_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r21 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r21.optionTemplate.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, option_r20));
} }
function PopoverSelectComponent_li_10_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const option_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r22 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r22.getDisplayLabel(option_r20), " ");
} }
function PopoverSelectComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 25);
    i0.ɵɵlistener("clicked", function PopoverSelectComponent_li_10_Template_li_clicked_0_listener() { i0.ɵɵrestoreView(_r26); const option_r20 = ctx.$implicit; const ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.onClickItem(option_r20); });
    i0.ɵɵtemplate(1, PopoverSelectComponent_li_10_ng_container_1_Template, 2, 4, "ng-container", 7);
    i0.ɵɵtemplate(2, PopoverSelectComponent_li_10_ng_container_2_Template, 2, 1, "ng-container", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r20 = ctx.$implicit;
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("hidden", option_r20.hidden)("selected", option_r20.selected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.optionTemplate);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r6.optionTemplate);
} }
function PopoverSelectComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.notFoundText);
} }
export class PopoverSelectComponent {
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
PopoverSelectComponent.ɵfac = function PopoverSelectComponent_Factory(t) { return new (t || PopoverSelectComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.ControlContainer, 13)); };
PopoverSelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PopoverSelectComponent, selectors: [["poppy-select"]], contentQueries: function PopoverSelectComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, PopoverChipDirective, true);
        i0.ɵɵcontentQuery(dirIndex, PopoverOptionDirective, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chipTemplate = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.optionTemplate = _t.first);
    } }, viewQuery: function PopoverSelectComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(PopoverMenuDirective, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.inputEl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuRef = _t.first);
    } }, inputs: { options: "options", async: "async", value: "value", bindLabel: "bindLabel", bindValue: "bindValue", multiselect: "multiselect", clearable: "clearable", searchable: "searchable", placeholder: "placeholder", notFoundText: "notFoundText" }, outputs: { changed: "changed" }, features: [i0.ɵɵProvidersFeature([
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
        ]), i0.ɵɵNgOnChangesFeature], decls: 12, vars: 12, consts: [[1, "poppy-select", 3, "poppyMenu", "closeOnClickItem"], [1, "poppy-select__content"], ["class", "poppy-select__multiselect", 4, "ngIf"], ["type", "text", 3, "hidden", "placeholder", "value", "readOnly"], ["input", ""], ["class", "poppy-select__clear", 4, "ngIf"], ["class", "poppy-select__arrow", 4, "ngIf"], [4, "ngIf"], ["menu", "poppyMenu"], ["poppy-menu-item", "", 3, "hidden", "selected", "clicked", 4, "ngFor", "ngForOf"], ["class", "poppy__no-items", 4, "ngIf"], [1, "poppy-select__multiselect"], ["class", "poppy-select__chip", 4, "ngFor", "ngForOf"], ["class", "poppy-select__placeholder", 4, "ngIf"], [1, "poppy-select__chip"], ["class", "poppy-chip", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "poppy-chip"], [1, "poppy-chip__content"], [1, "poppy-chip__close", 3, "click"], [1, "poppy-select__placeholder"], [1, "poppy-select__clear"], [1, "clear-btn", 3, "click"], [1, "poppy-select__arrow"], [1, "poppy-select__loader"], ["poppy-menu-item", "", 3, "hidden", "selected", "clicked"], [1, "poppy__no-items"]], template: function PopoverSelectComponent_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
        const _r5 = i0.ɵɵreference(9);
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
    } }, directives: [i2.PopoverMenuDirective, i3.NgIf, i4.PopoverMenuComponent, i3.NgForOf, i3.NgTemplateOutlet, i5.PopoverMenuItemDirective], styles: [".poppy-select{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;align-items:center;border:1px solid #acacac;border-radius:3px;box-sizing:border-box;cursor:pointer;display:flex;min-height:42px;user-select:none}.poppy-select__content{height:100%;min-height:18px;position:relative;width:100%}.poppy-select__content input{background-color:transparent;border:0;box-sizing:border-box;cursor:pointer;height:100%;outline:0;padding:0 2rem 0 .8rem;width:100%}.poppy-select__chips{height:100%;margin-bottom:-6px}.poppy-select__multiselect{align-items:center;border-radius:4px;box-sizing:border-box;display:flex;flex-wrap:wrap;height:100%;padding:0 .8rem;width:100%}.poppy-select__chip{display:inline-block;margin-bottom:4px;margin-right:6px;margin-top:4px}.poppy-select__arrow{color:#f6f6f6;position:absolute;right:8px;top:12px}.poppy-select__clear{color:#f6f6f6;position:absolute;right:4px;top:-2px}.poppy-chip{align-items:stretch;background-color:#edebe9;border-radius:16px;cursor:pointer;display:flex;font-size:.92em;height:26px;line-height:1;overflow:hidden}.poppy-chip__content{align-items:center;display:flex;font-size:inherit;line-height:1rem;margin-right:4px;padding:0 0 0 10px}.poppy-chip__close{align-items:center;background-color:#cfcfcf;border-radius:16px;display:flex;font-size:.86em;justify-content:center;padding-top:1px;width:26px}.poppy-chip__close:hover{background-color:#c2c2c2}.poppy__no-items{padding:14px 10px}.poppy-select__placeholder{color:#767676}.poppy-select__loader{position:absolute;right:15px;top:12px}"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverSelectComponent, [{
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
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.ControlContainer, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9jb21wb25lbnRzL3BvcG92ZXItc2VsZWN0L3BvcG92ZXItc2VsZWN0LmNvbXBvbmVudC50cyIsImxpYi9wb3BvdmVyL2NvbXBvbmVudHMvcG9wb3Zlci1zZWxlY3QvcG9wb3Zlci1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEVBR1QsWUFBWSxFQUVaLHVCQUF1QixFQUN2QixNQUFNLEVBQ04sWUFBWSxFQUlaLFFBQVEsRUFDUixJQUFJLEVBQ0osUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBMEMsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUcsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7OztJQ3RCNUYsNkJBQ0U7SUFBQSw0QkFHZ0I7SUFDbEIsMEJBQWU7Ozs7SUFIWCxlQUEwQztJQUExQyxnRUFBMEMsaUVBQUE7Ozs7SUFJOUMsK0JBQ0U7SUFBQSwrQkFBaUM7SUFBQSxZQUEyQjtJQUFBLGlCQUFNO0lBQ2xFLCtCQUNFO0lBRDZCLDJRQUFpQztJQUM5RCx3QkFDRjtJQUFBLGlCQUFNO0lBQ1IsaUJBQU07Ozs7SUFKNkIsZUFB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QUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDckQsS0FBSyxFQUFFLElBQUk7cUJBQ1o7b0JBQ0Q7d0JBQ0UsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7d0JBQ3JELEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2FBQ0Y7O3NCQTZCSSxRQUFROztzQkFDUixJQUFJOztzQkFDSixRQUFRO3dCQTdCRixPQUFPO2tCQUFmLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBRUksT0FBTztrQkFBaEIsTUFBTTtZQUVhLE9BQU87a0JBQTFCLFNBQVM7bUJBQUMsT0FBTztZQUNlLE9BQU87a0JBQXZDLFNBQVM7bUJBQUMsb0JBQW9CO1lBQ0ssWUFBWTtrQkFBL0MsWUFBWTttQkFBQyxvQkFBb0I7WUFDSSxjQUFjO2tCQUFuRCxZQUFZO21CQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgT25EZXN0cm95LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT3B0aW9uYWwsXG4gIEhvc3QsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQ29udHJvbENvbnRhaW5lciwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwLCB0YWtlLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24sIERpc3BsYXllZFNlbGVjdE9wdGlvbiB9IGZyb20gJy4vcG9wb3Zlci1zZWxlY3QuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBvcG92ZXJDaGlwRGlyZWN0aXZlLCBQb3BvdmVyTWVudURpcmVjdGl2ZSwgUG9wb3Zlck9wdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3BvcHB5LXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BvcG92ZXItc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBvcG92ZXJTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUG9wb3ZlclNlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBvcHRpb25zOiBTZWxlY3RPcHRpb25bXSA9IFtdO1xuICBASW5wdXQoKSBhc3luYzogKHNlYXJjaFBocmFzZT86IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICBASW5wdXQoKSB2YWx1ZTogYW55O1xuICBASW5wdXQoKSBiaW5kTGFiZWw6IHN0cmluZyA9ICdsYWJlbCc7XG4gIEBJbnB1dCgpIGJpbmRWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBtdWx0aXNlbGVjdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjbGVhcmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzZWFyY2hhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdXeWJpZXJ6Li4nO1xuICBASW5wdXQoKSBub3RGb3VuZFRleHQ6IHN0cmluZyA9ICdOaWUgem5hbGV6aW9ubyB3eW5pa8Ozdyc7XG5cbiAgQE91dHB1dCgpIGNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dEVsOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFBvcG92ZXJNZW51RGlyZWN0aXZlKSBtZW51UmVmOiBQb3BvdmVyTWVudURpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChQb3BvdmVyQ2hpcERpcmVjdGl2ZSkgY2hpcFRlbXBsYXRlOiBQb3BvdmVyQ2hpcERpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChQb3BvdmVyT3B0aW9uRGlyZWN0aXZlKSBvcHRpb25UZW1wbGF0ZTogUG9wb3Zlck9wdGlvbkRpcmVjdGl2ZTtcblxuICBzZWxlY3RlZE9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW107XG4gIGRpc3BsYXllZE9wdGlvbnM6IERpc3BsYXllZFNlbGVjdE9wdGlvbltdID0gW107XG4gIGRpc3BsYXllZENoaXBzOiBTZWxlY3RPcHRpb25bXSA9IFtdO1xuICBhc3luY0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNNZW51T3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASG9zdCgpXG4gICAgQFNraXBTZWxmKClcbiAgICBwcml2YXRlIGNvbnRyb2xDb250YWluZXI6IENvbnRyb2xDb250YWluZXJcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5vbk9wdGlvbnNDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy52YWx1ZSAmJiBjaGFuZ2VzLnZhbHVlLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXMudmFsdWUuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubWVudVJlZi5hZnRlckNsb3NlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pc01lbnVPcGVuID0gZmFsc2U7XG4gICAgICBpZiAoIXRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgdGhpcy5vbkNsb3NlTWVudSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tZW51UmVmLmFmdGVyU2hvdy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaXNNZW51T3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1lbnVSZWYuYWZ0ZXJDbG9zZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBUT0RPOiBtYXJrIGFzIHRvdWNoZWQuLlxuICAgICAgLy8gaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgLy8gICB0aGlzLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgLy8gICB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgLy8gfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXN5bmMpIHtcbiAgICAgIHRoaXMubG9hZEFzeW5jT3B0aW9ucyhudWxsLCB7IGZpcnN0TG9hZDogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWFyY2hhYmxlKSB7XG4gICAgICB0aGlzLm9uSW5wdXRLZXlVcCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIGdldCBub0l0ZW1zRm91bmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmRpc3BsYXllZE9wdGlvbnMubGVuZ3RoIHx8ICEhdGhpcy5kaXNwbGF5ZWRPcHRpb25zLmV2ZXJ5KChvcHQpID0+IG9wdC5oaWRkZW4pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRJdGVtc0Zvck11bHRpU2VsZWN0aW9uKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRJdGVtc0ZvclNpbmdsZVNlbGVjdGlvbih2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZCgpOiB2b2lkIHt9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7fVxuXG4gIHByb3BhZ2F0ZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge307XG5cbiAgZ2V0RGlzcGxheUxhYmVsKG9wdGlvbjogU2VsZWN0T3B0aW9uKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kTGFiZWwgPyBvcHRpb25bdGhpcy5iaW5kTGFiZWxdIDogJyc7XG4gIH1cblxuICBvbkNsaWNrSXRlbShjbGlja2VkT3B0aW9uOiBTZWxlY3RPcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuZGlzcGxheWVkT3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5tYXRjaEJ5VmFsdWVPclJlZmVyZW5jZShvcHRpb24sIGNsaWNrZWRPcHRpb24pKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uc2VsZWN0ZWQgPSB0aGlzLm11bHRpc2VsZWN0ID8gIW9wdGlvbi5zZWxlY3RlZCA6IHRydWU7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uaGlkZGVuID0gdGhpcy5tdWx0aXNlbGVjdCA/ICFvcHRpb24uaGlkZGVuIDogZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLnNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zLnB1c2godGhpcy5vcHRpb25zW2luZGV4XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRDaGlwcygpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgdGhpcy5pbnB1dEVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmJpbmRMYWJlbCA/IHRoaXMuc2VsZWN0ZWRPcHRpb25zWzBdW3RoaXMuYmluZExhYmVsXSA6ICcnO1xuICAgIH1cblxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG9uQ2hhbmdlSW5wdXQodGFyZ2V0OiBFdmVudFRhcmdldCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblxuICAgIGlmICh0aGlzLmJpbmRMYWJlbCkge1xuICAgICAgaWYgKHRoaXMuYXN5bmMpIHtcbiAgICAgICAgdGhpcy5sb2FkQXN5bmNPcHRpb25zKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5oaWRkZW4gPSAhb3B0aW9uW3RoaXMuYmluZExhYmVsXS5pbmNsdWRlcyh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgZ2V0RGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XG4gICAgaWYgKCEhdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2VsZWN0ZWRPcHRpb25zWzBdID09PSAnb2JqZWN0JyAmJiB0aGlzLmJpbmRMYWJlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9wdGlvbnNbMF1bdGhpcy5iaW5kTGFiZWxdO1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjbG9zZUNoaXAoY2hpcDogU2VsZWN0T3B0aW9uLCBldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuZGlzcGxheWVkT3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5tYXRjaEJ5VmFsdWVPclJlZmVyZW5jZShvcHRpb24sIGNoaXApKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLnNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zLnB1c2godGhpcy5vcHRpb25zW2luZGV4XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZENoaXBzKCk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG5cbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgb25PcHRpb25zQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheWVkT3B0aW9ucyA9IFsuLi50aGlzLm9wdGlvbnNdLm1hcCgob3B0aW9uKSA9PiAoe1xuICAgICAgLi4ub3B0aW9uLFxuICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgaGlkZGVuOiBmYWxzZSxcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIG9uSW5wdXRLZXlVcCgpOiB2b2lkIHtcbiAgICBmcm9tRXZlbnQodGhpcy5pbnB1dEVsLm5hdGl2ZUVsZW1lbnQsICdrZXl1cCcpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5hc3luYykge1xuICAgICAgICAgICAgdGhpcy5hc3luY0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGRlYm91bmNlVGltZSghIXRoaXMuYXN5bmMgPyA1MDAgOiAwKSxcbiAgICAgICAgbWFwKChldmVudDogRXZlbnQpID0+IGV2ZW50LnRhcmdldCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodGFyZ2V0KSA9PiB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VJbnB1dCh0YXJnZXQpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheWVkT3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgaWYgKHRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQ2hpcHMgPSBbXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXRDaGFuZ2UoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFByb3BhZ2F0ZVZhbHVlKCk7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlZC5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvcGFnYXRlVmFsdWUoKTogYW55IHwgYW55W10ge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXNlbGVjdCA/IFtdIDogbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLmJpbmRWYWx1ZVxuICAgICAgICA/IHRoaXMuc2VsZWN0ZWRPcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb25bdGhpcy5iaW5kVmFsdWVdKVxuICAgICAgICA6IHRoaXMuc2VsZWN0ZWRPcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5iaW5kVmFsdWUgPyB0aGlzLnNlbGVjdGVkT3B0aW9uc1swXVt0aGlzLmJpbmRWYWx1ZV0gOiB0aGlzLnNlbGVjdGVkT3B0aW9uc1swXTtcbiAgfVxuXG4gIHByaXZhdGUgb25DbG9zZU1lbnUoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAhIXRoaXMuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aFxuICAgICAgPyB0aGlzLnNlbGVjdGVkT3B0aW9uc1swXVt0aGlzLmJpbmRMYWJlbF1cbiAgICAgIDogbnVsbDtcbiAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnMuZm9yRWFjaCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5oaWRkZW4gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEFzeW5jT3B0aW9ucyhzZWFyY2hQaHJhc2U/OiBzdHJpbmcsIG9wdGlvbnM6IHsgZmlyc3RMb2FkPzogYm9vbGVhbiB9ID0ge30pOiB2b2lkIHtcbiAgICB0aGlzLmFzeW5jTG9hZGluZyA9ICFvcHRpb25zLmZpcnN0TG9hZDtcbiAgICB0aGlzLmFzeW5jKHNlYXJjaFBocmFzZSkuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSByZXN1bHRzO1xuICAgICAgdGhpcy5vbk9wdGlvbnNDaGFuZ2UoKTtcbiAgICAgIHRoaXMuYXN5bmNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNlbGVjdGVkSXRlbXNGb3JNdWx0aVNlbGVjdGlvbih2YWx1ZTogU2VsZWN0T3B0aW9uW10pOiB2b2lkIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0luaXRpYWwgdmFsdWUgZm9yIG11bHRpc2VsZWN0IG11c3QgYmUgYW4gYXJyYXkhJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5kaXNwbGF5ZWRDaGlwcyA9IFtdO1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBtYXRjaE9wdGlvbiA9ICEhdmFsdWUuZmluZCgodikgPT4gdGhpcy5tYXRjaEJ5VmFsdWVPclJlZmVyZW5jZShvcHRpb24sIHYpKTtcblxuICAgICAgaWYgKG1hdGNoT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkQ2hpcHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2VsZWN0ZWRJdGVtc0ZvclNpbmdsZVNlbGVjdGlvbih2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1hdGNoQnlWYWx1ZU9yUmVmZXJlbmNlKG9wdGlvbiwgdmFsdWUpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW29wdGlvbl07XG4gICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZURpc3BsYXllZENoaXBzKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1xuICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiBvcHRpb24uc2VsZWN0ZWQpXG4gICAgICAuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaXBJbmRleCA9IHRoaXMuZGlzcGxheWVkQ2hpcHMuZmluZEluZGV4KChjaGlwKSA9PiB0aGlzLm1hdGNoQnlWYWx1ZU9yUmVmZXJlbmNlKGNoaXAsIG9wdGlvbikpO1xuICAgICAgICBpZiAoY2hpcEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheWVkQ2hpcHMucHVzaChvcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLmRpc3BsYXllZENoaXBzLmZvckVhY2goKGNoaXAsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBvcHRpb24gPSB0aGlzLmRpc3BsYXllZE9wdGlvbnNcbiAgICAgICAgLmZpbHRlcigob3B0KSA9PiBvcHQuc2VsZWN0ZWQpXG4gICAgICAgIC5maW5kKChvcHQpID0+IHRoaXMubWF0Y2hCeVZhbHVlT3JSZWZlcmVuY2UoY2hpcCwgb3B0KSk7XG4gICAgICBpZiAoIW9wdGlvbikge1xuICAgICAgICB0aGlzLmRpc3BsYXllZENoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5tZW51UmVmKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5tZW51UmVmLnVwZGF0ZUNvbnRlbnRQb3NpdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtYXRjaEJ5VmFsdWVPclJlZmVyZW5jZShpdGVtOiBTZWxlY3RPcHRpb24sIGNvbXBhcmVkVG86IFNlbGVjdE9wdGlvbik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmJpbmRWYWx1ZSkge1xuICAgICAgaWYgKGNvbXBhcmVkVG8gJiYgY29tcGFyZWRUb1t0aGlzLmJpbmRWYWx1ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgICAgICByZXR1cm4gaXRlbVt0aGlzLmJpbmRWYWx1ZV0gPT0gY29tcGFyZWRUb1t0aGlzLmJpbmRWYWx1ZV07XG4gICAgICB9XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgICAgcmV0dXJuIGl0ZW1bdGhpcy5iaW5kVmFsdWVdID09IGNvbXBhcmVkVG87XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW0gPT09IGNvbXBhcmVkVG87XG4gIH1cbn1cbiIsIiAgPGRpdiBjbGFzcz1cInBvcHB5LXNlbGVjdFwiIFtwb3BweU1lbnVdPVwibWVudVwiIFtjbG9zZU9uQ2xpY2tJdGVtXT1cIiFtdWx0aXNlbGVjdFwiPlxuICAgIDxkaXYgY2xhc3M9XCJwb3BweS1zZWxlY3RfX2NvbnRlbnRcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJtdWx0aXNlbGVjdFwiIGNsYXNzPVwicG9wcHktc2VsZWN0X19tdWx0aXNlbGVjdFwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlwIG9mIGRpc3BsYXllZENoaXBzXCIgY2xhc3M9XCJwb3BweS1zZWxlY3RfX2NoaXBcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2hpcFRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNoaXBUZW1wbGF0ZS50ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogY2hpcCB9XCJcbiAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWNoaXBUZW1wbGF0ZVwiIGNsYXNzPVwicG9wcHktY2hpcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvcHB5LWNoaXBfX2NvbnRlbnRcIj57eyBnZXREaXNwbGF5TGFiZWwoY2hpcCkgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3BweS1jaGlwX19jbG9zZVwiIChjbGljayk9XCJjbG9zZUNoaXAoY2hpcCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAmIzEwMDA2O1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBvcHB5LXNlbGVjdF9fcGxhY2Vob2xkZXJcIiAqbmdJZj1cIiFzZWxlY3RlZE9wdGlvbnMubGVuZ3RoXCI+e3sgcGxhY2Vob2xkZXIgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGlucHV0XG4gICAgICAgICNpbnB1dFxuICAgICAgICBbaGlkZGVuXT1cIm11bHRpc2VsZWN0XCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgW3ZhbHVlXT1cImdldERpc3BsYXlWYWx1ZSgpXCJcbiAgICAgICAgW3JlYWRPbmx5XT1cIiFzZWFyY2hhYmxlXCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgLz5cblxuICAgICAgPGRpdiAqbmdJZj1cImNsZWFyYWJsZSAmJiAhbXVsdGlzZWxlY3QgJiYgISFnZXREaXNwbGF5VmFsdWUoKVwiIGNsYXNzPVwicG9wcHktc2VsZWN0X19jbGVhclwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2xlYXItYnRuXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIj4mdGltZXM7PC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cIiFhc3luY0xvYWRpbmdcIiBjbGFzcz1cInBvcHB5LXNlbGVjdF9fYXJyb3dcIj5cbjwhLS0gICAgICAgIDxzcGFuICpuZ0lmPVwiaXNNZW51T3BlblwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj4tLT5cbjwhLS0gICAgICAgICAga2V5Ym9hcmRfYXJyb3dfdXAtLT5cbjwhLS0gICAgICAgIDwvc3Bhbj4tLT5cbjwhLS0gICAgICAgIDxzcGFuICpuZ0lmPVwiIWlzTWVudU9wZW5cIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+LS0+XG48IS0tICAgICAgICAgIGtleWJvYXJkX2Fycm93X2Rvd24tLT5cbjwhLS0gICAgICAgIDwvc3Bhbj4tLT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYXN5bmNMb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3BweS1zZWxlY3RfX2xvYWRlclwiPlxuICAgICAgICAgIGxvYWRlci4uXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48cG9wcHktbWVudSAjbWVudT1cInBvcHB5TWVudVwiPlxuICA8bGlcbiAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGRpc3BsYXllZE9wdGlvbnNcIlxuICAgIHBvcHB5LW1lbnUtaXRlbVxuICAgIFtoaWRkZW5dPVwib3B0aW9uLmhpZGRlblwiXG4gICAgW3NlbGVjdGVkXT1cIm9wdGlvbi5zZWxlY3RlZFwiXG4gICAgKGNsaWNrZWQpPVwib25DbGlja0l0ZW0ob3B0aW9uKVwiXG4gID5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwib3B0aW9uVGVtcGxhdGVcIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwib3B0aW9uVGVtcGxhdGUudGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG9wdGlvbiB9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW9wdGlvblRlbXBsYXRlXCI+XG4gICAgICB7eyBnZXREaXNwbGF5TGFiZWwob3B0aW9uKSB9fVxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2xpPlxuICA8ZGl2IGNsYXNzPVwicG9wcHlfX25vLWl0ZW1zXCIgKm5nSWY9XCJub0l0ZW1zRm91bmRcIj57eyBub3RGb3VuZFRleHQgfX08L2Rpdj5cbjwvcG9wcHktbWVudT5cbiJdfQ==