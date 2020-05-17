let isStart = true;
let curIdx = 0;
let curTimeout = -1;

function _getCurTimeid() {
    return curTimeout;
}

function _setCurTimeid(_curTimeout) {
    curTimeout = _curTimeout;
}

function _getCurIdx() {
    return curIdx;
}

function _setCurIdx(_idx) {
    curIdx = _idx;
}

function _getStartFlag() {
    return isStart;
}

function _setStartFlag(_isStart) {
    isStart = _isStart;
}

function _onKeyBlock() {
    return isStart;
}


export default {
    GetStartFlag : _getStartFlag,
    SetStartFlag : _setStartFlag,
    GetCurTimeid : _getCurTimeid,
    SetCurTimeid : _setCurTimeid,
    GetCurIdx : _getCurIdx,
    SetCurIdx : _setCurIdx,
    OnKeyBlock : _onKeyBlock,
};