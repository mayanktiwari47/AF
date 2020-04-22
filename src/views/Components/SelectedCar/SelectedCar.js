
import { connect } from 'react-redux';
import React, { Component } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionDownload from "../Sections/SectionDownload.js";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from "assets/jss/material-kit-react/views/components.js";
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactCircleColorPicker from 'react-circle-color-picker';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
//import './CartApp.css';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from "react-bootstrap";
// import { Container, Row, Col } from 'reactstrap';
import MAKER_MODEL from "assets/enums/MAKER_MODEL.js";
import CITY from "assets/enums/CITY.js";
import FILTERS from "assets/enums/FILTERS.js";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from "@material-ui/core/styles";



function mapStateToProps(state) {
    console.log("in CarDetails JS: "+JSON.stringify(state))
    return {    
        
        carDetail: state.carDetail
    };
  }
  

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

    this.state = {
      carDetails: [],
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
    };


    this.fetchCarDetails = this.fetchCarDetails.bind(this);
    // this.arrayBufferToBase64 = this.arrayBufferToBase64(this);
    // Fetching car details on page load to show it on the Cart
    //  this.fetchCarDetails();
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



  fetchCarDetails() {
    console.log("getting Car Detail")
    /*  axios.post("http://localhost:8001/api/fetchAllCarDetails", 
     {"selectedFeeTemplate":this.state.selectedFeeTemplate}) */
    // var data = {
    //   city: this.state.selectedCity, maker: this.state.selectedMaker,
    //   model: this.state.selectedModel, priceFrom: this.state.selectedPriceFrom,
    //   priceTo: this.state.selectedPriceTo, yearOfReg: this.state.selectedYear, distanceCovered: this.state.selectedDistance,
    //   transmission: this.state.transmission, color: this.state.color, fuelType: this.state.fuelType, ownership: this.state.ownership, bodyType: this.state.bodyType
    // }



    var fetchCarDetailsByFiltersRequest = {};
    if(this.state.selectedCity) {
      fetchCarDetailsByFiltersRequest.city = this.state.selectedCity;
    }
    if(this.state.selectedMaker) {
      fetchCarDetailsByFiltersRequest.maker = this.state.selectedMaker;
    }
    if(this.state.selectedModel) {
      fetchCarDetailsByFiltersRequest.model = this.state.selectedModel;
    }
    if(this.state.selectedPriceFrom) {
      fetchCarDetailsByFiltersRequest.priceFrom = this.state.selectedPriceFrom;
    }
    if(this.state.selectedPriceTo) {
      fetchCarDetailsByFiltersRequest.priceTo = this.state.selectedPriceTo;
    }
    if(this.state.selectedYear) {
      fetchCarDetailsByFiltersRequest.yearOfReg = this.state.selectedYear;
    }
    if(this.state.selectedDistance) {
      fetchCarDetailsByFiltersRequest.distanceCovered = this.state.selectedDistance;
    }

    console.log('transmission transmission transmission - ' + JSON.stringify(this.state.transmission) + " length - " + this.state.transmission.length);
    if(this.state.transmission && this.state.transmission.length>0) {
      fetchCarDetailsByFiltersRequest["transmission"] = this.state.transmission;
    }
    if(this.state.color && this.state.color.length>0) {
      fetchCarDetailsByFiltersRequest.color = this.state.color;
    }
    if(this.state.fuelType && this.state.fuelType.length>0) {
      fetchCarDetailsByFiltersRequest.fuelType = this.state.fuelType;
    }
    if(this.state.ownership && this.state.ownership.length>0) {
      fetchCarDetailsByFiltersRequest.ownership = this.state.ownership;
    }
    if(this.state.bodyType && this.state.bodyType.length>0) {
      fetchCarDetailsByFiltersRequest.bodyType = this.state.bodyType;
    }


    // for (var i in data) {

    //   console.log("fetchCarDetailsByFiltersRequest data[i] - " + i + " and isArray - " + Array.isArray(data[i]) + " and " + data[i]);

    //   if (Array.isArray(data[i]) && typeof data[i] !== 'undefined' && data[i].length > 0) {
    //     fetchCarDetailsByFiltersRequest[i] = data[i];
    //   } else if (data[i]) {
    //     fetchCarDetailsByFiltersRequest[i] = data[i];
    //   }
    // }

    console.log("fetchCarDetailsByFiltersRequest data request - " + JSON.stringify(fetchCarDetailsByFiltersRequest));

    axios.post("http://localhost:8001/api/fetchCarDetailsByFilters", fetchCarDetailsByFiltersRequest)
      .then(cRes => {
        console.log('cRes - fetchCarDetails - All Car details - ' + JSON.stringify(cRes.data));
        if (cRes.data.errors) {

          return this.setState({ errors: cRes.data.errors });

        } else {

          this.setState({ carDetails: cRes.data },
            () => {

              var base64Flag = 'data:image/jpeg;base64,';
              var thumbnail = [];
              for (var i = 0; i < cRes.data.length; i++) {
                var imageStr = this.arrayBufferToBase64(cRes.data[i].thumbnail.data.data);
                thumbnail.push(base64Flag + imageStr);
              }
              this.setState({
                thumbnail
              });

            });

          // console.log('UsedCars - fetchCarDetails - All Car details - ' + JSON.stringify(this.state.carDetails));
        }
      });
  }

  render() {

    const { classes } = this.props;

    return (

    
      <div>
        <Header
          //  brand="Auto Faktory"
          rightLinks={<HeaderLinks />}
          fixed
          color="white"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        // {...rest}
        />

        <div className={classNames(this.classes.main)}>

          <SectionDownload />

          <div className={"display"}>
       { this.props.carDetail && <h6>{this.props.carDetail.maker}</h6>}
          </div>
          {/* </ReactiveBase> */}


        </div>



        <div><Footer /></div>


      </div >
    );
  }
}

export default withStyles(styles) (connect(mapStateToProps) (SelectedCar));
//export default {withStyles(styles),connect(mapStateToProps) SelectedCar};