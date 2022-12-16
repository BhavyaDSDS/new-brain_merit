import React from "react";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import {
  objectLength,
  GetTimeLineFromMomentArray,
} from "../../components/utils/JavaScriptUtils";

function SkillsView(props) {
  const { skillset, skillType } = props;
  const skillsList = useSelector((state) => state.utils.skillsList);
  const ntskillsList = useSelector((state) => state.utils.ntskillsList);
  
  var skillList;
  if('non_tech_skills' == skillType){
    if (objectLength(ntskillsList)> 0) {
      skillList = ntskillsList.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }
  }
  else
  {
    if (objectLength(skillsList) > 0) {
      skillList = skillsList.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }
  }

  // console.log("skillset", skillset);

  function getColorVal(skillType) {
    var returnval = "";
    switch (skillType) {
      case "p_tech_skills":
        returnval = "blue";
        break;
      }
    return returnval;
  }

  return (
    <>
      {objectLength(skillset) > 0 &&
        skillset.map((val, index) => {
          let skill = skillList.find((o) => o.value == val);
          // console.log("skill present",skill);
          return (
            <>
            {skill != undefined && (
              <Tag color={getColorVal(skillType)} key={skill.value}>
              {skill.label}
            </Tag>
            )}
            </>
          );
        })}
    </>
  );
}
export default SkillsView;
