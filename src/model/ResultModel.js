let score = 0;
let avg = 0;

function _getScore() {
    return score;
}

function _setScore(_score) {
    score = _score;
}

function _getAvg() {
    return avg;
}

function _setAvg(_avg) {
    avg = _avg;
}


export default {
    GetScore: _getScore,
    SetScore: _setScore,
    GetAvg: _getAvg,
    SetAvg: _setAvg
};