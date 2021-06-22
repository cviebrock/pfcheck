
const fetch = require('cross-fetch');

const AVAILABILITY_URL = 'https://manitobavaxx.ca/apiV1/getAvailalibity';

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Accept': 'application/json'
    },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
};

const parseData = (data = {}) => {
  const locations = [];
  for (const [key, value] of Object.entries(data)) {
    if (!key.startsWith('PF')) {
      continue;
    }
    if (value.startTime==="N/A") {
      continue;
    }
    const location = key.substr(2);
    const date = new Date(value.startTime).toLocaleString('en-CA', {tiemZone: 'America/Winnipeg'});

    locations.push({location,date});
  }

  return locations;
}

const filterLocations = (data) => {
  return data.filter(e => {
    return e.location !== 'Thompson'
      && e.location !== 'Dauphin';
    });
};

postData(AVAILABILITY_URL)
  .then(parseData)
  .then(filterLocations)
  .then(console.log);
