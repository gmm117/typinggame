import { getURL } from "./utils/route";
import RDController from './controller/ReadyController';
import RSController from './controller/ResultController';
import { InitServerData, GetServerDatas } from "./model/ServerModel";
import { UserInit, SetTime, GetTime, SetExpire, GetExpire, GetScore, GetText, GetLength, GetMatch, SetMatch, GetAvgTime } from "./model/UserModel";

let userlistner;
let root;

function InitReady() {
    UserInit(GetServerDatas());

    RDController.Init(userlistner, root);
}

function InitResult() {
    RSController.Init(userlistner, root);
}

function Initialize(_root) {
    root = _root;

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
        InitReady,
        InitResult
    };

    return true;
}

export function init( _root, url ) {
    getURL(url)
    .then(res => InitServerData(JSON.parse(res)))
    .then(res => Initialize(_root) && InitReady(_root))
    .catch(res => alert("status : " + res.status + (res.responseURL ? "\n" + "responseURL : " + res.responseURL : "")));
}