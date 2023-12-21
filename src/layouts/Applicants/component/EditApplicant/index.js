

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import SoftInput from "components/SoftInput";
import { useState } from "react";
import SoftButton from "components/SoftButton";
import CloseIcon from '@mui/icons-material/Close';

function EditApplicant({toggleEdit}) {
  const [formData, setFormData] = useState({
    'name': '',
    'password': '',
    'email': ''
  });
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitFormData = async (e) => {
    e.preventDefault();
    // try {
    //   await login(formData);
    // } catch (err) {
    //   console.log(err, "err")
    // }
  }
  function closeEdit() {
    setFormData({
      'name': '',
      'password': '',
      'email': ''
    })
    toggleEdit()
  }
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Applicant
        </SoftTypography>
        <Icon
          sx={{
            fontWeight: "bold",
            color: ({ palette: { error } }) => error.main,
            cursor: "pointer",
            mt: -0.5,
          }}
          onClick={closeEdit}
        >
          <CloseIcon />
        </Icon>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Applicant Name
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="name"
            onChange={handleFormData}
            placeholder="Name"
            value={formData?.name}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Applicant Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            name="email"
            onChange={handleFormData}
            placeholder="Email Id"
            value={formData?.email}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Applicant Password
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
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
            Submit
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default EditApplicant;
