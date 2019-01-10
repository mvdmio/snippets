import { Component, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClrModal } from '@clr/angular';

import { MbizComponentBase } from '@mbiz/shared';
import { MbizTextInputComponent } from '../../../../form-controls/mbiz-text-input/mbiz-text-input.component';
import { CreateLinkModel } from '../../models/create-link.model';

import { validateUrl } from '../../../../form-validators/url.validator';

@Component({
    selector: 'mbiz-editor-create-link-modal',
    templateUrl: './mbiz-editor-create-link-modal.component.html',
    styleUrls: ['./mbiz-editor-create-link-modal.component.css']
})
export class MbizEditorCreateLinkModalComponent extends MbizComponentBase {
    @ViewChild(ClrModal)
    public modal: ClrModal;

    @ViewChild('urlInput')
    public urlInput: MbizTextInputComponent

    public onClose: EventEmitter<void>;
    public onSubmit: EventEmitter<CreateLinkModel>;

    public form: FormGroup;

    public get urlControl(): FormControl {
        return this.form.get('url') as FormControl;
    }

    public get textControl(): FormControl {
        return this.form.get('text') as FormControl;
    }

    constructor(formBuilder: FormBuilder) {
        super();

        this.onClose = new EventEmitter<void>();
        this.onSubmit = new EventEmitter<CreateLinkModel>();

        this.form = formBuilder.group({
            text: [''],
            url: ['', validateUrl()]
        });
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }

    public open(text: string = null, existingLink: string = null) {
        this.textControl.setValue(text);
        this.urlControl.setValue(existingLink);

        this.modal.open();
        this.urlInput.focus();
    }

    public close() {
        this.modal.close();
        this.onClose.emit()
    }

    public submit() {
        if (this.form.valid) {
            let url = this.urlControl.value;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = `http://${url}`;
            }

            this.close();

            this.onSubmit.emit({
                url: url,
                text: this.textControl.value
            });
        }
    }
}
