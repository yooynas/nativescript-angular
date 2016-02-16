//stash it here before Angular runs it over...
const realAssert = (<any>global).assert;
import "reflect-metadata";
import {assert} from "chai";
import {bootstrap} from "../nativescript-angular/application";
import {Component} from "angular2/core";
(<any>global).assert = realAssert;

@Component({
    template: "<Button text='OHAI'></Button>"
})
export class SimpleApp {
}

describe('bootstrap', () => {
    it('SimpleApp bootstrapped', (done) => {
        return bootstrap(SimpleApp).then((componentRef) => {
            assert.isTrue(SimpleApp === componentRef.componentType);
            done();
        });
    });
});
