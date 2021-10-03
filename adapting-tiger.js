const EXHALE = 0;
const INHALE = 1;

const HOLD = false;

$(document).ready(function () {
    window.time = 3000;
    window.state = INHALE;
    updateLabel();
    setNext();
});

function toggleState() {
    window.state = window.state == EXHALE ? INHALE : EXHALE;
}

function updateLabel() {
    let decimals = 1;
    $('.time-label').text(Math.round((Math.pow(10, decimals) * (window.time * 3)) / 1000) / Math.pow(10, decimals));
}

function increaseTime() {
    window.time += 700;
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
