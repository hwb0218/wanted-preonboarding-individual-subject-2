# [Assignment] 솔라커넥트 개인과제
### `Todo List`

### 🔗 [배포링크](https://solar-connect-70015c.netlify.app/)

## 📌 설치 및 시작

```shell
git clone https://github.com/hwb0218/wanted-preonboarding-individual-subject-2.git
cd wanted-preonboarding-individual-subject-2
npm install
npm start
```

## 📌 요구사항 기능 구현

- 화면에 현재 날짜 및 시간 표시
- Datepicker를 활용한 완료 목표일 설정 후 todo list 완료 목표일 출력  
- todo와 날짜 미입력 시 모달 출력  
- 완료하지 않은 todo 삭제 시 모달 출력
- 삭제 버튼 클릭 시 todo가 삭제되지 않는 버그 수정  
- 로컬스토리지 로드 데이터가 null일 경우 초깃값([]) 설정  
- todo의 id값 중복 수정

## 📌 추가 기능 구현

- todo text 또는 완료 목표일 수정 기능 추가  
  - edit 버튼 클릭 시 text 수정과 datepicker로 날짜 수정 기능 설정
  - X 버튼 클릭 시 초기 상태값으로 설정 
- 완료 목표일을 오늘 날짜부터 선택 활성화
