

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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteApplicantMutation } from "layouts/Applicants/functions/query";
import { CircularProgress, Grid } from "@mui/material";
import { useCreateApplicantMutation } from "layouts/Applicants/functions/query";
import { setActiveRow } from "layouts/Applicants/functions/applicantSlice";
import ApplicantCompleteCourse from "../ApplicantCompleteCourse";
import ApplicantActiveCourse from "../ApplicantActiveCourse";
import DocumentVerification from "../DocumentVerification";
import { formatDateFields } from "utils/utils";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { toastHandler } from "utils/utils";

const tabs = [
  { label: 'Info', value: 'info' },
  { label: 'Applied/Verify Course', value: 'verification' },
  { label: 'Complete Courses', value: 'completeCourse' },
  { label: 'Active Course', value: 'activeCourse' },
];

function EditApplicant(props) {
  const dispatch = useDispatch()
  const { toggleEdit = false, loading = false } = props
  const [activeTab, setActiveTab] = useState("info");
  const [nationType, setNationType] = useState({})
  const [qualiType, setQualiType] = useState({})
  const [desgType, setDesgType] = useState({})
  const [statusType, setStatusType] = useState({})

  const [updateApplicant, { data: updateData, error: updateErr, isLoading: updateLoading }] = useUpdateApplicantMutation()
  const [createApplicant, { data: newApplicant, error: createError, isLoading: createLoading }] = useCreateApplicantMutation()
  const [deleteApplicant, { data: delData, error: delErr, isLoading: delLoading }] = useDeleteApplicantMutation()
  const { data: nationalityList, isLoading: loadingStatus } = useMasterListByTypeQuery({ TypeID: masterCode.Nationality })
  const { data: designationList, isLoading: loadingdesg } = useMasterListByTypeQuery({ TypeID: masterCode.Designation })
  const { data: qualificationList, isLoading: loadingQly } = useMasterListByTypeQuery({ TypeID: masterCode.Qualification })
  const { data: statusList, isLoading: loadingstat } = useMasterListByTypeQuery({ TypeID: masterCode.Status })

  const { activeRow } = useSelector(state => state.applicant)

  const user = authUser()


  useEffect(() => {
    if (nationalityList?.success && designationList?.success && qualificationList?.success) {
        let nationId = activeRow?.nationality;
        let qlyId = activeRow?.qualification;
        let desgId = activeRow?.designation;
        let statusId = activeRow?.status;

        if (nationId !== undefined && qlyId !== undefined && desgId !== undefined) {
            if (nationId !== nationType?.masterCodeID) {
                let foundNationType = nationalityList?.data?.find(x => x.masterCodeID === nationId);
                setNationType(foundNationType);
            }

            if (qlyId !== qualiType?.masterCodeID) {
                let foundQlyType = qualificationList?.data?.find(x => x.masterCodeID === qlyId);
                setQualiType(foundQlyType);
            }

            if (desgId !== desgType?.masterCodeID) {
                let foundDesgType = designationList?.data?.find(x => x.masterCodeID === desgId);
                setDesgType(foundDesgType);
            }

            if (statusId !== statusType?.masterCodeID) {
                let foundStatus = statusList?.data?.find(x => x.masterCodeID === desgId);
                setStatusType(foundStatus);
            }
        }
    }
}, [activeRow, nationalityList, qualificationList, designationList, statusList]);


  const { handleSubmit, control, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formatDateFields(activeRow, fields),
  });
  



  const submitFormData = async (data) => {
    const isEditing = Object.keys(activeRow).length !== 0
    try {
      const newData = {
        ...data,
        applicantID: activeRow?.applicantID || 0,
        phone: data.phone,
        companyContactNumber: JSON.stringify(data.companyContactNumber),
        updatedById: isEditing ? user.id : "",
        createdById: !isEditing ? user.id : activeRow.createdById || 0,
        updatedById: isEditing ? user.id : "",
        updatedDate: isEditing ? new Date().getDate() : null,
      };
      const apiFunction = isEditing ? updateApplicant : createApplicant;
      const res = await apiFunction(newData);
      toastHandler(res)
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
      const res = await deleteApplicant({ id: activeRow.applicantID })
      toastHandler(res)
      if (res.data.success) {
        closeEdit()
      }
    } catch (err) {
      console.log(err)
    }
  }

  function nationalityHandler(_, newVal) {
    setValue("nationality", parseInt(newVal?.masterCodeID))
    setNationType(newVal)
  }
  function qualificationHandler(_, newVal) {
    setValue("qualification", parseInt(newVal?.masterCodeID))
    setQualiType(newVal)
  }
  function designationHandler(_, newVal) {
    setValue("designation", parseInt(newVal?.masterCodeID))
    setDesgType(newVal)
  }
  function statusHandler(_, newVal) {
    setValue("status", parseInt(newVal?.masterCodeID))
    setStatusType(newVal)
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
        {/* {activeTab === "info" && <MasterForm
          onSubmit={submitFormData}
          formState={activeRow}
          formFields={fields}
          loading={createLoading || updateLoading}
          handleSubmit={handleSubmit}
          control={control}
          reset={reset}
          errors={errors}
        />} */}
        {activeTab === "info" && <SoftBox p={2}>
          <form onSubmit={handleSubmit(submitFormData)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          First Name
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.firstName.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Last Name
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.lastName.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Email
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.email.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Phone
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="number"
                        {...field}
                        placeholder="Phone"
                      />
                      {errors.phone && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.phone.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Address
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="Address"
                      />
                      {errors.address && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.address.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Company Name
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="Company Name"
                      />
                      {errors.companyName && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.companyName.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="companyContactNumber"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Company Contact Number
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="number"
                        {...field}
                        placeholder="Company Contact Number"
                      />
                      {errors.companyContactNumber && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.companyContactNumber.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="companyAddress"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Company Address
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="Company Address"
                      />
                      {errors.companyAddress && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.companyAddress.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
                        placeholder="Remarks"
                      />
                      {errors.remarks && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.remarks.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Dob
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="date"
                        {...field}
                        placeholder="Dob"
                      />
                      {errors.dob && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.dob.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="qualification"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Qualification
                        </SoftTypography>
                      </SoftBox>
                      <SoftAddAbleAutoSelect
                        dataList={qualificationList?.data || []}
                        selectedValue={qualiType}
                        selectHandler={qualificationHandler}
                        label={null}
                        placeholder=" Status"
                        loading={loadingQly}
                        isEditable={false}
                      />
                      {errors.qualification && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.qualification.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="nationality"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          nationality
                        </SoftTypography>
                      </SoftBox>
                      <SoftAddAbleAutoSelect
                        dataList={nationalityList?.data || []}
                        selectedValue={nationType}
                        selectHandler={nationalityHandler}
                        label={null}
                        placeholder=" Status"
                        loading={loadingStatus}
                        isEditable={false}
                      />
                      {errors.nationality && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.nationality.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="designation"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Designation
                        </SoftTypography>
                      </SoftBox>
                      <SoftAddAbleAutoSelect
                        dataList={designationList?.data || []}
                        selectedValue={desgType}
                        selectHandler={designationHandler}
                        label={null}
                        placeholder=" Status"
                        loading={loadingdesg}
                        isEditable={false}
                      />
                      {errors.designation && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.designation.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Status
                        </SoftTypography>
                      </SoftBox>
                      <SoftAddAbleAutoSelect
                        dataList={statusList?.data || []}
                        selectedValue={statusType}
                        selectHandler={statusHandler}
                        label={null}
                        placeholder=" Status"
                        loading={loadingstat}
                        isEditable={false}
                      />
                      {errors.status && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.status.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
            </Grid>


            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" type="submit" fullWidth>
                {(loading || updateLoading || createLoading) ? 'Loading..' : 'Submit'}
              </SoftButton>
            </SoftBox>
          </form>
        </SoftBox>}
        {activeTab === "completeCourse" && <ApplicantCompleteCourse />}
        {activeTab === "activeCourse" && <ApplicantActiveCourse />}
        {activeTab === "verification" && <DocumentVerification />}
      </SoftBox>
    </Card>
  );
}

export default EditApplicant;
