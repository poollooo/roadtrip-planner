const router = require('express').Router();
const axios = require('axios');
const { getLocationId } = require('../middleware/getLocationId');

const optionsRestaurant = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/restaurants/list',
  params: {
    location_id: '',
    currency: 'USD',
    lunit: 'km',
    limit: '30',
    lang: 'en_US',
  },
  headers: {
    'X-RapidAPI-Key': process.env.XRapidAPIKey,
    'X-RapidAPI-Host': process.env.XRapidAPIHost,
  },
};

const optionsActivities = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/attractions/list',
  params: {
    location_id: '',
    currency: 'USD',
    lang: 'en_US',
    lunit: 'km',
    limit: '5',
    sort: 'recommended',
  },
  headers: {
    'X-RapidAPI-Key': process.env.XRapidAPIKey,
    'X-RapidAPI-Host': process.env.XRapidAPIHost,
  },
};

// the route is {baseUrl}/api/search/:citySearched

router.get('/:citySearched', getLocationId, async (req, res, next) => {
  try {
    optionsRestaurant.params.location_id = req.locationSearchedId;
    optionsActivities.params.location_id = req.locationSearchedId;
    let restaurantList;
    let activityList;

    await axios.request(optionsRestaurant)
      .then((response) => {
        restaurantList = response.data.data;
        restaurantList = restaurantList.map((restaurant) => ({
          location_id: restaurant.location_id,
          name: restaurant.name,
          description: restaurant.description,
          numberOfReviews: restaurant.num_reviews,
          photo: restaurant.photo,
          rawRating: restaurant.raw_ranking,
          ranking: restaurant.ranking,
          priceLevel: restaurant.price_level,
          priceRange: restaurant.price,
          tripAdvisorUrl: restaurant.web_url,
          category: restaurant.category,
          phone: restaurant.phone,
          website: restaurant.website,
          email: restaurant.email,
          address: restaurant.address,
          hours: restaurant.hours,
        }));
        // console.log(restaurantList);
      }).catch((error) => {
        console.error(error);
      });

    await axios.request(optionsActivities)
      .then((response) => {
        activityList = response.data.data;
        activityList = activityList.map((attr) => ({
          location_id: attr.location_id,
          name: attr.name,
          description: attr.description,
          numberOfReviews: attr.num_reviews,
          photo: attr.photo,
          rawRating: attr.raw_ranking,
          ranking: attr.ranking,
          priceLevel: attr.price_level,
          priceRange: attr.price,
          tripAdvisorUrl: attr.web_url,
          category: attr.category,
          phone: attr.phone,
          website: attr.website,
          email: attr.email,
          address: attr.address,
          hours: attr.hours,
        }));
        // console.log(restaurantList);
      }).catch((error) => {
        console.error(error);
      });
    console.log(restaurantList, activityList);
    res.status(200).json({ restaurantList, activityList });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
