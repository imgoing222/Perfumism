# Perfumism


: 37,000개의 향수 빅데이터를 기반으로 한 향수 추천 커뮤니티 서비스

## 기획 배경 
-   향수 시장 규모 해가 갈수록 증가    
-   코로나 장기화로 마스크가 필수품이 되면서 색조 화장이 감소한 틈을 타 향수가 개성을 표현하는 도구로 부각  
-   코로나로 인한 보복 소비 심리로 고가 프리미엄 향수인 니치 향수에 대한 수요 증가(희소한 향기를 통해 개성을 나타내려는 의도, 희소성이 있는 향에 대한 수요가 증가하는 추세)    
-   여러 브랜드의 향수 정보를 한눈에 볼 수 있는 국내 서비스 부재  
-   코로나로 인한 외출이나 시향 어려움으로 추천을 받을 수 있는 서비스 필요성 증가


## 프로젝트 진행 기간 
2022.02.21 ~ 2022.04.08

## 기술 및 아키텍쳐
- Frontend : Typescript, React, Redux, HTML/CSS
- Backend : Java, Spring Boot, Spring Data Jpa, Django
- deploy : Amazon EC2, Amazon S3, NGINX, Docker, node.js
- DB : mysql
- Git, Gitlab, Jira

[ERD](https://user-images.githubusercontent.com/97500667/173713460-386fda21-6c32-42e1-a317-329303a0e59f.png)
[Architecture](https://user-images.githubusercontent.com/97500667/173713380-510ce1f7-5882-46a2-8ffd-da82151d4866.png)





## 실행 방법

Frontend

```
$ cd frontend
$ npm install
# 로컬 서버 실행
$ npm start
```


Backend
```
$ cd backend
$ ./gradlew bootRun
```


## 기능

### 메인화면
![image-20220406160634958](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406160634958.png)
![image-20220406162426098](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406162426098.png)

- 알림 기능
![image-20220406161717956](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406161717956.png)


### 향수 추천 페이지
![image-20220406160711886](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406160711886.png)

![image-20220406160748408](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406160748408.png)
![image-20220406160839113](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406160839113.png)
- 두 가지 방법으로 향수 추천 기능 구현
- 결과 페이지에서 향기 취향을 워드 클라우드로 표시

### 향수목록 페이지
![image-20220406160949855](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406160949855.png)
- 무한스크롤 구현
- 상단 향수 어코드 필터를 통해 향수 필터링 기능 구현
- 오름차순 내림차순 트렌딩과 같은 조회 옵션 구현
- 향수 사진 hover 시 좋아요 버튼 렌더링


### 향수 상세 페이지

- 향수 상세 정보 출력 
![image-20220406161155443](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406161155443.png)

 - 해당 향수와 비슷한 향수 및 동일 브랜드 향수 추천![image-20220406161207991](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406161207991.png)

- 평점 및 리뷰 작성 기능 구현


### 커뮤니티
![](https://cdn.discordapp.com/attachments/943581833243815966/961547776729165834/unknown.png)
- 말머리를 통한 필터링 기능 구현

![image-20220406161430195](https://github.com/jin0106/Perfumism/raw/master/README.assets/image-20220406161430195.png)
- 멀티 이미지 업로드 구현
- 글, 댓글, 대댓글 작성, 조회, 수정, 삭제 기능 구현


## 빅데이터 추천 알고리즘

-   컨텐츠 기반 필터링 (content based filtering)
    -   특정 아이템과 비슷한 컨텐츠를 가진 다른 아이템을 추천 해주는 방식
-   협업 필터링 (collaborative filtering)
    -   사용자의 행동양식 기반으로 예측하여 아이템을 추천해주는 방식

**=> 초기 사용자 데이터(사용자의 행동양식)가 없기 때문에 컨텐츠 기반 필터링을 선택하여 사용**

  **초기 추천 시스템**

-   설문 및 좋아요 기반 사용자가 선호하는 향기 추출
-   추출한 데이터를 향수 37,000개 데이터와 함께 코사인 유사도 계산
-   가장 유사한 향수 데이터 추출

=> 37,000개 데이터를 한 번에 코사인 유사도 계산할 경우 평균 **300~360초 정도 소요**

=> 실시간으로 서비스를 제공하기에 부적합

**해결 방법**

-   코사인 유사도 계산 시간을 측정하기 위해 테스트 실시
-   데이터가 300개일 때 0.25s
-   500: 0.32s, 5000: 2.1s, 10000: 7.5s, 15000: 16s (데이터 수 : 계산 시간)
-   데이터 수가 증가할수록 기하급수적으로 계산시간이 증가함

=> 향수 데이터를 한 번에 계산하지 말고 사전에 유사한 향수끼리 **군집화**를 학습시키자 !

=> 머신러닝 알고리즘 도입


**최종 추천 시스템**
-   37,000개 향수 데이터 DBSCAN을 활용하여 군집화
-   설문 및 좋아요 기반 사용자 선호하는 향기 추출
-   추출한 데이터가 어떤 군집에 속하는지 탐색
-   해당 군집의 향수 데이터와 코사인 유사도 계산
-   가장 유사한 향수 데이터 추출

**=> 5초 이내에 추천 결과 확인 가능**

## Git Convention

### Commit Type
```
$ git commit -m [#'이슈번호'] 타입 : 작업 설명 
```


|git status| 의미 |
|--|--|
| feat| 새로운 기능 추가 |
| refactor| 코드 리팩토링 |
| style| 스타일 작업 |
| fix | 버그 수정 |
| docs| 문서 수정 |
| chore|빌드 업무 수정, 패키지 매니저 수정  |






## 팀원

- 권연주 (BE, Data)
- 박예정 (FE)
- 방기진 (FE, Data)
- 우동진 (FE)
- 우상준 (BE, Deployment)
- 이승기 (BE)
