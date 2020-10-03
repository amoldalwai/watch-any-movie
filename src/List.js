import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import Footer from "./Footer";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import Detail from "./Detail";

const List = () => {
  const [stext, setstext] = useState();
  const [result, setresult] = useState([]);
  const [detailbool, setdetailbool] = useState(false);
  const [imval, setimval] = useState();

  const showChange = (event) => {
    setstext(event.target.value.toLowerCase());
  };
  const show = () => {
    axios
      .get(`https://www.omdbapi.com/?i=tt3896198&apikey=4eb65943&s=${stext}`)
      .then((res) => {
        setresult(res.data.Search.map((p) => p));
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
              width: "300px",
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

        <div className="searchResult">
          {result.map((p) => (
            <div key={p.imdbID} onClick={() => showDetail(p.imdbID)}>
              <Card className="movieCard">
                <CardActionArea>
                  <img className="moviePoster" src={p.Poster} alt="poster" />
                  <div style={{ paddingTop: "5px" }}>
                    <h6>{p.Title}</h6>
                  </div>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>

        {detailbool ? (
          <Detail imval={imval} funsetdetailbool={funsetdetailbool} />
        ) : null}
      </center>
      <Footer />
    </>
  );
};
export default List;
