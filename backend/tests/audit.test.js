describe("Audit Logic", () => {

test("Valid URL", () => {
expect("https://example.com").toContain("https");
});

test("Invalid URL", () => {
expect(() => {
new URL("abc");
}).toThrow();
});

test("Non HTML", () => {
const type="application/pdf";
expect(type.includes("text/html")).toBe(false);
});

});