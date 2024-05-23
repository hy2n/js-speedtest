# JsSpeedTest

간단한 백엔드 서버로 측정하는 클라이언트 사이드 속도 측정 코드입니다.
Internet Speed Test With Client Side JS.

Performance API와 Fetch API를 활용하여 네트워크 성능을 평가하고 사용자에게 실시간으로 테스트 결과를 제공합니다. 
사용자는 다양한 파일 크기를 다운로드하여 네트워크 속도를 측정할 수 있으며, 테스트가 완료되면 평균 다운로드 속도와 전체 연결 품질을 평가하여 표시합니다. 

온라인 서버 : https://speed.nanu.cc

**사용기술**

- JavaScript
- Performance API
- Fetch API
- HTML
- CSS

**기능**

- 다양한 파일 크기를 다운로드하여 네트워크 속도 측정
- 실시간 테스트 결과 표시
- 평균 다운로드 속도 및 전체 연결 품질 평가 제공

**코드 구성**

- pingServer(): 서버와의 소요 시간을 측정하여 반환
- startSpeedTest(): 테스트 시작 및 다운로드 테스트 실행
- downloadFile(url, fileSize): 주어진 URL에서 파일 다운로드 및 속도 측정
- showStartButton(): 시작 버튼 표시 및 테스트 종료 처리
- calculateFinalResult(): 최종 다운로드 속도 평균 계산 및 연결 품질 평가 표시

**사용 방법**

1. **Start Speed Test** 버튼 클릭하여 테스트 시작
2. 개별 파일 다운로드 및 테스트 결과 실시간 확인
3. 테스트 완료 후 최종 평가 및 결과 확인

**참고 사항**

- 모던 브라우저의 Fetch API 및 Performance API를 지원합니다.
- 네트워크 속도 및 테스트 결과는 다양한 요인에 따라 달라질 수 있습니다.
- 테스트 예제로, 정확하지 않을 수 있습니다.
