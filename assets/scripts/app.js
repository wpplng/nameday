/**
 * Name day
 */ 

// empty strings
const emptyStrings = (where) => {
    document.querySelector(where).value= ""; 
}

// error message
const renderErrorMessage = (msg) => {
    document.querySelector('#output').innerHTML = `<div class="alert alert-warning" role="alert">${msg}</div>`;
};

// name
const renderCurrentNameday = (data) => {
    data.results.map(result => { 
        document.querySelector('#output').innerHTML = `<p>${result.name} has nameday ${result.day}/${result.month}.</p>`;
    })
};

// date
const renderNamesOnCurrentNameday = (date) => {
    date.data.map(result => {
        document.querySelector('#output').innerHTML = `<p>${result.namedays.se} has nameday ${result.dates.day}/${result.dates.month}.</p>`;
    })

    emptyStrings('#month-select');
    emptyStrings('#day-select');
};

// click-handler
document.querySelector('#search-form').addEventListener('click', e => {
    e.preventDefault();

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
    emptyStrings('#output');
});
