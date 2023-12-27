

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
import MasterForm from "examples/MasterForm";
import * as yup from 'yup';

const initialValue = {
  applicantID: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  qualification: "",
  designation: "",
  dob: "",
  nationality: "",
  companyName: "",
  companyContactNumber: "",
  companyAddress: "",
  password: "",
  createdById: "",
  remarks: ""
}



const schema = yup.object().shape({
  applicantID: yup.mixed(),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .number()
    .typeError('Phone must be a number')
    .min(1000000000, 'Phone must be at least 10 digits')
    .max(9999999999, 'Phone must be at most 10 digits')
    .required('Phone is required'),
  address: yup.string().required('Address is required'),
  qualification: yup.string().required('Qualification is required'),
  designation: yup.string(),
  dob: yup.date().required('Date of Birth is required'),
  nationality: yup.string().required('Nationality is required'),
  companyName: yup.string(),
  companyContactNumber: yup.string(),
  companyAddress: yup.string(),
  password: yup.string().required('Password is required'),
  createdById: yup.mixed(),
  remarks: yup.string(),
});


function EditApplicant(props) {
  const { toggleEdit = false, addApplicant = null, loading = false } = props
  const [formData, setFormData] = useState(initialValue);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitFormData = async (data) => {
    try {
      await addApplicant(data)
    } catch (err) {
      console.log(err)
    }
  }
  function closeEdit() {
    setFormData(initialValue)
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
        <MasterForm onSubmit={submitFormData} formState={formData} validation={schema} loading={loading} />
      </SoftBox>
      {/* <SoftBox p={2}>
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
      </SoftBox> */}
    </Card>
  );
}

export default EditApplicant;
