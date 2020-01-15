/**
 * Name day
 */ 

const outputEl = document.querySelector('#output');

// empty strings
const emptyStrings = (where) => {
    document.querySelector(where).value= ""; 
};

// error message
const renderErrorMessage = (msg) => {
    outputEl.innerHTML = `<div class="alert alert-warning" role="alert">${msg}</div>`;
};

// name
const renderCurrentNameday = (data) => {
    data.results.map(result => { 
        outputEl.innerHTML = `<p>${result.name} has nameday ${result.day}/${result.month}.</p>`;
    })
};

// date
const renderNamesOnCurrentNameday = (date) => {
    date.data.map(result => {
        outputEl.innerHTML = `<p>${result.namedays.se} has nameday ${result.dates.day}/${result.dates.month}.</p>`;
    })
};

// click-handler
document.querySelector('#search-form').addEventListener('click', e => {
    if (e.target.tagName !== "BUTTON") {
        return;
    }

    if (e.target.id === 'name-button') {
        const name = document.querySelector('#name-query').value;

        getNamedayByName(name).then(data => {
            if (data.results.length > 0) {
                renderCurrentNameday(data);
            } else {
                renderErrorMessage('Please choose another name!');
            }
        }) 
        .catch(err => {
            renderErrorMessage('Something went wrong, please try again!', err); 
        });
    } else if (e.target.id === 'date-button') {
        const month = document.querySelector('#month-select').value;
        const day = document.querySelector('#day-select').value;

        getNamedayByDate(month, day).then(date => {
            renderNamesOnCurrentNameday(date);
        })
        .catch(err => {
            renderErrorMessage('Something went wrong, please try again!', err); 
        });
    }
    emptyStrings('#name-query');
    emptyStrings('#month-select');
    emptyStrings('#day-select');
    emptyStrings('#output');
});