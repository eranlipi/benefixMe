import HttpService from './HttpService';

export default {
  query,
  getByTitle,
};

const endpoint = 'coupons';

async function query(filter, groupBy, distinctBy) {
  let params;
  if (filter) {
    params = {
      userId: filter.userId,
      at: filter.at,
      type: filter.type,
      tags: filter.tags,
    };
    if (filter.location) {
      params.city = filter.location.city;
      params.country = filter.location.country;
    }
  } else if (groupBy) {
    if (groupBy.meals) {
      params = {
        group: groupBy._id,
        meals: groupBy.meals.$push,
      };
    } else {
      params = {
        group: groupBy._id,
      };
    }
  } else if (distinctBy) {
    params = {
      distinct: distinctBy._id,
    };
  }
  const coupons = await HttpService.get(endpoint, filter, params);
  return coupons;
}

async function getByTitle(title) {
  console.log("getByTitle function ",title)
  // const coupons = await HttpService.get(`${endpoint}/TITLE=${title}`);
  // const coupons = await HttpService.get(endpoint, filter, params);
  // return coupons;
}

function getMealForRegistration(meal) {
    //this method gets a regular meal object
    //returns a new meal containing only the following occurrences:
    //dates that didn't already pass
    //occurrences which have more room left
  const newCoupons = { ...coupon }
  const now = Date.now()
  const newOccurrences = []
  newCoupons.occurrences.forEach(occurrence => {
    if (occurrence.total < newCoupons.capacity && occurrence.date > now) {
      newOccurrences.push(occurrence)
    }
  })
  newCoupons.occurrences = newOccurrences
  return newCoupons;
}