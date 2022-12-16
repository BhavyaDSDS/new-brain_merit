import React from "react";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import {
    objectLength,
    GetTimeLineFromMomentArray,
  } from "../../components/utils/JavaScriptUtils";
  
function LocationsView(props) {
    const { locations } = props;
    const locationsList = useSelector((state) => state.utils.locationsList);
 
    var locationList;
    if(JSON.stringify(locationsList) !== '{}'){
        locationList = locationsList.map(function (obj) {
        return { label: obj.city , value: obj.id };
      })
    }
  
    // console.log("LocationsView locations", locations);
    // console.log("locationsList locations", locationsList);

    function getColorVal(num) {
        var returnval = "pink";
        switch (num) {
            case 1:
                returnval = "violet";
                break;

            case 2:
                returnval = "indigo";
                break;

            case 3:
                returnval = "blue";
                break;

            case 4:
                returnval = "green";
                break;

            case 5:
                returnval = "yellow";
                break;

            case 6:
                returnval = "orange";
                break;

            case 7:
                returnval = "red";
        }
        return returnval;
    }
 
    return (
        <>      
              {objectLength(locations) > 0 && 
              (locations.map((txt, index) => {
                let location = locationList.find(o => o.value == txt);
                //  console.log("location present",location);
                return (
                    <Tag color={getColorVal(location.label.length)} key={location.value}>{location.label}</Tag>                  
                  );
                 }))}
        </>
    );
}
export default LocationsView;