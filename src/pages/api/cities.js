import axios from 'axios';

export default async function handler(req, res) {
  const options = {
    method: 'POST',
    url: 'https://geodb-cities-graphql.p.rapidapi.com/',
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'x-rapidapi-host': 'geodb-cities-graphql.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      query: buildGraphQLQuery(req.query.sortingElement), // Build the GraphQL query
      variables: {
        sortingEle: req.query.sortingElement,
        sendingNext: req.query.lastElementCursorID,
        sendingPrev: req.query.firstElementCursorID
      },
    },
  };
  try {
    const response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in delivering cities:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
  }
}

function buildGraphQLQuery(sendingPrev, sendingNext) {
  let query = `
    query getCities($sortingEle: String!${sendingNext !== null ? ', $sendingNext: String' : ''}${sendingPrev !== null ? ', $sendingPrev: String' : ''}){
      populatedPlaces(
        countryIds: "FR",
        types: ["CITY"],
        minPopulation: 10000,
        first: 10,
        sort: $sortingEle
        ${sendingNext !== null ? ', after: $sendingNext' : ''}${sendingPrev !== null ? ', before: $sendingPrev' : ''}
      ) {
        edges {
          node {
            name
            population
            id
            elevationMeters
            timezone
            longitude
            latitude
            country {
              flagImageUri
            }
          }
          cursor
        }
      }
    }
  `;

  return query;
}
