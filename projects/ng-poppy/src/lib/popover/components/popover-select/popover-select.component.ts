import {
  Component,
  OnInit,
  ViewEncapsulation,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ContentChild,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  Optional,
  Host,
  SkipSelf,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer, NG_VALIDATORS } from '@angular/forms';
import { debounceTime, map, take, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';

import { SelectOption, DisplayedSelectOption } from './popover-select.interface';
import { PopoverChipDirective, PopoverMenuDirective, PopoverOptionDirective } from '../../directives';

@Component({
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
})
export class PopoverSelectComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit, ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() async: (searchPhrase?: string) => Observable<any>;
  @Input() value: any;
  @Input() bindLabel: string = 'label';
  @Input() bindValue: string;
  @Input() multiselect: boolean = false;
  @Input() clearable: boolean = true;
  @Input() searchable: boolean = true;
  @Input() placeholder: string = 'Wybierz..';
  @Input() notFoundText: string = 'Nie znaleziono wyników';

  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('input') inputEl: ElementRef;
  @ViewChild(PopoverMenuDirective) menuRef: PopoverMenuDirective;
  @ContentChild(PopoverChipDirective) chipTemplate: PopoverChipDirective;
  @ContentChild(PopoverOptionDirective) optionTemplate: PopoverOptionDirective;

  selectedOptions: SelectOption[] = [];
  displayedOptions: DisplayedSelectOption[] = [];
  displayedChips: SelectOption[] = [];
  asyncLoading: boolean = false;
  isMenuOpen: boolean = false;
  private destroy$ = new Subject();

  constructor(
    private cdr: ChangeDetectorRef,
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && changes.options.previousValue !== changes.options.currentValue) {
      this.onOptionsChange();
    }

    if (changes.value && changes.value.previousValue !== changes.value.currentValue) {
      this.writeValue(this.value);
    }
  }

  ngAfterViewInit(): void {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get noItemsFound(): boolean {
    return !this.displayedOptions.length || !!this.displayedOptions.every((opt) => opt.hidden);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      if (this.multiselect) {
        this.updateSelectedItemsForMultiSelection(value);
      } else {
        this.updateSelectedItemsForSingleSelection(value);
      }
    } else {
      this.reset();
    }

    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  setDisabledState(isDisabled: boolean): void {}

  propagateChange = (value) => {};

  getDisplayLabel(option: SelectOption): string {
    return this.bindLabel ? option[this.bindLabel] : '';
  }

  onClickItem(clickedOption: SelectOption): void {
    this.selectedOptions = [];
    this.displayedOptions.forEach((option, index) => {
      if (this.matchByValueOrReference(option, clickedOption)) {
        this.displayedOptions[index].selected = this.multiselect ? !option.selected : true;
        this.displayedOptions[index].hidden = this.multiselect ? !option.hidden : false;
      } else {
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

  onChangeInput(target: EventTarget): void {
    const value = (target as HTMLInputElement).value;

    if (this.bindLabel) {
      if (this.async) {
        this.loadAsyncOptions(value);
      } else {
        this.displayedOptions.forEach((option, index) => {
          this.displayedOptions[index].hidden = !option[this.bindLabel].includes(value);
        });
        this.cdr.detectChanges();
      }
    }
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.reset();
    this.emitChange();
  }

  getDisplayValue(): string {
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

  closeChip(chip: SelectOption, event: Event): void {
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

  private onOptionsChange(): void {
    this.displayedOptions = [...this.options].map((option) => ({
      ...option,
      selected: false,
      hidden: false,
    }));
  }

  private onInputKeyUp(): void {
    fromEvent(this.inputEl.nativeElement, 'keyup')
      .pipe(
        tap(() => {
          if (this.async) {
            this.asyncLoading = true;
          }
        }),
        debounceTime(!!this.async ? 500 : 0),
        map((event: Event) => event.target),
        takeUntil(this.destroy$)
      )
      .subscribe((target) => {
        this.onChangeInput(target);
      });
  }

  private reset(): void {
    this.displayedOptions.forEach((option, index) => {
      this.displayedOptions[index].hidden = false;
      this.displayedOptions[index].selected = false;
    });
    this.selectedOptions = [];
    if (this.multiselect) {
      this.displayedChips = [];
    }
  }

  private emitChange(): void {
    const value = this.getPropagateValue();
    this.propagateChange(value);
    this.changed.emit(value);
  }

  private getPropagateValue(): any | any[] {
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

  private onCloseMenu(): void {
    this.inputEl.nativeElement.value = !!this.selectedOptions.length
      ? this.selectedOptions[0][this.bindLabel]
      : null;
    this.displayedOptions.forEach((option, index) => {
      this.displayedOptions[index].hidden = false;
    });
  }

  private loadAsyncOptions(searchPhrase?: string, options: { firstLoad?: boolean } = {}): void {
    this.asyncLoading = !options.firstLoad;
    this.async(searchPhrase).subscribe((results) => {
      this.options = results;
      this.onOptionsChange();
      this.asyncLoading = false;
      this.cdr.detectChanges();
    });
  }

  private updateSelectedItemsForMultiSelection(value: SelectOption[]): void {
    if (!Array.isArray(value)) {
      if (value !== null) {
        throw Error('Initial value for multiselect must be an array!');
      } else {
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
      } else {
        this.displayedOptions[index].selected = false;
        this.displayedOptions[index].hidden = false;
      }
    });

    this.updateDisplayedChips();
  }

  private updateSelectedItemsForSingleSelection(value: any): void {
    this.options.forEach((option, index) => {
      if (this.matchByValueOrReference(option, value)) {
        this.selectedOptions = [option];
        this.displayedOptions[index].selected = true;
      } else {
        this.displayedOptions[index].selected = false;
      }
    });

    if (!value) {
      this.selectedOptions = [];
    }
  }

  private updateDisplayedChips(): void {
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

  private matchByValueOrReference(item: SelectOption, comparedTo: SelectOption): boolean {
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
