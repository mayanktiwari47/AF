import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
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
import enums from "assets/enums/enums.js";
import ProductSection from "./Sections/ProductSection.js";

const useStyles = makeStyles(styles);

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
];
export default function Components(props) {
  const classes = useStyles();
  
  const { ...rest } = props;
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
        {...rest}
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
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
    />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Autocomplete
      id="selectMaker"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Select Maker" variant="outlined" />}
    />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Autocomplete
      id="selectModel"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Select Model" variant="outlined" />}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button size="lg"
      id="searchCars"
     
      style={{ width: 300,  backgroundColor: "Red", }}
     
    >
      Search</Button>
     
              
              
              </div>
            
          </GridContainer> 

     
          
       
        </div>
      </Parallax>

      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <ProductSection />
         
        </div>
      </div>






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
      </div>
      <Footer />
    </div>
  
  );
}
