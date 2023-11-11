import axios from 'axios';

export default async function handler(req, res){
    const options = {
        method: 'POST',
        url: 'https://geodb-cities-graphql.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': 'geodb-cities-graphql.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
            query: `
            query getDistances($place1: ID!, $place2: ID! ){
                distanceBetween(fromPlaceId: $place1, toPlaceId: $place2, distanceUnit: KM)
              }
          `,     
          variables: {
            place1: req.query.firstElement,
            place2: req.query.secondElement,
          },   
        }
      };
      
      try {
        const response = await axios(options);
        res.status(200).json(response.data);
      } catch (error) {
        console.error('Error in delivering cities:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
      }
    }
