init();

function init() {
    $('#currentDay').text(moment().format('dddd, MMMM Do'));
    $('.time-block .save-button').click(save);

    setColors();
    loadEvents();
}

function save(event) {
    
}

function setColors() {
    Array.from($('.time-block')).forEach(timeblock => {
        const timeText = timeblock.children[0].textContent;
        const hourTwentyFour = getTwentyFourHourTime(timeText);
        const tenseClass = getTenseClass(hourTwentyFour);
        timeblock.classList.add(tenseClass);
    });

    function getTwentyFourHourTime(timeText) {
        let twentyFourHourTime = timeText.replace('am','').replace('pm','');
        if (timeText.endsWith('pm')) {
            if(!timeText.startsWith('12')) {
                twentyFourHourTime += 12;
            }
        }
        return twentyFourHourTime;
    }
    function getTenseClass(twentyFourHourTime) {
        let currentTwentyFourHourTime = moment().format('H');
        currentTwentyFourHourTime = 15;
        if (twentyFourHourTime < currentTwentyFourHourTime) return 'past';
        if (twentyFourHourTime == currentTwentyFourHourTime) return 'present';
        return 'future';
    }
}

function loadEvents() {
    
}