import axios from 'axios';
export default async function handler(req, res) {
    const options = {
      method: 'POST',
      url: 'https://geodb-cities-graphql.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'geodb-cities-graphql.p.rapidapi.com',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      },
      data: {
        query: `
          query getCountry($prefix: String!) {
            countries(namePrefix: $prefix) {
              edges {
                node {
                  name
                  capital
                  flagImageUri
                  currencyCodes
                }
              }
            }
          }`,
        variables: {
          prefix: req.query.countryName,
        },
      },
    };
  
    try {
      const response = await axios(options);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
    }
  }
  