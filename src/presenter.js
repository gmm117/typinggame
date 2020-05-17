import Route, { SetListener, ChangeUrl , READY_URL, RESULT_URL } from "./utils/route";
import RDController from './controller/ReadyController';
import RSController from './controller/ResultController';
import { InitServerData, GetServerDatas } from "./model/ServerModel";
import { UserInit, SetTime, GetTime, SetExpire, GetExpire, GetScore, GetText, GetLength, GetMatch, SetMatch, GetAvgTime, GetMatchLength } from "./model/UserModel";

let presenterlistner;

function _initReady(html) {
    UserInit(GetServerDatas());

    RDController.Init(presenterlistner, html);
}

function _initResult(html) {
    RSController.Init(presenterlistner, html);
}

function _changeUrlReady() {
    return ChangeUrl(READY_URL);
}

function _changeUrlResult() {
    return ChangeUrl(RESULT_URL);
}

function Initialize() {
    presenterlistner = { 
        Init: function() {
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

export function init(url) {
    Route('/', url)
        .then(res => InitServerData(JSON.parse(res)))
        .then(function(res) {
            Initialize();
            if(location.hash === '#ready') {
                Route('/ready');
            } else {
                _changeUrlReady();
            }
        })
        .catch(res => alert("status : " + res.status + (res.responseURL ? "\n" + "responseURL : " + res.responseURL : "")));
}