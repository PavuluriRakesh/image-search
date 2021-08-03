import React, { useState } from "react";
import searchIcon from "./search-icon.jpg";
import "./Home.css";
import axios from "axios";
import {ASTRA_DB_ID, ASTRA_DB_REGION, ASTRA_DB_KEYSPACE, ASTRA_DB_TABLE} from "./AstraDetails" ;
import {ASTRA_DB_APPLICATION_TOKEN} from "./Auth" ;

export const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchPhotos = () => {
    axios
      .get(
        `https://${ASTRA_DB_ID}-${ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/keyspaces/${ASTRA_DB_KEYSPACE}/${ASTRA_DB_TABLE}/${query}`,
        {
          headers: {
            "x-cassandra-token": `${ASTRA_DB_APPLICATION_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setResults(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    return <p>hello</p>;
  };
  return (
    <div className="home-page">
      <h1> Image Search App Using Datastax Astra</h1>
      <div className="search-area">
        <input
          className="search-text"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <img className="search-icon" src={searchIcon} onClick={searchPhotos} />
      </div>
      <div className="card-list">
        {results.map((result) => (
          <div className="card" key={result.id}>
            <img
              className="card--image"
              alt={result.src}
              src={result.image_url}
              width="50%"
              height="50%"></img>
            <span>{result.type}</span>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Home;
