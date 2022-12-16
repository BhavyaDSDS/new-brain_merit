import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { objectLength } from '../../../components/utils/JavaScriptUtils';
import SkillsView from '../../../components/view/SkillsView';
import DotSeparator from '../../../components/utils/DotSeparator';
import {Tag} from "antd";

function InterviewersHeadLine() {

    const interviewersDetails=useSelector((state) => state.interviewer.interviewerDetail)
    const domainList = useSelector((state) => state.utils.candDomainList);
    const skillsList = useSelector((state) => state.utils.skillsList);
    const ellipsis = true;
    var domain;
    if(JSON.stringify(domainList) !='{}'){
      domain=domainList.map(function (obj){
        return{label:obj.name ,value:obj.id }
      })
    }
    var skillList;
    if (objectLength(skillsList) > 0) {
      skillList = skillsList.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }
    
    let domainobj=[]
    if (interviewersDetails.domains !=undefined) { 
      domainobj=interviewersDetails.domains.map((obj)=>{
        let dom= domain.find((o)=> o.value=== obj)
        return dom.label
      })
    }

    console.log('wwww',interviewersDetails)
    
            return (
              <>
              {domainobj.length>0? <div type='secondary' style={{marginBottom:'10px',marginLeft:'25px'}}>
                
            {interviewersDetails.total_exp} yrs
                       <DotSeparator/>
                        {
                          domainobj.map((data)=>
                          <Tag color="blue">{data}</Tag>
                          )
                        }
                        
                        </div>:null
                      }         
              <div style={{marginLeft:"20px"}} >
             {interviewersDetails.relevant_experience} yrs <DotSeparator />

              {objectLength(interviewersDetails.p_tech_skills)>0 &&(
        <SkillsView skillset={interviewersDetails.p_tech_skills} skillType={'p_tech_skills'}></SkillsView>
    )} 
    </div>
     
    

           
    </>
  ) 
}

export default InterviewersHeadLine

