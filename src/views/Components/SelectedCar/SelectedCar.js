import { makeStyles, withStyles } from "@material-ui/core/styles";
import REGISTRATION_NUMBER_IMAGES_REQUIRE from "assets/enums/REGISTRATION_NUMBER_IMAGES_REQUIRE.js";
import REGISTRATION_NUMBER_OUTSIDE_IMAGES_DIRECTORY from "assets/enums/REGISTRATION_NUMBER_OUTSIDE_IMAGES_DIRECTORY.js";
import styles from "assets/jss/material-kit-react/views/components.js";
//import './CartApp.css';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "components/Footer/Footer.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import React, { Component } from "react";
// import React360 from 'react-360-image';
import React360 from 'react-360-image/src/React360';
import { Helmet } from "react-helmet";
import Button from "components/CustomButtons/Button.js";
import fs from "fs";
import classNames from "classnames";

import axios from "axios";
//import './CartApp.css';
//import './App.css';
import { Container, Row, Col } from "react-bootstrap";
// import { Container, Row, Col } from 'reactstrap';
import MAKER_MODEL from "assets/enums/MAKER_MODEL.js";
import CITY from "assets/enums/CITY.js";
// import REGISTRATION_NUMBERS from "assets/enums/REGISTRATION_NUMBERS.js";

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { connect } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../SelectedCar/styles/css/image-gallery.css";
import "../SelectedCar/styles/scss/image-gallery.scss";
import "../UsedCars/App.css";
import "./app.css";
import "./SelectedCar.css";
import "kaleidoscopejs/dist/kaleidoscope.min.js";
import {Kaleidoscope} from "kaleidoscopejs/dist/kaleidoscope.min.js";

import { render } from 'react-dom';
 
import { Pannellum } from "pannellum-react";
import myImage from "assets/pano/image.jpg";


var images = [];
const mapStateToProps = (state) => {
  console.log("SelectedCar - mapStateToProps - CarDetail JS from UsedCars Page " + JSON.stringify(state));

  var carDetailLS = {};
  if (state !== null && state.length < 1) {
    carDetailLS = loadStateFromLocalStorage();
    // console.log('SelectedCar - mapStateToProps - Page reload - carDetailLS - ' + JSON.stringify(carDetailLS));
  } else {
    saveStateInLocalStorage(state[0]);
    carDetailLS = {
      carDetail: state[0].carDetail
    };
  }


  if (REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber].length > 0) {

    for (var i = 0; i < REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber].length; i++) {

      console.log('SelectedCar - mapStateToProps - loop values - ' + JSON.stringify(REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber][i]));

      images.push({

        original: REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber][i],
        thumbnail: REGISTRATION_NUMBER_IMAGES_REQUIRE[carDetailLS.carDetail.registrationNumber][i]
      })
    }
  }

  return carDetailLS;

}

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('carDetail');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const var100003 = "100003";

const saveStateInLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('carDetail', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};


class SelectedCar extends Component {

  classes = makeStyles(styles);

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
      showImages: false,


      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
      showVideo: {},

