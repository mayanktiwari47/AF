
import { Link } from "react-router-dom";
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
import './CartApp.css';
import './App.css';
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
  return {    selectedCar: state.selectedCar
  };
}


class UsedCars extends Component {

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
      selectedCarDetails:null
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

 
  populateDropDowns() {//console.log("Values Passed : "+ JSON.stringify(FILTERS['YEAR']));
    var priceFrom = [], priceTo = [], maker = [], city = [], year = [], distanceCovered = [], engineSize = [];

    for (var i in FILTERS['PRICEFROM'])
      priceFrom.push({ "label": i, "value": FILTERS['PRICEFROM'][i] })

    for (var j in FILTERS['PRICETO'])
      priceTo.push({ "label": j, "value": FILTERS['PRICETO'][j] })

    for (var j in FILTERS['YEAR'])
      year.push({ "label": j, "value": FILTERS['YEAR'][j] })

    for (var j in FILTERS['DISTANCECOVERED'])
      distanceCovered.push({ "label": j, "value": FILTERS['DISTANCECOVERED'][j] })

    for (var j in FILTERS['ENGINESIZE'])
      engineSize.push({ "label": j, "value": FILTERS['ENGINESIZE'][j] })



    for (var k in MAKER_MODEL) maker.push({
      "label": k.charAt(0) + k.slice(1).toLowerCase(),
      "value": k.toLowerCase()
    })


    for (var k in CITY) city.push({ "label": CITY[k], "value": CITY[k].toLowerCase() })
    this.setState({
      city,
      maker,
      priceFrom,
      priceTo,
      year,
      distanceCovered,
      engineSize,
      selectedCity: this.props.location.selectedCity || null,
      selectedMaker: this.props.location.selectedMaker || null,
      model: this.props.location.model || null,
      selectedModel: this.props.location.selectedModel || null,
      isModelDisabled: this.props.location.isModelDisabled || false
    }, () => {
      this.fetchCarDetails();

    });

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

    // console.log('transmission transmission transmission - ' + JSON.stringify(this.state.transmission) + " length - " + this.state.transmission.length);
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

    // console.log("fetchCarDetailsByFiltersRequest data request - " + JSON.stringify(fetchCarDetailsByFiltersRequest));

    axios.post("http://localhost:8001/api/fetchCarDetailsByFilters", fetchCarDetailsByFiltersRequest)
      .then(cRes => {
        // console.log('cRes - fetchCarDetails - All Car details - ' + JSON.stringify(cRes.data));
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
          
          color="white"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        // {...rest}
        />

        <div className={classNames(this.classes.main)}>

        

          <div className={"display"}>
            <div className={"leftSidebar"}>

              <div >
                <h4> Filters </h4>

              </div>

              <ExpansionPanel
                defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>City</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >



                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                      <Select
                        id="city"
                        // clearOnEscape={true}
                        //openOnFocus={true}
                        value={this.state.selectedCity || ""}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(event) => {  //console.log(JSON.stringify(value));
                          this.setState({ selectedCity: event.target.value }, () => { this.fetchCarDetails() })

                        }}



                        label="City"
                      >

                        {this.state.city && this.state.city.map((element, i) => { //console.log("meanu Item : "+element.value)
                          return (<MenuItem key={i} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )}




                      </Select>
                    </FormControl>

                    <br />
                  </div>
                </ExpansionPanelDetails >

              </ExpansionPanel  >



              <ExpansionPanel defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>Make & Model</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >

                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Select Maker</InputLabel>
                      <Select
                        id="selectMaker"
                        openOnFocus={true}

                        clearOnEscape={true}
                        // defaultValue="All"
                        value={this.state.selectedMaker || "All"}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(e) => {

                          if (e.target.value) { //console.log("event: "+JSON.stringify( e.target.value));
                            this.setState({ isModelDisabled: false, selectedMaker: e.target.value, selectedModel: null }
                              , () => {

                                let temp = []
                                if (e.target.value == "All")
                                  for (var i in MAKER_MODEL)
                                    for (var j in MAKER_MODEL[i]) {//console.log("i[j]  "+JSON.stringify(MAKER_MODEL[i]))
                                      temp.push({
                                        "label": MAKER_MODEL[i][j],
                                        "value": MAKER_MODEL[i][j].toLowerCase()
                                      });
                                    }
                                else
                                  for (var k in MAKER_MODEL[e.target.value.toUpperCase()])
                                    temp.push({
                                      "label": MAKER_MODEL[e.target.value.toUpperCase()][k],
                                      "value": k.toLowerCase()
                                    })

                                this.setState({ model: temp }, () => { this.fetchCarDetails() })
                              })
                          }
                        }}
                        label="Select Maker"
                      >
                        <MenuItem value="All">
                          All
          </MenuItem>
                        {this.state.maker && this.state.maker.map((element, i) => {// console.log("meanu Item : "+element.value)
                          return (<MenuItem key={i} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )}

                      </Select>
                    </FormControl>

                    <br /><br />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Model</InputLabel>
                      <Select
                        id="model"

                        clearOnEscape={true}
                        disabled={this.state.isModelDisabled}
                        openOnFocus={true}
                        value={this.state.selectedModel || "All"}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(event) => {  //console.log(JSON.stringify(value));
                          this.setState({ selectedModel: event.target.value }, () => { this.fetchCarDetails() })

                        }}

                        label="Model"
                      >
                        <MenuItem value="All">
                          All
          </MenuItem>
                        {this.state.model && this.state.model.map((element, i) => { //console.log("meanu Item : "+element.value)
                          return (<MenuItem key={i} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )}




                      </Select>
                    </FormControl>



                  </div>





                </ExpansionPanelDetails>
              </ExpansionPanel>


              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>Price</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >
                    <br />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Price From</InputLabel>
                      <Select
                        id="priceFrom"
                        // clearOnEscape={true}
                        //openOnFocus={true}
                        value={this.state.selectedPriceFrom || ""}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(event) => {  //console.log(JSON.stringify(value));
                          if(this.state.selectedPriceTo && parseInt(event.target.value)>parseInt(this.state.selectedPriceTo))

                          this.setState({selectedPriceTo:null});
                          this.setState({ selectedPriceFrom: event.target.value }, () => { this.fetchCarDetails() })

                        }}



                        label="Price From"
                      >

                        {this.state.priceFrom && this.state.priceFrom.map(element => { //console.log("meanu Item : "+element.value)
                          return (<MenuItem key={element.label} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )
                        }



                      </Select>
                    </FormControl>


                    <br /><br />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Price To</InputLabel>
                      <Select
                        id="priceTo"
                        // clearOnEscape={true}
                        //openOnFocus={true}
                        value={this.state.selectedPriceTo || ""}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(event) => {  //console.log(JSON.stringify(value));
                          if(this.state.selectedPriceFrom && parseInt(event.target.value)<parseInt(this.state.selectedPriceFrom))
                          this.setState({selectedPriceFrom:null});
                          this.setState({ selectedPriceTo: event.target.value }, () => { this.fetchCarDetails() })

                        }}



                        label="Price To"
                      >

                        {this.state.priceTo && this.state.priceTo.map(element => { //console.log("meanu Item : "+element.value)
                          return (<MenuItem key={element.label} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )
                        }



                      </Select>
                    </FormControl>

                    <br />
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>Year</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >
                    <br />

                    <br />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                      <Select
                        id="year"
                        // clearOnEscape={true}
                        //openOnFocus={true}
                        value={this.state.selectedYear || ""}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(event) => {  //console.log(JSON.stringify(value));
                          this.setState({ selectedYear: event.target.value }, () => { this.fetchCarDetails() })

                        }}



                        label="Year"
                      >

                        {this.state.year && this.state.year.map(element => { //console.log("meanu Item : "+element.value)
                          return (<MenuItem key={element.label} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )
                        }



                      </Select>
                    </FormControl>

                    <br />
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>Distance Covered</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >
                    <br />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Distance Covered</InputLabel>
                      <Select
                        id="distanceCovered"
                        // clearOnEscape={true}
                        //openOnFocus={true}
                        value={this.state.selectedDistance || ""}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(event) => {  //console.log(JSON.stringify(value));
                          this.setState({ selectedDistance: event.target.value }, () => { this.fetchCarDetails() })

                        }}



                        label="Distance Covered"
                      >

                        {this.state.distanceCovered && this.state.distanceCovered.map(element => { //console.log("meanu Item : "+element.value)
                          return (<MenuItem key={element.label} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )
                        }



                      </Select>
                    </FormControl>

                    <br />
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>



              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>Transmission & Engine Size</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >
                    <b>Transmission</b>
                    <br />


                    <FormControlLabel
                      control={<Checkbox

                        color="primary"
                        //  checked={this.state.transManChecked}
                        onChange={() => {
                          var temp = this.state.transmission;

                            if (temp.includes("manual")) {
                              temp.splice(temp.indexOf("manual"), 1)
                            } else {
                              temp.push("manual")
                            }
                            this.setState({ transmission: temp }, () => { this.fetchCarDetails() })
                        }
                        }


                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Manual"
                    />

                    <FormControlLabel
                      control={<Checkbox
                        color="primary"

                        // checked={this.state.transAutoChecked}
                        onChange={() => {
                          var temp = this.state.transmission;
                          if (temp.includes("automatic"))
                            temp.splice(temp.indexOf("automatic"), 1)
                          else
                            temp.push("automatic")
                          this.setState({ transmission: temp }, () => { this.fetchCarDetails() })
                        }}

                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Automatic"
                    />
                  </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                  <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Engine Size</InputLabel>
                      <Select
                        id="engineSize"
                        // clearOnEscape={true}
                        //openOnFocus={true}
                        value={this.state.selectedEngineSize || ""}
                        style={{ width: 200, backgroundColor: "white", }}
                        onChange={(event) => {  //console.log(JSON.stringify(value));
                          this.setState({ selectedEngineSize: event.target.value }, () => { this.fetchCarDetails() })

                        }}



                        label="Engine Size"
                      >

                        {this.state.engineSize && this.state.engineSize.map(element => { //console.log("meanu Item : "+element.value)
                          return (<MenuItem key={element.label} value={element.value}>
                            {element.label}</MenuItem>);
                        }
                        )
                        }



                      </Select>
                    </FormControl>

                    <br />
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>




              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>Color</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>


                  <div >
                    <Grid container spacing={1} >
                      <Grid container item xs={12} spacing={3} style={{alignItems:'center'}}>
                        <React.Fragment >
                          <Grid item xs={4} style={{alignItems:'center'}}>
                            <ReactCircleColorPicker
                              //checked={this.state.checkedWhiteColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("white"))
                                  temp.splice(temp.indexOf("white"), 1)
                                else
                                  temp.push("white")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }}

                              colors={[{ hex: '#FFFFFF' }]}
                            />
                            White
                          </Grid>
                          <Grid item xs={4}>
                            <ReactCircleColorPicker
                              //checked={this.state.checkedBlackColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("black"))
                                  temp.splice(temp.indexOf("black"), 1)
                                else
                                  temp.push("black")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }}
                              colors={[{ hex: '#000000' }]} />
                            Black
                          </Grid>
                          <Grid item xs={4}>
                            <ReactCircleColorPicker
                              //checked={this.state.checkedSilverColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("silver"))
                                  temp.splice(temp.indexOf("silver"), 1)
                                else
                                  temp.push("silver")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }} colors={[{ hex: '#C0C0C0' }]} />
                            Silver
                          </Grid>
                        </React.Fragment>
                      </Grid>
                      <Grid container item xs={12} spacing={3}>
                        <React.Fragment>
                          <Grid item xs={4}>
                            <ReactCircleColorPicker
                              // checked={this.state.checkedGreyColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("grey"))
                                  temp.splice(temp.indexOf("grey"), 1)
                                else
                                  temp.push("grey")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }} colors={[{ hex: '#808080' }]} />
                            Grey
                          </Grid>
                          <Grid item xs={4}>
                            <ReactCircleColorPicker
                              checked={this.state.checkedBlueColor || false}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("blue"))
                                  temp.splice(temp.indexOf("blue"), 1)
                                else
                                  temp.push("blue")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }} colors={[{ hex: '#0000FF' }]} />
                            Blue
                          </Grid>
                          <Grid item xs={4}>
                            <ReactCircleColorPicker
                              // checked={this.state.checkedBeigeColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("beige"))
                                  temp.splice(temp.indexOf("beige"), 1)
                                else
                                  temp.push("beige")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }} colors={[{ hex: '#f5f5dc' }]} />
                            Beige
                          </Grid>
                        </React.Fragment>
                      </Grid>
                      <Grid container item xs={12} spacing={3}>
                        <React.Fragment>
                          <Grid item xs={4}>
                            <ReactCircleColorPicker
                              // checked={this.state.checkedBronzeColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("bronze"))
                                  temp.splice(temp.indexOf("bronze"), 1)
                                else
                                  temp.push("bronze")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }} colors={[{ hex: '#cd7f32' }]} />
                            Bronze
                          </Grid>
                          <Grid item xs={4}>
                            <ReactCircleColorPicker
                              //checked={this.state.checkedBrownColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("brown"))
                                  temp.splice(temp.indexOf("brown"), 1)
                                else
                                  temp.push("brown")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }} colors={[{ hex: '#A52A2A' }]} />
                            Brown
                          </Grid>
                          <Grid item xs={4} >
                            
                            <ReactCircleColorPicker
                              //
                              checked={this.state.checkedMaroonColor}
                              onChange={() => {
                                var temp = this.state.color;
                                if (temp.includes("maroon"))
                                  temp.splice(temp.indexOf("maroon"), 1)
                                else
                                  temp.push("maroon")
                                this.setState({ color: temp }, () => { this.fetchCarDetails() })
                              }} colors={[{ hex: '#800000' }]} />
                            Maroon
                          </Grid>
                        </React.Fragment>
                      </Grid>
                    </Grid>
                  </div>

                </ExpansionPanelDetails>

              </ExpansionPanel>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={() => this.classes.heading}>Fuel Type</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >



                    <FormControlLabel
                      control={<Checkbox

                        color="primary"
                        // checked={() => this.state.petrolChecked}
                        onChange={() => {
                          var temp = this.state.fuelType;
                          if (temp.includes("petrol"))
                            temp.splice(temp.indexOf("petrol"), 1)
                          else
                            temp.push("petrol")
                          this.setState({ fuelType: temp }, () => { this.fetchCarDetails() })
                        }}

                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Petrol"
                    />

                    <FormControlLabel
                      control={<Checkbox
                        color="primary"

                        // checked={this.state.dieselChecked}
                        onChange={() => {
                          var temp = this.state.fuelType;
                          if (temp.includes("diesel"))
                            temp.splice(temp.indexOf("diesel"), 1)
                          else
                            temp.push("diesel")
                          this.setState({ fuelType: temp }, () => { this.fetchCarDetails() })
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Diesel"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        color="primary"
                        // checked={this.state.cngChecked}
                        onChange={() => {
                          var temp = this.state.fuelType;
                          if (temp.includes("cng"))
                            temp.splice(temp.indexOf("cng"), 1)
                          else
                            temp.push("cng")
                          this.setState({ fuelType: temp }, () => { this.fetchCarDetails() })
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="CNG"
                    />


                  </div>
                </ExpansionPanelDetails>

              </ExpansionPanel>


              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>No of Owners</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >



                    <FormControlLabel
                      control={<Checkbox

                        color="primary"
                        // checked={this.state.firstOwnerChecked}
                        onChange={() => {
                          var temp = this.state.ownership;
                          if (temp.includes("first"))
                            temp.splice(temp.indexOf("first"), 1)
                          else
                            temp.push("first")
                          this.setState({ ownership: temp }, () => { this.fetchCarDetails() })
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="First Owner"
                    />

                    <FormControlLabel
                      control={<Checkbox
                        color="primary"

                        //  checked={this.state.secOwnerChecked}
                        onChange={() => {
                          var temp = this.state.ownership;
                          if (temp.includes("second"))
                            temp.splice(temp.indexOf("second"), 1)
                          else
                            temp.push("second")
                          this.setState({ ownership: temp }, () => { this.fetchCarDetails() })
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Second Owner"
                    />


                  </div>
                </ExpansionPanelDetails>

              </ExpansionPanel>



              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={this.classes.heading}>Body Type</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <div >



                    <FormControlLabel
                      control={<Checkbox

                        color="primary"
                        // checked={this.state.hatchbackSelected}
                        onChange={() => {
                          var temp = this.state.bodyType;
                          if (temp.includes("hatchback"))
                            temp.splice(temp.indexOf("hatchback"), 1)
                          else
                            temp.push("hatchback")
                          this.setState({ bodyType: temp }, () => { this.fetchCarDetails() })
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Hatchback"
                    />

                    <FormControlLabel
                      control={<Checkbox
                        color="primary"

                        // checked={this.state.sedanSelected}
                        onChange={() => {
                          var temp = this.state.bodyType;
                          if (temp.includes("sedan"))
                            temp.splice(temp.indexOf("sedan"), 1)
                          else
                            temp.push("sedan")
                          this.setState({ bodyType: temp }, () => { this.fetchCarDetails() })
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Sedan"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        color="primary"

                        //checked={this.state.suvSelected}
                        onChange={() => {
                          var temp = this.state.bodyType;
                          if (temp.includes("suv"))
                            temp.splice(temp.indexOf("suv"), 1)
                          else
                            temp.push("suv")
                          this.setState({ bodyType: temp }, () => { this.fetchCarDetails() })
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="SUV"
                    />


                  </div>
                </ExpansionPanelDetails>

              </ExpansionPanel>



            </div>
            <div
              className={"mainBar"}
            >

              <Container>
                {this.state.carDetails && this.state.carDetails.map((cardetail, index) => {
                
                  return (
                    <article className="shelf-item-container"
                     onClick={() => {
                      this.props.dispatch({ type: "selectedCar", payload: {value:cardetail} }); 
                      
                      this.setState({selectedCar:cardetail},
                      ()=>{ this.props.history.push({
                      pathname: '/selected-car',
                      //search: '?query=abc',
                    //  carDetails: cardetail
                    })})
                     }} 
                    >
                      {true && (
                        <div ><b>{cardetail.yearOfReg.substring(0,4) + " Reg."}</b></div>
                      )}
                      <img src={this.state.thumbnail[index]} alt='image name'
                       title={cardetail.maker.charAt(0).toUpperCase()+cardetail.maker.slice(1)+ " "
                        + cardetail.model  + " " + cardetail.modelType} />
                      {/* <img src={require("./images/abc.jpg")} alt='image name' /> */}
                      {/* <img src={abc} alt='image name' /> */}

                      <div className="shelf-item-name">{cardetail.maker+ " "
                        + cardetail.model + " " + cardetail.engineSize + " " + cardetail.modelType}</div>

                      <div className="shelf-item-price"><b>{cardetail.price.toLocaleString('en-IN', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                        style: 'currency',
                        currency: 'INR'
                    })}</b></div>
                      <div className="shelf-item-description"><b>{cardetail.distanceCovered +" Kms "} </b> |
                      <b>{" "+cardetail.fuelType+" "} </b> | <b>{" "+cardetail.engineSize+" L "} </b>|
                      <b>{" "+cardetail.transmission} </b>
                       </div>
                      {/*  <div className="shelf-item-description">More details here</div>
                   
                    <div className="shelf-item-buy-btn">Buy Now</div> */}
                    </article>
                  );
                })}
              </Container>
              
           
            </div>

          </div>
          {/* </ReactiveBase> */}


        </div>



        <div><Footer /></div>


      </div >
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(UsedCars));
