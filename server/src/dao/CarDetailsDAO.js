var fs = require('fs');
var moment = require('moment');
var util = require('util');

var { check, oneOf, validationResult } = require("express-validator");
var fs = require('fs');
const CarDetails = require("../models/CarDetails");

module.exports = function (app) {

  const insertCarDetailsValidation = [
    check("carDetails.id")
      .not()
      .isEmpty()
      .withMessage("Please Enter id"),

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

    console.log("CarDetailsDAO - fetchAllCarDetails ENTRY"+JSON.stringify(req.body));

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

      console.log("CarDetailsDAO - fetchCarDetailsByFilters ENTRY"+JSON.stringify(req.body));
  
      //Initial validation like fields empty check
      var errors = validationResult(req);
  
      //Mapping the value to the same object
      if (!errors.isEmpty()) {
        return res.send({ errors: errors.mapped() });
      }

      var request = req.body;
      var fetchCarDetailsByFiltersJSON = {};

      if(request.city) {
        fetchCarDetailsByFiltersJSON.city = request.city;
      }
      if(request.maker) {
        fetchCarDetailsByFiltersJSON.maker = request.maker;
      }
      if(request.model) {
        fetchCarDetailsByFiltersJSON.model = request.model;
      }
      // if(request.priceFrom) {
      //   fetchCarDetailsByFiltersJSON.priceFrom = request.priceFrom
      // }
      // if(request.priceTo) {
      //   fetchCarDetailsByFiltersJSON.priceTo = request.priceTo
      // }

      // year condition - And above
      if(request.yearOfReg) {
        fetchCarDetailsByFiltersJSON.yearOfReg = request.yearOfReg;
      }
      // Distance condition - less than
      if(request.distanceCovered) {
        fetchCarDetailsByFiltersJSON.distanceCovered = request.distanceCovered;
      }
      // Array
      if(request.transmission) {
        fetchCarDetailsByFiltersJSON.transmission = request.transmission;
      }
      if(request.engineSize) {
        fetchCarDetailsByFiltersJSON.engineSize = request.engineSize;
      }
      // Array
      if(request.color) {
        fetchCarDetailsByFiltersJSON.color = request.color;
      }
      if(request.fuleType) {
        fetchCarDetailsByFiltersJSON.fuleType = request.fuleType;
      }
      if(request.noOfOwners) {
        fetchCarDetailsByFiltersJSON.noOfOwners = request.noOfOwners;
      }
      if(request.bodyType) {
        fetchCarDetailsByFiltersJSON.bodyType = request.bodyType;
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
    carObj.thumbnail.data = fs.readFileSync(photoPath);
    carObj.thumbnail.contentType = 'image/png';

    // console.log("CarDetailsDAO - insertCarDetails - carDetails - " + JSON.stringify(carDetails));

    
    carObj
      .save()
      .then(carObj => {
        response = { reqbody: request, message: "Car details inserted successfully" };
        console.log("carDetailsDAO - insertCarDetails - Data inserted successfully in CarDetails. Server final response - " + JSON.stringify(carObj));
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

  app.post("/api/insertCarDetails", insertCarDetailsValidation, insertCarDetails, (req, res) => {
    console.log("insertCarDetails post service running");
  });

  app.get("/", (req, res) => res.json("CarDetailsDAO"));
};
