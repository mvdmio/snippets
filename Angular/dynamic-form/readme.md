# Dynamic angular form
A generic component for quickly building forms.
Forms are styled with [ClarityUI](https://vmware.github.io/clarity/). You can easily replace this with your own styling framework by modifying the html files of the `<mbiz-form-wrapper`> and all inputs.

## Usage:
Add the `<mbiz-form-wrapper [form]="form" [submitEnabled]="true">` to your template HTML.
 * The form variable must be an instance of an angular FormGroup.
 * If submitEnabled is set to false, the submit button will not be shown and the submit observable will never fire.

Add your inputs to the content of the wrapper. The following inputs are pre-defined:
 * `<mbiz-color-input [control]="control">`
 * `<mbiz-date-input [control]="control">`
 * `<mbiz-img-input [control]="control">`
 * `<mbiz-radio-group [control]="control">`
 * `<mbiz-select-input [control]="control">`
 * `<mbiz-switch-input [control]="control">`
 * `<mbiz-textarea-input [control]="control">`
 * `<mbiz-text-editor [control]="control">`
 * `<mbiz-text-input [control]="control">`

The control variable on all inputs must be an instance of an angular FormControl.

## Example:
In the example below we've built a reusable Article form. 
The `MbizFormComponentBase` class that our form derives from exposes an observable that exposes the submitted data when the user clicks the submit button.

The component also exposes get and set methods for easily retrieving and setting the values of the form.

**component.html**
```
<mbiz-form-wrapper [form]="form" [submitEnabled]="true">
    <section class="form-block">
        <label *ngIf="label">{{label}}</label>

        <mbiz-text-input [control]="titleControl" label="{{'common.input.name' | translate}}"></mbiz-text-input>
        <mbiz-text-input [control]="urlControl" label="{{'common.input.url' | translate}}"></mbiz-text-input>
        <mbiz-date-input [control]="dateControl" label="{{'common.input.date' | translate}}"></mbiz-date-input>
        <mbiz-img-input [control]="imageControl" label="{{'common.input.image' | translate}}" [multiple]="false"></mbiz-img-input>
        <mbiz-text-editor-input [control]="contentControl" label="{{'common.input.article' | translate}}"></mbiz-text-editor-input>
    </section>
</mbiz-form-wrapper>
```

**component.ts**
```
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WebsiteBlogService } from '@mbiz/shared/services';
import { WebsiteArticleModel } from '@mbiz/shared/models';

import { MbizFormComponentBase } from '../../mbiz-form-component-base';
import { ArticleUrlAvailableValidator, validateUrlSlug } from '../../../form-validators';
import { nameToUrl } from '../../../utilities/nameToUrl';

@Component({
    selector: 'mbiz-website-article-form',
    templateUrl: './mbiz-website-article-form.component.html',
    styleUrls: ['./mbiz-website-article-form.component.css']
})
export class MbizWebsiteArticleFormComponent extends MbizFormComponentBase<WebsiteArticleModel> {
    private readonly _fb: FormBuilder;
    private readonly _articleUrlAvailableValidator: ArticleUrlAvailableValidator;

    private _articleId: string;
    private _shouldCalculateUrl: boolean;

    @Input('label')
    public label?: string;

    @Input('websiteId')
    public set websiteId(value: string) {
        this._articleUrlAvailableValidator.websiteId = value;
    };

    public form: FormGroup;

    public get titleControl(): FormControl {
        return this.form.get('title') as FormControl;
    }

    public get dateControl(): FormControl {
        return this.form.get('date') as FormControl;
    }

    public get urlControl(): FormControl {
        return this.form.get('url') as FormControl;
    }

    public get imageControl(): FormControl {
        return this.form.get('image') as FormControl;
    }

    public get contentControl(): FormControl {
        return this.form.get('content') as FormControl;
    }

    public constructor(fb: FormBuilder, websiteBlogService: WebsiteBlogService) {
        super();

        this._fb = fb;
        this._articleUrlAvailableValidator = new ArticleUrlAvailableValidator(websiteBlogService);
        this._shouldCalculateUrl = true;

        this.form = this._fb.group({
            title: ['', [Validators.required]],
            date: [new Date(), [Validators.required]],
            url: ['', [Validators.required, validateUrlSlug()], [this._articleUrlAvailableValidator.validatorFn()]],
            image: [null],
            content: ['', [Validators.required]]
        });

        this.titleControl.valueChanges.subscribe(
            newValue => {
                if (this._shouldCalculateUrl) {
                    this.urlControl.setValue(nameToUrl(newValue));
                }
            }
        );
    }

    public getValue(): WebsiteArticleModel {
        return {
            articleId: this._articleId,
            title: this.titleControl.value,
            date: this.dateControl.value,
            url: this.urlControl.value,
            image: this.imageControl.value,
            content: this.contentControl.value
        }
    }

    public setValue(value: WebsiteArticleModel): void {
        //(Re)set the inital value of the url available validator, so that it doesn't immediately set the control to invalid.
        //Do this before calling setValue on the control, otherwise the old validator will still be used.
        this._articleUrlAvailableValidator.initialValue = value.url;

        //If the value already has a URL, don't calculate a new one when the name changes, otherwise do calculate a new URL every time the name changes.
        this._shouldCalculateUrl = !value.url;

        this._articleId = value.articleId;
        this.titleControl.setValue(value.title);
        this.dateControl.setValue(value.date);
        this.urlControl.setValue(value.url);
        this.imageControl.setValue(value.image);
        this.contentControl.setValue(value.content);
        
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }
}
```