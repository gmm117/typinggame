import { addEvent } from "../utils/util";

export function RenderHtml( html ) {
    const root = document.getElementById('root');
    root.innerHTML = html;
}

export function InitEvent( OnRestart, score, avg ) {
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
