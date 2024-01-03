

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import SoftInput from "components/SoftInput";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import CloseIcon from '@mui/icons-material/Close';
import MasterForm from "examples/MasterForm";
import { initialValue } from "layouts/Applicants/constant";
import { schema } from "layouts/Applicants/constant";
import { fields } from "layouts/Applicants/constant";
import { authUser } from "layouts/authentication/functions/query";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setApplicantedit } from "layouts/Applicants/functions/applicantSlice";



function EditApplicant(props) {
  const dispatch = useDispatch()
  const { toggleEdit = false, addApplicant = null, loading = false } = props
  const [formData, setFormData] = useState(initialValue);

  const [updateApplicant, { data: updateData, error: updateErr, isLoading: updateLoading }] = useUpdateApplicantMutation()

  const { editid, applicantList } = useSelector(state => state.applicant)
  const editfields = applicantList?.find(x => x.applicantID === editid)

  const user = authUser()

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editfields,
  });

  useEffect(() => {
    if (editid) {
      setFormData(editfields)
    } else {
      setFormData(initialValue)
    }
  }, [editid])


  const submitFormData = async (data) => {

    try {
      const newData = {
        ...data,
        phone: JSON.stringify(data.phone),
        updatedById: editid ? user.id : "",
        createdById: !editid ? user.id : editfields.createdById || 0,
        updatedById: editid ? user.id : ""
      };

      const apiFunction = editid ? updateApplicant : addApplicant;

      const res = await apiFunction(newData);

      if (res?.data?.success) {
        closeEdit()
      }

      return res;
    } catch (err) {
      console.error(err);
    }
  };


  function closeEdit() {
    setFormData({})
    toggleEdit()
    dispatch(setApplicantedit(""))
  }
  return (
    <Card className="h-100">
      {editid && <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "flex-start", gap:"16px", alignItem: 'center' }}>
      <SoftButton variant="outlined" size="small" color="info">Info</SoftButton>
      <SoftButton variant="outlined" size="small" color="info">Verification Documents</SoftButton>
      <SoftButton variant="outlined" size="small" color="info">Courses</SoftButton>
      <SoftButton variant="outlined" size="small" color="info">Assessments</SoftButton>
      </SoftBox>}
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
        <MasterForm onSubmit={submitFormData} formState={editfields} formFields={fields} loading={updateLoading} handleSubmit={handleSubmit} control={control} reset={reset} errors={errors} />
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
