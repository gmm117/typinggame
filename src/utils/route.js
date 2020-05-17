var presenterlistener;

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

const routes = {
  '/': function (url) {
    return _getURL(url)
      .then(res => res);
  },
  '/ready': function () {
    return _getURL('/ready.html')
      .then(function(res) {
        presenterlistener.InitReady(res);
        return true;
      }); 
  },
  '/result': function () {
    return _getURL('/result.html')
      .then(function(res) {
        presenterlistener.InitResult(res);
        return true;
      });
  },
  otherwise(path) {
    console.error(path);
  }
};

function locationrouter(event) {
  const { href, origin } = location;
  let path = href.replace(origin, '');
  path = path.replace('#', '');
  (routes[path] || routes.otherwise)(path);
}

if (window.onpopstate != null) {
  window.onpopstate = locationrouter;
} else {
  window.onhashchange = locationrouter;
}

export const READY_URL = '/#ready';
export const RESULT_URL = '/#result';

export function SetListener(listener) {
  presenterlistener = listener;
}

export function ChangeUrl(url) {
  window.open(url, '_self');
}

export default function router(path, url) {
  path = path.replace('#', '');
  if(routes[path]) {
    return routes[path](url);
  } 
  
  return routes.otherwise(path);
}
