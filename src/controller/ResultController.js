import { RenderHtml, InitEvent  } from "../view/ResultView";

function _init( _userlistner, html ) {
    RenderHtml(html);
    InitEvent(_onRestart, _userlistner.GetMatchLength(), _userlistner.GetAvgTime());
}

function _onRestart() {
    userlistner.ChangeReady();
}

export default {
    Init : _init
}