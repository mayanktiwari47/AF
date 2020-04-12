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
import MAKER_MODEL from "assets/enums/MAKER_MODEL.js";
import CITY from "assets/enums/CITY.js";
import FILTERS from "assets/enums/FILTERS.js";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from "@material-ui/core/styles";


import {
  ReactiveBase,
  DataSearch,
  SingleRange,
  ResultCard,
  RangeSlider
} from '@appbaseio/reactivesearch';
import './App.css';





class UsedCars extends Component {

  gridClasses = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  
  }));
  classes = makeStyles(styles);
    // const [checked, setChecked] = React.useState(false);
      //const { ...rest } = this.props;


  constructor(props) {
    super(props);
    this.state = {
      city:null,
      maker:null,
      model:null,
      selectedMaker:null,
      selectedModel:null,
      selectedCity:null,
      selectedPriceFrom:null,
      selectedPriceTo:null,
      selectedYear:null,
      selectedDistance:null,
      selectedEngineSize:null,
      priceFrom:null,
      priceTo:null,
      year:null,
      distance:null,
      engineSize:null,
      transAutoChecked:false,
      transManChecked:false,
      color:null,

isModelDisabled:true,

      
      errors: null,
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);

    this.fileHandler = this.fileHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
     }



  // { ...rest } = props;



populateDropDowns ()

