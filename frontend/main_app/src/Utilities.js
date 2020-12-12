import axios from "axios";

// refreshes access token on each call, given that refreshToken hasn't expired
// returns response if successful or error
export const RefreshAccessToken = async (refreshToken) => {
  try {
    let response = await axios.post(
      `http://localhost:8000/verif/token/refresh/`,
      {
        refresh: refreshToken,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

// logs-in user on each call
// returns response if successful or error
export const LoginUser = async (uname, pwd) => {
  try {
    let response = await axios.post(`http://localhost:8000/verif/token/`, {
      username: uname,
      password: pwd,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// getUrlParams
// returns an object of all url params
export const getUrlParams = (queryString) => {
  const urlParams = new URLSearchParams(queryString);
  const params = {};

  const entries = urlParams.entries();

  for (const entry of entries) {
    params[entry[0]] = entry[1];
  }

  return params;
};

export const TimestampToTime = (tsVal, format) => {
  const ts = new Date(parseInt(tsVal));

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  switch (format) {
    case "dd Mon yyyy":
      return (
        ts.getDate() + " " + months[ts.getMonth()] + " " + ts.getFullYear()
      );

    case "dd Mmm yyyy, hh:mm:ss":
      return (
        ts.getDate() +
        " " +
        months[ts.getMonth()] +
        " " +
        ts.getFullYear() +
        ",  " +
        ts.getHours() +
        ":" +
        ts.getMinutes() +
        ":" +
        ts.getSeconds()
      );

    case "dd Mmm yyyy, hh:mm":
      return (
        ts.getDate() +
        " " +
        months[ts.getMonth()] +
        " " +
        ts.getFullYear() +
        ",  " +
        ts.getHours() +
        ":" +
        ts.getMinutes()
      );

    case "dd/mm/yyyy, hh:mm":
      return (
        ts.getDate() +
        "/" +
        ts.getMonth() +
        "/" +
        ts.getFullYear() +
        ",  " +
        ts.getHours() +
        ":" +
        ts.getMinutes()
      );

    default:
      return (
        ts.getDate() + " " + months[ts.getMonth()] + " " + ts.getFullYear()
      );
  }
};
