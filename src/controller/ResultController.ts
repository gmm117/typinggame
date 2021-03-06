import { RenderHtml, InitView  } from "../view/ResultView";
import { IsGameComplete } from "../model/UserModel";
import RSModel from "../model/ResultModel";

let presenterlistner: any; // presenter listener

/**
 * ResultController 초기화 함수
 * @param {function} _presenterlistner presenter의 리스너(route-presenter-controller 연결)
 * @param {string} html 완료화면 html
 */
function _init( _presenterlistner: any, html: string ): void {
    if(presenterlistner === undefined)
        presenterlistner = _presenterlistner;

    const { GetMatchLength, GetAvgTime } =  presenterlistner;

    RenderHtml(html);
    
    const isComplate: boolean = IsGameComplete();
    const score: number = isComplate ? GetMatchLength() : RSModel.GetScore();
    const avg: number = isComplate ? GetAvgTime() : RSModel.GetAvg();

    RSModel.SetScore(score);
    RSModel.SetAvg(avg);

    InitView(_onRestart, score, avg);
}

/**
 * 다시시작 버튼이 누릴 경우에 게임준비화면으로 변경해주는 함수 
 */
function _onRestart(): void {
    presenterlistner.ChangeUrlReady();
}

export default {
    Init : _init
};