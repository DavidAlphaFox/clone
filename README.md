# clone

![CircleCI](https://img.shields.io/circleci/build/github/gactjs/clone?style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/gactjs/clone?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/gactjs/clone?style=for-the-badge)
![npm](https://img.shields.io/npm/v/@gact/clone?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@gact/clone?style=for-the-badge)

clone let's you **perfectly** deep clone JavaScript values.

- [Supported Values](#supported-values)
- [Important Caveats](#important-caveats)
  - [Symbols](#important-caveats-symbols)
  - [Getter/Setter Properties](#important-caveats-getter/setter-properties)
- [API](#api)
  - [clone](#api-clone)
    - [arguments](#api-clone-arguments)
    - [returns](#api-clone-returns)
    - [example](#api-clone-returns)

<a name="#supported-values"></a>

## Supported Values

The following types of JavaScript values are cloneable:

- `string`
- `number`
- `bigint`
- `boolean`
- `null`
- `undefined`
- `Number`
- `String`
- `Boolean`
- `BigInt`
- `Date`
- `RegExp`
- `Blob`
- `File`
- `ArrayBuffer`
- `DataView`
- `Int8Array`
- `Int16Array`
- `Int32Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Uint16Array`
- `Uint32Array`
- `Float32Array`
- `Float64Array`
- `BigInt64Array`
- `BigUint64Array`
- `Array` (when every value is cloneabe)
- `Object` (when every property is cloneable)
- `Map` (when every key and value is cloneable)
- `Set` (when every element is cloneable)

<a name="#important-caveats"></a>

## Important Caveats

<a name="#important-caveats-symbols"></a>

### Symbols

You cannot clone `symbol` properties because `symbol`s are not cloneable.

```javascript
let dope = Symbol("dope");

let bob = {
  [dope]: 1000
};

let bobClone = clone(bob);

bob[dope]; // 1000
bobClone[dope]; // undefined
```

<a name="#important-caveats-getter/setter-properties"></a>

### Getter/Setter Properties

You cannot clone any value with getter/setter properties because `function`s are not cloneable.

```javascript
let bob = {
  get dope() {
    return 1000;
  }
};

// this will throw an error
let bobClone = clone(bob);
```

<a name="#api"></a>

## API

<a name="#api-clone"></a>

### `clone`

Creates a perfect clone of the provided value.

<a name="#api-clone-arguments"></a>

#### Arguments

1. value (Cloneable): The value to clone

<a name="#api-clone-returns"></a>

#### Returns

(Cloneable): A prefect clone of the provided value

<a name="#api-clone-example"></a>

#### Example

```javascript
import clone from "@gact/clone";

let bob = {
  name: "bob",
  hobbies: [
    {
      name: "programming",
      mastery: 88
    },
    {
      name: "cooking",
      mastery: 75
    }
  ]
};

let bobClone = clone(bob);

bobClone.hobbies[0].mastery = 100;

console.log(bob.hobbies[0].mastery); // 88
console.log(bobClone.hobbies[0].mastery); // 100
```
