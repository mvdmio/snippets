class DictionaryValue<TKey, TValue> {
    private readonly _key: TKey;
    private _value: TValue;
    
    public get key(): TKey {
        return this._key;
    }

    public get value(): TValue {
        return this._value;
    }

    public set value(v: TValue) {
        this._value = v;
    }

    constructor(key: TKey, value: TValue) {
        this._key = key;
        this._value = value;
    }
}

export class Dictionary<TKey, TValue> {
    private readonly _values: Array<DictionaryValue<TKey, TValue>>;

    constructor() {
        this._values = [];
    }
    
    public get(key: TKey): TValue {
        const v = this._values.find(x => x.key === key);

        if(v)
            return v.value;

        return null;
    }

    public add(key: TKey, value: TValue) {
        const v = this._values.find(x => x.key === key);
        if (!v) {
            this._values.push(new DictionaryValue(key, value));
        }
        else {
            v.value = value;
        }
    }

    public remove(key: TKey) {
        const value = this._values.find(x => x.key === key);
        if (value) {
            const index = this._values.indexOf(value);
            this._values.splice(index, 1);
        }
    }

    public clear() {
        this._values.splice(0, this._values.length);
    }

    public keys(): Array<TKey> {
        return this._values.map(x => x.key);
    }

    public values(): Array<TValue> {
        return this._values.map(x => x.value);
    }

    public containsKey(key: TKey): boolean {
        return !!this._values.find(x => x.key === key);
    }
} 