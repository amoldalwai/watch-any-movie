import React, { useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Chip from '@material-ui/core/Chip';
import Fab from "@material-ui/core/Fab";
// import DialogActions from "@material-ui/core/DialogActions";
// import ReactPlayer from "react-player";
// import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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
  const fullScreenData = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = React.useState(true);
  const [openfs, setOpenfs] = React.useState(false);
  // const [altServer, setaltServer] = useState();

  const [movielink, setmovielink] = useState();
  // const [linktitle, setlinktitle] = useState();
  const [poster, setposter] = useState("https://i.pinimg.com/originals/ff/20/1b/ff201b10f8fb094d3ac640f8687ed511.gif");
  const [year, setyear] = useState("Loading...");
  const [genre, setgenre] = useState("Loading...");
  const [plot, setplot] = useState("Loading...");
  const [title, settitle] = useState("Loading...");
  const [imdbrate, setimdbrate] = useState("...");
  const [metascore, setmetascore] = useState("...");
  // const video = "";
  axios
    .get(`https://www.omdbapi.com/?apikey=4eb65943&i=${props.imval}`)
    .then((res) => {
      setposter(res.data.Poster);
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
        //`https://123moviesplayer.com/movie/${props.imval}`
        //`javascript:window.location.replace("https://123moviesplayer.com/movie/${props.imval}")`
        // `https://moviehungershaven.xyz/tplayer/npls1.php?id=${props.imval}`
      );
      // setaltServer(
      //   `javascript:window.location.replace("https://123moviesplayer.com/movie/${props.imval}")`
      // );

      // video = PluginManager.getVideoURL(movielink);
    });
  const altServerLink = () => {
    setmovielink(`https://123moviesplayer.com/movie/${props.imval}`);
  };

  const handleClose = () => {
    setOpen(false);
    props.funsetdetailbool();
  };
  const handleClickOpenFs = () => {
    setOpenfs(true);
  };

  const handleCloseFs = () => {
    setOpenfs(false);
  };

  return (
    <>
      <Dialog
        open={open}
        // maxWidth="xl"
        fullScreen={fullScreenData}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
         
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
       <div className="movieDataDiv " >
       <img src={poster} className="moviePosterDiv"  alt ="movie-poster"/>
       <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            color: "white",
            width: "80px",
            height: "80px",
            background: "rgb(0,0,0,0.3)",
            borderRadius: "5px",
            
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>

       <Fab color="primary" style={{
              background: "#b71c1c"}} fontSize="large" onClick={handleClickOpenFs} className="playBtn">
        <PlayArrowIcon />
      </Fab>
      
         <div className="movieContent">
      <h4>{title}</h4>
      <hr style={{background:"white"}}/>
   
      <span style={{float:"right"}}>{year}</span>
      <span style={{float:"left"}}>{genre}</span>
      
      <i style={{color:"gray",float:"left",marginTop:"10px"}}>{plot}</i>
      
      
      
      <Chip
        label={imdbrate}
       
        style={{
          background: "#ffea00",color:"black",borderRadius:"5px",marginTop:"10px",fontWeight:"bolder"}}
      />
       <Chip
        label={metascore}
        color="primary"
        style={{
          marginTop:"10px", borderRadius:"5px",marginLeft:"10px",fontWeight:"bolder"}}
      />
      <br/>
         
      
      </div>
        </div>

      

       
        


         {/* btn to full screen  */}

         <div>
      

     


      <Dialog
        fullScreen={fullScreen}
        open={openfs}
        onClose={handleCloseFs}
        aria-labelledby="responsive-dialog-title"
      >
            <iframe
          src={movielink}
          title="movieServer"
          width="100%"
          height="100%"
          id="myId"
          style={{ border: "none" }}
          sandbox="allow-same-origin allow-scripts  allow-forms"
        />
          
      
          <IconButton
          onClick={handleCloseFs}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            color: "white",
            width: "80px",
            height: "80px",
            background: "rgb(0,0,0,0.5)",
            borderRadius: "100%",
            
          }}>

           <ArrowBackIcon fontSize="large" />
        
          </IconButton>

          <IconButton
          onClick={() => altServerLink()}
          style={{
            position: "absolute",
            top: "0px",
            right: "15vw",
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
    </div>


      </Dialog>

     
      
    </>
  );
};
export default Detail;
