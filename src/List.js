import React, { useState ,useEffect} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import Footer from "./Footer";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import Button from "@material-ui/core/Button";

import Detail from "./Detail";

const List = () => {
  const [stext, setstext] = useState("avengers");
  const [result, setresult] = useState([]);
  // const [marvel, setmarvel] = useState([]);
  const [detailbool, setdetailbool] = useState(false);
  const [imval, setimval] = useState();

  const showChange = (event) => {
    setstext(event.target.value.toLowerCase());
  };
  const show = () => {
    axios
      .get(`https://www.omdbapi.com/?apikey=4eb65943&s=${stext}`)
      .then((res) => {
        setresult(res.data.Search.map((p) => p));
      })
      .catch((error) => {
        alert("No search results found!! check for spelling ");
      });
  };
  function showDetail(i) {
    setdetailbool(true);
    setimval(i);
  }
  //to toggle boolean
  function funsetdetailbool() {
    setdetailbool(false);
  }
  
  useEffect(() => {
    show();
  }, []);

  return (
    <>
      <center>
        <div className=" navbar-dark bg-dark">
          <br />
          <input
            type="text"
            value={stext}
            onChange={showChange}
            placeholder="Search movies/series"
            style={{
              height: "57px",
              width: "250px",
              borderRadius: "5px",
              paddingLeft: "30px",
              color: "white",
              background: "#212121",
              border: "2px",
            }}
          />
          <Fab
            color="primary"
            aria-label="add"
            style={{
              background: "#b71c1c",
              borderRadius: "7px",
            }}
          >
            <SearchIcon onClick={show} />
          </Fab>
          <br />
          <br />
        </div>
        <br />
        {/* <Display result={result}/> */}
        <center>
          <div className="resultContainer">
            {result.map((p) => (
              <div key={p.imdbID} onClick={() => showDetail(p.imdbID)}>
                <Card className="movieCard">
                  <CardActionArea>
                    <img className="moviePoster" src={p.Poster} alt={p.Title} />

                    <span
                      variant="contained"
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        borderRadius: "4px",
                      }}
                    >
                      <b> {p.Year}</b>
                    </span>
                    <div className="middle">
                      <div className="text">
                        <PlayCircleFilledIcon
                          className="playHoverIcon"
                          fontSize="large"
                          style={{ color: "#aa2e25", fontSize: "60px" }}
                        />
                      </div>
                    </div>
                    <div className="overlay">{p.Title}</div>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
        </center>

       

        {detailbool ? (
          <Detail imval={imval} funsetdetailbool={funsetdetailbool} />
        ) : null}
      </center>
      <Footer />
    </>
  );
};
export default List;
