// 전역변수
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

/* 색깔 가져오는 변수 */
const colors = document.getElementsByClassName("jsColor");

/* 선 굵기 정하는 미터기 가져오는 변수 */
const range = document.getElementById("jsRange");

/* 그리기, 채우기 모드 변경하기 위해 가져오는 버튼 변수 */
const mode = document.getElementById("jsMode");

/* 기본 색, 기본 사이즈 */
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

/* 캔버스에는 CSS와 직접 보는 화면의 사이즈를 구해야 한다. */
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/* 기본 선 스타일(색깔), 기본 선 굵기 */
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

/* 아무때나 그려서는, 채워서는 안되기 때문에 기본값은 False */
let painting = false;
let filling = false;

/* 그림을 멈춤, 시작 */
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

/* X, Y값을 클라이언트, 웹페이지, 오프셋 내로 받는 것을 오프셋만 받도록 수정 */
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    /* 마우스를 움직이는 동안 계속해서 작은 라인을 그려내는 방식 */
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

/* 클릭했을 때 색깔을 지정 (클릭해서 찾은 스타일 내에서 배경색을 찾아 덮어씌움) */
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    /* 또는 상단에 지정해놓은 기본값 변수 */
}

/* 마우스가 움직일 때, 클릭했을 때, 클릭을 뗐을 때, 캔버스에서 나갔을 때 */
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

Array
    .from(colors)
    .forEach(color => color.addEventListener("click", handleColorClick));

/* Target 안의 value 값으로 굵기 지정 */
/* HTML의 steps로 0.1씩 달라짐 */
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

/* 미터기 값 변경 인식 */
if (range) {
    range.addEventListener("input", handleRangeChange);
}

/* 만약 그리기/채우기 버튼을 눌렀을 때 채우기 모드가 참일 경우 거짓으로, 텍스트를 채우기로 변경 (반대의 경우도 포함) */
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

/* 그리기, 채우기 모드 버튼 클릭 인식 */
if (mode) {
    mode.addEventListener("click", handleModeClick);
}