init();

function init() {
    $('#current-day').text(moment().format('dddd, MMMM Do'));
    $('.save-button').click(saveTimeBlock);
    setColors();
    loadEvents();
}

function saveTimeBlock(clickEvent) {
    const timeBlock = clickEvent.target.closest('.time-block');
    const hourAmPmText = getHourAmPmText(timeBlock);
    const eventTextArea = getEventTextArea(timeBlock);
    localStorage.setItem(hourAmPmText, eventTextArea.value);
}

function getHourAmPmText(timeBlock) {
    return timeBlock.children[0].textContent;
}

function getEventTextArea(timeBlock) {
    return timeBlock.children[1];
}

function setColors() {
    Array.from($('.time-block')).forEach(timeBlock => {
        const hourAmPmText = getHourAmPmText(timeBlock);
        const hourTwentyFour = getHourTwentyFour(hourAmPmText);
        const tenseClass = getTimeBlockTenseClass(hourTwentyFour);
        const eventTextArea = getEventTextArea(timeBlock);
        eventTextArea.classList.add(tenseClass);
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
    const currentHourTwentyFour = moment().format('H');
    if (hourTwentyFour < currentHourTwentyFour) return 'past';
    if (hourTwentyFour == currentHourTwentyFour) return 'present';
    return 'future';
}

function loadEvents() {
    Array.from($('.time-block')).forEach(timeBlock => {
        const hourAmPmText = getHourAmPmText(timeBlock);
        const eventTextArea = getEventTextArea(timeBlock);
        eventTextArea.value = localStorage.getItem(hourAmPmText);
    });
}