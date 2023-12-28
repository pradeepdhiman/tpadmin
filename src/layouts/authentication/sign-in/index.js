

import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";


import { useLoginMutation } from "../functions/query";
import { getObject } from "utils/utils";
import { saveObject } from "utils/utils";

function SignIn() {
  const navigate = useNavigate();
  const [login, { data, isLoading, error, isFetching, isSuccess }] = useLoginMutation();

  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });

  let user = getObject("user")


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      console.log(err, "err")
    }
  }


  const handleRedirect = () => {
    return navigate("/dashboard");
  };

  useEffect(() => {
    if (data?.success) {
      const userString = JSON.stringify(data.data || {});
      saveObject("user", userString);
      navigate("/dashboard");
    }
  }, [data]);


  return (
    <CoverLayout
      title="Welcome back"
      description="Login through provided email and password to sign in"
      image={curved9}
    >
      {isLoading ? (
        <SoftBox display="flex" justifyContent="center">
          <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </SoftBox>
      ) : user && user.token ? (
        <div>
          <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={handleRedirect}>
              {`Let's go`}
            </SoftButton>
          </SoftBox>
        </div>
      ) : (
        <>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Email
                </SoftTypography>
              </SoftBox>
              <SoftInput type="email" name="email" value={formData?.email} onChange={handleFormData} placeholder="Email" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Password
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="password"
                name="password"
                onChange={handleFormData}
                placeholder="Password"
                value={formData?.password}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={2} mb={2} textAlign="center">
              <h6
                style={{
                  fontSize: ".8em",
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all",
                }}
              >
                {data ? (!data.success ? (data.errors && data.errors.length > 0 ? data.errors[0] : null) : null) : null}
              </h6>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
                sign in
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Don&apos;t have an account?{" "}
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </>
      )}
    </CoverLayout>
  );
}

export default SignIn;
