//make sure you import mocha-config before angular2/core
import {assert} from "./test-config";
import {Component, ComponentRef} from "angular2/core";
import {TestApp} from "./test-app";
import {Page} from "ui/page";
import {topmost} from "ui/frame";
import {ModalDialogHost, ModalDialogOptions, ModalDialogParams, ModalDialogService} from "../nativescript-angular/directives/dialogs";

@Component({
    selector: "modal-comp",
    template: `<Label text="this is modal component"></Label>`
})
export class ModalComponent {
    constructor(public params: ModalDialogParams, private page: Page) {
        page.on("shownModally", () => {
            var result = this.params.context;
            this.params.closeCallback(result);
        });
    }
}

@Component({
    selector: "fail-comp",
    providers: [ModalDialogService],
    template: `<Label text="This app is doomed"></Label>`

})
export class FailComponent {
    constructor(public service: ModalDialogService) {
    }
}

@Component({
    selector: "sucess-comp",
    directives: [ModalDialogHost],
    providers: [ModalDialogService],
    template: `
    <GridLayout modal-dialog-host margin="20">
        <Label text="Modal dialogs"></Label>
    </GridLayout>`
})
export class SuccessComponent {
    constructor(public service: ModalDialogService) {
    }
}

describe('modal-dialog', () => {
    let testApp: TestApp = null;

    before(() => {
        return TestApp.create().then((app) => {
            testApp = app;
        })
    });

    after(() => {
        testApp.dispose();
    });

    afterEach(() => {
        var page = topmost().currentPage;
        if (page && page.modal) {
            console.log("Warning: closing a leftover modal page!");
            page.modal.closeModal();
        }
        testApp.disposeComponents();
    });


    it("showModal throws when there is no modal-dialog-host", (done) => {
        testApp.loadComponent(FailComponent)
            .then((ref) => {
                var service = <ModalDialogService>ref.instance.service;
                assert.throws(() => service.showModal(ModalComponent, {}), "No elementRef: Make sure you have the modal-dialog-host directive inside your component.");
                done();
            })
            .catch(done)
    });

    it("showModal succeeds when there is modal-dialog-host", (done) => {
        testApp.loadComponent(SuccessComponent)
            .then((ref) => {
                var service = <ModalDialogService>ref.instance.service;
                return service.showModal(ModalComponent, {});
            })
            .then((res) => done())
            .catch(done)
    });


    it("showModal passes modal params and gets result when resolved", (done) => {
        var context = { property: "my context" };
        testApp.loadComponent(SuccessComponent)
            .then((ref) => {
                var service = <ModalDialogService>ref.instance.service;
                return service.showModal(ModalComponent, { context: context });
            })
            .then((res) => {
                assert.strictEqual(res, context);
                done();
            })
            .catch(done);
    })
});
