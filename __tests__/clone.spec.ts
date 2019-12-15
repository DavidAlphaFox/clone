import clone from "../src";

describe("clone", function() {
  test("clone string", function() {
    let value = "value";
    expect(clone(value)).toBe(value);
  });

  test("clone number", function() {
    let value = 100;
    expect(clone(value)).toBe(value);
  });

  test("clone bigint", function() {
    let value = BigInt(100);
    expect(clone(value)).toBe(value);
  });

  test("clone boolean", function() {
    let value = true;
    expect(clone(value)).toBe(value);
  });

  test("clone undefined", function() {
    let value = undefined;
    expect(clone(value)).toBe(undefined);
  });

  test("clone null", function() {
    let value = null;
    expect(clone(value)).toBe(value);
  });

  test("trying to clone an uncloneable value throws", function() {
    let value: any = new WeakMap();
    expect(function() {
      clone(value);
    }).toThrowError("not cloneable");
  });

  test("clone Number", function() {
    let value = new Number(10) as any;
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone String", function() {
    let value = new String("value") as any;
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Boolean", function() {
    let value = new Boolean(true);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Date", function() {
    let value = new Date();
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone RegExp", function() {
    let value = new RegExp("abc", "gi");
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Blob", function() {
    // silence false warning
    let consoleError = jest.spyOn(console, "error").mockImplementation();

    let value = new Blob(["<h1>Love</h1>"], { type: "text/html" });
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);

    consoleError.mockRestore();
  });

  test("clone File", function() {
    // silence false warning
    let consoleError = jest.spyOn(console, "error").mockImplementation();

    var value = new File(["foo"], "foo.txt", {
      type: "text/plain"
    });
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);

    consoleError.mockRestore();
  });

  test("clone ArrayBuffer", function() {
    let value = new ArrayBuffer(10);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone DataView", function() {
    let value = new DataView(new ArrayBuffer(100), 5, 10);
    value.setInt32(0, 100);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Int8Array", function() {
    let value = new Int8Array([50]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Uint8Array", function() {
    let value = new Uint8Array([50]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Uint8ClampedArray", function() {
    let value = new Uint8ClampedArray([50]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Int16Array", function() {
    let value = new Int16Array([50]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Uint16Array", function() {
    let value = new Uint16Array([50]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Int32Array", function() {
    let value = new Int32Array([50]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Uint32Array", function() {
    let value = new Uint32Array([50]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Float32Array", function() {
    let value = new Float32Array([50.5]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Float64Array", function() {
    let value = new Float64Array([50.5]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone BigInt64Array", function() {
    let value = new BigInt64Array([BigInt(100)]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone BigUint64Array", function() {
    let value = new BigUint64Array([BigInt(100)]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone Array", function() {
    let value = [1, 2, 3];
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone deep Array", function() {
    let value = [
      [1, 2, 3],
      [1, 2, 3]
    ];
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value[0]).not.toBe(valueClone[0]);
    expect(value[1]).not.toBe(valueClone[1]);
    expect(value).toStrictEqual(valueClone);
    expect(value[0]).toStrictEqual(valueClone[0]);
    expect(value[1]).toStrictEqual(valueClone[1]);
    value[0][0] = 10;
  });

  test("clone Map", function() {
    let value = new Map([
      [10, true],
      [20, false]
    ]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone deep Map", function() {
    let value = new Map([
      [10, new Map([["ten", true]])],
      [20, new Map([["twenty", false]])]
    ]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value.get(10)).not.toBe(valueClone.get(10));
    expect(value.get(20)).not.toBe(valueClone.get(20));
    expect(value).toStrictEqual(valueClone);
    expect(value.get(10)).toStrictEqual(valueClone.get(10));
    expect(value.get(20)).toStrictEqual(valueClone.get(20));
  });

  test("clone Set", function() {
    let value = new Set([1, 2, 3]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone deep Set", function() {
    let value = new Set([new Set([1, 2, 3]), new Set([1, 2, 3])]);
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
    for (let set of value.values()) {
      for (let setClone of valueClone.values()) {
        expect(set).not.toBe(setClone);
        expect(set).toStrictEqual(setClone);
      }
    }
  });

  test("clone record", function() {
    let value = {
      love: 100,
      hate: false
    };
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });

  test("clone deep record", function() {
    let value = {
      name: "Bob",
      school: {
        name: "Smart U",
        graduation: 1899
      }
    };
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
    expect(value.school).not.toBe(valueClone.school);
    expect(value.school).toStrictEqual(valueClone.school);
  });

  test("clones properties by descriptor", function() {
    let value = {};
    Object.defineProperty(value, "truth", {
      value: 100,
      writable: false,
      configurable: false
    });
    let valueClone = clone(value);
    expect(Object.getOwnPropertyDescriptor(value, "truth")).toStrictEqual(
      Object.getOwnPropertyDescriptor(valueClone, "truth")
    );
  });

  test("trying to clone a property with a getter and/or setter throws", function() {
    let value = {};
    Object.defineProperty(value, "truth", {
      get() {
        return 100;
      }
    });
    expect(function() {
      clone(value);
    }).toThrowError("Cannot clone a property with getter and/or setter");
  });

  test("try to clone an object with symbol properties warns", function() {
    let consoleError = jest.spyOn(console, "error").mockImplementation();
    let value = {
      [Symbol("symbol")]: true
    };
    clone(value);

    expect(consoleError.mock.calls.length).toBe(1);
    expect(consoleError.mock.calls[0][0]).toBe(
      "Cannot clone a value with symbol properties"
    );
    consoleError.mockRestore();
  });

  test("circular clone", function() {
    let value: Array<any> = [1, 2, 3];
    value[0] = value;
    let valueClone = clone(value);
    expect(value).not.toBe(valueClone);
    expect(value).toStrictEqual(valueClone);
  });
});
