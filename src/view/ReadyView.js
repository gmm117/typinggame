import { addEvent } from "../utils/util";

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
            <input id="inputword" type="text" class="rd_word" placeholder="입력" />
            <div id="startbtn" class="contentbtn" style="width: 130px; height: 30px;">시작</div>
        </div>
    `;
}

export function RenderTime( _remainTime ) {
    const remaintime = document.getElementById("remaintime");
    if(remaintime) {
        remaintime.innerText = _remainTime;
    }
}

export function RenderScore( _score ) {
    const score = document.getElementById("score");
    if(score) {
        score.innerText = _score;
    }
}

export function RenderBtn( _bStartBtn ) {
    const startbtn = document.getElementById("startbtn");
    if(startbtn) {
        startbtn.innerText = _bStartBtn === true ? "시작" : "초기화";
    }
}

export function ResetInput( ) {
    const inputword = document.getElementById("inputword");
    if(inputword) {
        inputword.value = "";
    }
}

export function InitEvent( _onStart, _onCompare ) {
    const onClick = e => {
        _onStart();
    };

    const onKeyDown = e => {
        if(e.which === 13 || e.keycode === 13) {
            _onCompare(e.target);
        }
    }

    const startbtn = document.getElementById("startbtn");
    if(startbtn) {
        addEvent(startbtn, "click", onClick);
    }

    const inputword = document.getElementById('inputword');
    if(inputword) {
        addEvent(inputword, "keydown", onKeyDown);
    }
}
