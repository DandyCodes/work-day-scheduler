init();

function init() {
    $('#currentDay').text(moment().format('dddd, MMMM Do'));
    $('.save-button').click(saveTimeBlock);
    setColors();
    loadEvents();
}

function saveTimeBlock(clickEvent) {
    const timeBlock = clickEvent.target.closest('.time-block');
    const hourAmPmText = getTimeBlockHourAmPmText(timeBlock);
    const eventTextArea = getTimeBlockEventTextArea(timeBlock);
    localStorage.setItem(hourAmPmText, eventTextArea.value);
}

function getTimeBlockHourAmPmText(timeBlock) {
    return timeBlock.children[0].textContent;
}

function getTimeBlockEventTextArea(timeBlock) {
    return timeBlock.children[1];
}

function setColors() {
    Array.from($('.time-block')).forEach(timeBlock => {
        const hourAmPmText = getTimeBlockHourAmPmText(timeBlock);
        const hourTwentyFour = getHourTwentyFour(hourAmPmText);
        const tenseClass = getTimeBlockTenseClass(hourTwentyFour);
        timeBlock.classList.add(tenseClass);
    });
}

function getHourTwentyFour(hourAmPmText) {
    let hourTwentyFour = hourAmPmText.replace('am','').replace('pm','');
    hourTwentyFour = parseInt(hourTwentyFour);
    if (hourAmPmText.endsWith('pm') && !hourAmPmText.startsWith('12')) {
        hourTwentyFour += 12;
    }
    return hourTwentyFour;
}

function getTimeBlockTenseClass(hourTwentyFour) {
    let currentHourTwentyFour = moment().format('H');
    if (hourTwentyFour < currentHourTwentyFour) return 'past';
    if (hourTwentyFour == currentHourTwentyFour) return 'present';
    return 'future';
}

function loadEvents() {
    Array.from($('.time-block')).forEach(timeBlock => {
        const hourAmPmText = getTimeBlockHourAmPmText(timeBlock);
        const eventTextArea = getTimeBlockEventTextArea(timeBlock);
        eventTextArea.value = localStorage.getItem(hourAmPmText);
    });
}