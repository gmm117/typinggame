let ServerDatas = [];

export function InitServerData( serverData ) {
    let idx = 0;

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

export function GetServerDatas( ) {
    return ServerDatas;
}
