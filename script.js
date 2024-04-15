const apiKey = '5ec0f5106e174587a79220729241104';
const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

function buscarPrevisao() {
  
    const cidade = document.querySelector('.search-button').value;
    const url = `${baseUrl}?key=${apiKey}&q=${cidade}&days=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperaturaAtual = data.current.temp_c;
            const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
            const minTemp = data.forecast.forecastday[0].day.mintemp_c;
            const condicaoTempo = data.current.condition.text;
            const sensacaoTermica = data.current.feelslike_c;
            const velocidadeVento = data.current.wind_kph;
            
            document.querySelector('.nome_cidade').innerHTML = `<i style="color: yellow" class="fa-solid fa-location-dot"></i> ${cidade}`;
            document.querySelector('.dia_mes').innerHTML = data.forecast.forecastday[0].date;
            document.querySelector('.imagem').src = `https:${data.current.condition.icon}`;
            document.querySelector('.temperatura').innerHTML = `${temperaturaAtual}°C`;
            document.querySelector('.max_e_min').innerHTML = `<i class="fa-solid fa-chevron-down"></i> ${minTemp}°C <i class="fa-solid fa-chevron-up"></i> ${maxTemp}°C`;
            document.querySelector('.parcialidade').innerHTML = condicaoTempo;
            document.querySelector('.Feels_Like').innerHTML = `Feels Like ${sensacaoTermica}°C`;
            document.querySelector('.wind').innerHTML = `Wind: ${velocidadeVento} km/h`;

            const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
            const today = new Date();
            const dayOfWeek = daysOfWeek[today.getDay()];
            document.querySelector('.dia_semana').innerHTML = dayOfWeek;
        })
        .catch(error => {
            console.error('Erro ao buscar a previsão do tempo:', error);
        });
}

document.querySelector('button').addEventListener('click', buscarPrevisao);
