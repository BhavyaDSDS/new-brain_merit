import Logo from "../../../public/img.png";
import { Col, Row } from "antd";
import React, { useState, useRef, useEffect } from "react";
import "antd/dist/antd.css";
import { InputNumber, Button, Form } from "antd";
import { EditFilled } from "@ant-design/icons";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import TimeCounter from "../components/utils/TimeCounter";
import { auth } from "../components/utils/FirebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function LoginPage() {
  const [value, setValue] = useState({ short: "IN", phone: "" });

  const [err, setErr] = useState(false);
  const [otpShow, setOtpShow] = useState(false);
  const [formShow, setFormShow] = useState(true);

  //otp fields auto focus
  const num1 = useRef(null);
  const num2 = useRef(null);
  const num3 = useRef(null);
  const num4 = useRef(null);
  const num5 = useRef(null);
  const num6 = useRef(null);
  const formRef = useRef(null);

  const move = () => {
    if (num1.current.value.length === num1.current.maxLength) {
      num2.current.focus();
    }
    if (num2.current.value.length === num2.current.maxLength) {
      num3.current.focus();
    }
    if (num3.current.value.length === num3.current.maxLength) {
      num4.current.focus();
    }
    if (num4.current.value.length === num4.current.maxLength) {
      num5.current.focus();
    }
    if (num5.current.value.length === num5.current.maxLength) {
      num6.current.focus();
    }
  };

  var captcha = true;

  const generateRechapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          window.appVerifier = response;
          setOtpShow(true);
          setFormShow(false);
        },
        "expired-callback": (err) => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log("error from Recaptcha", err);
        },
      },
      auth
    );

    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
    //const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
  };

  const reSendOtp = () => {
    window.recaptchaVerifier.render().then(function (widgetId) {
      grecaptcha.reset(widgetId);
    });

    formRef.current.resetFields();
    captcha = false;

    numberSubmit();
  };

  const numberSubmit = () => {
    console.log(value);
    var number = value.phone;
    const code = value.code;

    if (!code || !number) {
      setErr(true);
    } else if (isNaN(number)) {
      return false;
    } else if (number && code) {
      const phoneNumber = "+" + code + number;
      //console.log(phoneNumber);

      if (captcha) {
        generateRechapcha();
        //console.log("when submit first page")
      }

      const appVerifier = window.recaptchaVerifier;
      // console.log("auth = ",auth);
      // console.log("number = ",phoneNumber);
      // console.log("app verify =",appVerifier);
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log(confirmationResult);
          // console.log("send the number and verifyer")
        })
        .catch((error) => {
          // Error; SMS not sent
          // console.log("fire base error :", error);
        });
    }
  };

  const verifyOTP = (values) => {
    // console.log("ReRender the otpSubmit");
    const otpObj = Object.values(values);
    const otp = otpObj.join("");
    // console.log(otp);

    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        alert("successfully logged in");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert("incorrect otp");
      });
  };

  const phoneNumberEdit = () => {
    window.open("LoginPage", "_self");
    // window.recaptchaVerifier.render().then(function (widgetId) {
    //   grecaptcha.reset(widgetId);
    // });
    // captcha=false;
    // setOtpShow(false);
    // setFormShow(true);
  };

  return (
    <div style={{ margin: 0 }}>
      <Row style={{ height: "86vh" }}>
        <Col span={3} />
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <h1 style={{ fontSize: 45, fontWeight: "bold" }}>Login Page</h1>
          </div>

          {formShow ? (
            <div>
              <Form onFinish={numberSubmit}>
                <ConfigProvider locale={en}>
                  <CountryPhoneInput
                    value={value}
                    onChange={(v) => {
                      setValue(v);
                    }}
                    placeholder="Enter your Number"
                    maxLength={10}
                    style={{ width: 400 }}
                    autoFocus
                  />
                </ConfigProvider>
                {err && value.phone.length <= 0 ? (
                  <label style={{ color: "red" }}>
                    Please input your number
                  </label>
                ) : (
                  ""
                )}
                <br />

                <Button
                  style={{ top: 20 }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  OTP SEND
                </Button>
              </Form>
            </div>
          ) : (
            ""
          )}

          {otpShow ? (
            <div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: 15 }}>
                  {` OTP is sent to this number ${value.phone}`}
                </span>
                <span style={{}} onClick={phoneNumberEdit}>
                  <EditFilled style={{ fontSize: 20, marginLeft: 20 }} />
                </span>
              </div>
              <div style={{ marginTop: 10 }}>
                <Form onFinish={verifyOTP} ref={formRef}>
                  <Form.Item
                    name="num1"
                    style={{ display: "inline-block", marginRight: 13 }}
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 50, height: 50, padding: 8 }}
                      maxLength={1}
                      controls={false}
                      ref={num1}
                      onKeyUp={move}
                      autoFocus
                    />
                  </Form.Item>

                  <Form.Item
                    name="num2"
                    style={{ display: "inline-block", marginRight: 13 }}
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 50, height: 50, padding: 8 }}
                      maxLength={1}
                      controls={false}
                      ref={num2}
                      onKeyUp={move}
                    />
                  </Form.Item>

                  <Form.Item
                    name="num3"
                    style={{ display: "inline-block", marginRight: 13 }}
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 50, height: 50, padding: 8 }}
                      maxLength={1}
                      controls={false}
                      ref={num3}
                      onKeyUp={move}
                    />
                  </Form.Item>

                  <Form.Item
                    name="num4"
                    style={{ display: "inline-block", marginRight: 13 }}
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 50, height: 50, padding: 8 }}
                      maxLength={1}
                      controls={false}
                      ref={num4}
                      onKeyUp={move}
                    />
                  </Form.Item>

                  <Form.Item
                    name="num5"
                    style={{ display: "inline-block", marginRight: 13 }}
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 50, height: 50, padding: 8 }}
                      maxLength={1}
                      controls={false}
                      ref={num5}
                      onKeyUp={move}
                    />
                  </Form.Item>

                  <Form.Item
                    name="num6"
                    style={{ display: "inline-block", marginRight: 13 }}
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 50, height: 50, padding: 8 }}
                      maxLength={1}
                      controls={false}
                      ref={num6}
                      onKeyUp={move}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" block htmlType="submit">
                      submit
                    </Button>
                  </Form.Item>
                </Form>
                <TimeCounter reSend={reSendOtp} />
              </div>
            </div>
          ) : (
            ""
          )}
        </Col>
        <Col span={3} />
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={Logo} style={{ width: "40%" }} />
          <div
            id="recaptcha-container"
            style={{ position: "absolute", bottom: 10, right: 10 }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
