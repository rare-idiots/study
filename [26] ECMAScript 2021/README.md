## ECMAScript 2021

- 해당 포스트는 2021년 5월 기준으로 3월 9일날 올라온 ES2021 후보자들에 대해서 기술합니다.

  - [ES2021 Release Candidate](https://github.com/tc39/ecma262/releases)

- tc39 finished-proposals의 리스트에서도 확인할수있습니다.
  - [finished-proposals](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

### String.prototype.replaceAll

- [tc39 MD 문서](https://github.com/tc39/proposal-string-replaceall)

- 기존의 string prototype 함수중 replace 함수를 보완? 한 replace All 함수가 생겼습니다.

- 기존의 replace 함수는 문자열 or 정규 표현식을 사용하여 단일 or 모든 부분을 교체 하였습니다.

```javascript
const str = "Hello World, Hello Javascript";

const replaceStr = str.replace("Hello", "Hi");

console.log(`str.replace("Hello", "Hi") ===> ${replaceStr}`);

const replaceRegExpStr = str.replace(/Hello/g, "Hi");

console.log(`str.replace(/Hello/g, "Hi") ===> ${replaceRegExpStr}`);

정규 표현식을 쓰지 않고 문자열 로만 모든 부분을 교체 하기 위해서는 String#split 과 Array#join 을 이용하여야했다.

const replaceWithSplitJoinStr = str.split('Hello').join('Hi');

console.log(`str.split('Hello').join('Hi') ===> ${replaceWithSplitJoinStr}`);
```

- 이번에 ES2021 에서 추가된 replaceAll 을 사용하면 문자열 만으로도 모든 부분을 교체 할수 있게되었습니다.

```javascript
const replaceAllStr = str.replaceAll("Hello", "Hi");

console.log(`str.replaceAll("Hello", "Hi") ===> ${replaceStr}`);
```

- console 이미지
  ![replaceAll.png](./replaceAll.png)

- Code [stackblitz](https://stackblitz.com/edit/replaceall?file=index.js)

<br>

### Promise.any + AggregateError

- [tc39 MD 문서](https://github.com/tc39/proposal-promise-any)

- Promise 배열 에서 1개 라도 resolve 되면 Promise.any 가 Resolve 된다.

- 1개의 Resolve 된 값만 리턴 된다.

- Promise 배열 에서 모든 Promise 가 Reject 되면 AggregateError 발생한다.

- 모든 Promise가 Reject 되면 AggregateError 에 모든 에러가 발생한다.

- Promise.race 와 차이점은 fulfils 되는 Promise 는 Promise 배열에서 resolve 된 값만 된다.
  - 자세한 차이점은 Promise Combinators 포스트를 작성하고 그곳에서 설명하겠습니다.

##### AggregateError

[MDN AggregateError](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)

- AggregateError 객체는 다수의 에러가 한 에러로 랩핑 되어야 할 때의 오류를 나타냅니다.
- 한 작업에서 여러개의 오류가 보고될 때 발생하는데, 대표적으로 Promise.any 에 전달된 promise들이 거부되었을 떄 발생합니다.

```javascript
const firstResolvePromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("firstResolvePromise"), 1000);
});

const secondResolvePromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("secondResolvePromise"), 900);
});

const thirdResolvePromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("thirdResolvePromise"), 800);
});

const firstRejectPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("firstRejectPromise")), 700);
});

const secondRejctPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("secondRejctPromise")), 600);
});

(async () => {
  try {
    const first = await Promise.any([
      firstResolvePromise,
      secondResolvePromise,
      thirdResolvePromise,
      firstRejectPromise,
    ]);

    console.log(`resolve ${first}`);
  } catch (e) {
    console.log(e);
  }
  // Promise 배열 안에 Reject 되는 게 있지만 가장 빨리 resolve 된 thirdResolvePromise 가 결과로 넘어온다.

  console.log("------");

  try {
    const first = await Promise.any([firstRejectPromise, secondRejctPromise]);

    console.log(`resolve ${first}`);
  } catch (e) {
    console.log(e);
    console.log(e.errors);
    e.errors.forEach((error) => console.log(error.message));
  }

  // 모든 Promise 가 Reject 가 되었을때 에러
})();
```

- console 이미지
  ![promiseAny.png](./promiseAny.png)

- Code [stackblitz](https://stackblitz.com/edit/promise-any?file=index.js)

<br>

### WeakRefs && FinalizationRegistry

- [tc39 MD 문서](https://github.com/tc39/proposal-weakrefs)

- ES2021 에서는 객체의 참조에 관하여 도와주는 2가지 클래스가 추가되었습니다.

  - objects 에 관한 약한 참조를 만들어주는 WeakRefs class
  - 어떤 objects 가 가비지 콜렉티드 되면 콜백 함수를 실행해주는 FinalizationRegistry class

##### WeakRefs

- **올바른 사용에는 신중한 생각이 필요하며 가능하면 피하는 편이 제일 좋다.**

- WeakRef 인스턴스는 등록한 객체가 메모리에 있으면 해당 객체를 반환하고, 가비지 콜렉티드 되었으면 undefined를 반환한다.

```javascript
let userInfo = {
  name: "chanyeong",
};

const userInfoWeekRef = new WeakRef(userInfo);

const printName = () => {
  console.log(userInfoWeekRef.deref().name);
};

userInfo = null;

setInterval(printName, 3000);
```
