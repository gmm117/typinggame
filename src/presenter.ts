import Route, { SetListener, ChangeUrl , READY_URL, RESULT_URL } from "./utils/route";
import RDController from './controller/ReadyController';
import RSController from './controller/ResultController';
import { InitServerData, GetServerDatas } from "./model/ServerModel";
import { UserInit, SetTime, GetTime, SetExpire, GetExpire, GetScore, GetText, GetLength, GetMatch, SetMatch, GetAvgTime, GetMatchLength } from "./model/UserModel";

let presenterlistner: any;

/**
 * 게임준비 화면을 로딩하기 위한 초기화 함수
 * @param {string} html 게임준비 화면 html
 */
function _initReady(html: string): void {
    UserInit(GetServerDatas());

    RDController.Init(presenterlistner, html);
}

/**
 * 게임완료 화면을 로딩하기 위한 초기화 함수
 * @param {string} html 게임완료 화면 html
 */
function _initResult(html: string): void {
    RSController.Init(presenterlistner, html);
}

/**
 * 게임준비 화면으로 라우팅 하기 위한 함수
 */
function _changeUrlReady(): Window | null {
    return ChangeUrl(READY_URL);
}

/**
 * 게임완료 화면으로 라우팅 하기 위한 함수
 */
function _changeUrlResult(): Window | null {
    return ChangeUrl(RESULT_URL);
}

/**
 * Presenter 리스너 생성(model,view,controller,route에 전달을 위한 리스너생성)
 */
function Initialize(): void {
    presenterlistner = { 
        Init: function(): void {
            UserInit(GetServerDatas());
        },
        SetTime,
        GetTime,
        SetExpire,
        GetExpire,
        GetScore,
        GetText,
        GetLength,
        GetMatch,
        SetMatch,
        GetAvgTime,
        GetMatchLength,
        InitReady: _initReady,
        InitResult: _initResult,
        ChangeUrlReady: _changeUrlReady,
        ChangeUrlResult: _changeUrlResult
    };

    SetListener(presenterlistner);
}

/**
 * Presenter 초기화 함수(서버에 데이터 수신, 준비화면 라우팅)
 * @param {string} _url 서버 url
*/
export function init(_url: string): void {
    Route('/', _url)
        .then((res: any) => InitServerData(JSON.parse(res)))
        .then(function(res: boolean) {
            Initialize();
            if(location.hash === '#ready') {
                Route('/ready');
            } else {
                _changeUrlReady();
            }
        })
        .catch((res: any) => alert("status : " + res.status + (res.responseURL ? "\n" + "responseURL : " + res.responseURL : "")));
}