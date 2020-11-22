# GraphQL

### 정의

- 페이스북 2012년 에 개발된 데이터 질의어
- API 통신을 위한 쿼리 언어

### 쿼리 언어? 질의어? 가 뭐야?

- sql (Structured Query Language) : 구조화 질의어

  - 데이터베이스에서 데이터를 저장하거나 얻기 위해서 사용하는 표준화된 언어
  - 백엔드 에서 저장하고 호출한다.

- GraphQL

  - 서버에서 데이터를 저장하거나 얻기 위해서 사용하는 데이터 질의어
  - 클라이언트에서 저장 하고 호출한다.

- Example

```
sql)
select * from table;

// Mysql 에서 데이터 베이스에 보내는 질의어

graphql)
query {
  table {
    id
    name
  }
}

// Client 에서 Api 에 보내는 graphql 질의어

```

### Graphql 의 인기도는 얼마나 되나?

[https://2019.stateofjs.com/data-layer/graphql/](https://2019.stateofjs.com/data-layer/graphql/)

- 인기도를 보면 아직까지는 그렇게 많이 쓰이지 않는 언어 라는걸 알수있습니다.
- 하지만 써본 사람의 38.7% 는 다시 사용을 희망하고 2.1% 는 다시 사용을 희망 하지 않는걸 봐서는 가면 갈수록 사용 하는 비용이 늘어날것 같습니다.

### Graphql 는 어떤 언어 및 어떤 라이브러리가 지원하는데?

[지원 언어 맟 라이브러리](https://graphql.org/code/)

- 거의 모든 언어에서 지원을 하며 언어마다 복수개의 라이브러리가 공식 지원 되고 있습니다.

## REST API & Graphql

### REST API

```
REST 는 Roy Fielding 의
“Architectural Styles and the Design of Network-based Software Architectures” 라는 책에서 소개된 방법론으로,
REpresentational State Transfer 의 줄임말이다.
너무 길어서 생략..
```

- 예시
  - 글 관련 API = /posts
  - 글 작성 = POST /posts
  - 글 수정 = PATCH /posts/[postid]
  - 글 삭제 = DELETE /posts/[postid]
  - 댓글 관련 API = /posts/[postid]/comments
  - 댓글 작성 = POST /posts/[postid]/comments
  - 댓글 수정 = PATCH /posts/[postid]/comments/[commentid]
  - 댓글 삭제 = DELETE /posts/[postid]/comments/[commentid]

* 이런 REST 의 조건을 만족하는 API 를 RESTful API 라고 부르고, 이런 방식으로 API 를 작성하는 것을 RESTful 하다고 한다.

- 모든 Resource (자료, User, …) 들을 하나의 Endpoint 에 각각 연결해놓고,
  각 Endpoint 는 그 Resource 와 관련된 내용만 관리하게 하자는 방법론이다.

### GraphQL 탄생 하게 된 이유

- RESTful API 로는 다양한 기종에서 필요한 정보들을 일일히 구현하는 것이 힘들었다.
- 예로, iOS 와 Android 에서 필요한 정보들이 조금씩 달랐고, 그 다른 부분마다 API 를 구현하는 것이 힘들었다.
- 이 때문에 정보를 사용하는 측에서 원하는 대로 정보를 가져올 수 있고,
- 보다 편하게 정보를 수정할 수 있도록 하는 표준화된 Query language 를 만들게 되었다.
- 이것이 GraphQL 이다.

### GraphQL 과 Rest Api 차이점

##### 엔드 포인트 차이점

![api](./graphql-mobile-api.png)

- REST API 는 엔드 포인트가 Resource 마다 각각하나의 엔드포인트를 가지지만
- Graphql은 Resource 가 여러개 여도 전체 하나의 엔드포인트로 되어있음을 알수있습니다.
  <br/>

##### Stack 에서의 차이점

![stack](./graphql-stack.png)

- 일반 HTTP API 에서의 Axios 및 Fetch 에서 GraphQL Client Module 로 바뀌었고
- Backend App 에서 GraphQL Server Module 만 추가 됩니다.
- 또한 화살표로 표현되는 엔드포인트 들이 줄어듬을 알수있습니다.
  <br/>

## GraphQL 의 장점

<hr>

#### 1. Over-Fetching

- 유저 리스트 구조의 예시

```
users [
  {
    id: 1
    name: 테스트1
    description: 설명1
    alias: 별명1
    ...etc
  },
  {
    id: 2
    name: 테스트2
    description: 설명2
    alias: 별명2
    ...etc
  },
  {
    id: 3
    name: 테스트3
    description: 설명3
    alias: 별명3
    ...etc
  },
  {
    id: 4
    name: 테스트4
    description: 설명4
    alias: 별명4
    ...etc
  }
]
```

- **Rest Api**

  - /users GET (User Profile Info)를 요청하면 리스트 구조의 모든 데이터를 리턴 받게 된다.
  - 즉, 내가 받고 싶지 않은 정보도 받아야 한다.

<br />

- **GraphQL**

  - 하지만 GraphQL 은 내가 받고 싶은 데이터만 쿼리로 질의해서 가져올수가있다.

  ```
  query {
    users {
      id
      alias
    }
  }
  ```

- 많은 데이터를 받기 때문에 Over를 붙여서 Over-Fetching 이라고 한다.
- Grpahql 을 사용하면 이렇게 필요 하지 않은 데이터를 받지 않으므로 메모리 및 Response Size를 줄일수있다.

<br/>

#### 2. Under-Fetching - 1

- 어떤 하나의 서비스를 만들기 위해서 여러개의 요청을 보내야 할 필요가 있다.
- 하지만 그래프 QL 은 쉽게 해결이 가능하다.

- **Rest Api**

![stack](./under-rest.png)

- 유저의 정보를 받기 오기 위해서 /users/{id} 를 요청 하여 User 정보를 가져온다.
- 유저가 작성한 Post 정보를 받기 위해서 /users/{id}/posts 를 요청하여 User의 Post 정보를 가져온다.
- 유저의 Followers 정보를 받기 위해서 /users/{id}/followers 를 요청하여 User의 Followers 정보를 가져온다.
- 유저 정보와 유저의 Post, Followers 정보를 위하여 3번의 네트 워크 요청이 발생했다.

<br/>

- **Graph QL**

![stack](./under-graphql.png)

- 하지만 GraphQL은 1개의 query 요청으로 유저 정보와 유저의 Post, Follwers 정보를 가져올수 있다.
- 이렇게 네트 워크 요청이 줄어 듬을 표현하여 Under를 붙여 Under Fetching 이라고 한다.

<br/>

#### 2. Under-Fetching - 2

- 위에서는 User 에 관련된 API 호출을 다뤄보았다.
- 하지만 이번에는 각각 다른 Resource 를 처리 하는 로직이 있다면 어떨까?
- 예를 들어 인스타 그램을 로그인 한다고 했을때 각각의 정보를 가져 오기 위해서 서로 어떤식으로 호출이 되는지 알아보자

<br/>

- **Rest Api**

```
/feed
/notifications
/user
```

- **Graph QL**

```
query {
  feed {
    id
  }
  notifications {
    name
  }
  user {
    username
    alias
  }
}

```

- Rest API 에서는 각각의 Resource 정보를 가져오기 위해 3개의 네트워크 요청이 필요했다.
- 다른 추가 적인 Resource 정보가 필요하다면 추가 적인 네트워크 요청이 필요할것이다.
- 하지만 GraphQL 은 1가지 네트 워크 요청 만으로 자기가 가져오고 싶은 Resource 의 사용하는 데이터만 질의를 하여 가져올수 있게 되는것이다.

<br />

#### 3. Play Ground

- Rest Api 에서는 네트 워크를 테스트를 위한 툴, API 문서 작성을 도와주는 라이브러리, DB 스키마를 정의해주는 작업이 필요하다.

- 하지만 GraphQL 에서는 그 작업이 필요없이 PlayGroud 라는 것이 존재하며 위에 작성한 3가지 기능을 한번에 해주는 툴이 존대한다.

- 데모 사이트
  [https://demo.saleor.io/graphql/](https://demo.saleor.io/graphql/)

- 기존의 Rest API 에서의 Postman + Swagger + Schema 를 합쳐 놓았다고 보면 편하다.

<br />

## GraphQL 의 단점

- 아무리 GraphQL 이라도 장점만 존재 하지 않는다. 그러면 단점을 한번 알아보고 어떻게 대처 할수 있을지 알아보자.

- 1. HTTP 캐싱 사용 불가능
  - GraphQL 은 엔드 포인트가 1개 이다. 그렇기 때문에 HTTP 에서 제공 되는 캐싱이 사용 불가능 하다.
  - 하지만 GraphQL 의 Apollo 사의 Apollo Engine 에서 자체 적으로 캐시를 제공 하기 떄문에 이점을 활용하면 된다.
    <br/>
- 2. 파일업로드

  - 기존에는 GraphQL 에서 Query 를 전송하고 Json 만 리턴 받았기 떄문에 파일 업로드가 불가능 했었다.
  - 이점은 GraphQL 버전이 올라감으로써 외부 라이브러리를 사용하다가 자체적으로 해결이 되었다.
    <br/>

- 3. 재귀적 쿼리

  - GraphQL 의 스키마를 잘못 짜거나 잘못 요청하다보면 재귀적으로 쿼리를 요청하게 되는 경우가 있다.
  - 이럴경우 백엔드 서버쪽에서의 부하 및 안좋은 결과가 초래 되기 마련이다.
  - 이부분은 코딩 적으로 재귀적 쿼리를 막거나 외부 라이브러리를 사용하여 해결을 해야한다.
    <br/>

- 4. Response 가 JSON만 지원한다.

  - HTTP 에서의 엑셀다운로드 등 여러기능이 불가능하다.
  - 이점은 아직 해결이 안된 부분으로 알고있다.
    <br/>

- 5. 표준이 없다.
  - 실질적으로 Rest API 처럼 표준이 없다.
  - 그렇기 때문에 코딩을 하는데 있어서 고민 하는 시간이 늘어 나는것 같은 느낌이 들었다.

## Reference

- [https://www.holaxprogramming.com/2018/01/20/graphql-vs-restful-api/](https://www.holaxprogramming.com/2018/01/20/graphql-vs-restful-api/)

- [https://tech.kakao.com/2019/08/01/graphql-basic/](https://tech.kakao.com/2019/08/01/graphql-basic/)
