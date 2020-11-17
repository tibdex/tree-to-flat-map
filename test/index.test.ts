import { treeToFlatMap } from "../src";

it("handles a simple case", () => {
  expect(
    treeToFlatMap({
      a: {
        b: {
          c: true,
        },
      },
      d: {
        e: 1,
      },
      f: "leaf",
    })
  ).toMatchInlineSnapshot(`
    Object {
      "a.b.c": true,
      "d.e": 1,
      "f": "leaf",
    }
  `);
});

it("handles node keys containing the separator", () => {
  expect(
    treeToFlatMap({
      "a.b": {
        c: 1,
      },
      a: {
        b: {
          d: 2,
        },
      },
      e: {
        f: {
          g: 3,
        },
      },
      "e.f": {
        h: 4,
      },
    })
  ).toMatchInlineSnapshot(`
    Object {
      "a.b.c": 1,
      "a.b.d": 2,
      "e.f.g": 3,
      "e.f.h": 4,
    }
  `);
});

it("catches leaf clashes", () => {
  expect(() =>
    treeToFlatMap({
      "a.b": {
        c: 1,
      },
      a: {
        b: {
          c: 2,
        },
      },
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Tree has multiple leaves for path \\"a.b.c\\": 1 and 2."`
  );
});

it("supports custom separators", () => {
  expect(
    treeToFlatMap(
      {
        a: {
          b: 1,
        },
        c: {
          d: {
            e: 2,
          },
        },
      },
      { separator: "/" }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "a/b": 1,
      "c/d/e": 2,
    }
  `);
});
