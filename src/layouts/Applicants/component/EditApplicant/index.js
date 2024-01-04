

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
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useUpdateApplicantMutation } from "layouts/Applicants/functions/query";
import { authUser } from "layouts/authentication/functions/query";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteApplicantMutation } from "layouts/Applicants/functions/query";
import { CircularProgress } from "@mui/material";
import { useCreateApplicantMutation } from "layouts/Applicants/functions/query";
import { setActiveRow } from "layouts/Applicants/functions/applicantSlice";
import ApplicantCompleteCourse from "../ApplicantCompleteCourse";
import ApplicantActiveCourse from "../ApplicantActiveCourse";
import DocumentVerification from "../DocumentVerification";

const tabs = [
  { label: 'Info', value: 'info' },
  { label: 'Verification Documents', value: 'verification' },
  { label: 'Complete Courses', value: 'completeCourse' },
  { label: 'Active Course', value: 'activeCourse' },
];

function EditApplicant(props) {
  const dispatch = useDispatch()
  const { toggleEdit = false, loading = false } = props
  const [activeTab, setActiveTab] = useState("info");

  const [updateApplicant, { data: updateData, error: updateErr, isLoading: updateLoading }] = useUpdateApplicantMutation()
  const [createApplicant, { data: newApplicant, error: createError, isLoading: createLoading }] = useCreateApplicantMutation()
  const [deleteApplicant, { data: delData, error: delErr, isLoading: delLoading }] = useDeleteApplicantMutation()

  const { activeRow } = useSelector(state => state.applicant)

  const user = authUser()

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: activeRow,
  });


  const submitFormData = async (data) => {

    const isEditing = Object.keys(activeRow).length !== 0

    console.log(isEditing)
    console.log(data)

    try {
      const newData = {
        ...data,
        applicantID: activeRow?.applicantID || 0,
        phone: JSON.stringify(data.phone),
        companyContactNumber: JSON.stringify(data.companyContactNumber),
        updatedById: isEditing ? user.id : "",
        createdById: !isEditing ? user.id : activeRow.createdById || 0,
        updatedById: isEditing ? user.id : "",
        updatedDate: isEditing ? new Date().getDate() : null,
      };

      const apiFunction = isEditing ? updateApplicant : createApplicant;

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
    dispatch(setActiveRow({}))
    reset()
    toggleEdit()
  }

  function tabhandler(tab) {
    setActiveTab(tab)
  }

  async function onDelete() {
    try {
      const res = await deleteApplicant(activeRow.applicantID)
      if (res.data.success) {
        closeEdit()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card className="h-100">
      {Object.keys(activeRow).length !== 0 && <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "flex-start", gap: "16px", alignItem: 'center' }}>
        {tabs.map(({ label, value }) => (
          <SoftButton
            key={value}
            onClick={() => tabhandler(value)}
            variant="outlined"
            size="small"
            color={activeTab === value ? 'dark' : 'info'}
          >
            {label}
          </SoftButton>
        ))}
      </SoftBox>}
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Applicant
        </SoftTypography>
        <SoftBox sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'end', gap: "16px" }}>
          {Object.keys(activeRow).length !== 0 && (
            <>
              {/* <Icon
                sx={{
                  fontWeight: "bold",
                  color: "inherit",
                  cursor: "pointer",
                  mt: -0.5,
                }}
                onClick={closeEdit}
              >
                <EditIcon />
              </Icon> */}
              {delLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <Icon
                  sx={{
                    fontWeight: "bold",
                    color: ({ palette: { error } }) => error.main,
                    cursor: "pointer",
                    mt: -0.5,
                  }}
                  onClick={onDelete}
                >
                  <DeleteIcon />
                </Icon>
              )}
            </>
          )}
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

      </SoftBox>
      <SoftBox p={2}>
        {activeTab === "info" && <MasterForm
          onSubmit={submitFormData}
          formState={activeRow}
          formFields={fields}
          loading={createLoading || updateLoading}
          handleSubmit={handleSubmit}
          control={control}
          reset={reset}
          errors={errors}
        />}
        {activeTab === "completeCourse" && <ApplicantCompleteCourse />}
        {activeTab === "activeCourse" && <ApplicantActiveCourse />}
        {activeTab === "verification" && <DocumentVerification />}
      </SoftBox>
    </Card>
  );
}

export default EditApplicant;
