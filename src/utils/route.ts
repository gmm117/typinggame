var presenterlistener: any; // presenter listener

/**
 * 라우팅을 위한 함수
 * @param {string} url
 */

function _getUrlRoutes(_path: string, _url?: string): any {
  const url: string = _url ? _url : "";
  switch(_path) {
    case '/': 
      return _getURL(url)
      .then(res => res);
    case '/ready': 
      return _getURL('/ready.html')
      .then(function(res: string) {
        if(presenterlistener)
          presenterlistener.InitReady(res);
        return res;
      });
    case '/result':
      return _getURL('/result.html')
      .then(function(res: string) {
        if(presenterlistener)
          presenterlistener.InitResult(res);
        return res;
      });
    default:
      throw new Error(`unhandled route path : ${_path}`);
  }
}

/**
 * url을 통해서 데이터를 수신받기 위한 함수
 * @param {string} _url
 */
function _getURL(_url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', _url);
    req.send();

    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) resolve(req.response);
        else reject(req.statusText);
      }
    };
  });
}

/**
 * 라우팅 이벤트를 수신한다.
 * @param {Event} event
 */
function _locationrouter(event: Event): void {
  const { href, origin } = location;
  let _path: string = href.replace(origin, '');
  _path = _path.replace('#', '');

  _getUrlRoutes(_path);
}

if (window.onpopstate != null) {
  window.onpopstate = _locationrouter;
} else {
  window.onhashchange = _locationrouter;
}

export const READY_URL = '/#ready';
export const RESULT_URL = '/#result';

/**
 * presenter의 리스너를 세팅하기 위한 함수(route-presenter-controller 연결)
 * @param {function} _listener
 */
export function SetListener(_listener: any): void {
  presenterlistener = _listener;
}

/**
 * 라우터를 통해서 url을 변경하기 위한 함수
 * @param {string} _url
 */
export function ChangeUrl(_url: string): Window | null {
   return window && window.open(_url, '_self');
}

/**
 * path, url을 통해서 routers 라우팅을 위임하는 함수
 * @param {string} _path
 * @param {string} _url
 */
export default function Route(_path: string, _url?: string): any {
  return _getUrlRoutes(_path, _url);
}
