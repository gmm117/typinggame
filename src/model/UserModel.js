let UserDatas = [];
let isComplete = false;

function _getData( idx ) {
    return UserDatas.filter( item => item.idx === idx );
};

function _getTotalTime() {
    return UserDatas.reduce((acc, { second }) => acc + second, 0);
};

export function UserInit(serverDatas) {
    UserDatas = serverDatas.map(function(item) {
        return {
            ...item,
            expire: false,
            match: false
        }
    });
};

export function GetLength() {
    return UserDatas.length;
};

export function GetAvgTime() {
    const time = _getTotalTime();
    const length = GetMatchLength();
    if(time <= 0 || length <= 0) {
        return 0;
    }

    return parseInt(time / length, 10);
};

export function GetMatchLength( ) {
    return UserDatas.filter( item => item.match === true ).length;
};

export function GetText( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].text : ""; 
};

export function GetMatch( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].match : false; 
};

export function SetMatch( idx, match ) {
    UserDatas = UserDatas.map( item => item.idx === idx ? {
        ...item,
        match: match
    }: item);
};

export function SetTime( idx, second ) {
    UserDatas = UserDatas.map( item => item.idx === idx ? {
        ...item,
        second: second
    }: item);
};

export function GetTime( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].second : 0; 
};

export function SetExpire( idx, expire ) {
    UserDatas = UserDatas.map( item => item.idx === idx ? {
        ...item,
        expire: expire
    }: item);
};

export function GetExpire( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].expire : false;
};

export function GetScore() {
    return UserDatas.filter( item => item.expire === false ).length;
};

export function IsGameComplete() {
    return isComplete;
}

export function SetGameComplete(_isComplete) {
    isComplete = _isComplete;
}