

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import CloseIcon from '@mui/icons-material/Close';
import { authUser } from "layouts/authentication/functions/query";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
const tabs = [
  { label: 'Info', value: 'info' },
  { label: 'Status', value: 'status' },
  { label: 'Study Material', value: 'material' },
];

function EditSchedule(props) {
  const { toggleEdit = false, loading = false } = props
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch()
  const { activeRow } = useSelector(state => state.schedule)

  const [addSchedule, { data: addData, isError: addErr, isLoading: addLoading }] = useUpdateScheduleMutation()
  const [updateSchedule, { data: updateData, isError: updateErr, isLoading: updateLoading }] = useCreateScheduleMutation()
  const [delSchedule, { data: delData, isError: delErr, isLoading: delLoading }] = useDeleteScheduleMutation()

  const user = authUser()

  const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: activeRow,
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
          // startDate: moment(data.startDate).format("YYYY-MM-DD"),
          // endDate: moment(data.endDate).format("YYYY-MM-DD"),
          // validityDateTime: moment(data.validityDateTime).format("YYYY-MM-DD"),
          // scheduleCreatedDateTime: moment(data.scheduleCreatedDateTime).format("YYYY-MM-DD"),
        }
      }


      console.log(newData, "newData sche");

      const apiFunction = isEditing ? updateSchedule : addSchedule;
      const res = await apiFunction(newData);

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
      const res = await delSchedule(activeRow.scheduledID)
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
        <MasterForm onSubmit={submitFormData} formState={activeRow} formFields={fields} loading={addLoading || updateLoading} handleSubmit={handleSubmit} control={control} reset={reset} errors={errors} />
      </SoftBox>
    </Card>
  );
}

export default EditSchedule;
