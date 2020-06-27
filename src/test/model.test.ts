import Route from "../utils/route";
import RDModel from "../model/ReadyModel";
import { InitServerData, GetServerDatas } from "../model/ServerModel";
import { UserInit, GetLength, GetText, GetTime, GetMatchLength, GetMatch, GetExpire, GetScore } from "../model/UserModel";

describe("ServerModel UnitTest",
    function () {
        it("ServerModel InitServerData/GetServerDatas function test", () => {
            expect(Route('/', atob('aHR0cHM6Ly9teS1qc29uLXNlcnZlci50eXBpY29kZS5jb20va2FrYW9wYXktZmUvcmVzb3VyY2VzL3dvcmRz')).then( (res: any) => InitServerData(res) && GetServerDatas())).resolves.toEqual(true);
        });
});

describe("UserModel UnitTest", () => {
    it("UserModel UserInit/GetLength function test", () => {
        expect(Route('/', atob('aHR0cHM6Ly9teS1qc29uLXNlcnZlci50eXBpY29kZS5jb20va2FrYW9wYXktZmUvcmVzb3VyY2VzL3dvcmRz')).then( (res: any) => {
            UserInit(JSON.parse(res));
            return GetLength();
        })).resolves.toBeGreaterThan(0);
    });

    const userdatas = [
        {
            "idx": 0,
            "second": 10,
            "text": "hello"
        },
        {
            "idx": 1,
            "second": 12,
            "text": "world"
        }
    ];

    UserInit(userdatas);

    it("UserModel GetText function test", () => {
        expect(GetText(0)).toEqual("hello");
    });

    it("UserModel GetText function test", () => {
        expect(GetTime(1)).toEqual(12);
    });

    it("UserModel GetMatch function test", () => {
        expect(GetMatch(1)).toEqual(false);
    });

    it("UserModel GetMatchLength function test", () => {
        expect(GetMatchLength()).toBe(0);
    });
    
    it("UserModel GetExpire function test", () => {
        expect(GetExpire(1)).toBe(false);
    });

    it("UserModel GetScore function test", () => {
        expect(GetScore()).toEqual(2);
    });
});

describe("ReadyModel UnitTest", () => {
    it("ReadyModel GetStartFlag function test", () => {
        expect(RDModel.GetStartFlag()).toEqual(true);
    });

    it("ReadyModel GetCurTimeid function test", () => {
        expect(RDModel.GetCurTimeid()).toEqual(-1);
    });

    it("ReadyModel GetCurIdx function test", () => {
        expect(RDModel.GetCurIdx()).toEqual(0);
    });

    it("ReadyModel OnKeyBlock function test", () => {
        expect(RDModel.OnKeyBlock()).toEqual(true);
    });
});



   