let UserDatas = []; // 게임유저의 정보리스트
let isComplete = false; // 게임완료 여부

/**
 * User Datas의 인덱스값의 데이터를 얻어온다.
 * @param {number} idx
 * @return {Object}
 */
function _getData( idx ) {
    return UserDatas.filter( item => item.idx === idx );
};

/**
 * 단어 당 해결 답변시간의 총합을 구한다.
 * @return {number} 
 */
function _getTotalTime() {
    return UserDatas.reduce((acc, { second }) => acc + second, 0);
};

/**
 * 서버에서 받아온 데이터를 User Datas에 세팅한다.
 * @param {list} serverDatas
 */
export function UserInit(serverDatas) {
    UserDatas = serverDatas.map(function(item) {
        return {
            ...item,
            expire: false,
            match: false
        }
    });
};

/**
 * User Datas에 사이즈를 얻어간다.
 * @return {number} UserDatas.length
 */
export function GetLength() {
    return UserDatas.length;
};

/**
 * 단어 당 해결 답변 시간의 평균을 구한다.
 * @return {number} (time / length)
 */
export function GetAvgTime() {
    const time = _getTotalTime();
    const length = GetMatchLength();
    if(time <= 0 || length <= 0) {
        return 0;
    }

    return parseInt(time / length, 10);
};

/**
 * 단어 당 해결 답변 시간의 총합을 구한다.
 * @return {number} 
 */
export function GetMatchLength( ) {
    return UserDatas.filter( item => item.match === true ).length;
};

/**
 * 해당 인덱스의 단어를 얻어온다.
 * @param {number} idx
 * @return {text} text
 */
export function GetText( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].text : ""; 
};

/**
 * 해당 인덱스의 해결 여부를 얻어온다.
 * @param {number} idx
 * @return {boolean} match
 */
export function GetMatch( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].match : false; 
};

/**
 * 해당 인덱스의 해결 여부를 세팅한다.
 * @param {number} idx
 * @param {boolean} match
 */
export function SetMatch( idx, match ) {
    UserDatas = UserDatas.map( item => item.idx === idx ? {
        ...item,
        match: match
    }: item);
};

/**
 * 해당 인덱스의 시간을 얻어온다.
 * @param {number} idx
 * @return {number} second
 */
export function GetTime( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].second : 0; 
};

/**
 * 해당 인덱스의 시간을 세팅한다.
 * @param {number} idx
 * @param {number} second
 */
export function SetTime( idx, second ) {
    UserDatas = UserDatas.map( item => item.idx === idx ? {
        ...item,
        second: second
    }: item);
};

/**
 * 해당 인덱스의 시간 만료여부를 얻어온다.
 * @param {number} idx
 * @return {boolean} expire
 */
export function GetExpire( idx ) {
    const data = _getData(idx);
    return data.length > 0 ? data[0].expire : false;
};

/**
 * 해당 인덱스의 시간 만료여부를 세팅한다.
 * @param {number} idx
 * @param {boolean} expire
 */
export function SetExpire( idx, expire ) {
    UserDatas = UserDatas.map( item => item.idx === idx ? {
        ...item,
        expire: expire
    }: item);
};

/**
 * 게임화면의 점수를 얻어오는 함수
 * @return {number} length
 */
export function GetScore() {
    return UserDatas.filter( item => item.expire === false ).length;
};

/**
 * 게임의 완료여부를 얻어오는 함수(게임이 완료된 경우에만 완료화면에서 유저데이터 정보를 얻어오기 위해서)
 * @return {boolean} isComplete
 */
export function IsGameComplete() {
    return isComplete;
}

/**
 * 게임의 완료여부를 세팅하는 함수
 * @param {boolean} isComplete
 */
export function SetGameComplete(_isComplete) {
    isComplete = _isComplete;
}