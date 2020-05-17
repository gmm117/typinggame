import { RenderHtml, InitEvent  } from "../view/ResultView";

let userlistner;

function _init( _userlistner, root ) {
    if(userlistner === undefined)
        userlistner = _userlistner;

    root.innerHTML = RenderHtml(_userlistner.GetScore(), _userlistner.GetAvgTime());
    InitEvent(_onRestart);
}

function _onRestart() {
    userlistner.InitReady();
}


export default {
    Init : _init
}