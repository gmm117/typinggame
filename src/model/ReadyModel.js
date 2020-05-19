let isStart = true;
let curIdx = 0;
let curTimeout = -1;

/**
 * 게임준비 화면의 SetInterval 리턴 Time ID 얻어간다.
 * @returns {number} curTimeout
 */
function _getCurTimeid() {
    return curTimeout;
}

/**
 * 게임준비 화면의 SetInterval Time ID 세팅한다.
 * @param {number} curTimeout 
 */
function _setCurTimeid(_curTimeout) {
    curTimeout = _curTimeout;
}

/**
 * 현재 사용자가 몇번째 게임을 하고 있는지의 인덱스값을 얻어간다.
 * @returns {number} curIdx
 */
function _getCurIdx() {
    return curIdx;
}

/**
 * 현재 사용자가 몇번째 게임을 하고 있는지에 대한 인덱스갑을 저장한다.
 * @param {number} curIdx
 */
function _setCurIdx(_idx) {
    curIdx = _idx;
}

/**
 * 시작/초기화 버튼의 대한 Flag값을 얻어간다.(true: 시작, false: 초기화)
 * @returns {boolean} isStart 
 */
function _getStartFlag() {
    return isStart;
}

/**
 * 시작/초기화 버튼의 대한 Flag값을 세팅한다.(true: 시작, false: 초기화)
 * @param {boolean} isStart
 */
function _setStartFlag(_isStart) {
    isStart = _isStart;
}

/**
 * input의 keyEvent를 Block 할지 여부를 얻어간다.(true: keyevent block, false: keyevent unblock)
 * @returns {boolean} isStart
 */
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