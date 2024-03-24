
function pingServer() {
    var infoBox = document.getElementById('infoBox');
    // Performance API를 사용하여 네트워크 성능 정보 가져오기
    var performanceData = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
    var testPing = performanceData.timing.responseEnd - performanceData.timing.requestStart;
    return testPing;
}

var toggle_status = true; // 추가된 변수

function startSpeedTest() {


    var goButton = document.getElementById('goButton');
    var startButton = document.getElementById('startButton');
    var loadingDiv = document.getElementById('loading');
    var resultsDiv = document.getElementById('results');

    goButton.style.display = 'none';
    startButton.style.display = 'none';
    loadingDiv.style.display = 'block';

    goButton.style.cursor = 'not-allowed';
    goButton.onclick = null;

    var country = '<?php echo $_SERVER["HTTP_CF_IPCOUNTRY"]; ?>';

    var currentDate = new Date();
    var testTime = currentDate.toLocaleTimeString();
    var testDate = currentDate.toLocaleDateString();
    var testPing = pingServer();
    var infoBox = document.createElement('div');
    infoBox.classList.add('test-box', 'info');
    infoBox.innerHTML = `<br><div class="icon"><i class="fas fa-info-circle"></i> 테스트 정보<br> 국가: ${country}, ${testDate} ${testTime}<br>지연 : ${testPing}ms</div>`;
    resultsDiv.appendChild(infoBox);

    downloadFile('https://speed.nanu.cc/api/speed_ping/100KB.pdf', '100KB');
    downloadFile('https://speed.nanu.cc/api/speed_ping/260KB.pdf', '260KB');
    downloadFile('https://speed.nanu.cc/api/speed_ping/500KB.pdf', '500KB');
    downloadFile('https://speed.nanu.cc/api/speed_ping/1MB.pdf', '1MB');
    downloadFile('https://speed.nanu.cc/api/speed_ping/10.5MB.pdf', '10.5MB');
    downloadFile('https://speed.nanu.cc/api/speed_ping/20MB.pdf', '20MB');
}

function downloadFile(url, fileSize) {
    var cacheBuster = new Date().getTime();
    var cacheBustedUrl = url + '?cache=' + cacheBuster;

    var startTime = performance.now();

    if (!toggle_status) return; // 이미 마무리 메시지가 출력되었으면 중단

    fetch(cacheBustedUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 정상이 아닙니다');
            }
            return response.blob();
        })
        .then(blob => {
            var endTime = performance.now();
            var downloadTime = (endTime - startTime) / 1000; // 초
            var downloadSpeedMbps = (blob.size * 8) / (downloadTime * 1024 * 1024); // Mbps
            var delayTime = downloadTime * 1000; // ms

            var resultsDiv = document.getElementById('results');
            var testBox = document.createElement('div');
            testBox.classList.add('test-box');

            var icon = document.createElement('div');
            icon.classList.add('icon');
            icon.innerHTML = `<i class="fas fa-check-circle success"></i> ${fileSize} 다운로드 테스트`;
            if (delayTime > 14000) {
                showStartButton();
            } else if (downloadSpeedMbps <= 0.2) {
                showStartButton();
            }

            testBox.appendChild(icon);
            testBox.innerHTML += '<div></div>';

            testBox.innerHTML += `<div>다운로드 속도: <strong>${downloadSpeedMbps.toFixed(2)} Mbps</strong></div>`;
            testBox.innerHTML += `<div>소요시간: ${delayTime.toFixed(2)} ms</div>`;
            resultsDiv.appendChild(testBox);

            if (fileSize === '20MB') {
                showStartButton();
            }
        })
        .catch(error => {
            console.error('다운로드 실패:', error);
            if (!toggle_status) {
                window.stop();
                return;
            }
            var resultsDiv = document.getElementById('results');
            var testBox = document.createElement('div');
            testBox.classList.add('test-box', 'warning');
            icon = document.createElement('div');
            icon.classList.add('icon');
            icon.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${fileSize} 다운로드 테스트`;
            testBox.appendChild(icon);
            testBox.innerHTML += '<div></div>';
            testBox.innerHTML += `<div>테스트 실패, 오류 발생</div>`;
            resultsDiv.appendChild(testBox);

            if (fileSize === '20MB') {
                showStartButton();
            }
        });
}

function showStartButton() {
    if (!toggle_status) {
        window.stop();
        return;
    }
    toggle_status = false;
    var startButton = document.getElementById('startButton');
    var loadingDiv = document.getElementById('loading');

    startButton.style.display = 'block';
    loadingDiv.style.display = 'none';

    window.stop();
    setTimeout(calculateFinalResult, 1000);
}

function calculateFinalResult() {
    var resultsDiv = document.getElementById('results');
    var testBoxes = resultsDiv.getElementsByClassName('test-box');
    var totalSpeed = 0;

    for (var i = 0; i < testBoxes.length; i++) {
        var testBox = testBoxes[i];
        var downloadSpeedElement = testBox.querySelector('strong');
        if (downloadSpeedElement) {
            var downloadSpeed = parseFloat(downloadSpeedElement.innerText);
            totalSpeed += downloadSpeed;
        }
    }

    var averageSpeed = totalSpeed / testBoxes.length;

    var finalResultBox = document.createElement('div');
    finalResultBox.classList.add('test-box', 'info');
    var icon = document.createElement('div');
    icon.classList.add('icon');

    if (averageSpeed >= 10) {
        icon.innerHTML = `<i class="fas fa-check-circle success"></i> 결과 : 매우 좋음`;
    } else if (averageSpeed >= 5) {
        icon.innerHTML = `<i class="fas fa-check-circle success"></i> 결과 : 좋음`;
    } else if (averageSpeed >= 1) {
        icon.innerHTML = `<i class="fas fa-check-circle success"></i> 결과 : 양호`;
    } else if (averageSpeed >= 0.3) {
        icon.innerHTML = `<i class="fas fa-exclamation-triangle warning"></i> 결과 : 느림`;
    } else {
        icon.innerHTML = `<i class="fas fa-check-circle success" style="color: #e74c3c;"></i> 결과 : 매우 느림`;
    }

    finalResultBox.appendChild(icon);
    finalResultBox.innerHTML += `<div>평균 다운로드 속도: <strong>${averageSpeed.toFixed(2)} Mbps</strong></div>`;
    resultsDiv.appendChild(finalResultBox);
}