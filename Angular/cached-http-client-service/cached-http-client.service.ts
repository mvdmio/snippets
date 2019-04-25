import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class CachedHttpClient {
    private readonly _http: HttpClient;
    private readonly _store: Storage;

    constructor(http: HttpClient) {
        this._http = http;
        this._store = localStorage; //set to either localStorage or sessionStorage depending on your requirements.
    }

    //Only GET methods should be cached. Other request types (POST/PUT/DELETE) are server actions that should always be asynchronously awaited by the client.
    //If you find yourself in need of a cache for non-GET request types, you've created a non-pure function. This is a code-smell and should be avoided.
    public get<T>(url: string): Observable<T> {
        return new Observable<T>(subscriber => {
            this.tryRetrieveStoredResponse(subscriber, url);

            this._http.get<T>(url).subscribe(
                result => {
                    this.handleHttpResult(subscriber, url, result);
                },
                error => {
                    subscriber.error(error);
                },
                () => {
                    subscriber.complete();
                }
            );
        });
    }

    private tryRetrieveStoredResponse<T>(subscriber: Subscriber<T>, url: string): void {
        const storedJson = this._store.getItem(url);
        if (storedJson) {
            try {
                const storedItem: T = JSON.parse(storedJson);
                subscriber.next(storedItem);    
            } catch (e) {
                console.log('Unable to convert storage data into type', e);
                this._store.setItem(url, null); //Clear value from storage to prevent future errors.
            } 
        }
    }

    private handleHttpResult<T>(subscriber: Subscriber<T>, url: string, result: T) {
        const resultJson = JSON.stringify(result);
        this._store.setItem(url, resultJson);

        subscriber.next(result);
    }
}
