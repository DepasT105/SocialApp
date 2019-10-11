import React, { Component, Fragment } from "react";
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import Typograpghy from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import dayjs from "dayjs";

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  }
});

class UserProfileInfo extends Component {

  render() {
    const {
      classes,
      userInfo: { website, bio, imageUrl, location, createdAt,handle }
    } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className={"image-wrapper"}>
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="profileImage"
              onChange={this.handleImageChange}
              hidden="hidden"
            />
          </div>
          <hr />
          <div className="profile-details">
            <Typograpghy color="primary" variant="h5">
              @{handle}
            </Typograpghy>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" />
                <span>{location}</span>
              </Fragment>
            )}
            <hr />
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer ">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(UserProfileInfo);
