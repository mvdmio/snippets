export abstract class EditorAction {
    protected readonly _contentElement: HTMLElement;

    public isActive: boolean = false;
    public isDisabled: boolean = false;

    protected constructor(contentElement: HTMLElement) {
        this._contentElement = contentElement;
    }

    public execute() {
        this.onExecute();
        this._contentElement.focus();
        this.updateState();
    }

    public abstract updateState(): void;
    public abstract isKeybindingPressed(event: KeyboardEvent): boolean;

    protected abstract onExecute(): void;
}