import { RenderHtml, InitView  } from "../view/ResultView";

let presenterlistner;

function _init( _presenterlistner, html ) {
    if(presenterlistner === undefined)
        presenterlistner = _presenterlistner;

    const { GetMatchLength, GetAvgTime } =  presenterlistner;

    RenderHtml(html);
    InitView(_onRestart, GetMatchLength(), GetAvgTime());
}

function _onRestart() {
    presenterlistner.ChangeUrlReady();
}

export default {
    Init : _init
};