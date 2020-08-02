import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import Input from '@material-ui/core/Input';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import MAKER_MODEL from "assets/enums/MAKER_MODEL.js";
import CITY from "assets/enums/CITY.js";
import FILTERS from "assets/enums/FILTERS.js";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import { Container, Row, Col } from "react-bootstrap";


// Destructure props
const FirstStep = ({
  handleNext,
  handleChange,
  values: { year, maker, model, variant, rto, ownership,kms, images
   },
  fieldError,
  isError
}) => {
  // Check if all values are not empty
  const isEmpty =
  year.length > 0 &&
    maker.length > 0 &&
    model.length > 0 &&
    variant.length > 0 &&
    rto.length > 0 &&
    ownership.length>0;


    const disabledMaker = year.length > 0
    const disabledModel = maker.length > 0
    const disabledVariant = model.length > 0;
    const disabledRto = variant.length > 0;
    const disabledkms = rto.length > 0;
    const disabledOwnership = kms.length > 0;
    

  

  return (
    <Fragment>
      <Grid container justify='center' spacing={3} noValidate>
        <Grid item>
        <FormControl variant="outlined">
           <InputLabel htmlFor="year">Year</InputLabel>
                      <Select value={year} onChange={
                        handleChange("year")}
                        id="year"
                         clearOnEscape={true}
                        openOnFocus={true}
                       style={{ width: 250, backgroundColor: "white", }}
                       
                        label="Year"
                      >
<MenuItem value={"2011"}>2011 </MenuItem>
<MenuItem value={"2012"}>2012 </MenuItem>
<MenuItem value={"2013"}>2013 </MenuItem>
<MenuItem value={"2014"}>2014 </MenuItem>
<MenuItem value={"2015"}>2015 </MenuItem>
<MenuItem value={"2016"}>2016 </MenuItem>
<MenuItem value={"2017"}>2017 </MenuItem>
<MenuItem value={"2018"}>2018 </MenuItem>
<MenuItem value={"2019"}>2019 </MenuItem>
<MenuItem value={"2020"}>2020 </MenuItem>
               </Select>
                    </FormControl>
                    </Grid>
                  
                  
                    <Grid item >
                    <FormControl variant="outlined" >
                    <InputLabel htmlFor="maker">Select Maker</InputLabel>                  
                  <Select
                    id="maker"
                    openOnFocus={true}
                    disabled={!disabledMaker }
                    clearOnEscape={true}
                    value={maker}
                    onChange={(handleChange("maker"))  
                       
                    }
                 
                    style={{ width: 250, backgroundColor: "white", }}
                  
                    label="Select Maker"
                  >
                 

                    { 
                     year.length>0 &&  
                     
                     Object.keys(MAKER_MODEL).map((element,i) => {
                      // console.log("menu Item : "+JSON.stringify(MAKER_MODEL[maker.toUpperCase()]))

                      return (<MenuItem key={i} value={element}>
                        {element}</MenuItem>);
                    }
                    )
                    
                    }

                  </Select>
                </FormControl>

        </Grid>

        <Grid item >
                    <FormControl variant="outlined" >
                    <InputLabel htmlFor="model">Select Model</InputLabel>                  
                  <Select
                    id="model"
                    openOnFocus={true}
                    disabled={!disabledModel }
                    clearOnEscape={true}
                    value={model}
                   
                 onChange = { handleChange("model")}
                   

                    style={{ width: 250, backgroundColor: "white", }}
                  
                    label="Select Model"
                  >

                    { 
                     maker.length>0 &&  
                     
                     Object.keys(MAKER_MODEL[maker.toUpperCase()]).map((element,i) => {
                      // console.log("menu Item : "+JSON.stringify(MAKER_MODEL[maker.toUpperCase()]))

                      return (<MenuItem key={i} value={element}>
                        {element}</MenuItem>);
                    }
                    )
                    
                    }
                  </Select>
                </FormControl>

        </Grid>



        <Grid item >
                    <FormControl variant="outlined" >
                    <InputLabel htmlFor="variant">Select Variant</InputLabel>                  
                  <Select
                    id="variant"
                    openOnFocus={true}
                    disabled={!disabledVariant }
                    clearOnEscape={true}
                    value={variant}
                    onChange={  handleChange("variant")}   
                 
                    style={{ width: 250, backgroundColor: "white", }}
                  
                    label="Select Variant"
                  >
                    <MenuItem value="Petrol">Petrol</MenuItem>
                    <MenuItem value="Diesel">Diesel </MenuItem>
                    <MenuItem value="CNG">CNG </MenuItem>
                    <MenuItem value="Electric">Electric </MenuItem>
                    

                  </Select>
                </FormControl>

        </Grid>
</Grid>
<Grid container justify='center' spacing={3} noValidate>

        <Grid item >
                    <FormControl variant="outlined" >
                    <InputLabel htmlFor="rto">Select RTO</InputLabel>                  
                  <Select
                    id="rto"
                    openOnFocus={true}
                    onChange={  handleChange("rto")}   
                    value = {rto}
                    clearOnEscape={true}
                    disabled={!disabledRto }
                  
                    style={{ width: 250, backgroundColor: "white", }}
                   
                    label="Select rto"
                  >
                    { 
                  
                     
                     Object.keys(CITY).map((element,i) => {
                      // console.log("menu Item : "+JSON.stringify(MAKER_MODEL[maker.toUpperCase()]))

                      return (<MenuItem key={i} value={element}>
                        {element}</MenuItem>);
                    }
                    )
                    
                    }
                  </Select>
                </FormControl>

        </Grid>

        <Grid item >
                    <FormControl variant="outlined" >
                  <InputLabel htmlFor="kms">Select Kms Driven</InputLabel>
                  <Select
                    id="kms"
                    openOnFocus={true}
                    value = {kms}
                    clearOnEscape={true}
                    onChange={  handleChange("kms")}
                   // value={this.state.selectedMaker}
                    style={{ width: 250, backgroundColor: "white", }}
                    disabled={!disabledkms }
                    label="Select Variant"
                  >
                    <MenuItem value="10000">10,000</MenuItem>
                    <MenuItem value="15000">15,000</MenuItem>
                    <MenuItem value="20000">20,000</MenuItem>
                    <MenuItem value="25000">25,000</MenuItem>
                    <MenuItem value="30000">30,000</MenuItem>
                    <MenuItem value="35000">35,000</MenuItem>
                    <MenuItem value="40000">40,000</MenuItem>
                  </Select>
                </FormControl>

        </Grid>


        <Grid item >
                    <FormControl variant="outlined" >
                  <InputLabel  htmlFor="ownership"> Ownership</InputLabel>
                  <Select
                    id="selectMaker"
                    openOnFocus={true}
                    disabled={!disabledOwnership}
                    clearOnEscape={true}
                    onChange={  handleChange("ownership")}
                    value={ownership}
                    style={{ width: 250, backgroundColor: "white", }}
                   
                    label="Select Variant"
                  >
                    <MenuItem value="First">     First    </MenuItem>
                    <MenuItem value="Second">     Second    </MenuItem>
                    <MenuItem value="Third">     Third    </MenuItem>
                

                  </Select>
                </FormControl>

        </Grid>

       </Grid>
<br/> <br/>
        <Grid container alignContent='center' spacing={3} noValidate>

        <Grid  alignContent='center'>


</Grid>
</Grid>

     
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          disabled={!isEmpty || isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Fragment>
  )
}

export default FirstStep
