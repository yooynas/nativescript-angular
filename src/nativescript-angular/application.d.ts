import { Type, ApplicationRef, Provider } from 'angular2/core';

export interface AppOptions {
    cssFile?: string;
    startPageActionBarHidden?: boolean;
}

export type BindingArray = Array<Type | Provider | Array<any>>;
export function bootstrap(appComponentType: any, componentInjectableBindings?: BindingArray): Promise<ApplicationRef>;
export function nativeScriptBootstrap(appComponentType: any, customProviders?: BindingArray, appOptions?: any): void;
