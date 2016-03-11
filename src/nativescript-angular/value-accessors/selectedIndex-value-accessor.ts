import {Directive, ElementRef, Renderer, Self, forwardRef, provide} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/src/common/forms/directives/control_value_accessor';
import {isBlank, isNumber} from 'angular2/src/facade/lang';

const SELECTED_INDEX_VALUE_ACCESSOR = provide(NG_VALUE_ACCESSOR, { useExisting: forwardRef(() => SelectedIndexValueAccessor), multi: true });

/**
 * The accessor for setting a selectedIndex and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <SegmentedBar [(ngModel)]='model.test'>
 *  ```
 */
@Directive({
    selector: 'SegmentedBar[ngModel], ListPicker[ngModel]',
    host: { '(selectedIndexChange)': 'onChange($event.value)' },
    bindings: [SELECTED_INDEX_VALUE_ACCESSOR]
})
export class SelectedIndexValueAccessor implements ControlValueAccessor {
    onChange = (_) => { };
    onTouched = () => { };

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    writeValue(value: any): void {
        let normalizedValue;
        if (isBlank(value)) {
            normalizedValue = 0;
        }
        else {
            if (isNumber(value)) {
                normalizedValue = value;
            }
            else {
                let parsedValue = parseInt(value);
                normalizedValue = isNaN(parsedValue) ? 0 : parsedValue;
            }
        }
        const view = this._elementRef.nativeElement;
        const oldSelectedIndex = view.selectedIndex
        const newSelectedIndex = Math.round(normalizedValue);

        if (true || oldSelectedIndex !== newSelectedIndex) {
            //this._renderer.setElementProperty(view, 'selectedIndex', newSelectedIndex);
            view.selectedIndex = newSelectedIndex;
        }
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
