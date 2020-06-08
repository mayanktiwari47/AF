import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"

const Success = () => {
  return (
    <Fragment>
      <Typography variant="h3" align="center">
        Thank you for your Application!
      </Typography>
      <Typography variant="h5" align="center" style={{ marginTop: 40 }}>
        Our Sales Agent will contact you shortly.
      </Typography>
    </Fragment>
  )
}

export default Success
