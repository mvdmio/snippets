import { Input, ViewChild } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';

import { MbizComponentBase } from '@mbiz/shared';
import { MbizFormWrapperComponent } from '@mbiz/form';

export abstract class MbizFormInputBase extends MbizComponentBase {
    private static nextId: number = 0;

    @Input('control')
    public control: FormControl;

    private readonly _id: number;
    private readonly _formWrapper: MbizFormWrapperComponent;
    private readonly _controlContainer: ControlContainer;

    public get id(): string {
        return `mbiz-input-${this._id}`;
    }

    protected constructor() {
        super();

        this._id = MbizFormInputBase.nextId++;
    }
}