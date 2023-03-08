import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "../style/home.css";
import "../style/skeleton.css";
import Carousel from "../components/Card";
import { apiCall, state, changeLoading } from "../store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function average(array: { time: string; temperature: string }[]) {
  let sum = 0;
  array.map((value: any) => {
    sum = (sum + value?.temperature) as number;
  });
  return (sum / array?.length)?.toFixed(0);
}

export default observer(function Home() {
  const [day, setDay] = useState<number>(0);
  const [type, setType] = useState<string>("metric");

  useEffect(() => {
    if (state?.loading == "loading") {
      apiCall(type);
    }
  }, [state?.loading]);


  return (
    <div className="alignmentContainer">
      <div className="navDiv">
        <div className="radioDiv">
          <label className="radioDivSpan">
            <label className="customRadio">
              <input
                type="radio"
                name="format"
                className="radio"
                value="metric"
                checked={type == "metric"}
                onChange={(e) => {
                  setType(e.target.value);
                  changeLoading();
                }}
              />
              <span className="checkmark"></span>
            </label>

            <p className="tempFormat">Celcius</p>
          </label>
          <label className="radioDivSpan">
            <label className="customRadio">
              <input
                type="radio"
                name="format"
                className="radio"
                value="imperial"
                checked={type == "imperial"}
                onChange={(e) => {
                  setType(e.target.value);
                  changeLoading();
                }}
              />
              <span className="checkmark"></span>
            </label>

            <p className="tempFormat">fahrenheit</p>
          </label>
        </div>

        <form className="form">
          {/* <input type="search" className="searchFeild" />
          <button type="submit" className="searchButton">
            <img src="/Search.svg" alt="noimage" className="searchIcon" />
          </button> */}
          <select className="searchFeild">
            <option value="">Kathmandu</option>
            <option value="">Butwal</option>

          </select>
        </form>
      </div>
      <div className="containerDiv">
        <div className="cardDiv">
          {state?.loading == "loading" ? (
            <div className="skeleton"></div>
          ) : (
            <Carousel function={setDay} value={day} />
          )}
        </div>
        <div className="mainDiv">
          <div className="leftDiv">
            {state?.loading == "loading" ? (
              <div className="skeleton"></div>
            ) : (
              <>
                <div className="location">
                  <span className="city">Kathmandu</span>
                  <span className="date">{state?.actualData[day]?.date}</span>
                </div>
                <div className="temp">
                  {state?.actualData[day]?.list &&
                    average(state?.actualData[day]?.list)}
                  °
                </div>
              </>
            )}
          </div>
          <div className="seperation">{""}</div>
          <div className="chartDiv">
            {state?.loading == "loading" ? (
              <div className="skeleton"></div>
            ) : (
              <BarChart
                width={800}
                height={300}
                data={state?.actualData[day]?.list}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperature" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

//  Home;