      registrationNumber: null

    };

    this.setCarDetailInState = this.setCarDetailInState.bind(this);
    this.kaleidoscope = this.kaleidoscope.bind(this);

    console.log('SelectedCar - Constructor call - ' + JSON.stringify(props));

    this.setCarDetailInState();
  }

  setCarDetailInState() {

    console.log('SelectedCar - setCarDetailInState - carDetails from State BEFORE - ' + JSON.stringify(this.state.carDetail)
      + ' this.props - ' + JSON.stringify(this.props.carDetail));

    this.setState({
      carDetail: this.props.carDetail
    }, () => {
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

    const script = document.createElement("script");
    script.src = "node_modules/kaleidoscopejs/dist/kaleidoscope.min.js";
    script.async = true;
    document.body.appendChild(script);
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

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    console.debug('slid to index', index);
  }


  kaleidoscope() {
    var viewer = new Kaleidoscope.Image({
        source: 'http://thiago.me/image-360/Polie_Academy_53.JPG',
        containerId: '#container360',
        height: window.innerHeight,
        width: window.innerWidth,
    });
    viewer.render();

    window.onresize = function() {
        viewer.setSize({height: window.innerHeight, width: window.innerWidth});
    };
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

        <div class="row">

<div class="col-md-8 bAuto" >

        <div>
        {/* <div class="box"> */}

{/* <img src={require("./CarImages/100001/abc.jpg")} /> */}

          <Tabs >
            <TabList>
              <Tab>
                <img src={require("./CarImages/carClosedDoor.jpg")} alt={"Image icon"} height="32" width="32" /> Images
              </Tab>
              <Tab>Closed Doors view</Tab>
              <Tab>Open Doors View</Tab>
              <Tab>Inner 360 View</Tab>
            </TabList>

            <TabPanel>
              <div class="spaceBox">

                <section className="app">
                  <ImageGallery
                    ref={f => this._imageGallery = f}
                    items={images}
                    lazyLoad={false}
                    // onClick={this._onImageClick.bind(this)}
                    onImageLoad={this._onImageLoad}
                    // onSlide={this._onSlide.bind(this)}
                    // onPause={this._onPause.bind(this)}
                    // onScreenChange={this._onScreenChange.bind(this)}
                    // onPlay={this._onPlay.bind(this)}
                    infinite={this.state.infinite}
                    showBullets={this.state.showBullets}
                    showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                    showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                    showThumbnails={this.state.showThumbnails}
                    showIndex={this.state.showIndex}
                    showNav={this.state.showNav}
                    isRTL={this.state.isRTL}
                    thumbnailPosition={this.state.thumbnailPosition}
                    slideDuration={parseInt(this.state.slideDuration)}
                    slideInterval={parseInt(this.state.slideInterval)}
                    slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                    additionalClass="app-image-gallery"
                  />
                </section>

              </div>
            </TabPanel>
            <TabPanel>
            <div class="spaceBox">
            {/* <div class="image360Dimension"> */}
        <React360 
        dir="awair-360" 
        numImages={55} 
        // dir="CarImages/Outer/100003" 
        // numImages={11} 
        />
        {/* </div> */}
        </div>
            </TabPanel>
            <TabPanel>

<React360 dir={REGISTRATION_NUMBER_OUTSIDE_IMAGES_DIRECTORY[this.props.carDetail.registrationNumber]} numImages={7} />
    </TabPanel>

    {/* <TabPanel>
    <Helmet>
        <script src="kaleidoscopejs/dist/kaleidoscope.min.js"></script>
        {this.kaleidoscope()} */}
        
        {/* <script type="text/javascript" charset="utf-8"> {`
(function() {
    var viewer = new Kaleidoscope.Image({
        source: 'http://thiago.me/image-360/Polie_Academy_53.JPG',
        containerId: '#container360',
        height: window.innerHeight,
        width: window.innerWidth,
    });
    viewer.render();

    window.onresize = function() {
        viewer.setSize({height: window.innerHeight, width: window.innerWidth});
    };
})();
`}
    </script> */}

    {/* </Helmet>
    </TabPanel> */}

    <TabPanel>

    <Pannellum
        width="100%"
        height="500px"
        image={myImage}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        onLoad={() => {
            console.log("panorama loaded");
        }}
    >
      <Pannellum.Hotspot
        type="info"
        pitch={11}
        yaw={-167}
        text="Info Hotspot Text 3"
        URL="https://github.com/farminf/pannellum-react"
      />
 
      <Pannellum.Hotspot
        type="info"
        pitch={31}
        yaw={-107}
        text="Info Hotspot Text 4"
        URL="https://github.com/farminf/pannellum-react"
      />
    </Pannellum>

    </TabPanel>
            
          </Tabs>

        </div>

        </div>
        
        <div class="col-md-3">

<p>Forms Portal provides a syntax for place-holders to display custom/OOTB metadata. The placeholders are populated after displaying the results of forms, drafts, or submissions.
To include a repeatable entry, configure the value of the attribute data-repeatable to true .
*In the example discussed, two Div elements are present at the top in the custom template. The first, with "__FP_boxes-container" CSS class, works as a container element for the forms that are listed. The second, with "__FP_boxes" CSS class, is a template for the basic entities, in this case a Form. The data-repeatable attribute present in the Div element has the value true .
Each placeholder has an exclusive OOTB metadata set. To display custom metadata at a particular place on the form, add the $metadata_prop property at the place.
In the example, the metadata property is used at multiple instance. For example, it is used in description , name , formUrl , htmlStyle , pdfUrl , pdfStyle , and path in the prescribed manner.</p>

</div>

        </div>

        {/* <div> */}
        <Footer />
        {/* </div> */}


      </div >
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(SelectedCar));