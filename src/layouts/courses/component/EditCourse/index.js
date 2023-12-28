

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { initialValue } from "layouts/Courses/constant";
import { schema } from "layouts/Courses/constant";
import SoftButton from "components/SoftButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SoftInput from "components/SoftInput";

function EditCourse(props) {
  const { toggleEdit = false, submitAdd = null, loading = false } = props
  const [formData, setFormData] = useState(initialValue);

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const submitFormData = async (data) => {
    try {
      const res = await submitAdd(data);
      if (res?.data?.success) {
        setFormData(initialValue)
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <form onSubmit={handleSubmit(submitFormData)}>
          <Controller
            name="courseName"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Course Name
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder="Course Name"
                />
                {errors.courseName && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.courseName.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Duration
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder="Duration"
                />
                {errors.duration && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.duration.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          <Controller
            name="categoryID"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Course Category
                  </SoftTypography>
                </SoftBox>
                <SoftInput as="select"   {...field}>
                  <option>asldkfj</option>
                  <option>asldkfj</option>
                  <option>asldkfj</option>
                  <option>asldkfj</option>
                  {/* {formFields[fieldName].options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))} */}
                </SoftInput>
                {errors.categoryID && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.categoryID.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          {/* <Controller
            name="categoryID"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Course Category
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder="Course Category"
                />
                {errors.categoryID && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.categoryID.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          /> */}
          <Controller
            name="syllabus"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Syllabus
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder="Syllabus"
                />
                {errors.syllabus && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.syllabus.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          <Controller
            name="trainingfee"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Training Fee
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder=" Training Fee"
                />
                {errors.trainingfee && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.trainingfee.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          <Controller
            name="vat"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Tax
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder=" Tax"
                />
                {errors.vat && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.vat.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          <Controller
            name="totalAmount"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Total Amount
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder=" Total Amount"
                />
                {errors.totalAmount && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.totalAmount.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          <Controller
            name="remarks"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Remarks
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder=" Remarks"
                />
                {errors.remarks && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.remarks.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />

          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" type="submit" fullWidth>
              {loading ? 'Loading..' : 'Submit'}
            </SoftButton>
          </SoftBox>
        </form>
      </SoftBox>
    </Card>
  );
}

export default EditCourse;
