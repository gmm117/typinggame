import { RenderHtml, InitEvent, RenderTime, RenderScore, RenderBtn, ResetInput } from "../view/ReadyView";

let userlistner;
let bStartBtn = true;
let curIdx = 0;
let curTimeout = 0;

function _reset() {
    ResetInput();
    RenderScore(userlistner.GetScore());
    if(userlistner.GetLength() > 0) {
        RenderTime(userlistner.GetTime(0));
    }
    window.clearInterval(curTimeout);
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
    } 

    ResetInput();
}

function _init( _userlistner, root ) {
    userlistner = _userlistner;

    if(_userlistner.GetLength() > 0) {
        root.innerHTML = RenderHtml();
        InitEvent(_onStart, _onCompare);
        _reset();
    }
}

function asyncIntervalCaller(_idx) {
    let second = userlistner.GetTime(_idx);
    userlistner.SetTime(_idx, second);
    RenderTime(second);
    RenderScore(userlistner.GetScore());

    return new Promise((resolve, reject) => {
        curTimeout = window.setInterval(function () {
            userlistner.SetTime(_idx, second);
            RenderTime(second);
            if(second <= 0) {
                userlistner.SetExpire(curIdx, true);
                ResetInput();
                window.clearInterval(curTimeout);
                resolve(_idx);
            } else if( userlistner.GetMatch(_idx) ) {
                ResetInput();
                window.clearInterval(curTimeout);
                resolve(_idx);
            }

            RenderScore(userlistner.GetScore());
            second--;
        }, 1000);
    });
}

async function _start() {
    for(let i=0; i< 2; i++) {
        curIdx = i;
        await asyncIntervalCaller(i);
    }

    userlistner.InitResult();
}


export default {
    Init : _init
}