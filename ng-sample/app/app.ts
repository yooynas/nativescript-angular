//import "globals";
// import "./modules";
//global.registerModule("./main-page", function () { return require("./main-page"); });

//import * as profiling from "./profiling";
//profiling.start('application-start');

// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { nativeScriptBootstrap } from "./nativescript-angular/application";
// import { NS_ROUTER_PROVIDERS, routerTraceCategory } from "./nativescript-angular/router";
import { rendererTraceCategory } from "./nativescript-angular/renderer";

import trace = require("trace");
// trace.setCategories(routerTraceCategory + ", " + rendererTraceCategory);
// trace.setCategories(rendererTraceCategory);
// trace.setCategories(routerTraceCategory);
trace.enable();

import {RendererTest} from './examples/renderer-test';
import {Benchmark} from './performance/benchmark';
import {ListTest} from './examples/list/list-test';
import {ListTestAsync} from "./examples/list/list-test-async";
import {ImageTest} from "./examples/image/image-test";
import {FirstComponent, SecondComponent} from "./examples/navigation/navigation-test";
import {ActionBarTest} from "./examples/action-bar/action-bar-test";
import {ModalTest} from "./examples/modal/modal-test";
import {PlatfromDirectivesTest} from "./examples/platform-directives/platform-directives-test";

// nativeScriptBootstrap(RendererTest);
//nativeScriptBootstrap(Benchmark);
//nativeScriptBootstrap(ListTest);
//nativeScriptBootstrap(ListTestAsync);
//nativeScriptBootstrap(Benchmark);
//nativeScriptBootstrap(ListTest);
//nativeScriptBootstrap(ListTestAsync);
//nativeScriptBootstrap(ImageTest);
// nativeScriptBootstrap(NavigationTestRouter, [NS_ROUTER_PROVIDERS]);
// nativeScriptBootstrap(NavigationTestPageRouter, [NS_ROUTER_PROVIDERS]);
// nativeScriptBootstrap(ActionBarTest, [NS_ROUTER_PROVIDERS], { startPageActionBarHidden: false });
// nativeScriptBootstrap(ModalTest);
// nativeScriptBootstrap(PlatfromDirectivesTest);

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "./nativescript-angular/router/ns-router";

@Component({
    selector: 'navigation-test',
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES],
    template: `
        <StackLayout>
            <StackLayout class="nav">
                <Button text="First" [nsRouterLink]="['First']"></Button>
                <Button text="Second" [nsRouterLink]="['Second']"></Button>
            </StackLayout>
            
            <router-outlet></router-outlet>
        </StackLayout>
    `
})
@RouteConfig([
    { path: '/first', component: FirstComponent, name: 'First', useAsDefault: true },
    { path: '/second', component: SecondComponent, name: 'Second' },
])
export class NavigationTestRouter { }

nativeScriptBootstrap(NavigationTestRouter, [NS_ROUTER_PROVIDERS]);


@Component({
    selector: 'navigation-test',
    directives: [NS_ROUTER_DIRECTIVES],
    template: `<page-router-outlet></page-router-outlet>`
})
@RouteConfig([
    { path: '/first', component: FirstComponent, name: 'First', useAsDefault: true },
    { path: '/second', component: SecondComponent, name: 'Second' },
])
export class NavigationTestPageRouter { }

// nativeScriptBootstrap(NavigationTestPageRouter, [NS_ROUTER_PROVIDERS]);
