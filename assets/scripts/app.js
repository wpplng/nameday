/**
 * Name day
 */

// empty strings
const emptyStrings = (where) => {
    document.querySelector(where).value= ""; 
}

// error message
const renderErrorMessage = (msg) => {
    document.querySelector('#error-msg').innerHTML = 
        `<div class="alert alert-warning" role="alert">${msg}</div>`;
};

// name
const renderCurrentNameday = (data) => {
    data.results.map(result => { 
        document.querySelector('#output').innerHTML += `<p>${result.name} has nameday on ${result.day}/${result.month}.</p>`;
    })
    
    emptyStrings('#name-query');
};

// date
const renderNamesOnCurrentNameday = (data) => {
    data.data.map(result => {
        document.querySelector('#output').innerHTML = `<p> On ${result.dates.day}/${result.dates.month} ${result.namedays.se} has nameday.</p>`;
    })

    emptyStrings('#month-select');
    emptyStrings('#day-select');
};

// click-handler
document.querySelector('#search-form').addEventListener('click', e => {
    e.preventDefault(); // ev inte ha med det om click

    if (e.target.id === 'name-button') {
        emptyStrings('#output');

        document.querySelector('#error-msg').innerHTML = "";

        const name = document.querySelector('#name-query').value;

        getNamedayByName(name).then(data => {
            if (data.results.length > 0) {
                renderCurrentNameday(data);
            } else {
                renderErrorMessage('Please choose another name!');
            }
        }) 
        .catch(err => {
            renderErrorMessage(err); 
        });
    } else if (e.target.id === 'date-button') {
        emptyStrings('#output');

        document.querySelector('#error-msg').innerHTML = "";

        const month = document.querySelector('#month-select').value;
        const day = document.querySelector('#day-select').value;

        getNamedayByDate(month, day).then(data => {
            renderNamesOnCurrentNameday(data);
        })
        .catch(err => {
            renderErrorMessage('Something went wrong, please try again!', err); 
        });
    }
});
