import warning from "./utils/warning";

type TypedArray =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

type TypedArrayConstructor =
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | BigInt64ArrayConstructor
  | BigUint64ArrayConstructor;

export type Cloneable =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  // tslint:disable-next-line ban-types
  | Number
  // tslint:disable-next-line ban-types
  | String
  // tslint:disable-next-line ban-types
  | Boolean
  | BigInt
  | Date
  | RegExp
  | Blob
  | File
  | ArrayBuffer
  | DataView
  | TypedArray
  | Array<Cloneable>
  | { [key: string]: Cloneable }
  | Map<Cloneable, Cloneable>
  | Set<Cloneable>;

function getTag(value: any): string {
  return Object.prototype.toString.call(value);
}

// tslint:disable-next-line ban-types
function isNumber(value: any): value is Number {
  return getTag(value) === "[object Number]";
}

// tslint:disable-next-line ban-types
function isString(value: any): value is String {
  return getTag(value) === "[object String]";
}

// tslint:disable-next-line ban-types
function isBoolean(value: any): value is Boolean {
  return getTag(value) === "[object Boolean]";
}

function isDate(value: any): value is Date {
  return getTag(value) === "[object Date]";
}

function isRegExp(value: any): value is RegExp {
  return getTag(value) === "[object RegExp]";
}

function isBlob(value: any): value is Blob {
  return getTag(value) === "[object Blob]";
}

function isFile(value: any): value is File {
  return getTag(value) === "[object File]";
}

function isArrayBuffer(value: any): value is ArrayBuffer {
  return getTag(value) === "[object ArrayBuffer]";
}

function isDataView(value: any): value is DataView {
  return getTag(value) === "[object DataView]";
}

function isTypedArray(value: any): value is TypedArray {
  let typedArrayTags = [
    "[object Int8Array]",
    "[object Uint8Array]",
    "[object Uint8ClampedArray]",
    "[object Int16Array]",
    "[object Uint16Array]",
    "[object Int32Array]",
    "[object Uint32Array]",
    "[object Float32Array]",
    "[object Float64Array]",
    "[object BigInt64Array]",
    "[object BigUint64Array]"
  ];

  return typedArrayTags.includes(getTag(value));
}

function isMap(value: any): value is Map<any, any> {
  return getTag(value) === "[object Map]";
}

function isSet(value: any): value is Set<any> {
  return getTag(value) === "[object Set]";
}

function isPlainObject(obj: object): boolean {
  let proto = Object.getPrototypeOf(obj);
  return proto === undefined || proto === Object.prototype;
}

function cloneRegExp(re: RegExp): RegExp {
  let result = new RegExp(re.source, re.flags);
  result.lastIndex = re.lastIndex;
  return result;
}

function cloneBlob(blob: Blob): Blob {
  return new Blob([blob.slice()], { type: blob.type });
}

function cloneFile(file: File): File {
  return new File([file.slice()], file.name, {
    type: file.type,
    lastModified: file.lastModified
  });
}

function cloneArrayBuffer(arrayBuffer: ArrayBuffer): ArrayBuffer {
  let result = new ArrayBuffer(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

function cloneDataView(dataView: DataView): DataView {
  let buffer = cloneArrayBuffer(dataView.buffer);

  return new DataView(buffer, dataView.byteLength, dataView.byteLength);
}

function cloneTypedArray(typedArray: TypedArray) {
  let buffer = cloneArrayBuffer(typedArray.buffer);

  return new (typedArray.constructor as TypedArrayConstructor)(
    buffer,
    typedArray.byteOffset,
    typedArray.length
  );
}

function cloneArray(array: Array<Cloneable>): Array<Cloneable> {
  return new Array(array.length);
}

function cloneMap(
  map: Map<Cloneable, Cloneable>,
  referenceToClone: Map<Cloneable, Cloneable>
): Map<Cloneable, Cloneable> {
  let result: Map<Cloneable, Cloneable> = new Map();
  map.forEach(function(value, key) {
    let keyClone = cloneHelper(key, referenceToClone);
    let valueClone = cloneHelper(value, referenceToClone);
    result.set(keyClone, valueClone);
  });
  return result;
}

function cloneSet(
  set: Set<Cloneable>,
  referenceToClone: Map<Cloneable, Cloneable>
): Set<Cloneable> {
  let result: Set<Cloneable> = new Set();
  set.forEach(function(value) {
    let valueClone = cloneHelper(value, referenceToClone);
    result.add(valueClone);
  });
  return result;
}

function cloneHelper<T extends Cloneable>(
  value: T,
  referenceToClone: Map<Cloneable, Cloneable>
): T {
  let type = typeof value;

  if (
    type === "string" ||
    type === "number" ||
    type === "bigint" ||
    type === "boolean" ||
    type === "undefined" ||
    value === null
  ) {
    return value;
  }

  // handle circular references
  if (referenceToClone.has(value)) {
    return referenceToClone.get(value)! as T;
  }

  // tslint:disable-next-line no-unnecessary-initializer
  let result = undefined;

  if (isNumber(value)) {
    // tslint:disable-next-line no-construct
    result = new Number(value);
  }

  if (isString(value)) {
    // tslint:disable-next-line no-construct
    result = new String(value);
  }

  if (isBoolean(value)) {
    // tslint:disable-next-line no-construct
    result = new Boolean(value);
  }

  if (isDate(value)) {
    result = new Date(value);
  }

  if (isRegExp(value)) {
    result = cloneRegExp(value);
  }

  if (isBlob(value)) {
    result = cloneBlob(value);
  }

  if (isFile(value)) {
    result = cloneFile(value);
  }

  if (isArrayBuffer(value)) {
    result = cloneArrayBuffer(value);
  }

  if (isDataView(value)) {
    result = cloneDataView(value);
  }

  if (isTypedArray(value)) {
    result = cloneTypedArray(value);
  }

  if (Array.isArray(value)) {
    result = cloneArray(value);
  }

  if (isMap(value)) {
    result = cloneMap(value, referenceToClone);
  }

  if (isSet(value)) {
    result = cloneSet(value, referenceToClone);
  }

  if (isPlainObject(value as object)) {
    result = {} as T;
  }

  if (result === undefined) {
    throw new Error(`${value} is not cloneable.`);
  }

  if (Object.getOwnPropertySymbols(value).length) {
    // warn instead of throw because jsdom adds a symbol property to File and Blob
    warning("Cannot clone a value with symbol properties");
  }

  referenceToClone.set(value, result);

  let descriptors = Object.getOwnPropertyDescriptors(value);
  for (let [key, descriptor] of Object.entries(descriptors)) {
    if (descriptor.get || descriptor.set) {
      throw Error("Cannot clone a property with getter and/or setter");
    }

    Object.defineProperty(result, key, {
      value: cloneHelper(descriptor.value, referenceToClone),
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      enumerable: descriptor.enumerable
    });
  }

  return result as T;
}

export default function clone<T extends Cloneable>(value: T): T {
  let referenceToClone: Map<Cloneable, Cloneable> = new Map();

  return cloneHelper(value, referenceToClone);
}
