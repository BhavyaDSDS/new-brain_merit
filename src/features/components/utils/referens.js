import React, { useEffect, useRef, useState } from "react";
import { Button, InputNumber,Form } from "antd";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import "antd-country-phone-input/dist/index.css";

function PhoneForm() {
  const [value, setValue] = useState({ short: "IN", phone: "" });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [err, setErr] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [focus,setFocus] = useState(true)
 

  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
 
 

  const onchange = () => {

    // if(otp1Ref.current.value.length === 0){
      
    // }
    if(otp1Ref.current.value.length === otp1Ref.current.maxLength){
      otp2Ref.current.focus();
    }
     if(otp2Ref.current.value.length === otp2Ref.current.maxLength){
      otp3Ref.current.focus();
    }
  }
  


  

  const numberSubmit = () => {
    const number = value.phone;
    const code = value.code;
    if (!code || !number) {
      setErr(true);
    } else if (isNaN(number)) {
      return false;
    } else if (number && code) {
      const phoneNumber = "+" + code + number;
      console.log(phoneNumber);
    }
  };

  // const otpSubmit = (element, index) => {
  //   if (isNaN(element.value)) return false;

  //   setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

  //   //Foucus next input
  //   if(element.nextSibling){
  //       element.nextSibling.autoFocus();
  //   }
  // };

  const otpsub = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      {formShow ? (
        <div>
          <ConfigProvider locale={en}>
            <CountryPhoneInput
              value={value}
              onChange={(v) => {
                setValue(v);
              }}
              placeholder="Enter your Number"
              maxLength={10}
              style={{ width: "100%" }}
            />
          </ConfigProvider>
          {err && value.phone.length <= 0 ? (
            <label style={{ color: "red" }}>Please input your number</label>
          ) : (
            ""
          )}
          <br />
          <Button
            style={{ top: 20 }}
            onClick={numberSubmit}
            type="primary"
            block
          >
            OTP SEND
          </Button>
        </div>
      ) : (
        ""
      )}

      <div>

        {/* {otp.map((data, Index) => { return (
          <InputNumber
            style={{ width: 50, height: 50, padding: 8 }}
            maxLength={1}
            controls={false}
            value={data}
            key={Index}
            onChange={(e) => otpSubmit(e.target, Index)}
            autoFocus
          />)
        })} */}

          <Form onFinish={otpsub}>
            <Form.Item name='otp1'>
              <InputNumber controls={false} maxLength={1} ref={otp1Ref} onKeyUp={onchange} autoFocus/>
            </Form.Item>
            <Form.Item name='otp2'>
              <InputNumber controls={false} maxLength={1} ref={otp2Ref} onKeyUp={onchange}/>
            </Form.Item>
            <Form.Item name='otp3'>
              <InputNumber controls={false} maxLength={1} ref={otp3Ref} onKeyUp={onchange}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">submit</Button>
            </Form.Item>
          </Form>



      </div>
    </div>
  );
}

export default PhoneForm;
