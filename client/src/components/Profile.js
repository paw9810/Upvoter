import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import testimg from "../img/testimage.jpg";

const useStyles = makeStyles({
  media: {
    height: 100,
    width: 100,
  },
  commentMargin: {
    marginTop: "10px",
  },
  profileMargin: {
    marginBottom: "15px",
  },
});

const Profile = () => {
  const classes = useStyles();

  return (
    <Box className={classes.profileMargin}>
      <Container maxWidth="sm">
        <Card>
          <Grid container>
            <Button>
              <CardMedia
                className={classes.media}
                image={testimg}
                title="Paella dish"
              />
            </Button>
            <CardActions>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography variant="h6" component="p">
                    Profile name
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p" component="span">
                    {`Karma: `}
                  </Typography>
                  <Typography variant="p" component="span">
                    250
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
