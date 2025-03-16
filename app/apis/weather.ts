const BASE_URL = 'http://192.168.35.178:8080/api';

export const WeekperWeather = async ({ ...location }) => {
  try {
    const request = await fetch(`${BASE_URL}/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });

    const response = await request.json();
    return response;
  } catch {
    console.error('WeekperWeather Error');
  }
};
