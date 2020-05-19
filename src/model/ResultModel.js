let score = 0;
let avg = 0;

/**
 * 완료화면의 맞힌 점수를 얻어간다.
 * @returns {number} score
 */
function _getScore() {
    return score;
}

/**
 * 완료화면의 맞힌 점수를 세팅한다.
 * @param {number} score
 */
function _setScore(_score) {
    score = _score;
}

/**
 * 완료화면의 평균 답변시간을 얻어간다.
 * @returns {avg} avg
 */
function _getAvg() {
    return avg;
}

/**
 * 완료화면의 평균 답변시간을 세팅한다.
 * @param {avg} avg
 */
function _setAvg(_avg) {
    avg = _avg;
}


export default {
    GetScore: _getScore,
    SetScore: _setScore,
    GetAvg: _getAvg,
    SetAvg: _setAvg
};