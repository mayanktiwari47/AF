import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructure props
const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { email, phone, name },
  fieldError,
  isError
}) => {
  // Check if all values are not empty
  const isEmpty =  name.length > 2
   && phone.length>9 && 
   phone.length<11  &&
   !fieldError.phone 
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            placeholder="Enter your Name"
            defaultValue={name}
            onChange={handleChange("name")}
            margin="normal"
            error={fieldError.name !== ""}
            helperText={fieldError.name !== "" ? `${fieldError.name}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Your email address"
            type="email"
            defaultValue={email}
            onChange={handleChange("email")}
            margin="normal"
            error={fieldError.email !== ""}
            helperText={fieldError.email !== "" ? `${fieldError.email}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone number*"
            name="phone"
            placeholder="i.e: xxx-xxx-xxxx"
            defaultValue={phone}
            onChange={handleChange("phone")}
            margin="normal"
            error={fieldError.phone !== ""}
            helperText={fieldError.phone !== "" ? `${fieldError.phone}` : ""}
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!isEmpty||isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Fragment>
  )
}

export default SecondStep
