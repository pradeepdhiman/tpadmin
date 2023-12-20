import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useState } from "react";

const ProfileEdit = ({ title, info }) => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // AuthApi.Register(formData)
        //   .then((response) => {
        //     if (response.data.success) {
        //       return navigate("/authentication/sign-in");
        //     } else {
        //       setError(response.data.msg);
        //     }
        //   })
        //   .catch((error) => {
        //     if (error.response) {
        //       return setError(error.response.data.msg);
        //     }
        //     return setError("There has been an error.");
        //   });
    };

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (<Card sx={{ height: "100%" }}>
        <SoftBox pt={2} px={2}>
            <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                {title}
            </SoftTypography>
        </SoftBox>
        <SoftBox p={2}>
            <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                    <SoftInput
                        type="text"
                        name="username"
                        placeholder="Name"
                        onChange={handleFormData}
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftInput
                        type="email"
                        name="email"
                        onChange={handleFormData}
                        placeholder="Email"
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftInput
                        type="text"
                        name="contact"
                        onChange={handleFormData}
                        placeholder="Contact NO."
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftInput
                        type="text"
                        name="address"
                        onChange={handleFormData}
                        placeholder="Address"
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftInput
                        type="text"
                        name="description"
                        onChange={handleFormData}
                        placeholder="Description"
                    />
                </SoftBox>
                {/* <SoftBox mb={2}>
                    <SoftInput
                        type="password"
                        name="password"
                        onChange={handleFormData}
                        placeholder="Password"
                    />
                </SoftBox> */}
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
                        {error}
                    </h6>
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                    <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                        Update
                    </SoftButton>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </Card>);
}

export default ProfileEdit;