import Route, { ChangeUrl, SetListener } from "../utils/route";
import { addEvent } from "../utils/util";

describe("utils UnitTest",
    function () {
        
        it("Route / Promise test", () => {
            expect(Route('/', 'https://my-json-server.typicode.com/kakaopay-fe/resources/words').then((res: any) => res.length)).resolves.toEqual(12);
        });

        it("Route / ChangeUrl import test", () => {
            expect(ChangeUrl != null).toEqual(true);
        });

        it("Route / SetListener import test", () => {
            expect(SetListener != null).toEqual(true);
        });

        it("Route / SetListener import test", () => {
            expect(addEvent != null).toEqual(true);
        });
});