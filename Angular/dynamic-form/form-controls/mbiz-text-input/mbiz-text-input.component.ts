import { ElementRef, Component, Input, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MbizFormInputBase } from '../mbiz-form-input-base';

@Component({
    selector: 'mbiz-text-input',
    templateUrl: './mbiz-text-input.component.html',
    styleUrls: ['./mbiz-text-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizTextInputComponent),
        }
    ]
})
export class MbizTextInputComponent extends MbizFormInputBase {
    @ViewChild('inputElement')
    public inputElement: ElementRef;

    @Input('type')
    public type: string = 'text';

    @Input('label')
    public label: string;

    @Input('inline')
    public inline: boolean;

    public constructor() {
        super();
    }

    public focus(): void {
        this.inputElement.nativeElement.focus();
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }
}
