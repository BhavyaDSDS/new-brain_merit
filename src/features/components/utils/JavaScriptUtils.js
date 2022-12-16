import moment from "moment";

export function objectLength(obj) {
  var result = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // or Object.prototype.hasOwnProperty.call(obj, prop)
      result++;
    }
  }
  return result;
}

export function GetTimeLineFromMomentArray(momentArray) {
  // console.log("GetTimeLineFromMomentArray: ", momentArray);

  var val1 = moment(momentArray[0]).format("MMM YYYY");
  var val2 = moment(momentArray[1]).format("MMM YYYY");

  var years = moment.duration(
    moment(momentArray[1]).diff(moment(momentArray[0]), "years")
  );
  var months = moment.duration(
    moment(momentArray[1]).diff(moment(momentArray[0]), "months")
  );

  let yrs = "yrs";
  let mos = "mos";

  months = months % 12;
  if (years == 1) {
    yrs = "yr";
  }

  if (years == 0) {
    years = "";
    yrs = "";
    if (months == 0) {
      months = 1;
    }
  } else if (months == 0) {
    mos = "";
    months = "";
  }

  if (months == 1) {
    mos = "mo";
  }

  return val1 + " - " + val2 + " - " + years +" " + yrs + " " + months +" " + mos;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}