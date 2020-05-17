import { getURL } from "./utils/route";
import RDViewModel from './viewmodel/ReadyViewModel';
import RSViewModel from './viewmodel/ResultViewModel';
import { InitServerData, GetServerDatas } from "./model/ServerModel";
import { UserInit, SetTime, GetTime, SetExpire, GetExpire, GetScore, GetText, GetLength, GetMatch, SetMatch, GetAvgTime } from "./model/UserModel";

let userlistner;
let root;

function InitReady() {
    UserInit(GetServerDatas());

    RDViewModel.Init(userlistner, root);
}

function InitResult() {
    RSViewModel.Init(userlistner, root);
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
}

export function init( _root ) {
    Initialize(_root);

    getURL("https://my-json-server.typicode.com/kakaopay-fe/resources/words")
    .then(res => InitServerData(JSON.parse(res)))
    .then(res => InitReady(_root));
}