const startBtn = document.getElementById('startBtn');
const quizArea = document.getElementById('quizArea');
const reactionArea = document.getElementById('reactionArea');
const questionElem = document.getElementById('question');
const answerBtns = document.querySelectorAll('.answerBtn');
const reactionBtn = document.getElementById('reactionBtn');
const scoreElem = document.getElementById('score');
const roundElem = document.getElementById('round');
const instructionElem = document.getElementById('instruction');

let score = 0;
let round = 1;
const totalRounds = 15;
let currentTestType = 'quiz';
let reactionStartTime;

const questions = [
    // 퀴즈 질문
    { question: "경찰의 주요 업무는 무엇인가요?", answers: ["범죄 예방", "음식 제공", "교통 통제", "문화 행사 지원"], correct: 0 },
    { question: "경찰관이 사용하는 장비는 무엇인가요?", answers: ["무전기", "가방", "노트북", "라디오"], correct: 0 },
    { question: "범죄 발생 시 경찰이 해야 할 첫 번째 행동은 무엇인가요?", answers: ["상황 확인", "범죄자를 체포", "경찰서로 이동", "기록 작성"], correct: 0 },
    { question: "경찰관의 주요 역할 중 하나는 무엇인가요?", answers: ["시민과의 소통", "범죄 수사", "행사 기획", "정책 결정"], correct: 1 },
    { question: "범죄 현장에서 경찰이 우선적으로 해야 할 일은 무엇인가요?", answers: ["증거 수집", "상황 파악", "범인 추적", "보고서 작성"], correct: 1 },
    { question: "경찰관이 범인을 체포할 때 가장 중요한 것은 무엇인가요?", answers: ["범인의 신원 확인", "범인의 체포", "범인의 무기 확보", "범인의 범죄 기록 확인"], correct: 1 },
    { question: "경찰관이 사용하는 주요 장비 중 하나는 무엇인가요?", answers: ["무전기", "지팡이", "헬멧", "경광등"], correct: 0 },
    { question: "경찰이 교통사고 현장에서 해야 할 첫 번째 일은 무엇인가요?", answers: ["사고 기록", "부상자 치료", "사고 현장 정리", "사고 원인 조사"], correct: 2 },
    { question: "경찰관이 긴급 상황에서 우선적으로 해야 할 일은 무엇인가요?", answers: ["현장 통제", "상황 보고", "피해자 구조", "범인 추적"], correct: 0 },
    
    // 문제 해결
    { question: "경찰관이 교통사고를 목격했을 때의 행동은 무엇인가요?", answers: ["사고 현장을 떠난다", "상황을 기록하고 경찰서에 신고한다", "사고를 다른 사람에게 맡긴다", "사고에 대한 증거를 수집한다"], correct: 1 },
    { question: "도난 신고를 받은 경찰관이 먼저 해야 할 일은 무엇인가요?", answers: ["범인을 찾는다", "도난된 물건을 찾아본다", "신고자의 신원을 확인한다", "사건을 기록한다"], correct: 2 },
    { question: "범죄 현장에서 증거를 수집하기 전 경찰관이 해야 할 첫 번째 일은 무엇인가요?", answers: ["사건을 조사한다", "현장을 확보하고 방해 요소를 제거한다", "증거를 수집한다", "범죄자를 체포한다"], correct: 1 },
    { question: "경찰관이 상황을 제어해야 하는 비상 사태에서 가장 중요한 것은 무엇인가요?", answers: ["상황 기록", "상황 분석 및 대응 계획 수립", "범인 추적", "피해자 구조"], correct: 1 },
    { question: "경찰관이 사건을 조사할 때 가장 먼저 해야 할 일은 무엇인가요?", answers: ["증거 수집", "목격자 인터뷰", "현장 검토", "보고서 작성"], correct: 2 },
    { question: "경찰관이 범죄를 예방하기 위해 할 수 있는 행동은 무엇인가요?", answers: ["순찰 강화", "범죄 조사", "법원에 보고", "범죄자 추적"], correct: 0 },
    { question: "경찰이 의심스러운 물건을 발견했을 때 가장 먼저 해야 할 일은 무엇인가요?", answers: ["물건을 조사한다", "현장 기록을 작성한다", "의심자를 추적한다", "상황을 상급자에게 보고한다"], correct: 3 },
    
    // 반응 속도 테스트
    { question: "다음 버튼을 가능한 빨리 클릭하세요!", correct: null },
    { question: "이 버튼이 나타나면 클릭하세요!", correct: null },
    { question: "반응 속도를 테스트합니다. 클릭하세요!", correct: null },
    { question: "이제 버튼을 클릭할 준비가 되었나요?", correct: null },
    { question: "클릭 준비 완료! 버튼을 클릭하세요!", correct: null },
];

function startGame() {
    instructionElem.classList.add('hidden');
    startBtn.classList.add('hidden');
    quizArea.classList.remove('hidden');
    nextRound();
}

function nextRound() {
    if (round > totalRounds) {
        endGame();
        return;
    }

    if (round <= 12) {
        currentTestType = 'quiz';
        const question = questions[round - 1];
        questionElem.textContent = question.question;
        answerBtns.forEach((btn, index) => {
            btn.textContent = question.answers[index] || "";
            btn.onclick = () => checkAnswer(index, question.correct);
        });
        quizArea.classList.remove('hidden');
        reactionArea.classList.add('hidden');
    } else {
        currentTestType = 'reaction';
        reactionArea.classList.remove('hidden');
        quizArea.classList.add('hidden');
        setTimeout(() => {
            reactionStartTime = Date.now();
            reactionBtn.textContent = '클릭!';
        }, Math.random() * 2000 + 1000); // 1~3초 후 버튼 나타남
    }
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
    } else {
        score -= 5;
    }
    scoreElem.textContent = `점수: ${score}`;
    round++;
    roundElem.textContent = `라운드: ${round}`;
    nextRound();
}

function checkReaction() {
    const reactionTime = Date.now() - reactionStartTime;
    if (reactionTime < 1000) { // 1초 이내 클릭
        score += 15;
    } else {
        score -= 5;
    }
    scoreElem.textContent = `점수: ${score}`;
    round++;
    roundElem.textContent = `라운드: ${round}`;
    nextRound();
}

function endGame() {
    quizArea.classList.add('hidden');
    reactionArea.classList.add('hidden');
    instructionElem.textContent = `게임 종료! 최종 점수: ${score}`;
    instructionElem.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    startBtn.textContent = '다시 시작하기';
    startBtn.onclick = () => location.reload();
}

startBtn.onclick = startGame;
reactionBtn.onclick = checkReaction;
