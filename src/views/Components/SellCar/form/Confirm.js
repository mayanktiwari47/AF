import React, { Fragment } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import ImageUploading from "react-images-uploading";
import { Container, Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid"
import axios from "axios";
// Destructure props


const Confirm = ({
  handleNext,
  handleBack,
  values: {  name,email,phone,year,maker,model,variant,rto,kms,ownership,images}
}) => {

  const maxNumber = 69;
  const onChange = imageList => {
    // data for submit
  //  console.log("imageList: ", JSON.stringify(imageList));
    images=imageList;
//   handleChange("images");
  };

  const submitData = ()=>{
    
    
    console.log("images: ",images)
   let dataURLArray=[];
    for(var i =0;i<images.length;i++)
    dataURLArray.push({"data":images[i].dataURL.split(",")[1]
    ,"contentType":"image/jpeg"})

    axios.post("http://localhost:8001/api/uploadSellCarDetails",
     {"name" :name,"email":email,"phone":phone,"year":year,"maker":maker,"model":model,"variant":variant,
     "rto":rto,"kms":kms,"ownership":ownership,"images": dataURLArray})
      .then(cRes => {
       console.log('cRes - SellCar response- ' + JSON.stringify(cRes.data));

       if(cRes.data.message==="Sell Car details inserted successfully")
       handleNext();
        if (cRes.data.errors) {
console.log(JSON.stringify(cRes));

        //  return this.setState({ errors: cRes.data.errors });

        } 
      });
  
  
  
  }
  return (
    <Fragment>

      <List disablePadding>
        <ListItem>
          <ListItemText primary="Name" secondary={name} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="phone"
            secondary={phone.length > 0 ? phone : "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Email Address" secondary={email} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Car Maker" secondary={maker} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Car Model" secondary={model} />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary="Car Year" secondary={year} />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary="Car Variant" secondary={variant} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Kms Driven" secondary={kms} />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary="City" secondary={rto} />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary="Ownership" secondary={ownership} />
        </ListItem>

        <Divider />
        <br/>

        <Grid container alignContent='center' spacing={3} noValidate>
  <Grid item>
      <ImageUploading multiple
       onChange={onChange}
        maxNumber={maxNumber}
        value={images}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write .your building UI
         <Container>
           <Row>
             <Col>
            <Button style={{ width: 250, backgroundColor: "aqua", }}
             onClick={onImageUpload}>Upload Car images</Button>
           </Col>
          
          
            {imageList.map(image => (
               
                
               <div key={image.key} style = {{ "border":"1px solid black"}} >
                 <Row>
                   <Col>
                <img src={image.dataURL} alt="" width="100"  height="100"/>
                </Col>
                </Row>
               
              
                <Row>
                <Col> 
                  <Button    onClick={image.onRemove}>Remove</Button>
                  </Col>
                  </Row>
               </div>
             
            ))} 
            </Row>
        </Container>
        )}
      </ImageUploading>
      </Grid>
      </Grid>


        
      
      </List>

      

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "center" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          color="secondary"
          onClick={submitData}
        >
          Confirm & Continue
        </Button>
      </div>
    </Fragment>


  )
}

export default Confirm
