let score: number = 0;
let avg: number = 0;

/**
 * 완료화면의 맞힌 점수를 얻어간다.
 * @returns {number} score
 */
function _getScore(): number {
    return score;
}

/**
 * 완료화면의 맞힌 점수를 세팅한다.
 * @param {number} score
 */
function _setScore(_score: number): void {
    score = _score;
}

/**
 * 완료화면의 평균 답변시간을 얻어간다.
 * @returns {avg} avg
 */
function _getAvg(): number {
    return avg;
}

/**
 * 완료화면의 평균 답변시간을 세팅한다.
 * @param {avg} avg
 */
function _setAvg(_avg: number): void {
    avg = _avg;
}


export default {
    GetScore: _getScore,
    SetScore: _setScore,
    GetAvg: _getAvg,
    SetAvg: _setAvg
};