import RDInit from "../controller/ReadyController";
import RSInit from "../controller/ResultController";

describe("ReadyController UnitTest", () => {
    it("ReadyController RDInit function test", () => {
        expect(RDInit != null).toEqual(true);
    });
});

describe("ResultController UnitTest", () => {
    it("ResultController RSInit function test", () => {
        expect(RSInit != null).toEqual(true);
    });
});