{//console.log("Values Passed : "+ JSON.stringify(FILTERS['YEAR']));
var priceFrom=[], priceTo=[], maker=[], city=[], year =[], distance=[], engineSize=[];

for(var i in FILTERS['PRICEFROM'] )
priceFrom.push({"label":i,"value": FILTERS['PRICEFROM'][i]})

for( var j in FILTERS['PRICETO'])
priceTo.push({"label":j,"value": FILTERS['PRICETO'][j]})

for( var j in FILTERS['YEAR'])
year.push({"label":j,"value": FILTERS['YEAR'][j]})

for( var j in FILTERS['DISTANCECOVERED'])
distance.push({"label":j,"value": FILTERS['DISTANCECOVERED'][j]})

for( var j in FILTERS['ENGINESIZE'])
engineSize.push({"label":j,"value": FILTERS['ENGINESIZE'][j]})



for(var k in MAKER_MODEL) maker.push({"label":k.charAt(0)+k.slice(1).toLowerCase(),
   "value": k.toLowerCase()})


for(var k in CITY) city.push({"label":CITY[k],"value": CITY[k].toLowerCase()})
             this.setState({
             city,
             maker,
             priceFrom,
             priceTo,
             year,
             distance,
             engineSize
             
                       
            });

            if(this.props.location.selectedCity)
            this.setState({
                        
              selectedCity:this.props.location.selectedCity,
                      
             });
             if(this.props.location.selectedMaker)
             this.setState({
               selectedMaker:this.props.location.selectedMaker,
              
              });
              if(this.props.location.selectedModel||this.props.location.model)
              this.setState({ isModelDisabled:false, model:this.props.location.model,
                selectedModel:this.props.location.selectedModel,
               
               });


}



  // { ...rest } = props;
  componentDidMount() {
    this.populateDropDowns();
  }
  componentWillUnmount() {
    this.setState({
      city:null,
      maker:null,
      model:null,
      selectedMaker:null,
      seletedModel:null,
      selectedCity:null,

     });

  }

  handleChange = (event) => {
    console.log("handleCheckChange")

    if(event.target.checked)
    this.setState({ checked: true });
    else
    this.setState({ checked: false });
  };

  
  reset = e => {
    document.getElementById("zipfile").value = null;
    document.getElementById("file").value = null;
    this.setState({
      userdata: null,

      impSuccess: false,
      errors: null,
      importErrors: null,
      visible: true,
      modalSuccess: true,
      file: null,
      noFile: false,
      corruptFile: false,
      filename: null,
      loader: false,
      zipFile: null,
      noZipFile: false,
      corruptZipFile: false,
      zipFilename: null,
      showErrors: false,

      disableButton: false
    });
  };

  toggleSuccess() {
    this.setState({
      modalSuccess: !this.state.modalSuccess
    });
  }

  /**
   * @description Dismisses the alert
   * @param {*} e
   */
  onDismiss() {
    this.setState({ visible: !this.state.visible });
  }

  fileHandler = e => {
    e.preventDefault(); // Stop form submit
    const excel = new FormData();
    const zip = new FormData();
    var submit = true;
    console.log("file" + this.state.filename);
    this.setState({
      loader: false,
      importErrors: null,
      showErrors: false,
      disableButton: false,
      impSuccess: false
    },()=>{if (!this.state.file) {
      submit = false;
      this.setState({
        noFile: true,
        modalSuccess: true,
        corruptFile: false,
        impSuccess: false,
        loader: false,
        disableButton: false
      });
    }
    if (!this.state.zipFile) {
      submit = false;
      this.setState({
        noZipFile: true,
        modalSuccess: true,
        corruptZipFile: false,
        impSuccess: false,
        loader: false,
        disableButton: false
      });
    }});


    if (submit) {
      console.log("in Zip");

      zip.append("file", this.state.zipFile, this.state.zipFilename);

      console.log("ZIP details " + JSON.stringify(this.state.zipFilename));

      axios
        .post("http://localhost:8001/api/photoZipUploading", zip)
        .then(res => {
          console.log("in Zip Res " + JSON.stringify(res.data));
          if (res.data.error_code === 1) {
            this.setState({
              corruptZipFile: true,
              modalSuccess: true,
              noZipFile: false,
              loader: false,
              disableButton: false,
              impSuccess: false
            });
          }
          if (res.data.success === true) {
            this.setState(
              {
                corruptZipFile: false,
                modalSuccess: true,

                noZipFile: false,
                loader: true
              },
              () => {
                excel.append("file", this.state.file, this.state.filename);
                //excel.append('zipfilename', this.state.zipFilename.replace(/\.[^/.]+$/, ""));
                axios
                  .post("http://localhost:8001/api/importExcel", excel)
                  .then(res => {
                    console.log("in Import Res " + JSON.stringify(res.data));
                    if (res.data.error_code === 1) {
                      //document.getElementById("zipfile").value = "";
                      this.setState({
                        corruptFile: true,
                        modalSuccess: true,
                        noFile: false,
                        loader: false,
                        disableButton: false,
                        impSuccess: false
                      });
                    } else if (res.data.msg === "Imported Successfully") {
                      //console.log("in sucess: "+res.data);
                      this.reset();
                      return this.setState({
                        importErrors: null,
                        impSuccess: true,
                        modalSuccess: true,
                        noFile: false,
                        corruptFile: false,
                        file: null,
                        filename: res.data.excelfilename,
                        loader: false,
                        disableButton: false
                      });
                    } else if (res.data.errors) {
                      console.log("in import errors");
                      document.getElementById("zipfile").value = null;
                      document.getElementById("file").value = null;
                      this.setState(
                        {
                          importErrors: res.data.errors,
                          file: null,
                          zipFile: null,
                          impSuccess: false,
                          corruptFile: false,
                          loader: false,
                          disableButton: false
                        },
                        () => {
                          console.log(
                            "errors length: " +
                              Object.keys(this.state.importErrors).length
                          );
                        }
                      );
                    }
                  });
              }
            );
          }
        });
    }
  };



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
  
        <div >
          <SectionDownload />
          {/* <h3> Hi </h3> */}
  
          <ReactiveBase
            app="good-books-ds"
            credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
          >
            <div className="navbar">
              <div className="logo">
                The Booksearch App
            </div>
              <DataSearch
                componentId="mainSearch"
                dataField={["original_title", "original_title.search", "authors", "authors.search"]}
                queryFormat="and"
                placeholder="Search for a book title or an author"
                autosuggest={false}
                className="datasearch"
                innerClass={{
                  "input": "searchbox",
                  "list": "suggestionlist"
                }}
              />
            </div>
            <div className={"display"}>
              <div className={"leftSidebar"}>
  
                <div className={"filters"}>
                  <h3> Filters </h3>
  
                </div>
  
                <ExpansionPanel 
                expanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={this.classes.heading}>City</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
           
          <div className = {"filters-child"}>
            
  
  <br/>
  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                  <Select
                    id="city"
                   // clearOnEscape={true}
                    //openOnFocus={true}
                    value= {this.state.selectedCity|| ""}
                    style={{ width  : 200, backgroundColor: "white", }}
                    onChange={(event) => {  //console.log(JSON.stringify(value));
                      this.setState({ selectedCity: event.target.value })

                    }}



                    label="City"
                  >
                    <MenuItem value="All">
                      All
          </MenuItem>
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
  
  
  
                <ExpansionPanel expanded={true}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={this.classes.heading}>Make and Model</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
  
                    <div className={"filters-child"}>
                      <br />
                      <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Select Maker</InputLabel>
                  <Select
                    id="selectMaker"
                    openOnFocus={true}

                    clearOnEscape={true}

                    value={this.state.selectedMaker|| ""}
                    style={{ width: 200, backgroundColor: "white", }}
                    onChange={(e) => {

                      if (e.target.value) { //console.log("event: "+JSON.stringify( e.target.value));
                        this.setState({ isModelDisabled: false, selectedMaker: e.target.value, selectedModel: null }
                          , () => {
                            
                            let temp = []
                            if(e.target.value=="All")
                              for(var i in MAKER_MODEL )
                                for(var j in MAKER_MODEL[i])
                             {//console.log("i[j]  "+JSON.stringify(MAKER_MODEL[i]))
                               temp.push({ "label": MAKER_MODEL[i][j],
                                "value": MAKER_MODEL[i][j].toLowerCase()});
                          }
                            else
                            for (var k in MAKER_MODEL[e.target.value.toUpperCase()])
                              temp.push({
                                "label": MAKER_MODEL[e.target.value.toUpperCase()][k],
                                "value": k.toLowerCase()
                              })

                            this.setState({ model: temp })
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

                      <br /><br/><br/>
                      <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Model</InputLabel>
                  <Select
                    id="model"

                    clearOnEscape={true}
                    disabled={this.state.isModelDisabled}
                    openOnFocus={true}
                    value={this.state.selectedModel|| ""}
                    style={{ width: 200, backgroundColor: "white", }}
                    onChange={(event) => {  //console.log(JSON.stringify(value));
                      this.setState({ selectedModel: event.target.value })

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
  
                    <div className={"filters-child"}>
                      <br />
                      <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Price From</InputLabel>
                  <Select
                    id="priceFrom"
                   // clearOnEscape={true}
                    //openOnFocus={true}
                    value= {this.state.selectedPriceFrom|| ""}
                    style={{ width  : 200, backgroundColor: "white", }}
                    onChange={(event) => {  //console.log(JSON.stringify(value));
                      this.setState({ selectedPriceFrom: event.target.value })

                    }}



                    label="Price From"
                  >
                  
               {   this.state.priceFrom&&    this.state.priceFrom.map(element => { //console.log("meanu Item : "+element.value)
                      return (<MenuItem key={element.label} value={element.value}>
                        {element.label}</MenuItem>);
                    }
                    )
 }



                  </Select>
                </FormControl>
      

                      <br /><br/>
                      <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Price To</InputLabel>
                  <Select
                    id="priceTo"
                   // clearOnEscape={true}
                    //openOnFocus={true}
                    value= {this.state.selectedPriceTo|| ""}
                    style={{ width  : 200, backgroundColor: "white", }}
                    onChange={(event) => {  //console.log(JSON.stringify(value));
                      this.setState({ selectedPriceto: event.target.value })

                    }}



                    label="Price To"
                  >
                   
               {   this.state.priceTo&&    this.state.priceTo.map(element => { //console.log("meanu Item : "+element.value)
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
  
                    <div className={"filters-child"}>
                      <br />
                  
                    


                      <br />
                      <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                  <Select
                    id="year"
                   // clearOnEscape={true}
                    //openOnFocus={true}
                    value= {this.state.selectedYear|| ""}
                    style={{ width  : 200, backgroundColor: "white", }}
                    onChange={(event) => {  //console.log(JSON.stringify(value));
                      this.setState({ selectedYear: event.target.value })

                    }}



                    label="Year"
                  >
                   
               {   this.state.year&&    this.state.year.map(element => { //console.log("meanu Item : "+element.value)
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
  
                    <div className={"filters-child"}>
                      <br />
                      <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Distance Covered</InputLabel>
                  <Select
                    id="distanceCovered"
                   // clearOnEscape={true}
                    //openOnFocus={true}
                    value= {this.state.selectedDistance|| ""}
                    style={{ width  : 200, backgroundColor: "white", }}
                    onChange={(event) => {  //console.log(JSON.stringify(value));
                      this.setState({ selectedDistance: event.target.value })

                    }}



                    label="Distance Covered"
                  >
                   
               {   this.state.distance&&    this.state.distance.map(element => { //console.log("meanu Item : "+element.value)
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
  
                    <div className={"filters-child"}>
                      <h5>Transmission</h5>
  
  
                      <FormControlLabel
                        control={<Checkbox
  
                          color="primary"
                          checked={this.state.transManChecked}
                          onChange={(event) => {  //console.log(JSON.stringify(value));
                            this.setState({ transManChecked: !this.state.transManChecked })}}
      
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Manual"
                      />
  
                      <FormControlLabel
                        control={<Checkbox
                          color="primary"
  
                          checked={this.state.transAutoChecked}
                          onChange={(event) => {  //console.log(JSON.stringify(value));
                            this.setState({ transAutoChecked: !this.state.transAutoChecked })}}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Automatic"
                      />
  
  
                    </div>
                  </ExpansionPanelDetails>
                  <ExpansionPanelDetails>
                    <div className={"filters-child"}>
                      <h5>Engine Size</h5>
  
                      <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Engine Size</InputLabel>
                  <Select
                    id="engineSize"
                   // clearOnEscape={true}
                    //openOnFocus={true}
                    value= {this.state.selectedEngineSize|| ""}
                    style={{ width  : 200, backgroundColor: "white", }}
                    onChange={(event) => {  //console.log(JSON.stringify(value));
                      this.setState({ selectedEngineSize: event.target.value })

                    }}



                    label="Engine Size"
                  >
                   
               {   this.state.engineSize&&    this.state.engineSize.map(element => { //console.log("meanu Item : "+element.value)
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
  
  
                    <div className={this.gridClasses.root}>
                      <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                          <React.Fragment>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#FFFFFF' }]}
                               />
                              <h6>White</h6>
                            </Grid>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#000000' }]} />
                              <h6>Black</h6>
                            </Grid>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#C0C0C0' }]} />
                              <h6>Silver</h6>
                            </Grid>
                          </React.Fragment>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                          <React.Fragment>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#808080' }]} />
                              <h6>Grey</h6>
                            </Grid>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#0000FF' }]} />
                              <h6>Blue</h6>
                            </Grid>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#f5f5dc' }]} />
                              <h6>Beige</h6>
                            </Grid>
                          </React.Fragment>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                          <React.Fragment>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#cd7f32' }]} />
                              <h6>Bronze</h6>
                            </Grid>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#A52A2A' }]} />
                              <h6>Brown</h6>
                            </Grid>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#800000' }]} />
                              <h6>Maroon</h6>
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
            <Typography className={this.classes.heading}>Fule Type</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
           
          <div className = {"filters-child"}>
            
  
  
            <FormControlLabel
              control={    <Checkbox
          
                color="primary"
             checked={this.state.checked}
             onChange={this.handleChange}
             inputProps={{ 'aria-label': 'primary checkbox' }}
           />}
              label="Petrol"
            />
           
      <FormControlLabel
              control={    <Checkbox 
                color="primary"
                  
                       checked={this.state.checked}
                       onChange={this.handleChange}
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                     />}
               label="Diesel" 
            />
               <FormControlLabel
              control={    <Checkbox 
                color="primary"
                  
                       checked={this.state.checked}
                       onChange={this.handleChange}
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
           
          <div className = {"filters-child"}>
            
  
  
            <FormControlLabel
              control={    <Checkbox
          
                color="primary"
             checked={this.state.checked}
             onChange={this.handleChange}
             inputProps={{ 'aria-label': 'primary checkbox' }}
           />}
              label="First Owner"
            />
    
               <FormControlLabel
              control={    <Checkbox 
                color="primary"
                  
                       checked={this.state.checked}
                       onChange={this.handleChange}
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
           
          <div className = {"filters-child"}>
            
  
  
            <FormControlLabel
              control={    <Checkbox
          
                color="primary"
             checked={this.state.checked}
             onChange={this.handleChange}
             inputProps={{ 'aria-label': 'primary checkbox' }}
           />}
              label="Hatchback"
            />
    
               <FormControlLabel
              control={    <Checkbox 
                color="primary"
                  
                       checked={this.state.checked}
                       onChange={this.handleChange}
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                     />}
                     label="Sedan" 
            />
   <FormControlLabel
              control={    <Checkbox 
                color="primary"
                  
                       checked={this.state.checked}
                       onChange={this.handleChange}
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                     />}
                     label="SUV" 
            />
            
           
              </div>
              </ExpansionPanelDetails>
            
        </ExpansionPanel>
  
  
  
              </div>
              <div className={"mainBar"}>
                <ResultCard
                  componentId="results"
                  dataField="original_title"
                  react={{
                    "and": ["mainSearch", "ratingsFilter"]
                  }}
                  pagination={true}
                  size={20}
                  onData={(res) => (
                    {
                      "image": res.image,
                      "title": res.original_title,
                      "description": res.average_rating + " ★ "
                    }
                  )}
                  className="result-data"
                  innerClass={{
                    "image": "result-image",
                    "resultStats": "result-stats"
                  }}
                />
              </div>
  
            </div>
          </ReactiveBase>
  
  
        </div>
  
  
  
        <div><Footer /></div>
  
  
      </div>
    );
  }
}

export default  withStyles(styles)(UsedCars);
