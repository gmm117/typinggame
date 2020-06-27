import Route, { ChangeUrl, SetListener } from "../utils/route";
import { addEvent } from "../utils/util";

describe("utils UnitTest",
    function () {
        
        it("Route / Promise test", () => {
            expect(Route('/', atob('aHR0cHM6Ly9teS1qc29uLXNlcnZlci50eXBpY29kZS5jb20va2FrYW9wYXktZmUvcmVzb3VyY2VzL3dvcmRz')).then((res: any) => res.length)).resolves.toEqual(12);
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