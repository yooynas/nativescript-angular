import {Directive, ElementRef, Renderer, Self, forwardRef, provide} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/src/common/forms/directives/control_value_accessor';
import {isBlank} from 'angular2/src/facade/lang';

const VALUE_ACCESSOR = provide(NG_VALUE_ACCESSOR, { useExisting: forwardRef(() => ValueAccessor), multi: true });

/**
 * The accessor for setting a value and listening to changes that is used by the
 * {@link NgModel}
 *
 *  ### Example
 *  ```
 *  <Slider [(ngModel)]='model.test'>
 *  ```
 */
@Directive({
    selector: 'Slider[ngModel]',
    host: { '(valueChange)': 'onChange($event.value)' },
    bindings: [VALUE_ACCESSOR]
})
export class ValueAccessor implements ControlValueAccessor {
    onChange = (_) => { };
    onTouched = () => { };

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    writeValue(value: any): void {
        var normalizedValue = isBlank(value) ? 0 : value;
        console.log('value: ' + typeof(value) + '/' + value + ' ' + typeof(normalizedValue) + "/" + normalizedValue);
        //this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
        this._elementRef.nativeElement.value = normalizedValue;
    }

    private pendingChangeNotification: number = 0;

    registerOnChange(fn: (_: any) => void): void {
        //this._elementRef.nativeElement.on('valueChange', (args) => {
            //console.log('onChange: ' + args.object.value);
            //global.zone.run(() => fn(args.object.value));
        //});
        this.onChange = (arg) => {
            console.log('onChange: ' + arg);
            if (this.pendingChangeNotification) {
                clearTimeout(this.pendingChangeNotification);
            }
            this.pendingChangeNotification = setTimeout(() => {
                this.pendingChangeNotification = 0;
                console.log('real onChange: ' + arg);
                fn(arg);
            }, 100);
        };
    }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
