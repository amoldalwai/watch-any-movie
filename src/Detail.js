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
  const [openSeries, setOpenSeries] = React.useState(false);
  

  const [movielink, setmovielink] = useState();
  const [serieslink, setserieslink] = useState();
  
  const [poster, setposter] = useState("https://i.pinimg.com/originals/ff/20/1b/ff201b10f8fb094d3ac640f8687ed511.gif");
  const [year, setyear] = useState("Loading...");
  const [genre, setgenre] = useState("Loading...");
  const [plot, setplot] = useState("Loading...");
  const [title, settitle] = useState("Loading...");
  const [imdbrate, setimdbrate] = useState("...");
  const [metascore, setmetascore] = useState("...");
  const [mtype,setmtype]=useState();
  const [season,setseason]=useState("01");
  
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
      setmtype(res.data.Type);

     

       

      
      setmovielink(
      
        `javascript:window.location.replace("https://database.gdriveplayer.io/player.php?imdb=${props.imval}")`
      
      );
      setserieslink(
      
        `javascript:window.location.replace("https://gomo.to/show/${props.imval}/01-01")`
      
      );
      
    });
    
  

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
  const handleClickOpenSeries = () => {
    setOpenSeries(true);
  };

  const handleCloseSeries = () => {
    setOpenSeries(false);
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
       
       <div className="movieDataDiv " >
       <img src={poster} className="moviePosterDiv"  alt ="movie-poster"/>
       <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            color: "white",
            width: "60px",
            height: "60px",
            background: "rgb(0,0,0,0.3)",
            borderRadius: "100%",
            
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>

       <Fab color="primary" style={{
              background: "#b71c1c"}} fontSize="large" onClick={()=>{  (mtype ==="series") ? handleClickOpenSeries() : handleClickOpenFs()}} className="playBtn">
        <PlayArrowIcon />
      </Fab>
      
         <div className="movieContent">
      <h4>{title}</h4>
      <hr style={{background:"white"}}/>
   
      <span style={{float:"right"}}>{year}</span>
      <span style={{float:"left"}}>{genre}</span>
       {/* <span>Type:{mtype}</span> */}
      
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
          <select 
          value={movielink}
            onChange={ (event)=>{setmovielink(event.target.value+`${props.imval}`);}}
            style={{
              position: "absolute",
              top: "5px",
              right: "12vw",
              color: "white",
              width: "90px",
              height: "50px",
              background: "rgb(0,0,0,0.5)",
              padding:"5px",
              borderRadius:"5px"
            
              
            }}
          >
            <option value="https://database.gdriveplayer.io/player.php?imdb=">server 1</option>
            <option value="https://gomo.to/movie/">server 2</option>
            <option value="https://123moviesplayer.com/movie/">server 3</option>
            <option value="https://database.gdriveplayer.io/player.php?imdb=">server 4</option>
            </select>
      
          <IconButton
          onClick={handleCloseFs}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            color: "white",
            width: "60px",
            height: "60px",
            background: "rgb(0,0,0,0.5)",
            borderRadius: "100%",
            
          }}>

           <ArrowBackIcon fontSize="large" />
        
          </IconButton>

         
       
      </Dialog>
    </div>


      </Dialog>

     {/* series iframe */}

     <Dialog
        fullScreen={fullScreen}
        open={openSeries}
        onClose={handleCloseSeries}
        aria-labelledby="responsive-dialog-title"
      > 
     
        <iframe
          src={serieslink}
          title="movieServer"
          width="100%"
          height="100%"
          id="myId"
          style={{ border: "none" }}
          sandbox="allow-same-origin allow-scripts  allow-forms"
        />
 {/* for seasons */}
 <select 
          value={season}
            onChange={ (event)=>{setseason(event.target.value)}}
            style={{
              position: "absolute",
              top: "5px",
              left: "25vw",
            
              color: "white",
              width: "90px",
              height: "50px",
              background: "rgb(0,0,0,0.5)",
              padding:"5px",
              borderRadius:"5px"
            
              
            }}
          >
            <option value="01" selected="selected">Season </option>
            <option value="01" >Season 1</option>
            <option value="02" >Season 2</option>
            <option value="03" >Season 3</option>
            <option value="04" >Season 4</option>
            <option value="02" >Season 5</option>
            <option value="06" >Season 6</option>
            <option value="07" >Season 7</option>
            <option value="08" >Season 8</option>
            <option value="09" >Season 9</option>
            <option value="10" >Season 10</option>
            </select>
        {/* for  episode */}
          <select 
          value={serieslink}
            onChange={ (event)=>{setserieslink(`https://gomo.to/show/`+`${props.imval}/`+`${season}`+`-`+event.target.value );}}
            style={{
              position: "absolute",
              top: "5px",
              right: "12vw",
              color: "white",
              width: "90px",
              height: "50px",
              background: "rgb(0,0,0,0.5)",
              padding:"5px",
              borderRadius:"5px"
            
              
            }}
          >
            <option value="01" selected="selected">Episode</option>
            <option value="01" >Ep 1</option>
            <option value="02" >Ep 2</option>
            <option value="03" >Ep 3</option>
            <option value="04" >Ep 4</option>
            <option value="02" >Ep 5</option>
            <option value="06" >Ep 6</option>
            <option value="07" >Ep 7</option>
            <option value="08" >Ep 8</option>
            <option value="09" >Ep 9</option>
            <option value="10" >Ep 10</option>
            </select>

           
      
          <IconButton
          onClick={handleCloseSeries}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            color: "white",
            width: "60px",
            height: "60px",
            background: "rgb(0,0,0,0.5)",
            borderRadius: "100%",
            
          }}>

           <ArrowBackIcon fontSize="large" />
        
          </IconButton>
 


          
      </Dialog>
      
    </>
  );
};
export default Detail;
