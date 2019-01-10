import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';
import { ColorPickerModule } from 'primeng/colorpicker';

import { MbizSharedModule } from '@mbiz/shared';

import { MbizEditorComponent } from '../components/mbiz-editor/component/mbiz-editor.component';
import { MbizEditorToolbarButtonComponent } from '../components/mbiz-editor/toolbar-button/mbiz-editor-toolbar-button.component';
import { MbizEditorToolbarDropdownButtonComponent } from '../components/mbiz-editor/toolbar-dropdown-button/mbiz-editor-toolbar-dropdown-button.component';
import { MbizEditorCreateLinkModalComponent } from '../components/mbiz-editor/modals/create-link/mbiz-editor-create-link-modal.component';

import { MbizColorInputComponent } from '../form-controls/mbiz-color-input/mbiz-color-input.component';
import { MbizDateInputComponent } from '../form-controls/mbiz-date-input/mbiz-date-input.component';
import { MbizImgInputComponent } from '../form-controls/mbiz-img-input/mbiz-img-input.component';
import { MbizRadioInputGroupComponent } from '../form-controls/mbiz-radio-group/mbiz-radio-input-group.component';
import { MbizRadioInputComponent } from '../form-controls/mbiz-radio-input/mbiz-radio-input.component';
import { MbizSelectInputComponent } from '../form-controls/mbiz-select-input/mbiz-select-input.component';
import { MbizSwitchInputComponent } from '../form-controls/mbiz-switch-input/mbiz-switch-input.component';
import { MbizTextareaInputComponent } from '../form-controls/mbiz-textarea-input/mbiz-textarea-input.component';
import { MbizTextEditorInputComponent } from '../form-controls/mbiz-text-editor/mbiz-text-editor-input.component';
import { MbizTextInputComponent } from '../form-controls/mbiz-text-input/mbiz-text-input.component';

import { MbizFormWrapperComponent } from '../form-wrapper/mbiz-form-wrapper.component';

import english from '../translations/english.json';
import dutch from '../translations/dutch.json';

@NgModule({
    declarations: [
        MbizFormWrapperComponent,

        MbizEditorComponent,
        MbizEditorToolbarButtonComponent,
        MbizEditorToolbarDropdownButtonComponent,
        MbizEditorCreateLinkModalComponent,

        MbizColorInputComponent,
        MbizDateInputComponent,
        MbizImgInputComponent,
        MbizRadioInputGroupComponent,
        MbizRadioInputComponent,
        MbizSelectInputComponent,
        MbizSwitchInputComponent,
        MbizTextareaInputComponent,
        MbizTextEditorInputComponent,
        MbizTextInputComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        ClarityModule,

        //PrimeNG
        ColorPickerModule,
        
        //MBIZ
        MbizSharedModule
    ],
    exports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ColorPickerModule,
        MbizSharedModule,
        MbizFormWrapperComponent,

        MbizColorInputComponent,
        MbizDateInputComponent,
        MbizImgInputComponent,
        MbizRadioInputGroupComponent,
        MbizRadioInputComponent,
        MbizSelectInputComponent,
        MbizSwitchInputComponent,
        MbizTextareaInputComponent,
        MbizTextEditorInputComponent,
        MbizTextInputComponent
    ],
    providers: []
})
export class MbizFormModule {
    constructor(translateService: TranslateService) {
        translateService.setTranslation('en', english, true);
        translateService.setTranslation('nl', dutch, true);
    }
}