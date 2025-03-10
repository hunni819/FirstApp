const BASE_URL = 'http://localhost:8080/api';

export const WeekperWeather = async () => {
  try {
    const request = await fetch(`${BASE_URL}/weather`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    return response;
  } catch {
    console.error('WeekperWeather Error');
  }
};
