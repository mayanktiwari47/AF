import React from "react";
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

import {
  ReactiveBase,
  DataSearch,
  SingleRange,
  ResultCard,
  RangeSlider
} from '@appbaseio/reactivesearch';
import './App.css';


const useStyles = makeStyles(styles);


export default function UsedCars(props) {

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const classes = useStyles();

  const { ...rest } = props;
  const range = {
    start:0,
    end:1000000
  };
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
     
     <div className={classNames(classes.main)}>
       <SectionDownload/>
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

            <div className = {"filters"}>
                <h3> Filters </h3>
                          
            </div>


           
            <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Make and Model</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         
        <div className = {"filters-child"}>
            <br /> 
                <Autocomplete
      id="selectMaker"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Make" variant="outlined" />}
    />
<br />   
<Autocomplete
      id="selectModel"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="Model" variant="outlined" />}
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
          <Typography className={classes.heading}>Price(in Lakhs)</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         
        <div className = {"filters-child"}>
                <br/>
                <Autocomplete
      id="priceFrom"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
    />
<br />   
<Autocomplete
      id="priceTo"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
    />

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
          <Typography className={classes.heading}>Year</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         
        <div className = {"filters-child"}>
                <br/>
                <Autocomplete
      id="yearFrom"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
    />
<br />   
<Autocomplete
      id="yearTo"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
    />

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
          <Typography className={classes.heading}>Mileage</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         
        <div className = {"filters-child"}>
                <br/>
                <Autocomplete
      id="mileageFrom"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
    />
<br />   
<Autocomplete
      id="mileageTo"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
    />

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
          <Typography className={classes.heading}>Gearbox & Engine Size</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         
        <div className = {"filters-child"}>
          <h6>Gearbox</h6>


          <FormControlLabel
            control={    <Checkbox
        
              color="primary"
           checked={checked}
           onChange={handleChange}
           inputProps={{ 'aria-label': 'primary checkbox' }}
         />}
            label="Manual"
          />

      
<br />   

<FormControlLabel
            control={    <Checkbox 
              color="primary"
                
                     checked={checked}
                     onChange={handleChange}
                     inputProps={{ 'aria-label': 'primary checkbox' }}
                   />}
             label="Automatic" 
          />



            <br />    
            </div>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
        <div className = {"filters-child"}>
          <h6>Engine Size</h6>
              
                <Autocomplete
      id="priceFrom"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
    />
<br />   
<Autocomplete
      id="priceTo"
      options={ [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
      ]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300,  backgroundColor: "white", }}
      renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
    />

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
          <Typography className={classes.heading}>Color</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         
        <div className = {"filters-child"}>
               <FormControlLabel
            control={    <Checkbox
        
              color="primary"
           checked={checked}
           onChange={handleChange}
           inputProps={{ 'aria-label': 'primary checkbox' }}
         />}
            label="White"
          />

      
<br />   

<FormControlLabel
            control={    <Checkbox 
              color="primary"
                
                     checked={checked}
                     onChange={handleChange}
                     inputProps={{ 'aria-label': 'primary checkbox' }}
                   />}
             label="Black" 
          />



            <br />    
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
              onData={(res)=>(
                {
                  "image": res.image,
                  "title": res.original_title,
                  "description":  res.average_rating + " ★ "
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



<div><Footer/></div>

      
    </div>

  );
}
