import { addEvent } from "../utils/util";

const REMAIN_TIME_ID = 'remaintime';
const SCORE_ID = 'score';
const START_BTN_ID = 'startbtn';
const INPUT_WORD_ID = 'inputword';

let domHandler;

export function RenderHtml( ) {
    return `
        <div class="rd_header">
            <div>
                <div>남은 시간 :&nbsp;</div>
                <div id="remaintime"></div>
                <div>초</div>
            </div>
            <div>
                <div>점수 :&nbsp;</div>
                <div id="score"></div>
                <div>점</div>
            </div>
        </div>
        <div class="rd_content"> 
            <div class="rd_problemword">문제 단어</div>
            <input id="inputword" type="text" class="rd_word" placeholder="입력" autocomplete="off" />
            <div id="startbtn" class="contentbtn" style="width: 130px; height: 30px;">시작</div>
        </div>
    `;
}

function _getDomHandler() {
    let remaintime, score, startbtn, inputword;
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
