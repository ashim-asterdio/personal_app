import React, { useEffect } from "react";
import { observer } from "mobx-react";
// import Search from "../../public/Search.svg"
import "../style/home.css";
import Carousel from "../components/Card";
import { apiCall, state } from "../store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default observer(function Home() {
  useEffect(() => {
    if (state?.data?.list?.length == 0) {
      apiCall();
    }
  });

  const data = [
    { name: "January", sales: 1000 },
    { name: "February", sales: 1500 },
    { name: "March", sales: 800 },
    { name: "April", sales: 2000 },
    { name: "May", sales: 1200 },
    { name: "June", sales: 1600 },
    { name: "July", sales: 900 },
    { name: "July", sales: 900 },
  ];

  return (
    <div className="alignmentContainer">
      <div className="navDiv">
        {
          // state.count
          state.data.list?.length > 0
            ? state.data.list
                .slice(0, 2)
                .map((values: any) => values.main.temp + ",")
            : "kei xaina sir"
        }
        <form className="form">
          <input type="search" className="searchFeild" />
          <button type="submit" className="searchButton">
            <img src="/Search.svg" alt="noimage" className="searchIcon" />
          </button>
        </form>
      </div>
      <div className="containerDiv">
        <div className="cardDiv">
          <Carousel />
        </div>
        <div className="mainDiv">
          <div className="leftDiv">
            <div className="location">
              <span className="city">Kathmandu</span>
              <span className="date">Monday 29 August</span>
            </div>
            {/* <div className="detailDiv"> */}
            <div className="temp">21°</div>
            {/* </div> */}
          </div>
          <div className="seperation">{""}</div>
          <div className="chartDiv">
            <BarChart width={800} height={300} data={state.actualData[1].list}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperature" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
});

//  Home;
