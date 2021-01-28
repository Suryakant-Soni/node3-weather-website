

//get the form element from HTML-DOM
const weatherForm = document.querySelector('form');
// get the input element
const place = document.querySelector('input');
// get the first para element
const para1 = document.querySelector('#message-1');
const para2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    // set para1 to loading after submit is done
    para1.textContent = 'Data is loading...';
    para2.textContent = '';
    event.preventDefault();
    // use fetch api to get details
    const place_name = place.value;
    const dynamicAddress = 'http://localhost:3000/weather?address=' + place_name ;
    console.log(dynamicAddress);
    fetch(dynamicAddress).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                para1.textContent = data.error; 
            } else {
                // para2.textContent = JSON.stringify(data);
                para1.textContent = 'Locations is - ' + data.location;
                para2.textContent  = 'Weather details - ' + data.forecast;
            }
            console.log(data);
        });
    });

});

