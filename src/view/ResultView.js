import { addEvent } from "../utils/util";

/**
 * 라우터에서 받아온 게임완료 html을 렌더링 하기 위한 함수
 * @param {string} html 게임완료 html
 */
export function RenderHtml( html ) {
    const root = document.getElementById('root');
    root.innerHTML = html;
}

/**
 * 라우터에서 받아온 게임준비 html을 렌더링 하기 위한 함수
 * @param {callback} OnRestart 다시시작 눌릴경우 호출되는 callback 
 * @param {score} 현재까지 획득한 점수
 * @param {avg} 단어 당 해결 답변 시간의 평균값
 */
export function InitView( OnRestart, score, avg ) {
    const restartbtn = document.getElementById("restartbtn");
    if(restartbtn) {
        addEvent(restartbtn, "click", (e) => {
            OnRestart();
        });
    }

    const resultnumber = document.getElementById('resultnumber');
    if(resultnumber) {
        resultnumber.innerText = score;
    }

    const avgtime = document.getElementById('avgtime');
    if(avgtime) {
        avgtime.innerText = avg;
    }
}
