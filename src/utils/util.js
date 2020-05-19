/**
 * html 태그 이벤트 바인딩을 위한 함수
 * @param {element} element 태그엘리먼트
 * @param {string} eventName 이벤트명 
 * @param {callback} cb 콜백함수
 * @param {boolean} isCapture 캡쳐링여부
 */
export function addEvent(element, eventName, cb, isCapture) { 
    if (window.addEventListener) { 
        element.addEventListener(eventName, cb, isCapture); 
    } else if (window.attachEvent) { 
        element.attachEvent("on" + eventName, cb); 
    } else { 
        element["on" + eventName] = cb; 
    } 
}
