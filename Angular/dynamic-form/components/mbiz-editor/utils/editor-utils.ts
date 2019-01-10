export class EditorUtils {
    public static executeCommand(command: string, value: any = null) {
        return document.execCommand(command, false, value);
    }

    public static createElement(tag: string) {
        return document.createElement(tag);
    }

    public static queryCommandState(command: string) {
        return document.queryCommandState(command);
    }

    public static queryCommandValue(command: string) {
        return document.queryCommandValue(command);
    }

    public static getSelection(): Selection {
        //Note that selection is NOT static. The value of selection changes when the cursor moves in the document.
        //If saving and setting a previous selection, use getSelectionRanges instead.
        return document.getSelection();
    }

    public static getSelectionRanges(selection: Selection = null) {
        if (selection === null) {
            selection = this.getSelection();
        }
        
        const selectedRanges = [];
        for (let i = 0; i < selection.rangeCount; i++) {
            selectedRanges.push(selection.getRangeAt(i));
        }

        return selectedRanges;
    }

    public static setSelectionRanges(selectionRanges: Array<Range>) {
        const selection = this.getSelection();
        selection.removeAllRanges();

        for (const range of selectionRanges) {
            selection.addRange(range);
        }
    }

    public static getElementFromSelection<T extends object>(selection: Selection = null, type: new () => T) : T {
        if (!selection) {
            selection = this.getSelection();
        }

        if (!selection) {
            return null;
        }

        const selectedNode = selection.anchorNode;
        return this.getElementFromNodeOrParentNode(selectedNode, type);
    }

    private static getElementFromNodeOrParentNode<T extends object>(node: Node, type: new () => T): T {
        if (!node) {
            return null;
        }

        if (node instanceof type) {
            return node as T;
        }

        //Recursivaly try to find a parent anchor element.
        return this.getElementFromNodeOrParentNode(node.parentNode, type);
    }
}