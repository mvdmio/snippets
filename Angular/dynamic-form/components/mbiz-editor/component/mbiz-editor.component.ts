import { Component, ViewChild, OnInit, Input, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { MbizEditorCreateLinkModalComponent } from '../modals/create-link/mbiz-editor-create-link-modal.component';
import { EditorUtils } from '../utils/editor-utils';
import { EditorAction } from '../actions/interface/editor-action';
import { BoldEditorAction } from '../actions/bold';
import { ItalicEditorAction } from '../actions/italic';
import { UnderlineEditorAction } from '../actions/underline';
import { IndentEditorAction } from '../actions/indent';
import { OutdentEditorAction } from '../actions/outdent';
import { FormatBlockEditorAction } from '../actions/format-block';
import { LinkEditorAction } from '../actions/link';
import { UnlinkEditorAction } from '../actions/unlink';
import { OrderedListEditorAction } from '../actions/ordered-list';
import { UnorderedListEditorAction } from '../actions/unordered-list';

import * as _ from 'lodash'

@Component({
    selector: 'mbiz-editor',
    templateUrl: './mbiz-editor.component.html',
    styleUrls: ['./mbiz-editor.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MbizEditorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useValue: (c: FormControl) => {
                return null; //Always valid
            },
            multi: true
        }
    ]
})
export class MbizEditorComponent implements OnInit, ControlValueAccessor {
    private readonly _actions: Map<string, EditorAction>;
    
    private _propogateChangedValue: (arg: any) => {};
    private _propogateTouched: (arg: any) => {};

    private _contentElement: HTMLElement;

    @ViewChild('content')
    public contentRef: ElementRef;

    @ViewChild(MbizEditorCreateLinkModalComponent)
    public linkModal: MbizEditorCreateLinkModalComponent;

    @Input()
    public placeholder: string = '';

    public get boldAction(): EditorAction {
        return this._actions.get('bold');
    }

    public get italicAction(): EditorAction {
        return this._actions.get('italic');
    }

    public get underlineAction(): EditorAction {
        return this._actions.get('underline');
    }

    public get indentAction(): EditorAction {
        return this._actions.get('indent');
    }

    public get outdentAction(): EditorAction {
        return this._actions.get('outdent');
    }

    public get heading1Action(): EditorAction {
        return this._actions.get('h1');
    }

    public get heading2Action(): EditorAction {
        return this._actions.get('h2');
    }
    
    public get heading3Action(): EditorAction {
        return this._actions.get('h3');
    }

    public get heading4Action(): EditorAction {
        return this._actions.get('h4');
    }

     public get paragraphAction(): EditorAction {
        return this._actions.get('paragraph');
    }

    public get linkAction(): EditorAction {
        return this._actions.get('link');
    }

    public get unlinkAction(): EditorAction {
        return this._actions.get('unlink');
    }

    public get orderedListAction(): EditorAction {
        return this._actions.get('orderedlist');
    }

    public get unorderedListAction(): EditorAction {
        return this._actions.get('unorderedlist');
    }

    public constructor() {
        this._actions = new Map<string, EditorAction>();
    }

    public ngOnInit(): void {
        this._contentElement = this.contentRef.nativeElement;

        this._contentElement.oninput = (ev: Event) => this.onContentChange(ev);
        this._contentElement.onkeydown = (ev: KeyboardEvent) => this.onContentKeydown(ev);
        this._contentElement.onkeyup = (ev: KeyboardEvent) => this.updateState();
        this._contentElement.onmouseup = (ev: MouseEvent) => this.updateState();

        this._actions.set('bold', new BoldEditorAction(this._contentElement));
        this._actions.set('italic', new ItalicEditorAction(this._contentElement));
        this._actions.set('underline', new UnderlineEditorAction(this._contentElement));
        this._actions.set('indent', new IndentEditorAction(this._contentElement));
        this._actions.set('outdent', new OutdentEditorAction(this._contentElement));
        this._actions.set('h1', new FormatBlockEditorAction(this._contentElement, 'h1'));
        this._actions.set('h2', new FormatBlockEditorAction(this._contentElement, 'h2'));
        this._actions.set('h3', new FormatBlockEditorAction(this._contentElement, 'h3'));
        this._actions.set('h4', new FormatBlockEditorAction(this._contentElement, 'h4'));
        this._actions.set('paragraph', new FormatBlockEditorAction(this._contentElement, 'p'));
        this._actions.set('link', new LinkEditorAction(this._contentElement, this.linkModal));
        this._actions.set('unlink', new UnlinkEditorAction(this._contentElement));
        this._actions.set('orderedlist', new OrderedListEditorAction(this._contentElement));
        this._actions.set('unorderedlist', new UnorderedListEditorAction(this._contentElement));
    }

    public writeValue(value: any): void {
        this._contentElement.innerHTML = this.normalizeHtml(value);
    }

    public registerOnChange(fn: any): void {
        this._propogateChangedValue = fn;
    }

    public registerOnTouched(fn: any): void {
        this._propogateTouched = fn;
    }

    private onContentChange(event: Event): void {
        const originalContent = this._contentElement.innerHTML;
        const normalizedContent = this.normalizeHtml(originalContent);
        
        this._propogateChangedValue(normalizedContent);
    }

    private onContentKeydown(event: KeyboardEvent): void {
        this._propogateTouched(true);

        for (let action of Array.from(this._actions.values())) {
            if (action.isKeybindingPressed(event)) {
                action.execute();
                event.preventDefault();
                break;
            }
        }
    }

    private updateState() {
        for (let action of Array.from(this._actions.values())) {
            action.updateState();
        }
    }

    private normalizeHtml(value: string): string {
        if (!value || value === '') {
            return '';
        }

        let html = value;

        //Basic trimming.
        html = html.trim();

        //If there is no content, only line breaks, should return emtpy content.
        if (html === '<br>') {
            return '';
        }

        //When pasting, browser inserts spans with custom styling. This should be removed.
        html = html.replace(/<\/?span[^>]*>/g, '');

        //When pasting after a space, browser inserts a non-braking space. This should be removed.
        html = html.replace(/&nbsp;/g, '');

        //Sometimes empty <p></p> elements are inserted, for instance before an ordered list. These should be removed.
        html = html.replace(/<p><\/p>/g, '');

        return html;
    }
}
