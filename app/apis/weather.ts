import { LocationType } from '../types/location';

// const BASE_URL = 'http://localhost:8080/api';

// export const WeekperWeather = async ({
//   location,
// }: {
//   location: LocationType;
// }) => {
//   try {
//     const request = await fetch(`${BASE_URL}/weather`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(location),
//     });

//     console.log(request);
//     const response = await request.json();
//     return response;
//   } catch {
//     console.error('WeekperWeather Error');
//   }
// };

// const getWeather = async () => {
//     const result = await WeekperWeather({ location });
//     console.log(result);
//   };
