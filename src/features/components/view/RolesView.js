import React from "react";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import {
    objectLength,
    GetTimeLineFromMomentArray,
  } from "../../components/utils/JavaScriptUtils";
  
function RolesView(props) {
    const { roles } = props;
    const rolesList = useSelector((state) => state.utils.roleList);
 
    var roleList;
    if(JSON.stringify(rolesList) !== '{}'){
        roleList = rolesList.map(function (obj) {
        return { label: obj.name , value: obj.id };
      })
    }
  
    // console.log("roles", roles);

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
              {objectLength(roles) > 0 && 
              (roles.map((txt, index) => {
                let role = roleList.find(o => o.value == txt);
                // console.log("role present",role);
                return (
                    <Tag color={getColorVal(role.label.length)} key={role.value}>{role.label} </Tag>
                  );
                 }))}
        </>
    );
}
export default RolesView;