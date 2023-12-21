

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

function EditSchedule({ toggleEdit }) {
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
      courseid: '',
      scheduledate: "",
      scheduletime: '',
      duration: ''
    })
    toggleEdit()
  }
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Schedule
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
              Date
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="scheduledate"
            onChange={handleFormData}
            placeholder="Schedule Date"
            value={formData?.scheduledate}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Time
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="scheduletime"
            onChange={handleFormData}
            placeholder="Schedule Time"
            value={formData?.scheduletime}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Duration
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="duration"
            onChange={handleFormData}
            placeholder="Duration"
            value={formData?.duration}
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
            Schedule Session
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default EditSchedule;
