import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import axios from "axios";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import TextField from '@material-ui/core/TextField';
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from "assets/jss/material-kit-react/views/components.js";
import MAKER_MODEL from "assets/enums/MAKER_MODEL.js";
import CITY from "assets/enums/CITY.js";
import ProductSection from "./Sections/ProductSection.js";
import { withStyles } from "@material-ui/core/styles";

import Input from '@material-ui/core/Input';




class Components extends Component {
  
  constructor(props) {
    
    super(props);
    //this.populateDropDowns();
    this.state = {
      city:null,
      maker:null,
      model:null,
      selectedMaker:null,
      selectedModel:null,
      selectedCity:null,

isModelDisabled:true,

      
      errors: null,
     
    };
    
    this.fileHandler = this.fileHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.populateDropDowns= this.populateDropDowns.bind(this);
       


  }

populateDropDowns ()

{//console.log("Enum: "+ JSON.stringify(MAKER_MODEL))

var maker = [];
var city = [];
   for(var k in MAKER_MODEL) maker.push({"label":k.charAt(0)+k.slice(1).toLowerCase(),
   "value": k.toLowerCase()})


   for(var k in CITY) city.push({"label":CITY[k],"value": CITY[k].toLowerCase()})
             this.setState({
             city:city,
             maker:maker
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

    const  { classes }  = this.props;
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
      <Parallax image={require("assets/img/homeBKD.jpg")}>
        <div className={classes.container}>
       
           <GridContainer>
            <GridItem> <div>
          
               <div className={classes.brand}>
                {/* <h1 className={classes.title}>A Brand New Feeling!</h1> */}
                <h3 className={classes.subtitle}>
                Buy or finance Car online. We’ll deliver it. Love it or we’ll collect it.
                </h3>
              </div> 

              
              </div>


              
            </GridItem>

            <div className={classes.dropdown} >
            
            <Autocomplete
      id="city"
      options={this.state.city}
      clearOnEscape={true}
      getOptionLabel={(option) => option.label}
      openOnFocus={true}
      value={this.state.selectedCity}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
      onChange={(e,value) => {  console.log(JSON.stringify(value));
        this.setState({selectedCity:value})

        }}
    />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            
      <Autocomplete
      id="selectMaker"
      openOnFocus={true}
      options={this.state.maker}
      clearOnEscape={true}
      getOptionLabel={(option) => option.label}
      value={this.state.selectedMaker}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Select Maker" variant="outlined"/>}

      onChange={(e,value) => { 
       
        if (value){ 
        this.setState({isModelDisabled:false,selectedMaker:value,selectedModel:null }
          ,()=>{

            //console.log("selectedMaker: "+JSON.stringify( this.state.selectedMaker));

         let temp=[]
         
        for(var k in MAKER_MODEL[value.label.toUpperCase()])
        temp.push({"label":MAKER_MODEL[value.label.toUpperCase()][k],
        "value": k.toLowerCase()})
        
        this.setState({model:temp})

        })

   } }}

    />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        
          <Autocomplete
      id="selectModel"
      openOnFocus={true}
      clearOnEscape={true}
      disabled={this.state.isModelDisabled}
      options={this.state.model}
      value={this.state.selectedModel}
      getOptionLabel={(option) => option.label}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Select Model" variant="outlined"
       />}
       onChange={(e,value) => {
        this.setState({selectedModel:value})

        }}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Link to={{
            pathname: '/used-cars',
            selectedCity: this.state.selectedCity,
            selectedMaker:this.state.selectedMaker,
            selectedModel:this.state.selectedModel,
            city:this.state.city,
            maker: this.state.maker,
            model:this.state.model|null

        }}
        disabled={true}
        
        className={classes.link}>
          <Button size="lg"
      id="searchCars"
     ononClick={this.getStudentByRollNo}
      style={{ width: 300,  backgroundColor: "Red", }}
     
    >
      Search Cars</Button></Link>
     
    
              
              </div>
            
          </GridContainer> 

     
          
       
        </div>
      </Parallax>

      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <ProductSection />
         
        </div>
      </div>





{/* 
      <div className={classNames(classes.main)}>
        <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload />
      </div> */}
      <Footer />
    </div>
  
    
    );
  }
}
export default withStyles(styles)(Components)

