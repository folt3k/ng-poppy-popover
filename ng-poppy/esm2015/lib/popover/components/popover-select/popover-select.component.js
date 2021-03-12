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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL25nLXBvcHB5L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL2NvbXBvbmVudHMvcG9wb3Zlci1zZWxlY3QvcG9wb3Zlci1zZWxlY3QuY29tcG9uZW50LnRzIiwibGliL3BvcG92ZXIvY29tcG9uZW50cy9wb3BvdmVyLXNlbGVjdC9wb3BvdmVyLXNlbGVjdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFHVCxZQUFZLEVBRVosdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBSVosUUFBUSxFQUNSLElBQUksRUFDSixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUEwQyxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRyxPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7O0lDdEI1Riw2QkFDRTtJQUFBLDRCQUdnQjtJQUNsQiwwQkFBZTs7OztJQUhYLGVBQTBDO0lBQTFDLGdFQUEwQyxpRUFBQTs7OztJQUk5QywrQkFDRTtJQUFBLCtCQUFpQztJQUFBLFlBQTJCO0lBQUEsaUJBQU07SUFDbEUsK0JBQ0U7SUFENkIsMlFBQWlDO0lBQzlELHdCQUNGO0lBQUEsaUJBQU07SUFDUixpQkFBTTs7OztJQUo2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QUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO3dCQUNyRCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtvQkFDRDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDckQsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7YUFDRjs7c0JBNkJJLFFBQVE7O3NCQUNSLElBQUk7O3NCQUNKLFFBQVE7d0JBN0JGLE9BQU87a0JBQWYsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFFSSxPQUFPO2tCQUFoQixNQUFNO1lBRWEsT0FBTztrQkFBMUIsU0FBUzttQkFBQyxPQUFPO1lBQ2UsT0FBTztrQkFBdkMsU0FBUzttQkFBQyxvQkFBb0I7WUFDSyxZQUFZO2tCQUEvQyxZQUFZO21CQUFDLG9CQUFvQjtZQUNJLGNBQWM7a0JBQW5ELFlBQVk7bUJBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBPbkRlc3Ryb3ksXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBBZnRlclZpZXdJbml0LFxuICBPcHRpb25hbCxcbiAgSG9zdCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDb250cm9sQ29udGFpbmVyLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNlbGVjdE9wdGlvbiwgRGlzcGxheWVkU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi9wb3BvdmVyLXNlbGVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUG9wb3ZlckNoaXBEaXJlY3RpdmUsIFBvcG92ZXJNZW51RGlyZWN0aXZlLCBQb3BvdmVyT3B0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcyc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAncG9wcHktc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXItc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcG9wb3Zlci1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUG9wb3ZlclNlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQb3BvdmVyU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW107XG4gIEBJbnB1dCgpIGFzeW5jOiAoc2VhcmNoUGhyYXNlPzogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT47XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIGJpbmRMYWJlbDogc3RyaW5nID0gJ2xhYmVsJztcbiAgQElucHV0KCkgYmluZFZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG11bHRpc2VsZWN0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNsZWFyYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNlYXJjaGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1d5YmllcnouLic7XG4gIEBJbnB1dCgpIG5vdEZvdW5kVGV4dDogc3RyaW5nID0gJ05pZSB6bmFsZXppb25vIHd5bmlrw7N3JztcblxuICBAT3V0cHV0KCkgY2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0RWw6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoUG9wb3Zlck1lbnVEaXJlY3RpdmUpIG1lbnVSZWY6IFBvcG92ZXJNZW51RGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFBvcG92ZXJDaGlwRGlyZWN0aXZlKSBjaGlwVGVtcGxhdGU6IFBvcG92ZXJDaGlwRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFBvcG92ZXJPcHRpb25EaXJlY3RpdmUpIG9wdGlvblRlbXBsYXRlOiBQb3BvdmVyT3B0aW9uRGlyZWN0aXZlO1xuXG4gIHNlbGVjdGVkT3B0aW9uczogU2VsZWN0T3B0aW9uW10gPSBbXTtcbiAgZGlzcGxheWVkT3B0aW9uczogRGlzcGxheWVkU2VsZWN0T3B0aW9uW10gPSBbXTtcbiAgZGlzcGxheWVkQ2hpcHM6IFNlbGVjdE9wdGlvbltdID0gW107XG4gIGFzeW5jTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBpc01lbnVPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBIb3N0KClcbiAgICBAU2tpcFNlbGYoKVxuICAgIHByaXZhdGUgY29udHJvbENvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lclxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zICYmIGNoYW5nZXMub3B0aW9ucy5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLm9uT3B0aW9uc0NoYW5nZSgpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnZhbHVlICYmIGNoYW5nZXMudmFsdWUucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlcy52YWx1ZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tZW51UmVmLmFmdGVyQ2xvc2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmlzTWVudU9wZW4gPSBmYWxzZTtcbiAgICAgIGlmICghdGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgICB0aGlzLm9uQ2xvc2VNZW51KCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1lbnVSZWYuYWZ0ZXJTaG93LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pc01lbnVPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWVudVJlZi5hZnRlckNsb3NlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIFRPRE86IG1hcmsgYXMgdG91Y2hlZC4uXG4gICAgICAvLyBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAvLyAgIHRoaXMuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAvLyAgIHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAvLyB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hc3luYykge1xuICAgICAgdGhpcy5sb2FkQXN5bmNPcHRpb25zKG51bGwsIHsgZmlyc3RMb2FkOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlYXJjaGFibGUpIHtcbiAgICAgIHRoaXMub25JbnB1dEtleVVwKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgZ2V0IG5vSXRlbXNGb3VuZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZGlzcGxheWVkT3B0aW9ucy5sZW5ndGggfHwgISF0aGlzLmRpc3BsYXllZE9wdGlvbnMuZXZlcnkoKG9wdCkgPT4gb3B0LmhpZGRlbik7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZEl0ZW1zRm9yTXVsdGlTZWxlY3Rpb24odmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZEl0ZW1zRm9yU2luZ2xlU2VsZWN0aW9uKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCk6IHZvaWQge31cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHt9XG5cbiAgcHJvcGFnYXRlQ2hhbmdlID0gKHZhbHVlKSA9PiB7fTtcblxuICBnZXREaXNwbGF5TGFiZWwob3B0aW9uOiBTZWxlY3RPcHRpb24pOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmJpbmRMYWJlbCA/IG9wdGlvblt0aGlzLmJpbmRMYWJlbF0gOiAnJztcbiAgfVxuXG4gIG9uQ2xpY2tJdGVtKGNsaWNrZWRPcHRpb246IFNlbGVjdE9wdGlvbik6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1hdGNoQnlWYWx1ZU9yUmVmZXJlbmNlKG9wdGlvbiwgY2xpY2tlZE9wdGlvbikpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5zZWxlY3RlZCA9IHRoaXMubXVsdGlzZWxlY3QgPyAhb3B0aW9uLnNlbGVjdGVkIDogdHJ1ZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5oaWRkZW4gPSB0aGlzLm11bHRpc2VsZWN0ID8gIW9wdGlvbi5oaWRkZW4gOiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMucHVzaCh0aGlzLm9wdGlvbnNbaW5kZXhdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICB0aGlzLnVwZGF0ZURpc3BsYXllZENoaXBzKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICB0aGlzLmlucHV0RWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuYmluZExhYmVsID8gdGhpcy5zZWxlY3RlZE9wdGlvbnNbMF1bdGhpcy5iaW5kTGFiZWxdIDogJyc7XG4gICAgfVxuXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgb25DaGFuZ2VJbnB1dCh0YXJnZXQ6IEV2ZW50VGFyZ2V0KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSAodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXG4gICAgaWYgKHRoaXMuYmluZExhYmVsKSB7XG4gICAgICBpZiAodGhpcy5hc3luYykge1xuICAgICAgICB0aGlzLmxvYWRBc3luY09wdGlvbnModmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLmhpZGRlbiA9ICFvcHRpb25bdGhpcy5iaW5kTGFiZWxdLmluY2x1ZGVzKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbGVhcihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICBnZXREaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAoISF0aGlzLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zZWxlY3RlZE9wdGlvbnNbMF0gPT09ICdvYmplY3QnICYmIHRoaXMuYmluZExhYmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT3B0aW9uc1swXVt0aGlzLmJpbmRMYWJlbF07XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNsb3NlQ2hpcChjaGlwOiBTZWxlY3RPcHRpb24sIGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1hdGNoQnlWYWx1ZU9yUmVmZXJlbmNlKG9wdGlvbiwgY2hpcCkpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMucHVzaCh0aGlzLm9wdGlvbnNbaW5kZXhdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkQ2hpcHMoKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcblxuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk9wdGlvbnNDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zID0gWy4uLnRoaXMub3B0aW9uc10ubWFwKChvcHRpb24pID0+ICh7XG4gICAgICAuLi5vcHRpb24sXG4gICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICBoaWRkZW46IGZhbHNlLFxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgb25JbnB1dEtleVVwKCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLmlucHV0RWwubmF0aXZlRWxlbWVudCwgJ2tleXVwJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmFzeW5jKSB7XG4gICAgICAgICAgICB0aGlzLmFzeW5jTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGVib3VuY2VUaW1lKCEhdGhpcy5hc3luYyA/IDUwMCA6IDApLFxuICAgICAgICBtYXAoKGV2ZW50OiBFdmVudCkgPT4gZXZlbnQudGFyZ2V0KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh0YXJnZXQpID0+IHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUlucHV0KHRhcmdldCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheWVkT3B0aW9uc1tpbmRleF0uaGlkZGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgfSk7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICBpZiAodGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDaGlwcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdENoYW5nZSgpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0UHJvcGFnYXRlVmFsdWUoKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh2YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9wYWdhdGVWYWx1ZSgpOiBhbnkgfCBhbnlbXSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpc2VsZWN0ID8gW10gOiBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMuYmluZFZhbHVlXG4gICAgICAgID8gdGhpcy5zZWxlY3RlZE9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvblt0aGlzLmJpbmRWYWx1ZV0pXG4gICAgICAgIDogdGhpcy5zZWxlY3RlZE9wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmJpbmRWYWx1ZSA/IHRoaXMuc2VsZWN0ZWRPcHRpb25zWzBdW3RoaXMuYmluZFZhbHVlXSA6IHRoaXMuc2VsZWN0ZWRPcHRpb25zWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNsb3NlTWVudSgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RWwubmF0aXZlRWxlbWVudC52YWx1ZSA9ICEhdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoXG4gICAgICA/IHRoaXMuc2VsZWN0ZWRPcHRpb25zWzBdW3RoaXMuYmluZExhYmVsXVxuICAgICAgOiBudWxsO1xuICAgIHRoaXMuZGlzcGxheWVkT3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLmhpZGRlbiA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQXN5bmNPcHRpb25zKHNlYXJjaFBocmFzZT86IHN0cmluZywgb3B0aW9uczogeyBmaXJzdExvYWQ/OiBib29sZWFuIH0gPSB7fSk6IHZvaWQge1xuICAgIHRoaXMuYXN5bmNMb2FkaW5nID0gIW9wdGlvbnMuZmlyc3RMb2FkO1xuICAgIHRoaXMuYXN5bmMoc2VhcmNoUGhyYXNlKS5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHJlc3VsdHM7XG4gICAgICB0aGlzLm9uT3B0aW9uc0NoYW5nZSgpO1xuICAgICAgdGhpcy5hc3luY0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2VsZWN0ZWRJdGVtc0Zvck11bHRpU2VsZWN0aW9uKHZhbHVlOiBTZWxlY3RPcHRpb25bXSk6IHZvaWQge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBFcnJvcignSW5pdGlhbCB2YWx1ZSBmb3IgbXVsdGlzZWxlY3QgbXVzdCBiZSBhbiBhcnJheSEnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmRpc3BsYXllZENoaXBzID0gW107XG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoT3B0aW9uID0gISF2YWx1ZS5maW5kKCh2KSA9PiB0aGlzLm1hdGNoQnlWYWx1ZU9yUmVmZXJlbmNlKG9wdGlvbiwgdikpO1xuXG4gICAgICBpZiAobWF0Y2hPcHRpb24pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5oaWRkZW4gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRDaGlwcygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTZWxlY3RlZEl0ZW1zRm9yU2luZ2xlU2VsZWN0aW9uKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRoaXMubWF0Y2hCeVZhbHVlT3JSZWZlcmVuY2Uob3B0aW9uLCB2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbb3B0aW9uXTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BsYXllZE9wdGlvbnNbaW5kZXhdLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGlzcGxheWVkQ2hpcHMoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5ZWRPcHRpb25zXG4gICAgICAuZmlsdGVyKChvcHRpb24pID0+IG9wdGlvbi5zZWxlY3RlZClcbiAgICAgIC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgY29uc3QgY2hpcEluZGV4ID0gdGhpcy5kaXNwbGF5ZWRDaGlwcy5maW5kSW5kZXgoKGNoaXApID0+IHRoaXMubWF0Y2hCeVZhbHVlT3JSZWZlcmVuY2UoY2hpcCwgb3B0aW9uKSk7XG4gICAgICAgIGlmIChjaGlwSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5ZWRDaGlwcy5wdXNoKG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuZGlzcGxheWVkQ2hpcHMuZm9yRWFjaCgoY2hpcCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuZGlzcGxheWVkT3B0aW9uc1xuICAgICAgICAuZmlsdGVyKChvcHQpID0+IG9wdC5zZWxlY3RlZClcbiAgICAgICAgLmZpbmQoKG9wdCkgPT4gdGhpcy5tYXRjaEJ5VmFsdWVPclJlZmVyZW5jZShjaGlwLCBvcHQpKTtcbiAgICAgIGlmICghb3B0aW9uKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ2hpcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm1lbnVSZWYpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm1lbnVSZWYudXBkYXRlQ29udGVudFBvc2l0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1hdGNoQnlWYWx1ZU9yUmVmZXJlbmNlKGl0ZW06IFNlbGVjdE9wdGlvbiwgY29tcGFyZWRUbzogU2VsZWN0T3B0aW9uKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuYmluZFZhbHVlKSB7XG4gICAgICBpZiAoY29tcGFyZWRUbyAmJiBjb21wYXJlZFRvW3RoaXMuYmluZFZhbHVlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgICAgIHJldHVybiBpdGVtW3RoaXMuYmluZFZhbHVlXSA9PSBjb21wYXJlZFRvW3RoaXMuYmluZFZhbHVlXTtcbiAgICAgIH1cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgICByZXR1cm4gaXRlbVt0aGlzLmJpbmRWYWx1ZV0gPT0gY29tcGFyZWRUbztcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbSA9PT0gY29tcGFyZWRUbztcbiAgfVxufVxuIiwiICA8ZGl2IGNsYXNzPVwicG9wcHktc2VsZWN0XCIgW3BvcHB5TWVudV09XCJtZW51XCIgW2Nsb3NlT25DbGlja0l0ZW1dPVwiIW11bHRpc2VsZWN0XCI+XG4gICAgPGRpdiBjbGFzcz1cInBvcHB5LXNlbGVjdF9fY29udGVudFwiPlxuICAgICAgPGRpdiAqbmdJZj1cIm11bHRpc2VsZWN0XCIgY2xhc3M9XCJwb3BweS1zZWxlY3RfX211bHRpc2VsZWN0XCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaXAgb2YgZGlzcGxheWVkQ2hpcHNcIiBjbGFzcz1cInBvcHB5LXNlbGVjdF9fY2hpcFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjaGlwVGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY2hpcFRlbXBsYXRlLnRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBjaGlwIH1cIlxuICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCIhY2hpcFRlbXBsYXRlXCIgY2xhc3M9XCJwb3BweS1jaGlwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9wcHktY2hpcF9fY29udGVudFwiPnt7IGdldERpc3BsYXlMYWJlbChjaGlwKSB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvcHB5LWNoaXBfX2Nsb3NlXCIgKGNsaWNrKT1cImNsb3NlQ2hpcChjaGlwLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICYjMTAwMDY7XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicG9wcHktc2VsZWN0X19wbGFjZWhvbGRlclwiICpuZ0lmPVwiIXNlbGVjdGVkT3B0aW9ucy5sZW5ndGhcIj57eyBwbGFjZWhvbGRlciB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgI2lucHV0XG4gICAgICAgIFtoaWRkZW5dPVwibXVsdGlzZWxlY3RcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICBbdmFsdWVdPVwiZ2V0RGlzcGxheVZhbHVlKClcIlxuICAgICAgICBbcmVhZE9ubHldPVwiIXNlYXJjaGFibGVcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAvPlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiY2xlYXJhYmxlICYmICFtdWx0aXNlbGVjdCAmJiAhIWdldERpc3BsYXlWYWx1ZSgpXCIgY2xhc3M9XCJwb3BweS1zZWxlY3RfX2NsZWFyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjbGVhci1idG5cIiAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWFzeW5jTG9hZGluZ1wiIGNsYXNzPVwicG9wcHktc2VsZWN0X19hcnJvd1wiPlxuPCEtLSAgICAgICAgPHNwYW4gKm5nSWY9XCJpc01lbnVPcGVuXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPi0tPlxuPCEtLSAgICAgICAgICBrZXlib2FyZF9hcnJvd191cC0tPlxuPCEtLSAgICAgICAgPC9zcGFuPi0tPlxuPCEtLSAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXNNZW51T3BlblwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj4tLT5cbjwhLS0gICAgICAgICAga2V5Ym9hcmRfYXJyb3dfZG93bi0tPlxuPCEtLSAgICAgICAgPC9zcGFuPi0tPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhc3luY0xvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvcHB5LXNlbGVjdF9fbG9hZGVyXCI+XG4gICAgICAgICAgbG9hZGVyLi5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjxwb3BweS1tZW51ICNtZW51PVwicG9wcHlNZW51XCI+XG4gIDxsaVxuICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZGlzcGxheWVkT3B0aW9uc1wiXG4gICAgcG9wcHktbWVudS1pdGVtXG4gICAgW2hpZGRlbl09XCJvcHRpb24uaGlkZGVuXCJcbiAgICBbc2VsZWN0ZWRdPVwib3B0aW9uLnNlbGVjdGVkXCJcbiAgICAoY2xpY2tlZCk9XCJvbkNsaWNrSXRlbShvcHRpb24pXCJcbiAgPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJvcHRpb25UZW1wbGF0ZVwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJvcHRpb25UZW1wbGF0ZS50ZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogb3B0aW9uIH1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhb3B0aW9uVGVtcGxhdGVcIj5cbiAgICAgIHt7IGdldERpc3BsYXlMYWJlbChvcHRpb24pIH19XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbGk+XG4gIDxkaXYgY2xhc3M9XCJwb3BweV9fbm8taXRlbXNcIiAqbmdJZj1cIm5vSXRlbXNGb3VuZFwiPnt7IG5vdEZvdW5kVGV4dCB9fTwvZGl2PlxuPC9wb3BweS1tZW51PlxuIl19