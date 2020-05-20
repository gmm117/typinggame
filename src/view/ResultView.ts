import { addEvent } from "../utils/util";

/**
 * 라우터에서 받아온 게임완료 html을 렌더링 하기 위한 함수
 * @param {string} _html 게임완료 html
 */
export function RenderHtml( _html: string ): void {
    const root: HTMLElement | null = document.getElementById('root');
    if(root) {
        root.innerHTML = _html;
    }
}

/**
 * 라우터에서 받아온 게임준비 html을 렌더링 하기 위한 함수
 * @param {callback} OnRestart 다시시작 눌릴경우 호출되는 callback 
 * @param {number} _score 현재까지 획득한 점수
 * @param {number} _avg 단어 당 해결 답변 시간의 평균값
 */
export function InitView( OnRestart: any, _score: number, _avg: number ) : void{
    const restartbtn: HTMLElement | null = document.getElementById("restartbtn");
    if(restartbtn) {
        addEvent(restartbtn, "click", (e : MouseEvent) => {
            OnRestart();
        });
    }

    const resultnumber: HTMLElement | null = document.getElementById('resultnumber');
    if(resultnumber) {
        resultnumber.innerText = _score.toString();
    }

    const avgtime: HTMLElement | null = document.getElementById('avgtime');
    if(avgtime) {
        avgtime.innerText = _avg.toString();
    }
}
