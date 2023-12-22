

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

function EditCourse({ toggleEdit }) {
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
      coursename: '',
      coursecategory: '',
      studymaterial: [],
      price: "",
    })
    toggleEdit()
  }
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Course
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
              Course Name
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="coursename"
            onChange={handleFormData}
            placeholder="Course name"
            value={formData?.coursename}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Course category
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="coursecategory"
            onChange={handleFormData}
            placeholder="Category"
            value={formData?.coursecategory}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Study Material
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="file"
            name="studymaterial"
            onChange={handleFormData}
            placeholder="Choose files"
            value={formData?.studymaterial}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Price
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="price"
            onChange={handleFormData}
            placeholder="Course price"
            value={formData?.price}
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

export default EditCourse;
