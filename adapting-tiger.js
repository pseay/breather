const EXHALE = 0;
const INHALE = 1;

const HOLD = false;

$(document).ready(function () {
    window.time = 3000;
    window.state = INHALE;
    window.paused = false;
    updateLabel();
    setNext();
});

$(document).click(function () {
    window.paused = !window.paused;
    updateLabel();
});

function toggleState() {
    window.state = window.state == EXHALE ? INHALE : EXHALE;
}

function updateLabel() {
    let decimals = 1;
    let p = window.paused ? 'paused: ' : '';
    $('.time-label').text(p + Math.round((Math.pow(10, decimals) * (window.time * 3)) / 1000) / Math.pow(10, decimals));
}

function increaseTime() {
    if (paused) return;
    window.time += 1000;
    updateLabel();
}

function setNext() {
    let { state, time } = window;
    time *= state == EXHALE ? 2 : 1;
    let attrs = state == EXHALE ? { height: '100%' } : { height: '0%' };
    $('.breath').animate(attrs, time, 'linear', function () {
        // just finished state
        if (state == EXHALE) {
            toggleState();
            increaseTime();
            setTimeout(setNext, 0);
        } else if (state == INHALE) {
            toggleState();
            setTimeout(setNext, HOLD ? time : 0);
        }
    });
}
