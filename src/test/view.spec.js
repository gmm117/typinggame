import { RenderResetInput, RenderBtn, RenderText, RenderScore, RenderTime, RenderHtml, InitView } from "../view/ReadyView";
import { RenderHtml as RSRenderHtml, InitView as RSInitView} from "../view/ResultView";


describe("ReadyView UnitTest", () => {
    it("ReadyView InitView function test", () => {
        expect(InitView != null).toEqual(true);
    });

    it("ReadyView RenderHtml function test", () => {
        expect(RenderHtml != null).toEqual(true);
    });

    it("ReadyView RenderTime function test", () => {
        expect(RenderTime != null).toEqual(true);
    });

    it("ReadyView RenderScore function test", () => {
        expect(RenderScore != null).toEqual(true);
    });

    it("ReadyView RenderText function test", () => {
        expect(RenderText != null).toEqual(true);
    });

    it("ReadyView RenderBtn function test", () => {
        expect(RenderBtn != null).toEqual(true);
    });

    it("ReadyView RenderResetInput function test", () => {
        expect(RenderResetInput != null).toEqual(true);
    });
});

describe("ResultView UnitTest", () => {
    it("ResultView RSInitView function test", () => {
        expect(RSInitView != null).toEqual(true);
    });

    it("ResultView RSRenderHtml function test", () => {
        expect(RSRenderHtml != null).toEqual(true);
    });
});