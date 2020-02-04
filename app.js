const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

/* 색깔 가져오는 변수 */
const colors = document.getElementsByClassName("jsColor");

/* 캔버스에는 CSS와 직접 보는 화면의 사이즈를 구해야 한다. */
canvas.width = 600;
canvas.height = 600;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;


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
}

/* 마우스가 움직일 때, 클릭했을 때, 클릭을 뗐을 때, 캔버스에서 나갔을 때 */
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));