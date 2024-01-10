

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import SoftInput from "components/SoftInput";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import CloseIcon from '@mui/icons-material/Close';
import { validateForm } from "utils/utils";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "layouts/CourseQuestions/constant";
import MasterForm from "examples/MasterForm";
import { fields } from "layouts/CourseQuestions/constant";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "layouts/authentication/functions/query";
import { useCreateQuestionMutation } from "layouts/CourseQuestions/functions/query";
import { useUpdateQuestionMutation } from "layouts/CourseQuestions/functions/query";
import { setQuestionEdit } from "layouts/CourseQuestions/functions/questionSlice";
import { CircularProgress } from "@mui/material";
import { setActiveRow } from "layouts/CourseQuestions/functions/questionSlice";
import { useDeleteQuestionMutation } from "layouts/CourseQuestions/functions/query";
import moment from "moment";

const tabs = [
  { label: 'Info', value: 'info' },
  { label: 'Status', value: 'status' },
  { label: 'Study Material', value: 'material' },
  { label: 'Schedule', value: 'schedule' },
];



function EditQuestion(props) {
  const dispatch = useDispatch()
  const { toggleEdit = false, loading = false } = props
  const [activeTab, setActiveTab] = useState("info");

  const [updateSch, { data: updateRes, error: updateErr, isLoading: updateLoading }] = useUpdateQuestionMutation()
  const [createSch, { data: createRes, error: createError, isLoading: createLoading }] = useCreateQuestionMutation()
  const [deleteSch, { data: delRes, error: delErr, isLoading: delLoading }] = useDeleteQuestionMutation()

  const { activeRow, course } = useSelector(state => state.question)


  const user = authUser()


  const { handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
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
          questionID: (activeRow.questionID || 0),
          courseID: activeRow.courseID,
          createdById: (parseInt(activeRow.createdById) || 0),
          updatedDate: moment().format("DD-MM-YYYY"),
          updatedById: parseInt(user.id),
          marksOptionA: activeRow?.marksOptionA || "1",
          marksOptionB: activeRow?.marksOptionB || "1",
          marksOptionC: activeRow?.marksOptionC || "1",
          marksOptionD: activeRow?.marksOptionD || "1",
          marksOptionE: activeRow?.marksOptionE || "1",
        }
      } else {
        newData = {
          ...data,
          questionID: 0,
          courseID: course.courseID,
          createdById: parseInt(user.id),
          marksOptionA: "1",
          marksOptionB: "1",
          marksOptionC: "1",
          marksOptionD: "1",
          marksOptionE: "1",
        }
      }

      const apiFunction = isEditing ? updateSch : createSch;

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
      const res = await deleteSch({ id: activeRow?.questionID })
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
          Course Question
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
        <MasterForm onSubmit={submitFormData} formState={activeRow} formFields={fields} loading={createLoading || updateLoading} handleSubmit={handleSubmit} control={control} reset={reset} errors={errors} />
      </SoftBox>
    </Card>
  );
}

export default EditQuestion;
