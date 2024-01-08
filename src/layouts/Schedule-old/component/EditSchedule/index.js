

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
import { useSelector } from "react-redux";
import MasterForm from "examples/MasterForm";
import { fields } from "layouts/Schedule/constant";
import { useUpdateScheduleMutation } from "layouts/Schedule/functions/query";
import { useCreateScheduleMutation } from "layouts/Schedule/functions/query";
import moment from "moment";

function EditSchedule({ toggleEdit }) {

  const [addSchedule, { data: addData, isError: addErr, isLoading: addLoading }] = useUpdateScheduleMutation()
  const [updateSchedule, { data: updateData, isError: updateErr, isLoading: updateLoading }] = useCreateScheduleMutation()

  const { editid, scheduleList, course } = useSelector(state => state.schedule)
  const editfields = scheduleList?.data?.find(x => x.scheduledID === editid)

  const user = authUser()

  const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editfields,
  });


  const submitFormData = async (data) => {
    console.log(editid, "edit id");
  
    try {
      const newData = {
        ...data,
        scheduledID: editid ? (editfields?.scheduledID || 0) : 0,
        createdById: editid ? parseInt(editfields?.createdById) || 0 : parseInt(user.id),
        // startDate: moment(data.startDate).format("YYYY-MM-DD"),
        // endDate: moment(data.endDate).format("YYYY-MM-DD"),
        // validityDateTime: moment(data.validityDateTime).format("YYYY-MM-DD"),
        // scheduleCreatedDateTime: moment(data.scheduleCreatedDateTime).format("YYYY-MM-DD"),
      };
  
      console.log(newData, "newData");
  
      const apiFunction = editid != "undefiend" ? updateSchedule : addSchedule;
      const res = await apiFunction(newData);
  
      if (res?.data?.success) {
        closeEdit();
      }
  
      return res;
    } catch (err) {
      console.error(err);
    }
  };
  
  function closeEdit() {
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
        <MasterForm onSubmit={submitFormData} formState={editfields} formFields={fields} loading={addLoading || updateLoading} handleSubmit={handleSubmit} control={control} reset={reset} errors={errors} />
      </SoftBox>
    </Card>
  );
}

export default EditSchedule;
