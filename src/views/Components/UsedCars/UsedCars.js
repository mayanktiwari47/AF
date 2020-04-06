import React, { Component } from 'react';
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

import {
  ReactiveBase,
  DataSearch,
  SingleRange,
  ResultCard,
  RangeSlider
} from '@appbaseio/reactivesearch';
import './App.css';

const useGridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

}));
const useStyles = makeStyles(styles);

const gridClasses = useGridStyles();

// const [checked, setChecked] = React.useState(false);
const checked = false;


// const this.handleChange = (event) => {
//   setChecked(event.target.checked);
// };


const classes = useStyles();

const { ...rest } = this.props;


class UsedCars extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.fetchResultOnExamName = this.fetchResultOnExamName.bind(this);

    // Calling method on page load to load all classes and sections for the drop down
    this.fetchAllClassesAndSections();
  }

  handleChange() {

  }

  render() {
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

                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>City</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <div className={"filters-child"}>



                      <FormControlLabel
                        control={<Checkbox

                          color="primary"
                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Delhi"
                      />

                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Gurgaon"
                      />
                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Noida"
                      />

                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Mumbai"
                      />

                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Banglore"
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
                    <Typography className={classes.heading}>Make and Model</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <div className={"filters-child"}>
                      <br />
                      <Autocomplete
                        id="selectMaker"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
                        renderInput={(params) => <TextField {...params} label="Make" variant="outlined" />}
                      />
                      <br />
                      <Autocomplete
                        id="selectModel"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
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

                    <div className={"filters-child"}>
                      <br />
                      <Autocomplete
                        id="priceFrom"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
                        renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                      />
                      <br />
                      <Autocomplete
                        id="priceTo"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
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

                    <div className={"filters-child"}>
                      <br />
                      <Autocomplete
                        id="yearFrom"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
                        renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                      />
                      <br />
                      <Autocomplete
                        id="yearTo"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
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

                    <div className={"filters-child"}>
                      <br />
                      <Autocomplete
                        id="mileageFrom"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
                        renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                      />
                      <br />
                      <Autocomplete
                        id="mileageTo"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
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
                    <Typography className={classes.heading}>Transmission & Engine Size</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <div className={"filters-child"}>
                      <h5>Transmission</h5>


                      <FormControlLabel
                        control={<Checkbox

                          color="primary"
                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Manual"
                      />

                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Automatic"
                      />


                    </div>
                  </ExpansionPanelDetails>
                  <ExpansionPanelDetails>
                    <div className={"filters-child"}>
                      <h5>Engine Size</h5>

                      <Autocomplete
                        id="engSizeFrom"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
                        renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                      />
                      <br />
                      <Autocomplete
                        id="engSizeTo"
                        options={[
                          { title: 'The Shawshank Redemption', year: 1994 },
                          { title: 'The Godfather', year: 1972 },
                          { title: 'The Godfather: Part II', year: 1974 },
                        ]}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 200, backgroundColor: "white", }}
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


                    <div className={gridClasses.root}>
                      <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                          <React.Fragment>
                            <Grid item xs={4}>
                              <ReactCircleColorPicker colors={[{ hex: '#FFFFFF' }]} />
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
                    <Typography className={classes.heading}>Fule Type</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <div className={"filters-child"}>



                      <FormControlLabel
                        control={<Checkbox

                          color="primary"
                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Petrol"
                      />

                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Diesel"
                      />
                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
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
                    <Typography className={classes.heading}>No of Owners</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <div className={"filters-child"}>



                      <FormControlLabel
                        control={<Checkbox

                          color="primary"
                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="First Owner"
                      />

                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
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
                    <Typography className={classes.heading}>Body Type</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <div className={"filters-child"}>



                      <FormControlLabel
                        control={<Checkbox

                          color="primary"
                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Hatchback"
                      />

                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
                          onChange={this.handleChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Sedan"
                      />
                      <FormControlLabel
                        control={<Checkbox
                          color="primary"

                          checked={checked}
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


      </div >

    );
  }
}

export default UsedCars;