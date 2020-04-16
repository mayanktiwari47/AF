import { container } from "assets/jss/material-kit-react.js";
import { black } from "color-name";

const componentsStyle = {
  container,
  brand: {
    color: { black },
    marginTop: "-100px",
    textAlign: "center",
    position: "relative",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "600",
    //margin: "-200px 20px 0px",
    display: "inline-block",
    fontFamily: "Helvetica",
  },
  subtitle: {
    fontWeight: "400",
    fontSize: "1.5rem",
    maxWidth: "1000px",
    //marginTop: "0px",
    fontFamily: "Helvetica",
    position: "relative",


  },

  dropdown: {
    display: "flex",
    alignItems: 'center',
   left:"50px",
    bottom:"20px",
   
   fontFamily: "Helvetica",
    position:"absolute",
    justifyContent: "center",
  textAlign: "center",
    


  },

  
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  }
};

export default componentsStyle;
