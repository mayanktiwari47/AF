import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>How it works</h2>
          </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem  xs={12} sm={12} md={4}>
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
         // alt="Contemplative Reptile"
         // height="140"
         image={require('assets/img/hiw1.jpg')}
         
          title="Great value cars"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Great value cars
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          We own all the cars we list and have thoroughly inspected and reconditioned each one to the highest standards.
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
          </GridItem>
          <GridItem  xs={12} sm={12} md={4}>
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
         // alt="Contemplative Reptile"
         // height="140"
         image={require('assets/img/hiw2.jpg')}
         
          title="Buy entirely online"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Buy entirely online
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Select from our wide range of high-quality cars and complete your purchase or financing fully online.          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
          </GridItem>
          <GridItem  xs={12} sm={12} md={4}>
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
         // alt="Contemplative Reptile"
         height="225"
         image={require('assets/img/hiw3.jpg')}
         
          title="Free home delivery"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Free home delivery
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Pick a slot to have your car delivered to your door in as little as 72 hours, at a time that's convenient to you.          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
          </GridItem>
         
<GridItem style={{alignItems:"center"}}>
          <Button size="small" color="primary">
          Learn More
        </Button>
        </GridItem>

        </GridContainer>
      </div>
       <br/>   <br/>
       <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Complete car buying confidence</h2>
          </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem  xs={12} sm={12} md={4}>
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
         // alt="Contemplative Reptile"
         // height="140"
         image={require('assets/img/quality.jpg')}
         
          title="Great value cars"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Great value cars
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          We own all the cars we list and have thoroughly inspected and reconditioned each one to the highest standards.
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
          </GridItem>
          <GridItem  xs={12} sm={12} md={4}>
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
         // alt="Contemplative Reptile"
         // height="140"
         image={require('assets/img/hiw2.jpg')}
         
          title="Buy entirely online"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Buy entirely online
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Select from our wide range of high-quality cars and complete your purchase or financing fully online.          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
          </GridItem>
          <GridItem  xs={12} sm={12} md={4}>
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
         // alt="Contemplative Reptile"
         height="225"
         image={require('assets/img/hiw3.jpg')}
         
          title="Free home delivery"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Free home delivery
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Pick a slot to have your car delivered to your door in as little as 72 hours, at a time that's convenient to you.          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
          </GridItem>
         
<GridItem style={{alignItems:"center"}}>
          <Button size="small" color="primary">
          Learn More
        </Button>
        </GridItem>

        </GridContainer>
      </div>

     
    </div>
  );
}
