import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MbizComponentBase } from '@mbiz/shared';
import { MbizAlertComponent } from '@mbiz/shared/alert';

@Component({
    selector: 'mbiz-form-wrapper',
    templateUrl: './mbiz-form-wrapper.component.html',
    styleUrls: ['./mbiz-form-wrapper.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class MbizFormWrapperComponent extends MbizComponentBase {
    private readonly _submitSubject: Subject<void>;

    private _loadingProcessCounter: number;

    @ViewChild('ngForm')
    public ngForm: NgForm;

    @ViewChild('alerts')
    public alerts: MbizAlertComponent;

    @Input('submitEnabled')
    public submitEnabled: boolean = true;

    @Input('submitText')
    public submitText: string = '';

    @Input('form')
    public form: FormGroup;

    public get onSubmit(): Observable<void> {
        return this._submitSubject.asObservable();
    }

    public get isLoading(): boolean {
        return this._loadingProcessCounter > 0;
    }

    public constructor() {
        super();

        this._submitSubject = new Subject();
        this._loadingProcessCounter = 0;
    }

    public submitForm() {
        this._submitSubject.next();
    }

    public load<T>(observable: Observable<T>): Observable<T> {
        this._loadingProcessCounter = this._loadingProcessCounter + 1;

        return observable.pipe(finalize(() => {
            this._loadingProcessCounter = this._loadingProcessCounter - 1;
        }));
    }

    protected onInit(): void {
        if (!this.form) {
            console.error('form is not set on <mbiz-form-wrapper>');
        }
    }

    protected onDestroy(): void {
    }
}
