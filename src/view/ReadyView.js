import { addEvent } from "../utils/util";

const REMAIN_TIME_ID = 'remaintime';
const SCORE_ID = 'score';
const START_BTN_ID = 'startbtn';
const INPUT_WORD_ID = 'inputword';
const PROBLEM_WORD_ID = 'problemword';

let domHandler;

export function RenderHtml(html) {
    const root = document.getElementById('root');
    root.innerHTML = html;
}

function _getDomHandler() {
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

export function RenderTime( _remainTime ) {
    const remaintime = domHandler("remaintime");
    if(remaintime) {
        remaintime.innerText = _remainTime;
    }
}

export function RenderScore( _score ) {
    const score = domHandler("score");
    if(score) {
        score.innerText = _score;
    }
}

export function RenderText( _text ) {
    const problemword = domHandler("problemword");
    if(problemword) {
        problemword.innerText = _text === undefined ? "문제 단어" : _text;
    }
}

export function RenderBtn( _bStartBtn ) {
    const startbtn = domHandler("startbtn");
    if(startbtn) {
        startbtn.innerText = _bStartBtn === true ? "시작" : "초기화";
    }
}

export function ResetInput( ) {
    const inputword = domHandler("inputword");
    if(inputword) {
        inputword.value = "";
    }
}

export function InitEvent( _onStart, _onCompare, _onKeyBlock ) {
    const onClick = e => {
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
    }

    if(domHandler === undefined)
        domHandler = _getDomHandler();

    const startbtn = domHandler("startbtn");
    if(startbtn) {
        addEvent(startbtn, "click", onClick);
    }

    const inputword = domHandler('inputword');
    if(inputword) {
        addEvent(inputword, "keydown", onKeyDown);
    }
}
