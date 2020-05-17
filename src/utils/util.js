export function addEvent(element, eventName, cb, isCapture) { 
    if (window.addEventListener) { 
        element.addEventListener(eventName, cb, isCapture); 
    } else if (window.attachEvent) { 
        element.attachEvent("on" + eventName, cb); 
    } else { 
        element["on" + eventName] = cb; 
    } 
}

export function asyncCaller( second, callback ) {
    return new Promise((resolve, reject) => {
        window.setTimeout(function () {
            
        }, 1000);
    });
}
