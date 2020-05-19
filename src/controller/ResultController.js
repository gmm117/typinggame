import { RenderHtml, InitView  } from "../view/ResultView";
import { IsGameComplete } from "../model/UserModel";
import RSModel from "../model/ResultModel";

let presenterlistner;

function _init( _presenterlistner, html ) {
    if(presenterlistner === undefined)
        presenterlistner = _presenterlistner;

    const { GetMatchLength, GetAvgTime } =  presenterlistner;

    RenderHtml(html);
    
    const isComplate = IsGameComplete();
    const score = isComplate ? GetMatchLength() : RSModel.GetScore();
    const avg = isComplate ? GetAvgTime() : RSModel.GetAvg();

    RSModel.SetScore(score);
    RSModel.SetAvg(avg);

    InitView(_onRestart, score, avg);
}

function _onRestart() {
    presenterlistner.ChangeUrlReady();
}

export default {
    Init : _init
};