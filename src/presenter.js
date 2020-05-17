import route, { SetListener, ChangeUrl , READY_URL, RESULT_URL } from "./utils/route";
import RDController from './controller/ReadyController';
import RSController from './controller/ResultController';
import { InitServerData, GetServerDatas } from "./model/ServerModel";
import { UserInit, SetTime, GetTime, SetExpire, GetExpire, GetScore, GetText, GetLength, GetMatch, SetMatch, GetAvgTime, GetMatchLength } from "./model/UserModel";

let userlistner;

function _initReady(html) {
    UserInit(GetServerDatas());

    RDController.Init(userlistner, html);
}

function _initResult(html) {
    RSController.Init(userlistner, html);
}

function _changeUrl(url) {
    ChangeUrl(url);
}

function _changeReady() {
    return ChangeUrl(READY_URL);
}

function _changeResult() {
    return ChangeUrl(RESULT_URL);
}

function Initialize() {
    userlistner = { 
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
        ChangeReady: _changeReady,
        ChangeResult: _changeResult
    };

    SetListener(userlistner);
}

export function init(url) {
    route('/', url)
        .then(res => InitServerData(JSON.parse(res)))
        .then(function(res) {
            Initialize();
            if(location.hash === '#ready') {
                route('/ready');
            } else {
                _changeReady();
            }
        })
        .catch(res => alert("status : " + res.status + (res.responseURL ? "\n" + "responseURL : " + res.responseURL : "")));
}