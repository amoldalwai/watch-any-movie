import React, { useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Chip from '@material-ui/core/Chip';
import Fab from "@material-ui/core/Fab";
import YouTubeIcon from '@material-ui/icons/YouTube';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import IconButton from "@material-ui/core/IconButton";

import useMediaQuery from "@material-ui/core/useMediaQuery";



import { useTheme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";






const Detail = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const fullScreenData = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = React.useState(true);
  const [openfs, setOpenfs] = React.useState(false);
  const [openSeries, setOpenSeries] = React.useState(false);
  const [openTrailer, setOpenTrailer] = React.useState(false);

  
  

  const [movielink, setmovielink] = useState();
  const [serieslink, setserieslink] = useState();
  const [ytlink, setytlink] = useState();
  
  const [poster, setposter] = useState("https://webinars.motivatingthemasses.com/fromgood2unforgettable/images/poster-loading.gif");
  const [year, setyear] = useState("Loading...");
  const [genre, setgenre] = useState("Loading...");
  const [plot, setplot] = useState("Loading...");
  const [title, settitle] = useState("Loading...");
  const [imdbrate, setimdbrate] = useState("...");
  const [metascore, setmetascore] = useState("...");
  const [mtype,setmtype]=useState();
  const [season,setseason]=useState("01");
  const [sandbox,setSandbox]=useState(true);

  
  axios
    .get(`https://www.omdbapi.com/?apikey=e630e8d2&i=${props.imval}`)
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
       // `https://videospider.in/getvideo?key=Ez99ULqORLkSi7LH&video_id=${props.imval}`
      
      );
      setserieslink(
      
        `javascript:window.location.replace("https://gomo.to/show/${props.imval}/01-01")`
       //` https://moviehungershaven.xyz/itv/tvs1.php?imdbid=${props.imval}&season=1&episode=1`
      // `https://fsapi.xyz/tv-tmdb/84105-2-4`
      
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
  const handleClickOpenTrailer = () => {
    if(mtype==='movie')
    {
    axios
    .get(`https://api.themoviedb.org/3/movie/${props.imval}/videos?api_key=d8bf019d0cca372bd804735f172f67e8`)
    .then((res) => {
     // console.log(res.data.results[0].key);
    
     setytlink("https://www.youtube.com/embed/"+res.data.results[0].key);
     //https://api.themoviedb.org/3/tv/79352/videos?api_key=d8bf019d0cca372bd804735f172f67e8
     setOpenTrailer(true);


    })
    .catch((error) => {
      alert("No trailer found for this movie!!!");
      
    });
  }
  else
  {
    axios
    .get(`https://api.themoviedb.org/3/find/${props.imval}?api_key=d8bf019d0cca372bd804735f172f67e8&external_source=imdb_id`)
    .then((res) => {
      //console.log(res.data.tv_results[0].id);
    
    
   // alert(res.data.tv_results[0].id);
   axios
   .get(`https://api.themoviedb.org/3/tv/`+res.data.tv_results[0].id+`/videos?api_key=d8bf019d0cca372bd804735f172f67e8`)
   .then((res) => {
    // console.log(res.data.results[0].key);
    
   
   setytlink("https://www.youtube.com/embed/"+res.data.results[0].key);
   setOpenTrailer(true);

   })
   .catch((error) => {
     alert("No trailer found for this web series!!!");
     
   });
    
    

    })
    .catch((error) => {
      alert("No trailer found for this web series!!");
      
    });
     
    
    
    
   
    
  }
    
  };
  
  

  const handleCloseTrailer = () => {
    setOpenTrailer(false);
  };

  
  

 


  return (
    <>
    
      <Dialog
        open={open}
         maxWidth='xs'
        fullScreen={fullScreenData}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // TransitionComponent={Transition}
      
        
         
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

        <IconButton
          onClick={handleClickOpenTrailer}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            color: "white",
            width: "50px",
            height: "50px",
            background: "rgb(0,0,0,0.3)"
            
            
          }}
        >
          <YouTubeIcon  fontSize="large" />
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
        // TransitionComponent={Transition}
        
      >
       
            <iframe
          src={movielink}
          title="movieServer"
          width="100%"
          height="100%"
          id="myId"
          style={{ border: "none" }}
          //sandbox="allow-same-origin allow-scripts allow-forms"
          {...(sandbox ? {sandbox:'allow-same-origin allow-scripts allow-forms'}:{})}
        />
          <select 
          value={movielink}
            onChange={ 
              (event)=>
              { 
                
                if(event.target.value ==='https://videospider.in/getvideo?key=Ez99ULqORLkSi7LH&video_id=')
                {
                  setSandbox(false);
             // alert("videospider");
                  
                }
                else
                {
                  setSandbox(true);
               
                 
                }
             
                setmovielink(event.target.value+`${props.imval}`);
              }
              }
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
            <option value="https://database.gdriveplayer.io/player.php?imdb=">Server 1</option>
            <option value="https://gomo.to/movie/">Server 2</option>
            <option value="https://123moviesplayer.com/movie/">Server 3</option>
            <option value="https://v2.vidsrc.me/embed/">Server 4</option>
            <option value="https://videospider.in/getvideo?key=Ez99ULqORLkSi7LH&video_id=">use AdBlocker</option>
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
          defaultValue={season}
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
           //onChange={ (event)=>{setserieslink(`https://moviehungershaven.xyz/itv/tvs1.php?imdbid=`+`${props.imval}&season=`+`${season}&episode=`+event.target.value );}}
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
      
      {/* for trailer */}
      <Dialog
        fullScreen={fullScreen}
        open={openTrailer}
        onClose={handleCloseTrailer}
        aria-labelledby="responsive-dialog-title"
        
      > 
      
      <iframe
       
      src={ytlink}
      title="TrailerServer"
      width="100%"
      height="100%"
      id="myTrailer"
      style={{ border: "none" }}


      />

      <IconButton
          onClick={handleCloseTrailer}
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
