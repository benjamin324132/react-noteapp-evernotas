import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../../firebase";
import NotesApp from './../Notes/App'
import { withRouter } from "react-router-dom";

const styles = theme => ({
  main: {
    width: "100%",
    height: "100%"

  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

function Dashboard(props) {
  const { classes } = props;

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please login first");
    props.history.replace("/login");
    return null;
  }

  const [quote, setQuote] = useState("");

  useEffect(() => {
    firebase.getCurrentUserQuote().then(setQuote);
  });
  
  return (
    <main className={classes.main}>
        <Typography component="h1" variant="h5">
          Hello {firebase.getCurrentUsername()}
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={logout}
          className={classes.submit}
        >
          Logout
        </Button>
        <NotesApp userId={firebase.getCurrentId()}/>
    </main>
  );

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }
}

export default withRouter(withStyles(styles)(Dashboard));