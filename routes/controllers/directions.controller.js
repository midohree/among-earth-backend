const axios = require('axios');

const { GOOGLE } = require('../../configs/constants');
const { googleOptions } = require('../../configs');

const getNearestPlaces = async (req, res, next) => {
  const { lat, lng, id } = req.query;
  const bounds = 500;

  try {
    const response = await axios.get(`${GOOGLE.defaultUrl}&location=${lat},${lng}&radius=${bounds}&key=${googleOptions.key}`);
    const results = response.data.results;

    for (let i = 0; i < results.length; i++) {
      const { place_id } = results[i];

      if (place_id === id) results.splice(i, 1);
    }

    const recommends = results.splice(0, 6);

    return res.status(200).json(recommends);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNearestPlaces,
};
