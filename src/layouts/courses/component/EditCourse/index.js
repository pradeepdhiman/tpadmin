

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
import SoftSnakBar from "components/SoftSnakbar";
import { usePostCourseMutation } from "layouts/Courses/functions/query";

function EditCourse({ toggleEdit }) {
  const [addCourse, {
    data: addedCourse,
    isLoading: loadingAddCourse,
    error: addcorseError,
  }] = usePostCourseMutation();

  const [formData, setFormData] = useState(
    {
      courseID: 0,
      courseName: "",
      description: "",
      duration: 0,
      categoryID: 0,
      syllabus: "",
      trainingfee: 0,
      vat: 0,
      totalAmount: 0,
      receiptID: 0,
      receiptDate: "",
      amountReceived: 0,
      createdById: 0,
      remarks: ""
    }
  );
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitFormData = async (e) => {
    e.preventDefault();
    try {
      const response = await addCourse(formData);
    } catch (err) {
      console.log(err, "err")
    }
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
      {addcorseError && <SoftSnakBar message="Somethig went wrong" severity="error" />}
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
            name="courseName"
            onChange={handleFormData}
            placeholder="Course name"
            value={formData?.courseName}
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
            name="categoryID"
            onChange={handleFormData}
            placeholder="Category"
            value={formData?.categoryID}
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
            name="syllabus"
            onChange={handleFormData}
            placeholder="Choose files"
            value={formData?.syllabus}
          />
        </SoftBox>
        <SoftBox mb={2} sx={{ display: "flex", justifyContent: "flex-start", alignItem: "top", gap: "16px" }}>
          <SoftBox mb={2} >
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
          <SoftBox mb={2} >
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Tax
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              name="vat"
              onChange={handleFormData}
              placeholder="Tax"
              value={formData?.vat}
            />
          </SoftBox>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Description
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="description"
            onChange={handleFormData}
            placeholder="Course description"
            value={formData?.description}
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
            {loadingAddCourse ? "Loading..." : "Submit"}
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default EditCourse;
