var fs = require('fs');
var moment = require('moment');
var util = require('util');
const corsPrefetch = require('cors-prefetch-middleware');
var { check, oneOf, validationResult } = require("express-validator");
var fs = require('fs');
const SellCarDetails = require("../models/SellCarDetails") ;

module.exports = function (app) {
  //app.use(corsPrefetch); 
  const insertCarDetailsValidation = [
    // check("carDetails.id")
    //   .not()
    //   .isEmpty()
    //   .withMessage("Please Enter id"),

    check("carDetails.maker")
      .not()
      .isEmpty()
      .withMessage("carDetails.Please Enter maker"),

    check("carDetails.model")
      .not()
      .isEmpty()
      .withMessage("Please Enter model"),

    check("carDetails.registrationNumber")
      .not()
      .isEmpty()
      .withMessage("Please Enter registrationNumber")
  ];

  const updateResultsValidation = [
    check("class")
      .not()
      .isEmpty()
      .withMessage("Please Enter class"),

    check("section")
      .not()
      .isEmpty()
      .withMessage("Please Enter section"),

  ];

  const updateClassValidation = oneOf([
    check("class")
      .not()
      .isEmpty()
      .withMessage("Please Enter class"),

    check("section")
      .not()
      .isEmpty()
      .withMessage("Please Enter section"),

  ],
    [
      check("class")
        .not()
        .isEmpty()
        .withMessage("Please Enter class"),

      check("sectionArray")
        .not()
        .isEmpty()
        .withMessage("Please Enter section array"),

    ]);

  /**
     * @description Post method for fetchAllCarDetails service
     */
  function fetchAllCarDetails(req, res) {

    console.log("CarDetailsDAO - fetchAllCarDetails ENTRY" + JSON.stringify(req.body));

    //Initial validation like fields empty check
    var errors = validationResult(req);

    //Mapping the value to the same object
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }

    CarDetails.find()
      .then(function (carDetails) {

        //console.log("CarDetailsDAO - fetchAllCarDetails - All Car details -  " + carDetails);

        res.send(carDetails);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  /**
     * @description Post method for fetchCarDetailsByFilters service
     */
  function fetchCarDetailsByFilters(req, res) {

    console.log("CarDetailsDAO - fetchCarDetailsByFilters ENTRY" + JSON.stringify(req.body));

    //Initial validation like fields empty check
    var errors = validationResult(req);

    //Mapping the value to the same object
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }

    var request = req.body;
    var fetchCarDetailsByFiltersJSON = {};

    if (request.city) {
      fetchCarDetailsByFiltersJSON.city = request.city;
    }
    if (request.maker && request.maker !== 'All') {
      fetchCarDetailsByFiltersJSON.maker = request.maker;
    }
    if (request.model && request.model !== 'All') {
      fetchCarDetailsByFiltersJSON.model = request.model;
    }

    var priceBetweenJSON = {};
    if (request.priceFrom && request.priceTo) {
      priceBetweenJSON = { $gte: request.priceFrom, $lte: request.priceTo }
      fetchCarDetailsByFiltersJSON.price = priceBetweenJSON;
    } else if (request.priceFrom) {
      priceBetweenJSON = { $gte: request.priceFrom, $lte: 99999999 };
      fetchCarDetailsByFiltersJSON.price = priceBetweenJSON;
    } else if (request.priceTo) {
      priceBetweenJSON = {$gte : 0, $lte : request.priceTo}
      fetchCarDetailsByFiltersJSON.price = priceBetweenJSON;
    }

    // year condition - And above
    if (request.yearOfReg) {
      var registrationYearAfterJSON = {"$gte": new Date(request.yearOfReg)};
      fetchCarDetailsByFiltersJSON.yearOfReg = registrationYearAfterJSON;
    }
    // Distance condition - less than

    if (request.distanceCovered) {
      var distanceCoveredJSON = {"$lte": request.distanceCovered};
      fetchCarDetailsByFiltersJSON.distanceCovered = distanceCoveredJSON;
    }
    // Array
    if (request.transmission) {
      var transmissionJSON = { "$in": request.transmission };
      fetchCarDetailsByFiltersJSON.transmission = transmissionJSON;
    }
    if (request.engineSize) {
      var engineSizeJSON = {"$lte": parseFloat(request.engineSize)};
      fetchCarDetailsByFiltersJSON.engineSize = engineSizeJSON;
    }
    // Array
    if (request.color) {
      var colorJSON = { "$in": request.color };
      fetchCarDetailsByFiltersJSON.color = colorJSON;
    }
    //Array
    if (request.fuelType) {
      var fuelTypeJSON = { "$in": request.fuelType };
      fetchCarDetailsByFiltersJSON.fuelType = fuelTypeJSON;
    }
    if (request.ownership) {
      var ownershipJSON = { "$in": request.ownership };
      fetchCarDetailsByFiltersJSON.ownership = request.ownershipJSON;
    }
    if (request.bodyType) {
      var bodyTypeJSON = { "$in": request.bodyType };
      fetchCarDetailsByFiltersJSON.bodyType = bodyTypeJSON;
    }
    // if(request.driveType) {
    //   fetchCarDetailsByFiltersJSON.driveType = request.driveType
    // }

    console.log("CarDetailsDAO - fetchCarDetailsByFilters - fetchCarDetailsByFiltersJSON - "
      + JSON.stringify(fetchCarDetailsByFiltersJSON));

    CarDetails.find(
      fetchCarDetailsByFiltersJSON
    )
      .then(function (carDetails) {

        //console.log("CarDetailsDAO - fetchCarDetailsByFilters - All Car details -  " + carDetails);

        res.send(carDetails);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  async function insertCarDetails(req, res) {

    console.log("CarDetailsDAO - insertCarDetails - " + JSON.stringify(req.body));

    var response = {};
    var request = req.body;

    var errors = validationResult(req);

    if (!errors.isEmpty()) {

      response = { errors: errors.mapped() };
      console.log("CarDetailsDAO - insertCarDetails - server final response - " + JSON.stringify(response));
      return res.send(response);
    }

    var carDetails = request.carDetails;
    var carObj = new CarDetails(carDetails);
    var photoPath = './src/resources/images/thumbnails/' + carDetails.registrationNumber + '.png';
    console.log('CarDetailsDAO - insertCarDetails- photoPath - ' + photoPath);
    // var photoPath = './src/dao/abc.png';

    if (!fs.existsSync(photoPath)) {
      response = "File not found - " + photoPath;
      console.log(response);
return res.send(response);
      
    } else {
      carObj.thumbnail.data = fs.readFileSync(photoPath);
      carObj.thumbnail.contentType = 'image/png';


      // console.log("CarDetailsDAO - insertCarDetails - carDetails - " + JSON.stringify(carDetails));


      carObj
        .save()
        .then(carObj => {
          response = { message: "Car details inserted successfully" };
          // console.log("carDetailsDAO - insertCarDetails - Data inserted successfully in CarDetails. Server final response - " + JSON.stringify(carObj));
          return res.send(response);
        })
        .catch(err => {
          response = { errors: err };
          return res.send(response);
        });

    }



    

    
  }


  async function uploadSellCarDetails(req, res) {

    console.log("SellCarDetailsDAO - uploadSellCarDetails - " + JSON.stringify(req.body.images.length));

    var response = {};
    

    var carDetails = req.body;
    var carObj = new SellCarDetails(carDetails);
  
    carObj
    .save()
    .then(carObj => {
      response = { message: "Sell Car details inserted successfully" };
      // console.log("carDetailsDAO - insertCarDetails - Data inserted successfully in CarDetails. Server final response - " + JSON.stringify(carObj));
      return res.send(response);
    })
    .catch(err => {
      response = { errors: err };
      return res.send(response);
    });

   
      
    

    
  }

  app.post("/api/fetchAllCarDetails", fetchAllCarDetails, (req, res) => {
    console.log("fetchAllCarDetails get service running");
  });

  app.post("/api/fetchCarDetailsByFilters", fetchCarDetailsByFilters, (req, res) => {
    console.log("fetchCarDetailsByFilters post service running");
  });

  app.post("/api/uploadSellCarDetails", uploadSellCarDetails, (req, res) => {
    console.log("uploadSellCarDetails post service running");
  });

  app.post("/api/insertCarDetails", insertCarDetailsValidation, insertCarDetails, (req, res) => {
    console.log("insertCarDetails post service running");
  });

  app.get("/", (req, res) => res.json("CarDetailsDAO"));
};
