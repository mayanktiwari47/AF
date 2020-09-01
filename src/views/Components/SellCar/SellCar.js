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

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import styles from "assets/jss/material-kit-react/views/components.js";
import MAKER_MODEL from "assets/enums/MAKER_MODEL.js";
import CITY from "assets/enums/CITY.js";
import ProductSection from "../Sections/ProductSection.js";
import { withStyles } from "@material-ui/core/styles";

import StepForm from "./form/StepForm.js";

import Input from '@material-ui/core/Input';




class SellCar extends Component {


  
  constructor(props) {

    super(props);
    //this.populateDropDowns();
    this.stepFormRef=React.createRef();
    this.state = {
      city: null,
      maker: null,
      model: null,
      selectedMaker: null,
      selectedModel: null,
      selectedCity: null,

      isModelDisabled: true,


      errors: null,

    };

    this.handleChange = this.handleChange.bind(this);
  
    



  }

 


  // { ...rest } = props;
  componentDidMount() {
   
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


  handleChange = (event) => {
    console.log("handleCheckChange")

    if (event.target.checked)
      this.setState({ checked: true });
    else
      this.setState({ checked: false });
  };


  

 



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
        <div className={classes.parallex}>
        <Parallax image={require("assets/img/homeBKD.jpg")}>
          <div className={classes.container}>

            <GridContainer>
              <GridItem> <div>

                <div className={classes.brand}>
                 <h3 >
                    Sell your car in three simple steps!
                </h3>
                <Button size=""
                    id="sellCar"
                    onClick={() => { console.log("steporm: ",this.stepFormRef);
                     if (this.stepFormRef && this.stepFormRef.current) {
                      this.stepFormRef.current.scrollIntoView();
                    } }}
                   
                   style={{ width: 300, backgroundColor: "Red", }}>Sell Car</Button>
                 </div>


              </div>



              </GridItem>

             
           


            
            </GridContainer>
            



          </div>
         
        </Parallax>
 
        </div>
       
        <div className={classNames(classes.main)}>
          <div className={classes.container}>
            
<div ref={this.stepFormRef} > 
          <StepForm   />
          </div>
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
export default withStyles(styles)(SellCar)

