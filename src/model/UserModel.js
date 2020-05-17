let UserDatas = [];

function _getData( idx ) {
    return UserDatas.filter( item => item.idx === idx );
};

function _getTotalTime() {
    return UserDatas.reduce((acc, { second }) => acc + second, 0);
};

function _getMatchLength( ) {
    return UserDatas.filter( item => item.match === true ).length;
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

export function GetLength() {
    return UserDatas.length;
};

export function GetAvgTime() {
    return parseInt(_getTotalTime() / _getMatchLength(), 10);
};
