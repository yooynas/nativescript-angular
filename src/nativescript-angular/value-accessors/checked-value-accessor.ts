import {Directive, ElementRef, Renderer, Self, forwardRef, provide} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/src/common/forms/directives/control_value_accessor';
import {isBlank} from 'angular2/src/facade/lang';

const CHECKED_VALUE_ACCESSOR = provide(NG_VALUE_ACCESSOR, { useExisting: forwardRef(() => CheckedValueAccessor), multi: true });

/**
 * The accessor for setting a checked property and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <Switch [(ngModel)]='model.test'>
 *  ```
 */
@Directive({
    selector: 'Switch[ngModel]',
    host: { '(checkedChange)': 'onChange($event.value)' },
    bindings: [CHECKED_VALUE_ACCESSOR]
})
export class CheckedValueAccessor implements ControlValueAccessor {
    onChange = (_) => { };
    onTouched = () => { };

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    writeValue(value: any): void {
        var normalizedValue = isBlank(value) ? false : value;
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', normalizedValue);
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}