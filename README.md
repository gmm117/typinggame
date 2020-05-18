## 해결전략
- MVC 패턴적용
  - Model, View, Controller의 역할을 분명하게 나눠서 Model은 데이터만, View는 렌더링만, Controller는 모델과 뷰를 분리해서 처리하도록 구현

- Presenter 기능적용
  - 게임준비/완료화면, 라우팅, 유저/서버 모델데이터를 유기적으로 연결해줄 수 있는 Presenter 객체 생성
  - 유기적으로 연결을 위해서 Presenter에서 각 모듈에게 리스너(callback)을 등록해서 처리
    - 하는이유: 모듈단위 연결하는 로직을 한군데로 몰아서 처리하면서 모듈간의 종속성을 제거가 가능

- 라우터
  - 초기로딩
    - index.html에서 url을 props로 전달 받은 후 라우터를 통해서 json 파일로 수신
    - 그 이후에 게임준비 라우터 호출해서 게임준비 화면이 렌더링 되도록 구현
  - 라우팅 호출
    - 라우팅 인덱스는 HASH URL을 사용하고 있으며, 이벤트 수신은 윈도우 hashchange 이벤트를 수신
    - 코드상 호출은 window.open('/#ready', '_self')으로 호출하고 있으며, 브라우저에서 url/#ready,result 입력 후 호출가능 
  
- 서버/유저 데이터 분리
  - url로 받아온 데이터를 서버데이터의 원본만 저장 후 게임을 시작할 경우 유저데이터에 복제해서 사용
    - 하는이유: 원본데이터를 유지한다면 게임에서 초기화버튼을 누를 시 다시 서버에 원본데이터를 얻어오지 않고, 내부적으로 저장한 원본데이터를 사용하도록 하기위함(클라이언트 성능향상 목적)

## 프로젝트 UML 
![PROJECT UMO](/img/projectUML.png)

## bash
```bash
# Go into the foloder
$ cd typinggame

# Install dependencies
$ npm install

# webpack production Run
$ npm run build

# webpack develop Run
$ npm run dev

# webpack-dev-server Run
$ npm run start
```

## Key Features
* Cross platform
  - Windows, Mac
* Browser
  - IE11, Chrome, Safari, Edge, Firefox, Whale

## Credits
This software uses the following open source packages:
- [babel](https://babeljs.io/)
- [npm](https://www.npmjs.com/)
- [jest](https://jestjs.io/)
- [webpack](https://webpack.js.org/)
- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)

## Emailware
I'd like you send me an email at <gmm117@naver.com> about anything you'd want to say about this software. I'd really appreciate it!

