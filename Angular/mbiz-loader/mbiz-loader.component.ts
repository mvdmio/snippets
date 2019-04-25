import { finalize } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'mbiz-loader',
    templateUrl: './mbiz-loader.component.html',
    stylesUrls: [
        './mbiz-loader.component.css'
    ]
})
export class MbizLoaderComponent {
    private _loadingProcessCounter: number;

    public get isLoading(): boolean {
        return this._loadingProcessCounter > 0;
    }

    constructor() {
        this._loadingProcessCounter = 0;
    }

    public load<T>(observable: Observable<T>): Observable<T> {
        this._loadingProcessCounter = this._loadingProcessCounter + 1;

        return observable.pipe(finalize(() => {
            this._loadingProcessCounter = Math.max(0, this._loadingProcessCounter - 1);
        }));
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }
}
