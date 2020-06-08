import Button from "components/CustomButtons/Button.js";
import fs from "fs";
import { connect } from 'react-redux';
import React, { Component } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";

import axios from "axios";
//import './CartApp.css';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from "react-bootstrap";
// import { Container, Row, Col } from 'reactstrap';
import MAKER_MODEL from "assets/enums/MAKER_MODEL.js";
import CITY from "assets/enums/CITY.js";
// import REGISTRATION_NUMBERS from "assets/enums/REGISTRATION_NUMBERS.js";

import { withStyles } from "@material-ui/core/styles";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "../UsedCars/App.css"
import "react-image-gallery/styles/scss/image-gallery.scss";
import REGISTRATION_NUMBERS from "assets/enums/REGISTRATION_NUMBERS.js";
import REGISTRATION_NUMBER_IMAGES_REQUIRE from "assets/enums/REGISTRATION_NUMBER_IMAGES_REQUIRE.js";
/* const images = [
  {
    original: require("./carImages/up-123451/1.jpg"),
              thumbnail: require("./1.jpg")
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  }
 
]; */

var images = [];
const mapStateToProps  = (state) => {
    console.log("SelectedCar - mapStateToProps - CarDetail JS from UsedCars Page "+JSON.stringify(state));
    
    var carDetailLS = {};
  if(state !== null && state.length<1) {
    carDetailLS = loadStateFromLocalStorage();
    // console.log('SelectedCar - mapStateToProps - Page reload - carDetailLS - ' + JSON.stringify(carDetailLS));
  } else {
    saveStateInLocalStorage(state[0]);
    carDetailLS = {    
      carDetail: state[0].carDetail
    };
  }

  console.log('SelectedCar - mapStateToProps - REGISTRATION_NUMBERS["one"] - ' + REGISTRATION_NUMBERS["one"]);

  // var context = require.context(REGISTRATION_NUMBERS["one"], false,/.jpg$/,'lazy');
  // const context = require.context('./CarImages/', true,/.jpg$/,'lazy');

  // const context = REGISTRATION_NUMBERS[carDetailLS.carDetail.registrationNumber];
  
  // console.log('SelectedCar - mapStateToProps - imagePath - ' + context.keys() 
  //   + " carDetailLS.carDetail.registrationNumber - " + carDetailLS.carDetail.registrationNumber + " context.keys() - " + context.keys());
    
    // context.keys().forEach((filename)=>{

      // console.log('SelectedCar - mapStateToProps - filename - ' +filename); 

      // var imgPath ='./carImages'+ filename.substring(1);

      // console.log('SelectedCar - mapStateToProps - imagePath - ' +imgPath 
      // + "array length - " + REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber].length);

      // var imgPath1 = {
      //   "100001": "./CarImages/100001/abc.jpg"
      // };

      if(REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber].length > 0) {

        for (var i =0 ; i<REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber].length; i++) {
          
          console.log('SelectedCar - mapStateToProps - loop values - ' + JSON.stringify(REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber][i]));

          images.push({
    
            original: REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber][i],
            thumbnail: REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber][i]
          })
        }
      }
      
      // images.push({

      //   original: REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber],
      //   thumbnail: REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber]

      //   // original: require(imgPath1[100001]),
      //   // thumbnail: require(imgPath1[100001])

      //   // original: require('./CarImages/100001/abc.jpg'),
      //   // thumbnail: require('./CarImages/100001/abc.jpg')
      // })

    // });

  return carDetailLS;
  
  }

  const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('carDetail');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveStateInLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('carDetail', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  

class SelectedCar extends Component {

 /*  gridClasses = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

  })); */
  classes = makeStyles(styles);

  // const [checked, setChecked] = React.useState(false);
  //const { ...rest } = this.props;

  //const { ...rest } = this.props;

  constructor(props) {

    super(props);

    const carDetailConst = props;
    this.state = {
      carDetail: {},
      city: null,
      maker: null,
      model: null,
      selectedMaker: null,
      selectedModel: null,
      selectedCity: null,
      selectedPriceFrom: null,
      selectedPriceTo: null,
      selectedYear: null,
      selectedDistance: null,
      selectedEngineSize: null,
      priceFrom: null,
      priceTo: null,
      year: null,
      distanceCovered: null,
      engineSize: null,
      transmission: [],
      color: [],
      fuelType: [],
      ownership: [],
      isModelDisabled: true,
      bodyType: [],
      thumbnail: [],
      errors: null,
      showImages: false
    };

    this.setCarDetailInState = this.setCarDetailInState.bind(this);

    console.log('SelectedCar - Constructor call - ' + JSON.stringify(props));

    this.setCarDetailInState();
  }

  setCarDetailInState() {

    console.log('SelectedCar - setCarDetailInState - carDetails from State BEFORE - ' + JSON.stringify(this.state.carDetail)
    + ' this.props - ' + JSON.stringify(this.props.carDetail));

    this.setState({
      carDetail: this.props.carDetail
    }, ()=> {
      console.log('SelectedCar - setCarDetailInState - carDetails from State AFTER - ' + JSON.stringify(this.state.carDetail));
    });
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };


  // { ...rest } = props;

  populateDropDowns() {//console.log("Values Passed : "+ JSON.stringify(this.props.location));

  }

  // { ...rest } = props;
  componentDidMount() {
    this.populateDropDowns();
  }
  componentWillUnmount() {
    this.setState({
      city: null,
      maker: null,
      model: null,
      selectedMaker: null,
      seletedModel: null,
      selectedCity: null,

    });

  }

  render() {

    const { classes } = this.props;

    console.log('render this.props.carDetail - ' + this.props.carDetail);

    return (

    
      <div>
        <Header
          //  brand="Auto Faktory"
          rightLinks={<HeaderLinks />}
          
          color="white"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        // {...rest}
        />

        <div className={classNames(this.classes.main)}>

         

        <Container style={{marginLeft:"0px"}}>
        <Row>
          <Col>
      
<Button onClick={()=>{this.setState({showImages:true},()=>{  this._imageGallery.fullScreen();})}}>IMAGES</Button>
        <img width={700} height={500} mode='fit'
         src =  {'data:image/jpeg;base64,'+
         this.arrayBufferToBase64(this.props.carDetail.thumbnail.data.data)}/>
       
        </Col>
       <Col>
     {this.state.showImages && 
    
    <ImageGallery ref={f => this._imageGallery = f} items={images}  /> 
     }
</Col>
        <Col>
        <h6>{this.props.carDetail.maker}</h6>
        </Col>
        </Row>
        </Container>
          {/* </ReactiveBase> */}


        </div>



        <div><Footer /></div>


      </div >
    );
  }
}

export default withStyles(styles) (connect(mapStateToProps) (SelectedCar));