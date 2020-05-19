import { RenderHtml, RenderTime, RenderScore, RenderBtn, RenderResetInput, RenderText, InitView } from "../view/ReadyView";
import RDModel from "../model/ReadyModel";
import { SetGameComplete } from "../model/UserModel";

let presenterlistner;

function _onStart() {
    const { Init } =  presenterlistner;
    const bStart = RDModel.GetStartFlag();

    RDModel.SetStartFlag(!bStart);
    RenderBtn(!bStart);
    Init();

    if(bStart) {
        _start();
    } else {
        _reset();
    }
}

function _onCompare({ value }) {
    const { GetText, SetMatch } =  presenterlistner;
    const idx = RDModel.GetCurIdx();
    if(value === GetText(idx)) {
        SetMatch(idx, true);
        RenderResetInput();
    } 
}

async function _start() {
    const { GetLength, ChangeUrlResult } =  presenterlistner;

    for(let i=0; i< GetLength(); i++) {
        RDModel.SetCurIdx(i);
        await asyncIntervalCaller(i);
    }

    SetGameComplete(true);
    ChangeUrlResult();
}

function asyncIntervalCaller(_idx) {
    const { GetTime, SetTime, GetText, GetScore, GetMatch, SetExpire } =  presenterlistner;

    let second = GetTime(_idx);
    SetTime(_idx, second);
    RenderTime(second);
    RenderText(GetText(_idx));
    RenderScore(GetScore());

    return new Promise((resolve, reject) => {
        const timeid = window.setInterval(function () {
            if(second <= 0 || GetMatch(_idx)) {
                if(second <= 0)
                    SetExpire(_idx, true);

                RenderResetInput();
                if(RDModel.GetCurTimeid() >= 0) 
                    window.clearInterval(RDModel.GetCurTimeid());
                    
                resolve();
            } else {
                SetTime(_idx, --second);
                RenderTime(second);
                RenderText(GetText(_idx));
            }
            
            RenderScore(GetScore());
            
        }, 1000);

        RDModel.SetCurTimeid(timeid);
    });
}

function _init( _presenterlistner, html ) {
    if(presenterlistner === undefined)
        presenterlistner = _presenterlistner;

    const { GetLength } =  presenterlistner;
    SetGameComplete(false);
    
    if(GetLength() > 0) {
        RenderHtml(html);
        InitView(_onStart, _onCompare, RDModel.OnKeyBlock);
        _reset();
    }
}

function _reset() {
    const { GetScore, GetLength, GetTime } =  presenterlistner;

    RenderResetInput();
    RenderScore(GetScore());
    RenderText();
    if(GetLength() > 0) {
        RenderTime(GetTime(0));
    }

    RDModel.SetStartFlag(true);
    RDModel.SetCurIdx(0);

    if(RDModel.GetCurTimeid() >= 0) {
        window.clearInterval(RDModel.GetCurTimeid());
    }
    RDModel.SetCurTimeid(0);
}


export default {
    Init : _init
};