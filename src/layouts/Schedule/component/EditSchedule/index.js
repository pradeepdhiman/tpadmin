

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import CloseIcon from '@mui/icons-material/Close';
import { authUser } from "layouts/authentication/functions/query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "layouts/Schedule/constant";
import { useDispatch, useSelector } from "react-redux";
import MasterForm from "examples/MasterForm";
import { fields } from "layouts/Schedule/constant";
import { useUpdateScheduleMutation } from "layouts/Schedule/functions/query";
import { useCreateScheduleMutation } from "layouts/Schedule/functions/query";
import moment from "moment";
import { setActiveRow } from "layouts/Schedule/functions/scheduleSlice";
import { useDeleteScheduleMutation } from "layouts/Schedule/functions/query";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import { formatDateFields } from "utils/utils";
import { editmodefields } from "layouts/Schedule/constant";
import { CircularProgress, Grid } from "@mui/material";
import SoftInput from "components/SoftInput";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";
import { usePostMasterMutation } from "common/query";
import { toastHandler } from "utils/utils";
import { toast } from "react-toastify";
const tabs = [
  { label: 'Info', value: 'info' },
  // { label: 'Status', value: 'status' },
  // { label: 'Study Material', value: 'material' },
];



function EditSchedule(props) {
  const { toggleEdit = false, loading = false } = props
  const [activeTab, setActiveTab] = useState("info");
  const [instructor, setInstructor] = useState({});
  const [location, setLocation] = useState({});
  const [status, setStatus] = useState({});
  const [localLoading, setLocalLoading] = useState({
    instructorloading:false,
    locationloading:false
  });

  const dispatch = useDispatch()
  const { activeRow, course } = useSelector(state => state.schedule)

  const [addSchedule, { data: addData, isError: addErr, isLoading: addLoading }] = useUpdateScheduleMutation()
  const [updateSchedule, { data: updateData, isError: updateErr, isLoading: updateLoading }] = useCreateScheduleMutation()
  const [delSchedule, { data: delData, isError: delErr, isLoading: delLoading }] = useDeleteScheduleMutation()
  const { data: instructorList, refetch: refreshInstructor } = useMasterListByTypeQuery({ TypeID: masterCode.Instructor })
  const { data: locationList, refetch: refreshLocation } = useMasterListByTypeQuery({ TypeID: masterCode.Location })
  const { data: statusList } = useMasterListByTypeQuery({ TypeID: masterCode.Status })
  const [addMaster, { isLoading: masterLoading }] = usePostMasterMutation()
  const user = authUser()

  // {
  //   "masterCodeID": 0,
  //   "code": 0,
  //   "value": "string",
  //   "fixedColumnName": "string",
  //   "description": "string",
  //   "masterCodeTypeID": 0
  // }
  useEffect(() => {
    const isEditing = Object.keys(activeRow).length !== 0;
    if (isEditing) {
      let locationId = activeRow.location;
      let instructorId = activeRow.instructor;
      let statusId = activeRow.status;
      let foundStatus = statusList?.data?.find(status => status.masterCodeID === statusId);
      let foundLocation = locationList?.data?.find(location => location.masterCodeID === locationId);
      let foundInstructor = instructorList?.data?.find(instructor => instructor.masterCodeID === instructorId);

      setLocation(foundLocation);
      setInstructor(foundInstructor);
      setStatus(foundStatus);
    }
  }, [activeRow, locationList, instructorList, statusList]);


  const { handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formatDateFields(activeRow, fields),
  });


  const submitFormData = async (data) => {
    const isEditing = Object.keys(activeRow).length !== 0

    try {
      let newData = {}

      if (isEditing) {
        newData = {
          ...data,
          scheduledID: parseInt(activeRow?.scheduledID),
          createdById: parseInt(activeRow?.createdById),
          courseID: parseInt(activeRow?.courseID),
          instructor: parseInt(data?.instructor),
          location: parseInt(data?.location),
          status: parseInt(status?.masterCodeID),
          // startDate: moment(data.startDate).format("YYYY-MM-DD"),
          // endDate: moment(data.endDate).format("YYYY-MM-DD"),
          // validityDateTime: moment(data.validityDateTime).format("YYYY-MM-DD"),
          // scheduleCreatedDateTime: moment(data.scheduleCreatedDateTime).format("YYYY-MM-DD"),
        }
      } else {
        newData = {
          ...data,
          scheduledID: 0,
          createdById: parseInt(user?.id),
          courseID: parseInt(course?.courseID),
          instructor: parseInt(data?.instructor),
          location: parseInt(data?.location),
          // startDate: moment(data.startDate).format("YYYY-MM-DD"),
          // endDate: moment(data.endDate).format("YYYY-MM-DD"),
          // validityDateTime: moment(data.validityDateTime).format("YYYY-MM-DD"),
          // scheduleCreatedDateTime: moment(data.scheduleCreatedDateTime).format("YYYY-MM-DD"),
        }
      }
      const apiFunction = isEditing ? addSchedule : updateSchedule;
      const res = await apiFunction(newData);
      toastHandler(res)
      if (res?.data?.success) {
        closeEdit();
      }

      return res;
    } catch (err) {
      console.error(err);
    }
  };

  async function onDelete() {
    try {
      const res = await delSchedule({ id: activeRow.scheduledID })
      toastHandler(res)
      if (res.data.success) {
        closeEdit()
      }
    } catch (err) {
      console.log(err)
    }
  }

  function closeEdit() {
    dispatch(setActiveRow({}))
    reset()
    toggleEdit()
  }
  function tabhandler(tab) {
    setActiveTab(tab)
  }

  function instructorHandler(_, newVal) {
    setValue('instructor', parseInt(newVal.masterCodeID));
    setInstructor(newVal)
  }

  async function instructorSaveHandler(data) {
    if(instructorList?.data?.find(x => x.value === data)){
      toast.error('Duplicate Instructor not allowed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
      return
    }
    setLocalLoading(prev => ({...prev, instructorloading:true}))
    const newData = {
      masterCodeID: 0,
      code: 0,
      value: data,
      fixedColumnName: null,
      description: null,
      masterCodeTypeID: masterCode.Instructor
    };

    try {
      const res = await addMaster(newData);
      toastHandler(res)
      if (res?.data?.success) {
        setValue('instructor', parseInt(res?.data?.data?.masterCodeID));
        setInstructor(res?.data?.data)
        refreshInstructor()
        setLocalLoading(prev => ({...prev, instructorloading:false}))
        return res
      }
    } catch (error) {
      console.error("Error adding master:", error);
      setLocalLoading(prev => ({...prev, instructorloading:false}))
    }
  }

  function locationHandler(_, newVal) {
    setValue('location', parseInt(newVal.masterCodeID));
    setLocation(newVal)
  }

  async function locationSaveHandler(data) {
    if(locationList?.data?.find(x => x.value === data)){
      toast.error('Duplicate Location not allowed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
      return
    }

    setLocalLoading(prev => ({...prev, locationloading:true}))
    const newData = {
      masterCodeID: 0,
      code: 0,
      value: data,
      fixedColumnName: null,
      description: null,
      masterCodeTypeID: masterCode.Location
    };

    try {
      const res = await addMaster(newData);
      toastHandler(res)
      if (res?.data?.success) {
        setValue('location', parseInt(res?.data?.data?.masterCodeID));
        setLocation(res?.data?.data)
        refreshLocation()
        setLocalLoading(prev => ({...prev, locationloading:false}))
        return res
      }
    } catch (error) {
      console.error("Error adding master:", error);
      setLocalLoading(prev => ({...prev, locationloading:false}))
    }
  }

  function statusHandler(_, newVal) {
    setValue('status', parseInt(newVal.masterCodeID));
    setStatus(newVal)
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
          {course?.courseName} Schedule
        </SoftTypography>
        <SoftBox sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'end', gap: "16px" }}>
          {Object.keys(activeRow).length !== 0 && (
            <>
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
        {/* <MasterForm onSubmit={submitFormData} formState={activeRow} formFields={Object.keys(activeRow).length === 0 ? fields : editmodefields} loading={addLoading || updateLoading} handleSubmit={handleSubmit} control={control} reset={reset} errors={errors} /> */}
        <form onSubmit={handleSubmit(submitFormData)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="scheduledName"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Schedule Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Schedule Name"
                    />
                    {errors.scheduledName && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.scheduledName.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Start Date
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="date"
                      {...field}
                      placeholder="Start date"
                    />
                    {errors.startDate && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.startDate.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        End Date
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="date"
                      {...field}
                      placeholder="End date"
                    />
                    {errors.endDate && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.endDate.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="scheduleCreatedDateTime"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Schedule Create Datetime
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="date"
                      {...field}
                      placeholder="Schedule Create Datetime"
                      disabled
                    />
                    {errors.scheduleCreatedDateTime && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.scheduleCreatedDateTime.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                name="validityDateTime"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Validity Datetime
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="date"
                      {...field}
                      placeholder="Validity Datetime"
                    />
                    {errors.validityDateTime && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.validityDateTime.message}
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
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Instructor
                  </SoftTypography>
                </SoftBox>
                <SoftAddAbleAutoSelect
                  dataList={instructorList?.data || []}
                  selectedValue={instructor}
                  selectHandler={instructorHandler}
                  label={null}
                  placeholder="Instructor"
                  saveHandler={instructorSaveHandler}
                  loading={localLoading.instructorloading}
                  isEditable={true}
                />
                {errors.instructor && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.instructor.message}
                  </SoftTypography>
                )}
              </SoftBox>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Location
                  </SoftTypography>
                </SoftBox>
                <SoftAddAbleAutoSelect
                  dataList={locationList?.data || []}
                  selectedValue={location}
                  selectHandler={locationHandler}
                  label={null}
                  placeholder="Location"
                  saveHandler={locationSaveHandler}
                  loading={localLoading.locationloading}
                  isEditable={true}
                />
                {errors.location && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.location.message}
                  </SoftTypography>
                )}
              </SoftBox>
            </Grid>
            {Object.keys(activeRow).length !== 0 && <Grid item xs={12} sm={6} md={3}>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Status
                  </SoftTypography>
                </SoftBox>
                <SoftAddAbleAutoSelect
                  dataList={statusList?.data || []}
                  selectedValue={status}
                  selectHandler={statusHandler}
                  label={null}
                  placeholder="Status"
                  loading={masterLoading}
                  isEditable={false}
                />
                {errors.location && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.location.message}
                  </SoftTypography>
                )}
              </SoftBox>
            </Grid>}
          </Grid>


          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" type="submit" fullWidth>
              {(addLoading || updateLoading) ? 'Loading..' : 'Submit'}
            </SoftButton>
          </SoftBox>
        </form>
      </SoftBox>
    </Card>
  );
}

export default EditSchedule;
