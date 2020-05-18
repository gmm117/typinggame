import { addEvent } from "../utils/util";

const REMAIN_TIME_ID = 'remaintime';
const SCORE_ID = 'score';
const START_BTN_ID = 'startbtn';
const INPUT_WORD_ID = 'inputword';
const PROBLEM_WORD_ID = 'problemword';

let domHandler;

function _getReadyDomHandler() {
    let remaintime, score, startbtn, inputword, problemword;
    return function(id) {
      switch(id) {
          case REMAIN_TIME_ID:
            return remaintime ? remaintime : document.getElementById(REMAIN_TIME_ID);
          case SCORE_ID:
            return score ? score : document.getElementById(SCORE_ID);
          case START_BTN_ID:
            return startbtn ? startbtn : document.getElementById(START_BTN_ID);
          case INPUT_WORD_ID:
            return inputword ? inputword : document.getElementById(INPUT_WORD_ID);
          case PROBLEM_WORD_ID:
            return problemword ? problemword : document.getElementById(PROBLEM_WORD_ID);
          default:
            return null;
      }
    };
}

export function InitView( _onStart, _onCompare, _onKeyBlock ) {
    const onClick = e => {
        const inputword = domHandler ? domHandler(INPUT_WORD_ID) : _getReadyDomHandler()(INPUT_WORD_ID);
        inputword.focus();
        _onStart();
    };

    const onKeyDown = e => {
        if(_onKeyBlock()) {
            e.preventDefault();
        } else {
            if(e.which === 13 || e.keycode === 13) {
                _onCompare(e.target);
            }
        }
    };

    if(domHandler === undefined)
        domHandler = _getReadyDomHandler();

    const startbtn = domHandler ? domHandler(START_BTN_ID) : _getReadyDomHandler()(START_BTN_ID);
    if(startbtn) {
        addEvent(startbtn, "click", onClick);
    }

    const inputword = domHandler ? domHandler(INPUT_WORD_ID) : _getReadyDomHandler()(INPUT_WORD_ID);
    if(inputword) {
        addEvent(inputword, "keydown", onKeyDown);
    }
}


export function RenderHtml( html ) {
    const root = document.getElementById('root');
    root.innerHTML = html;
}

export function RenderTime( _remainTime ) {
    const remaintime = domHandler ? domHandler(REMAIN_TIME_ID) : _getReadyDomHandler()(REMAIN_TIME_ID);
    if(remaintime) {
        remaintime.innerText = _remainTime;
    }
}

export function RenderScore( _score ) {
    const score = domHandler ? domHandler(SCORE_ID) : _getReadyDomHandler()(SCORE_ID);
    if(score) {
        score.innerText = _score;
    }
}

export function RenderText( _text ) {
    const problemword = domHandler ? domHandler(PROBLEM_WORD_ID) : _getReadyDomHandler()(PROBLEM_WORD_ID);
    if(problemword) {
        problemword.innerText = _text === undefined ? "문제 단어" : _text;
    }
}

export function RenderBtn( _bStartBtn ) {
    const startbtn = domHandler ? domHandler(START_BTN_ID) : _getReadyDomHandler()(START_BTN_ID);
    if(startbtn) {
        startbtn.innerText = _bStartBtn === true ? "시작" : "초기화";
    }
}

export function RenderResetInput() {
    const inputword = domHandler ? domHandler(INPUT_WORD_ID) : _getReadyDomHandler()(INPUT_WORD_ID);
    if(inputword) {
        inputword.value = "";
    }
}