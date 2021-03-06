import {Component, Inject} from 'angular2/core';
import {Device, platformNames} from "platform";
import {DEVICE} from "../platform-providers";

@Component({
    selector: "android",
    template: `<ng-content *ngIf="show"></ng-content>`,
})
export class AndroidFilterComponent {
    public show: boolean;
    constructor( @Inject(DEVICE) device: Device) {
        this.show = (device.os === platformNames.android);
    }
}

@Component({
    selector: "ios",
    template: `<ng-content *ngIf="show"></ng-content>`,
})
export class IosFilterComponent {
    public show: boolean;
    constructor( @Inject(DEVICE) device: Device) {
        this.show = (device.os === platformNames.ios);
    }
}