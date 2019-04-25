# Cached HTTP Client service

This service can be used for caching HTTP GET responses for future use.
The service will search for an existing response in the storage (localStorage by default) and provide this value to the subscriber(s) as soon as possible. Then, the service will do the request and store the returned value in storage when the response is received. The reponse is then also provided to the subscriber(s) and the observable is finalized (completed).

This means that the user will receive a cached value quickly, with the actual response from the server following as soon as possible. This allows application to display the last-known values immediately while waiting for an update from the server. This is a perceived performance increase for users with minimal acutal performance costs for the application.

Usage:
``` ts
interface SomeResponse {
    property1: string;
    property2: bool;
}

export class SomeComponent {
    constructor(private cachedHttp: CachedHttpClient) {
    }

    public someMethod(): void {
        this.cachedHttp.get<SomeResponse>('someUrl').subscribe(
            result => {
                //Handle result
            },
            error => {
                //Handle error, optional
            },
            () => {
                //Handle completion, optional
            }
        )
    }
}
```