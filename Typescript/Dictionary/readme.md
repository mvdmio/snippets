# Dictionary implementation for Typescript

This is a custom dictionary implementation for Typescript, because Typescript currently does not have a dictionary as part of the framework.

Usage:
```
const dictionary = new Dictionary<string, string>();

dictionary.add('key', 'value');
const value = dictionary.get('key');
const keys = dictionary.keys();
const values = dictionary.values();

dictionary.clear();
dictionary.remove('key');

```