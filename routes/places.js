const express = require('express');
const router = express.Router();
const University = require('../models/university');

/**
 * @api {post} /places Save a single place
 * @apiName PostPlaces
 * @apiGroup Places
 *
 * @apiParam {Number} latitude The place latitude.
 * @apiParam {Number} longitude The place longitude.
 * @apiParam {Number} radius The radius used for the search.
 * @apiParam {Object} university The university object.
 * @apiParam {String} university.name The university name.
 * @apiParam {String} university.vicinity The university address.
 * 
 * @apiParam {Number} latitude The place latitude.
 * @apiParam {Number} longitude The place longitude.
 * @apiParam {Number} radius The radius used for the search.
 * @apiParam {Object} university The university object.
 * @apiParam {String} university.name The university name.
 * @apiParam {String} university.vicinity The university address.
 * @apiParam {Object} device The device object.
 * @apiParam {String} device.name The device name.
 * @apiParam {String} device.type The device type.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "_id": "5a7fd748f8650152eaea0073",
 *     "latitude": 2.1,
 *     "longitude": 2.2,
 *     "browser": "PostmanRuntime/7.1.1",
 *     "university": {
 *         "name": "aaaaa",
 *         "vicinity": "bbb"
 *     },
 *     "device": {
 *         "type": "phone",
 *         "name": ""
 *     },
 *     "__v": 0
 * }
 */
router.post('/', function (req, res) {
  const {
    latitude,
    longitude,
    radius,
    university,
  } = req.body;

  University.create({
    latitude,
    longitude,
    radius,
    browser: req.headers['user-agent'],
    university,
    device: {
      type: req.device.type,
      name: req.device.name,
    },
  }, function (err, university) {
    if (err) return res.status(422);

    res.json(university);
  });
});

module.exports = router;
