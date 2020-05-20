interface ServerData {
    idx: number,
    second: number,
    text: string
}

let ServerDatas: ServerData[] = []; // 서버 정보리스트

/**
 * 서버에서 받아온 JSON 데이터를 ServerDatas 배열의 세팅한다.
 * @param {Array} serverData
 */
export function InitServerData( serverData: [] ) {
    let idx: number = 0;

    for(const i in serverData) {
        const {second, text} = serverData[i];
        
        ServerDatas.push({
            idx: idx++,
            second: second,
            text: text
        });
    }

    return true;
}

/**
 * 서버에서 받아온 JSON 데이터를 얻어간다.
 * @param {list} ServerDatas
 */
export function GetServerDatas() : ServerData[] {
    return ServerDatas;
}
