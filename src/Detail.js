import React, { useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
// import Fab from "@material-ui/core/Fab";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import { NavLink } from "react-router-dom";
// import Iframe from "react-iframe";
// import Fullscreen from "./Fullscreen";
// import Fullbtn from "./Fullbtn";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// import PluginManager from "123-movies/src/PluginManager";
// import Chip from "@material-ui/core/Chip";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import ReactPlayer from "react-player";
// import { Player } from "video-react";
import { useTheme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Detail = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [open, setOpen] = React.useState(true);

  const [movielink, setmovielink] = useState();
  // const [linktitle, setlinktitle] = useState();
  // const [poster, setposter] = useState();
  // const [year, setyear] = useState();
  // const [genre, setgenre] = useState();
  // const [plot, setplot] = useState();
  // const [title, settitle] = useState("");
  // const [imdbrate, setimdbrate] = useState();
  // const [metascore, setmetascore] = useState();
  // const video = "";
  axios
    .get(`https://www.omdbapi.com/?apikey=4eb65943&i=${props.imval}`)
    .then((res) => {
      // setposter(res.data.Poster);
      // setyear("(" + res.data.Year + ")");
      // setgenre(res.data.Genre);
      // setplot(res.data.Plot);
      // settitle(res.data.Title);
      // setimdbrate("Imdb: " + res.data.imdbRating);
      // setmetascore("Metascore: " + res.data.Metascore);

      // setlinktitle(title.replace(/ /g, "-").toLowerCase());
      setmovielink(
        // `https://moviehungershaven.xyz/tplayer/npls1.php?id=${props.imval}`
        //  ` https://database.gdriveplayer.io/player.php?imdb=${props.imval}`
        `javascript:window.location.replace("https://database.gdriveplayer.io/player.php?imdb=${props.imval}")`
      );
      // video = PluginManager.getVideoURL(movielink);
    });
  const altServerLink = () => {
    setmovielink(`https://123moviesplayer.com/movie/${props.imval}`);
  };

  const handleClose = () => {
    setOpen(false);
    props.funsetdetailbool();
  };

  return (
    <>
      <Dialog
        open={open}
        // maxWidth="xl"
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // className="moviePosterDialog"
      >
        {/* <img
          src={poster}
          maxWidth="sm"
          className="moviePosterDetail"
          alt="Poster"
        /> */}

        {/* <iframe src={movielink} className="moviePosterDetail"></iframe> */}
        {/* <Pla
          playsInline
          poster={poster}
          src={movielink}
          // className="moviePosterDetail"
        /> */}
        <iframe
          src={movielink}
          title="movieServer"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          sandbox="allow-same-origin allow-scripts  allow-forms"
        />

        {/* <ReactPlayer url={movielink} /> */}

        {/* <iframe src={movielink}></iframe> */}

        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            color: "white",
            width: "80px",
            height: "80px",
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => altServerLink()}
          style={{
            position: "absolute",
            top: "0px",
            right: "4vw",
            color: "white",
            width: "120px",
            height: "60px",
            fontWeight: "bolder",
            background: "rgb(0,0,0,0.5)",
            borderRadius: "5px",
          }}
        >
          Server 2
        </IconButton>
      </Dialog>
    </>
  );
};
export default Detail;
