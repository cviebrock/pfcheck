
const fetch = require('cross-fetch');

const AVAILABILITY_URL = 'https://manitobavaxx.ca/apiV1/getAvailalibity';
const PFIZER_PREFIX = 'PF';
const NOT_AVAILABLE_TIME_STRING = 'N/A';

const IGNORE_LOCATIONS = ['Thompson','Dauphin'];

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
    if (!key.startsWith(PFIZER_PREFIX)) {
      continue;
    }
    if (value.startTime===NOT_AVAILABLE_TIME_STRING) {
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
    return IGNORE_LOCATIONS.indexOf(e.location) === -1;
  });
};

const showOutput = (data) => {
  if (data.length!==0) {
    console.log(data);
  }
};


postData(AVAILABILITY_URL)
  .then(parseData)
  .then(filterLocations)
  .then(showOutput);
