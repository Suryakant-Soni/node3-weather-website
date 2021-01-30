

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
    const dynamicAddress = '/weather?address=' + place_name ;
    console.log(dynamicAddress);
    fetch(dynamicAddress).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                para1.textContent = data.error; 
            } else {
                console.log('New data is - ' + data);
                // para2.textContent = JSON.stringify(data);
                para1.textContent = 'At the Location ' + data.location  + ' on time ' + data.observation_time
                + ' the temprature is ' + data.temperature + ' and humidity is ' + data.humidity + '.' 
                para2.textContent  = ' Weather is ' + data.forecast + ' and Wind is blowing at the speed of ' +
                data.wind_speed + ' in direction ' + data.wind_dir + ' at the degree of ' + data.wind_degree;
            }
            console.log(data);
        });
    });

});

