const { createTransformer } = require("../src/createTransformer")
const { SwcConfigReaderFake } = require("../src/SwcConfigReaderFake")

describe("swc transformer", () => {
  const DUMMY_PATH = "dummy_path.js"

  it(`Returns source string with inline maps when no transformOptions is passed`, () => {
    const sourceString = `
      const sum = (a, b) => a + b;
      const difference = (a, b) => a - b;
  
      const customMultiply = (obj, mul) => {
          const {a, ...rest} = obj;
          return a * mul;
      }
  
      customMultiply({a: 32, dummy: "test"}, 2);
    `

    const swcJest = createTransformer()

    const result = swcJest.process(sourceString, DUMMY_PATH)
    expect(typeof result).toBe("object")
    expect(result.code).toBeDefined()
    expect(result.map).toBeDefined()
    expect(result.code).toMatch("//# sourceMappingURL")
    expect(result.code).toMatch("customMultiply")
    expect(result.map.sources).toEqual([DUMMY_PATH])
    expect(JSON.stringify(result.map.sourcesContent)).toMatch("customMultiply")
  })

  it("transpiles import statements (#5)", () => {
    const sourceString = `
      import DomainObject from "./DomainObject"
      
      describe("DomainObject", () => {
        it("creates a domain object", () => {
          const object = new DomainObject();
          expect(object.foo).toBe(null);
          expect(object.bar).toBe(null);
        });
      
        it("creates a domain object with data", () => {
          const object = new DomainObject({foo:'foo', bar:'bar'});
          expect(object.foo).toBe('foo');
          expect(object.bar).toBe('bar');
        });
      });
    `

    const swcJest = createTransformer(
      new SwcConfigReaderFake({
        jsc: {
          externalHelpers: false,
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
          },
        },
        module: {
          type: "commonjs",
        },
      })
    )

    const result = swcJest.process(sourceString, DUMMY_PATH)
    expect(result.code).toMatch("require")
    expect(JSON.stringify(result.map.sourcesContent)).toMatch("import")
  })
})
