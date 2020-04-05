//Selecting the classes or tags from HTML.
let searchInput = document.querySelector('.search');
let suggestions = document.querySelector('.suggestions');
let endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let citySearch = [];

//Getting data using the fetch method.
testing = fetch(endpoint).then(response => response.json()).then(data => citySearch.push(...data));

function findMatch (searchWord, citySearch) {
    return citySearch.filter(filterCities => {
        let regex = new RegExp(searchWord, 'gi');
        return filterCities.city.match(regex) || filterCities.state.match(regex);
    })
}

function displayData () {
    let newArray = findMatch(this.value, citySearch);
    let suggest = newArray.map(place => {
        let newregex = new RegExp (this.value, 'gi');
        let cityName = place.city.replace(newregex, `<span class="hl">${this.value}</span>`) //replacing regex with span containing the class of hl;
        let stateName = place.state.replace(newregex, `<span class="hl">${this.value}</span>`);
        return `<li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${place.population}</span>
            </li>`
    }).join('');
    suggestions.innerHTML = suggest;
}

//Event Listener.
searchInput.addEventListener('change', displayData);
searchInput.addEventListener('keyup', displayData);