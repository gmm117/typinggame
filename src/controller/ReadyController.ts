import { RenderHtml, RenderTime, RenderScore, RenderBtn, RenderResetInput, RenderText, InitView } from "../view/ReadyView";
import RDModel from "../model/ReadyModel";
import { SetGameComplete } from "../model/UserModel";

let presenterlistner: any; // presenter listener

/**
 * 시작/초기화 버튼을 누를경우에 호출되는 함수
 */
function _onStart(): void {
    const { Init } =  presenterlistner;
    const bStart: boolean = RDModel.GetStartFlag();

    RDModel.SetStartFlag(!bStart);
    RenderBtn(!bStart);
    Init();

    if(bStart) {
        _start();
    } else {
        _reset();
    }
}

/**
 * 단어와 사용자의 입력데이터가 일치하는지의 여부를 처리하는 함수
 * @param {string} value 사용자의 입력값
 */
function _onCompare({ value }: any): void {
    const { GetText, SetMatch } =  presenterlistner;
    const idx: number = RDModel.GetCurIdx();
    if(value === GetText(idx)) {
        SetMatch(idx, true);
        RenderResetInput();
    } 
}

/**
 * 시작버튼이 누를경우 for문을 돌면서 문제들을 처리해주는 함수
 */
async function _start(): Promise<void> {
    const { GetLength, ChangeUrlResult } =  presenterlistner;

    for(let i=0; i< GetLength(); i++) {
        RDModel.SetCurIdx(i);
        await asyncIntervalGameCaller(i);
    }

    SetGameComplete(true);
    ChangeUrlResult();
}

/**
 * 비동기처리로 남은시간,점수,입력,단어등을 로직적으로 처리하는 함수(뷰,모델)
 * @param {number} _idx 현재 게임하고 있는 인덱스값
 */
function asyncIntervalGameCaller(_idx: number): Promise<void> {
    const { GetTime, SetTime, GetText, GetScore, GetMatch, SetExpire } =  presenterlistner;

    let second: number = GetTime(_idx);
    SetTime(_idx, second);
    RenderTime(second);
    RenderText(GetText(_idx));
    RenderScore(GetScore());

    return new Promise((resolve, reject) => {
        const timeid: number = window.setInterval(function () {
            if(second <= 0 || GetMatch(_idx)) {
                if(second <= 0)
                    SetExpire(_idx, true);

                RenderResetInput();
                if(RDModel.GetCurTimeid() >= 0) 
                    window.clearInterval(RDModel.GetCurTimeid());
                    
                resolve();
            } else {
                SetTime(_idx, --second);
                RenderTime(second);
                RenderText(GetText(_idx));
            }
            
            RenderScore(GetScore());
            
        }, 1000);

        RDModel.SetCurTimeid(timeid);
    });
}

/**
 * ReadyController 초기화 함수
 * @param {function} _presenterlistner presenter의 리스너(route-presenter-controller 연결)
 * @param {string} html 게임준비화면 html
 */
function _init( _presenterlistner: any, html: string ): void {
    if(presenterlistner === undefined)
        presenterlistner = _presenterlistner;

    const { GetLength } =  presenterlistner;
    SetGameComplete(false);
    
    if(GetLength() > 0) {
        RenderHtml(html);
        InitView(_onStart, _onCompare, RDModel.OnKeyBlock);
        _reset();
    }
}

/**
 * 모델,뷰를 리셋해주는 함수
 */
function _reset(): void {
    const { GetScore, GetLength, GetTime } =  presenterlistner;

    RenderResetInput();
    RenderScore(GetScore());
    RenderText();
    if(GetLength() > 0) {
        RenderTime(GetTime(0));
    }

    RDModel.SetStartFlag(true);
    RDModel.SetCurIdx(0);

    if(RDModel.GetCurTimeid() >= 0) {
        window.clearInterval(RDModel.GetCurTimeid());
    }
    RDModel.SetCurTimeid(0);
}


export default {
    Init : _init
};