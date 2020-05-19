var presenterlistener; // presenter listener

/**
 * 라우팅을 위한 함수
 * @param {string} url
 */
const routes = {
  '/': function (url) {
    return _getURL(url)
      .then(res => res);
  },
  '/ready': function () {
    return _getURL('/ready.html')
      .then(function(res) {
        if(presenterlistener)
          presenterlistener.InitReady(res);
        return res;
      }); 
  },
  '/result': function () {
    return _getURL('/result.html')
      .then(function(res) {
        if(presenterlistener)
          presenterlistener.InitResult(res);
        return res;
      });
  },
  otherwise(path) {
    throw new Error(`unhandled route path : ${path}`);
  }
};

/**
 * url을 통해서 데이터를 수신받기 위한 함수
 * @param {string} url
 */
function _getURL(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', url);
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
 * @param {HashChangeEvent} event
 */
function _locationrouter(event) {
  const { href, origin } = location;
  let path = href.replace(origin, '');
  path = path.replace('#', '');
  (routes[path] || routes.otherwise)(path);
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
 * @param {function} listener
 */
export function SetListener(listener) {
  presenterlistener = listener;
}

/**
 * 라우터를 통해서 url을 변경하기 위한 함수
 * @param {string} url
 */
export function ChangeUrl(url) {
   return window && window.open(url, '_self');
}

/**
 * path, url을 통해서 routers 라우팅을 위임하는 함수
 * @param {string} path
 * @param {string} url
 */
export default function Route(path, url) {
  path = path.replace('#', '');
  if(routes[path]) {
    return routes[path](url);
  } 
  
  return routes.otherwise(path);
}
