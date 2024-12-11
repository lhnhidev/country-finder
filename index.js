const contentElement = document.querySelector('#content');

async function fetchData(nameCountry) {
    const url = 'https://restcountries.com/v3.1/name/' + nameCountry;
    const response = await fetch(url);
    if (!response.ok) {
        contentElement.innerHTML = `<p class="error">Không tìm thấy Quốc gia hoặc không có dữ liệu</p>`;
        // throw new Error('Country not found...');
    }
    else {
        const data = await response.json();
        return data;
    }
}

function buildDataListElement() {
    const dataListElement = document.querySelector('#countries');
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            let optionElements = data.map(e => {
                return `
                    <option value="${e.name.common}">
                `;
            });
            dataListElement.innerHTML = optionElements.join('');
        });
}

buildDataListElement();

const findButton = document.querySelector('#find');

async function renderCountry() {
    const inputValue = document.querySelector('#input').value.trim();
    let data = await fetchData(inputValue);
    if (data != undefined) {
        data = data[0];
        console.log(data.name.nativeName.vie);
        // <img src="${data.coatOfArms.png}" alt="" class="col-6 content__coat-of-arms">
        contentElement.innerHTML = `
            <h3 class="content__title">${data.name.nativeName[Object.keys(data.name.nativeName)[0]].official}</h3>
    
            <div class="content__img">
                <div class="row">
                    <img src="${data.flags.png}" alt="Image of country" class="col-6 content__flag">
    
                    </div>
                <p class="content__description">${data.flags.alt}</p>
            </div>
    
            <p class="content__capital bold-para">Thủ đô: <span class="normal-para">${data.capital}</span></p>
            <p class="content__population bold-para">Dân số: <span class="normal-para">${new Intl.NumberFormat('vi-VN').format(data.population)}</span></p>
            <p class="content__region bold-para">Châu lục: <span class="normal-para">${data.region}</span></p>
            <p class="content__timezone bold-para">Múi giờ: <span class="normal-para">${data.timezones[0]}</span></p>
            <p class="content__currencies bold-para">Đơn vị tiền tệ: <span class="normal-para">${data.currencies[Object.keys(data.currencies)[0]].name} (${data.currencies[Object.keys(data.currencies)[0]].symbol})</span></p>
    
            <p class="content__map bold-para" id="map">Bản đồ: <a target="_blank" href="${data.maps.googleMaps}" class="normal-para">Xem tại đây.</a></p>
        `;
    }
}

findButton.addEventListener('click', () => renderCountry());
document.querySelector('#input').addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        renderCountry();
    }
});