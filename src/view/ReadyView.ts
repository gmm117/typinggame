import { addEvent } from "../utils/util";

const REMAIN_TIME_ID: string = 'remaintime';
const SCORE_ID: string = 'score';
const START_BTN_ID: string = 'startbtn';
const INPUT_WORD_ID: string = 'inputword';
const PROBLEM_WORD_ID: string = 'problemword';

let domHandler: any | null; // _getReadyDomHandler의 클로저를 저장하는 객체

/**
 * ID 인덱스의 따라서 DOM element를 얻어오는 함수
 * @param {id} id
 */
function _getReadyDomHandler() : any  {
    let remaintime: HTMLElement | null, 
        score: HTMLElement | null,
        startbtn: HTMLElement | null,
        inputword: HTMLElement | null,
        problemword: HTMLElement | null;

    return function(id: string): HTMLElement | null {
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
/**
 * 게임준비 화면의 DOM 초기화 함수
 * @param {callback} _onStart 시작버튼이 눌릴경우 호출되는 callback
 * @param {callback} _onCompare 서버에서 받아온 단어와 사용자가 입력한 단어를 비교하기 위한 callback
 * @param {callback} _onKeyBlock 시작버튼이 누릴경우만 키 이벤트를 수신하기 위해서 호출하는 callback
 */
export function InitView( _onStart: any, _onCompare: any, _onKeyBlock: any ): void {
    const onClick = (e: MouseEvent) => {
        const inputword: HTMLElement  = domHandler ? domHandler(INPUT_WORD_ID) : _getReadyDomHandler()(INPUT_WORD_ID);
        inputword.focus();
        _onStart();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if(_onKeyBlock()) {
            e.preventDefault();
        } else {
            if(e.which === 13 || e.keyCode === 13) {
                _onCompare(e.target);
            }
        }
    };

    if(domHandler === undefined)
        domHandler = _getReadyDomHandler();

    const startbtn: HTMLElement | null = domHandler ? domHandler(START_BTN_ID) : _getReadyDomHandler()(START_BTN_ID);
    if(startbtn) {
        addEvent(startbtn, "click", onClick);
    }

    const inputword: HTMLElement | null = domHandler ? domHandler(INPUT_WORD_ID) : _getReadyDomHandler()(INPUT_WORD_ID);
    if(inputword) {
        addEvent(inputword, "keydown", onKeyDown);
    }
}

/**
 * 라우터에서 받아온 게임준비 html을 렌더링 하기 위한 함수
 * @param {string} _html 게임준비 html
 */
export function RenderHtml( _html: string ): void {
    const root: HTMLElement | null = document.getElementById('root');
    if(root) {
        root.innerHTML = _html;
    }
}

/**
 * 남은시간을 렌더링 하기 위한 함수
 * @param {number} _remainTime 남은시간
 */
export function RenderTime( _remainTime: number ): void {
    const remaintime: HTMLElement | null = domHandler ? domHandler(REMAIN_TIME_ID) : _getReadyDomHandler()(REMAIN_TIME_ID);
    if(remaintime) {
        remaintime.innerText = _remainTime.toString();
    }
}

/**
 * 점수를 렌더링 하기 위한 함수
 * @param {number} _score 점수
 */
export function RenderScore( _score: number ): void {
    const score: HTMLElement | null = domHandler ? domHandler(SCORE_ID) : _getReadyDomHandler()(SCORE_ID);
    if(score) {
        score.innerText = _score.toString();
    }
}

/**
 * 단어를 렌더링 하기 위한 함수
 * @param {string} _text 단어
 */
export function RenderText( _text?: string ): void {
    const problemword: HTMLElement | null = domHandler ? domHandler(PROBLEM_WORD_ID) : _getReadyDomHandler()(PROBLEM_WORD_ID);
    if(problemword) {
        problemword.innerText = _text === undefined ? "문제 단어" : _text;
    }
}

/**
 * 시간버튼을 렌더링 하기 위한 함수
 * @param {boolean} _bStartBtn 시간/초기화 버튼 flag
 */
export function RenderBtn( _bStartBtn: boolean ): void {
    const startbtn: HTMLElement | null = domHandler ? domHandler(START_BTN_ID) : _getReadyDomHandler()(START_BTN_ID);
    if(startbtn) {
        startbtn.innerText = _bStartBtn === true ? "시작" : "초기화";
    }
}

/**
 * 입력태그를 초기화 하기 위한 함수
 */
export function RenderResetInput(): void {
    const inputword: HTMLInputElement | null = domHandler ? domHandler(INPUT_WORD_ID) : _getReadyDomHandler()(INPUT_WORD_ID);
    if(inputword) {
        inputword.value = "";
    }
}