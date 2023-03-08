import { observable, action, runInAction } from "mobx";
import axios from "axios";

type stateType = {
  count: number;
  data: { list: any[] };
  error: {};
  loading: string;
  actualData: { date: string; list: { time: string; temperature: string }[] }[];
};

const state: stateType = observable({
  count: 0,
  data: { list: [] },
  error: {},
  loading: "loading",
  actualData: [],
});

const changeLoading = action(async () => {
  runInAction(() => {
    state.loading = "loading";
  });
});

const apiCall = action(async (type:string) => {
  state.loading = "loading";
  // console.log("before", state.data);

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=27.700769&lon=85.300140&appid=815097ac997cf4738e5926d21119e461&units=${type}`
    );
    // console.log("response", response.data.list);
    state.data = response.data;
    // console.log("after", state.data);
    runInAction(() => {
      var dates: string[] = [];
      var dummyList: {
        date: string;
        list: { time: string; temperature: string }[];
      }[] = [];
      var count = -1;

      response?.data?.list?.map((values: any, index: number) => {
        if (!dates.includes(values.dt_txt.split(" ")[0])) {
          count++;
          dates.push(values.dt_txt.split(" ")[0]);
          let temp = {
            date: values.dt_txt.split(" ")[0],
            list: [
              {
                time: values.dt_txt.split(" ")[1],
                temperature: values.main.temp,
              },
            ],
          };
          dummyList.push(temp);
        } else {
          var temp = {
            time: values.dt_txt.split(" ")[1],
            temperature: values.main.temp,
          };
          dummyList[dummyList.length - 1].list = [
            ...dummyList[dummyList.length - 1].list,
            temp,
          ];
        }
      });
      // console.log(dates);
      // console.log(dummyList);
      state.actualData = dummyList;
      state.loading = "success";
      // console.log("actual data",state.actualData[0].date)
    });
  } catch (e) {
    state.error = e as object;
    state.loading = "error";
  }
});

const increment = action(() => {
  state.count = state.count + 1;
});

export { state, apiCall, increment, changeLoading };
