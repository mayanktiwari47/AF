import Button from "components/CustomButtons/Button.js";

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
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "../UsedCars/App.css"
//import "react-image-gallery/styles/scss/image-gallery.scss";
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
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
 
];


function mapStateToProps(state) {
    console.log("SelectedCar - mapStateToProps - CarDetail JS from UsedCars Page "+JSON.stringify(state));

    // if(loadStateFromLocalStorage == null)

    // saveStateInLocalStorage(state);

  if(state !== null && state.length<1) {
    var carDetailLS = loadStateFromLocalStorage();
    console.log('SelectedCar - mapStateToProps - Page reload - carDetailLS - ' + JSON.stringify(carDetailLS));
    return carDetailLS;

  } else {
    saveStateInLocalStorage(state[0]);
    return {    
      carDetail: state[0].carDetail
    };
  }

    // return {    
    //     carDetail: state
    // };
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
        {this.state.showImages &&    <ImageGallery isFullscreen={true} items={images} /> }
<Button onClick={()=>{this.setState({showImages:true})}}>Images</Button>
        <img width={700} height={500} mode='fit'
         src =  {'data:image/jpeg;base64,'+
         this.arrayBufferToBase64(this.props.carDetail.thumbnail.data.data)}/>
       
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