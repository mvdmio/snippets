# mbiz-loader

This component can be used to display a loading animation while in place of any content while waiting for a server response or any other observable.

Usage:
``` ts
@Component({
    selector: 'some-component'
    template: `
        <mbiz-loader>
            <div id="content"></div>
        </mbiz-loader>
    `
})
export class SomeComponent {
    @ViewChild(MbizLoaderComponent)
    public loader: MbizLoaderComponent;

    constructor(private http: HttpClient) {
    }

    protected onInit(): void {
        this.loader.load(this.http.get('someUrl')).subscribe(
            result => {
                //Handle result
            }
        )
    }
}
```

You can call this.loader.load() as many times with as many different observables as you want. The loading animation will stop after all observables are finalized. Note that observables _must_ be completed, otherwise the loading animation will keep running because the finalize pipe will not have fired.