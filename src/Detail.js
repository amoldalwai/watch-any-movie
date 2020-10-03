import React, { useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Iframe from "react-iframe";
// import PluginManager from "123-movies/src/PluginManager";
import Chip from "@material-ui/core/Chip";

const Detail = (props) => {
  const [open, setOpen] = React.useState(true);
  const [movielink, setmovielink] = useState();

  const [year, setyear] = useState();
  const [genre, setgenre] = useState();
  const [plot, setplot] = useState();
  const [title, settitle] = useState("");
  const [imdbrate, setimdbrate] = useState();
  const [metascore, setmetascore] = useState();
  // const video = "";
  axios
    .get(`https://www.omdbapi.com/?apikey=4eb65943&i=${props.imval}`)
    .then((res) => {
      setyear("(" + res.data.Year + ")");
      setgenre(res.data.Genre);
      setplot(res.data.Plot);
      settitle(res.data.Title);
      setimdbrate("Imdb: " + res.data.imdbRating);
      setmetascore("Metascore: " + res.data.Metascore);

      // setlinktitle(title.replace(/ /g, "-").toLowerCase());
      setmovielink(
        // `https://moviehungershaven.xyz/tplayer/npls1.php?id=${props.imval}`
        //  ` https://database.gdriveplayer.io/player.php?imdb=${props.imval}`
        `javascript:window.location.replace("https://database.gdriveplayer.io/player.php?imdb=${props.imval}")`
      );
      // video = PluginManager.getVideoURL(movielink);
    });

  const handleClose = () => {
    setOpen(false);
    props.funsetdetailbool();
  };

  return (
    <>
      <Dialog
        open={open}
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // className="moviePosterDialog"
      >
        <Iframe
          url={movielink}
          width="100%"
          height="550px"
          id="myId"
          display="block"
          position="relative"
          allow="fullscreen"
        />
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontSize: "12px" }}>
              {genre} <b>{year}</b>
            </span>
            <Chip
              label={metascore}
              color="secondary"
              style={{ float: "right" }}
            />
            <Chip label={imdbrate} color="primary" style={{ float: "right" }} />
            <hr />
            <span>{plot}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <a href={movielink} color="primary">
            Fullscreen
          </a>

          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Detail;
