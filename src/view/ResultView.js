import { addEvent } from "../utils/util";

export function RenderHtml( resultnumber, avgtime ) {
    return `
            <div class="rs_header">
                <div>Mission Complate!</div>
            </div>
            <div class="rs_content">
                <div class="c1">
                    <div>당신의 점수는&nbsp;</div>
                    <div id="resultnumber">${resultnumber}</div>
                    <div>점입니다.</div>
                </div>
                <div class="c2">
                    <div>단어당 평균 답변 시간은&nbsp;</div>
                    <div id="avgtime">${avgtime}</div>
                    <div>초입니다.</div>
                </div>
                <div id="restartbtn" class="contentbtn" style="width: 150px; height: 30px;">다시 시작</div>
            </div>
        `;
}

export function InitEvent( OnRestart ) {
    const restartbtn = document.getElementById("restartbtn");
    if(restartbtn) {
        addEvent(restartbtn, "click", (e) => {
            OnRestart();
        });
    }
}
