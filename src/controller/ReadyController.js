import { RenderHtml, InitEvent, RenderTime, RenderScore, RenderBtn, ResetInput, RenderText } from "../view/ReadyView";

let userlistner;
let bStartBtn = true;
let curIdx = 0;
let curTimeout = 0;

function _reset() {
    ResetInput();
    RenderScore(userlistner.GetScore());
    RenderText();
    if(userlistner.GetLength() > 0) {
        RenderTime(userlistner.GetTime(0));
    }

    bStartBtn = true;
    curIdx = 0;
    window.clearInterval(curTimeout);
    curTimeout = 0;
}

function _onStart() {
    bStartBtn = !bStartBtn;
    RenderBtn(bStartBtn);
    userlistner.Init();

    if(!bStartBtn) {
        _start();
    } else {
        _reset();
    }
}

function _onCompare({ value }) {
    if(value === userlistner.GetText(curIdx)) {
        userlistner.SetMatch(curIdx, true);
        ResetInput();
    } 
}

function _onKeyBlock() {
    return bStartBtn;
}

function _init( _userlistner, html ) {
    if(userlistner === undefined)
        userlistner = _userlistner;

    if(_userlistner.GetLength() > 0) {
        RenderHtml(html)
        InitEvent(_onStart, _onCompare, _onKeyBlock);
        _reset();
    }
}

function asyncIntervalCaller(_idx) {
    let second = userlistner.GetTime(_idx);
    userlistner.SetTime(_idx, second);
    RenderText(userlistner.GetText(_idx));
    RenderTime(second);
    RenderScore(userlistner.GetScore());

    return new Promise((resolve, reject) => {
        curTimeout = window.setInterval(function () {
            if(second <= 0 || userlistner.GetMatch(_idx)) {
                if(second <= 0)
                    userlistner.SetExpire(_idx, true);

                ResetInput();
                window.clearInterval(curTimeout);
                resolve();
            } else {
                RenderText(userlistner.GetText(_idx));
                userlistner.SetTime(_idx, --second);
                RenderTime(second);
            }
            
            RenderScore(userlistner.GetScore());
            
        }, 1000);
    });
}

async function _start() {
    for(let i=0; i< userlistner.GetLength(); i++) {
        curIdx = i;
        await asyncIntervalCaller(i);
    }

    userlistner.ChangeResult();
}


export default {
    Init : _init
}