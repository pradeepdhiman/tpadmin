

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
import { CircularProgress, Grid } from "@mui/material";
import { setActiveRow } from "layouts/CourseQuestions/functions/questionSlice";
import { useDeleteQuestionMutation } from "layouts/CourseQuestions/functions/query";
import moment from "moment";
import { toastHandler } from "utils/utils";
import { masterCode } from "common/constant";
import { useMasterListByTypeQuery } from "common/query";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const tabs = [
  { label: 'Info', value: 'info' },
  // { label: 'Status', value: 'status' },
  // { label: 'Study Material', value: 'material' },
  // { label: 'Schedule', value: 'schedule' },
];



function EditQuestion(props) {
  const dispatch = useDispatch()
  const { toggleEdit = false, loading = false } = props
  const [activeTab, setActiveTab] = useState("info");
  const [questiontype, setQuestiontype] = useState({});

  const [updateSch, { data: updateRes, error: updateErr, isLoading: updateLoading }] = useUpdateQuestionMutation()
  const [createSch, { data: createRes, error: createError, isLoading: createLoading }] = useCreateQuestionMutation()
  const [deleteSch, { data: delRes, error: delErr, isLoading: delLoading }] = useDeleteQuestionMutation()
  const { data: masterquestiontype } = useMasterListByTypeQuery({ TypeID: masterCode.QuestionType })
  const { activeRow, course } = useSelector(state => state.question)

  useEffect(() => {
    const isEditing = Object.keys(activeRow).length !== 0;
    if (isEditing) {
      let qtypeId = activeRow.questionTypeID;
      let fountType = masterquestiontype?.data?.find(item => item.masterCodeID === qtypeId);

      setQuestiontype(fountType);
    }
  }, [activeRow, masterquestiontype]);


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
          questionTypeID: parseInt(questiontype?.masterCodeID)
        }
      } else {
        newData = {
          ...data,
          questionID: 0,
          courseID: course.courseID,
          createdById: parseInt(user.id),
          questionTypeID: parseInt(questiontype?.masterCodeID)
        }
      }

      const apiFunction = isEditing ? updateSch : createSch;

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




  const MySwal = withReactContent(Swal)
  async function onDelete() {
    const result = await MySwal.fire({
      icon: 'alert',
      title: 'Delete Question',
      text: "Are you sure!",
      confirmButtonText: 'Yes',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        try {
          const res = await deleteSch({ id: activeRow?.questionID })
          toastHandler(res)
          if (res.data.success) {
            closeEdit()
          }
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function questiontypehandler(_, newval) {
    setValue('questionTypeID', parseInt(newval.masterCodeID));
    setQuestiontype(newval)
  }

  return (
    <Card className="h-100">
      {/* {Object.keys(activeRow).length !== 0 && <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "flex-start", gap: "16px", alignItem: 'center' }}>
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
      </SoftBox>} */}

      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "flex-end", alignItem: 'center' }}>
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
        {/* <MasterForm onSubmit={submitFormData} formState={activeRow} formFields={fields} loading={createLoading || updateLoading} handleSubmit={handleSubmit} control={control} reset={reset} errors={errors} /> */}
        <form onSubmit={handleSubmit(submitFormData)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="questionTitle"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Question
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Question"
                    />
                    {errors.questionTitle && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.questionTitle.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Question Type
                  </SoftTypography>
                </SoftBox>
                <SoftAddAbleAutoSelect
                  dataList={masterquestiontype?.data || []}
                  selectedValue={questiontype}
                  selectHandler={questiontypehandler}
                  label={null}
                  placeholder="Question Type"
                  isEditable={false}
                />
                {errors.questionTypeID && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.questionTypeID.message}
                  </SoftTypography>
                )}
              </SoftBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="correctAnswer"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Correct Answer
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Correct answer"
                    />
                    {errors.correctAnswer && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.correctAnswer.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="optionA"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option A
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Option A"
                    />
                    {errors.optionA && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.optionA.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="marksOptionA"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option A Marks
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="number"
                      {...field}
                      placeholder="Option A Marks"
                    />
                    {errors.marksOptionA && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.marksOptionA.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="optionB"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option B
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Option B"
                    />
                    {errors.optionB && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.optionB.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="marksOptionB"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option B Marks
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="number"
                      {...field}
                      placeholder="Option D Marks"
                    />
                    {errors.marksOptionB && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.marksOptionB.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="optionC"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option C
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Option C"
                    />
                    {errors.optionC && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.optionC.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="marksOptionC"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option C Marks
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="number"
                      {...field}
                      placeholder="Option C Marks"
                    />
                    {errors.marksOptionC && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.marksOptionC.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="optionD"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option D
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Option D"
                    />
                    {errors.optionD && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.optionD.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="marksOptionD"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option D Marks
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="number"
                      {...field}
                      placeholder="Option D Marks"
                    />
                    {errors.marksOptionD && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.marksOptionD.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="optionE"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option E
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      {...field}
                      placeholder="Option E"
                    />
                    {errors.optionE && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.optionE.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="marksOptionE"
                control={control}
                render={({ field }) => (
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Option E Marks
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="number"
                      {...field}
                      placeholder="Option E Marks"
                    />
                    {errors.marksOptionE && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.marksOptionE.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
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
                    {/* <SoftInput
                      type="text"
                      {...field}
                      placeholder="Remarks"
                    /> */}
                    <SoftBox>
                      <textarea rows={3} cols={3} style={{ border: "none", resize: "none", width: "100%", border: "0.0625rem solid #d2d6da", borderRadius: "10px", overflow: "hidden", padding: "10px", fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}
                        type="text"
                        {...field}
                        placeholder="Remarks"
                      />
                    </SoftBox>
                    {errors.remarks && (
                      <SoftTypography component="label" variant="caption" color="error">
                        {errors.remarks.message}
                      </SoftTypography>
                    )}
                  </SoftBox>
                )}
              />
            </Grid>
            {/* {Object.keys(activeRow).length !== 0 && <Grid item xs={12} sm={6} md={3}>
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
            </Grid>} */}
          </Grid>


          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" type="submit" fullWidth>
              {(createLoading || updateLoading) ? 'Loading..' : 'Submit'}
            </SoftButton>
          </SoftBox>
        </form>
      </SoftBox>
    </Card>
  );
}

export default EditQuestion;
