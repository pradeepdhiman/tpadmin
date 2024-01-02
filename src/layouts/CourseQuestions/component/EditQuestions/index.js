

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




function EditQuestion({ toggleEdit }) {
  const dispatch = useDispatch()

  const { editid, questionList, course } = useSelector(state => state.question)
  const editfields = questionList?.data?.find(x => x.questionID === editid)

  const user = authUser()

  const [addQuestion, { data: questData, isError: questErr, isLoading: questLoading }] = useCreateQuestionMutation()
  const [updateQuestion, { data: updateData, isError: updateErr, isLoading: updateLoading }] = useUpdateQuestionMutation()

  const { handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editfields || [],
  });

  const submitFormData = async (data) => {

    try {
      const newData = {
        ...data,
        questionID: editid ? (editfields.questionID || 0) : 0,
        courseID: editid ? editfields.courseID : course.courseID,
        createdById: editid ? (parseInt(editfields.createdById) || 0) : parseInt(user.id),
        marksOptionA: editfields?.marksOptionA || "SS",
        marksOptionB: editfields?.marksOptionB || "SS",
        marksOptionC: editfields?.marksOptionC || "SS",
        marksOptionD: editfields?.marksOptionD || "SS",
        marksOptionE: editfields?.marksOptionE || "SS",
      };

      const apiFunction = editid ? updateQuestion : addQuestion;

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
    dispatch(setQuestionEdit(""))
    reset()
    toggleEdit()
  }

  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Assessment Question.
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
        <MasterForm onSubmit={submitFormData} formState={editfields} formFields={fields} loading={questLoading || updateLoading} handleSubmit={handleSubmit} control={control} reset={reset} errors={errors} />





        {/* <form>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Question Title
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              name="questionTitle"
              onChange={handleFormData}
              placeholder="Question Title"
              value={formData?.questionTitle}
            />
            {formErrors.questionTitle && <SoftTypography component="label" variant="caption" color="error">{formErrors.questionTitle}</SoftTypography>}
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Question Type
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              name="questionType"
              onChange={handleFormData}
              placeholder="questionType"
              value={formData?.questionType}
            />
            {formErrors.questionType && <SoftTypography component="label" variant="caption" color="error">{formErrors.questionType}</SoftTypography>}
          </SoftBox>
          <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "top" }}>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Option A
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                name="optionA"
                onChange={handleFormData}
                placeholder="Option A"
                value={formData?.optionA}
              />
              {formErrors.optionA && <SoftTypography component="label" variant="caption" color="error">{formErrors.optionA}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Option B
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                name="optionB"
                onChange={handleFormData}
                placeholder="Option B"
                value={formData?.optionB}
              />
              {formErrors.optionB && <SoftTypography component="label" variant="caption" color="error">{formErrors.optionB}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Option C
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                name="optionC"
                onChange={handleFormData}
                placeholder="Option C"
                value={formData?.optionC}
              />
              {formErrors.optionC && <SoftTypography component="label" variant="caption" color="error">{formErrors.optionC}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Option D
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                name="optionD"
                onChange={handleFormData}
                placeholder="optionD"
                value={formData?.optionD}
              />
              {formErrors.optionD && <SoftTypography component="label" variant="caption" color="error">{formErrors.optionD}</SoftTypography>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Option E
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                name="optionE"
                onChange={handleFormData}
                placeholder="optionE"
                value={formData?.optionE}
              />
              {formErrors.optionE && <SoftTypography component="label" variant="caption" color="error">{formErrors.optionE}</SoftTypography>}
            </SoftBox>
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Correct Answer
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              name="correctAnswer"
              onChange={handleFormData}
              placeholder="Correct Answer"
              value={formData?.correctAnswer}
            />
            {formErrors.correctAnswer && <SoftTypography component="label" variant="caption" color="error">{formErrors.correctAnswer}</SoftTypography>}
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
              {loading ? "Loading..." : "Submit"}
            </SoftButton>
          </SoftBox>
        </form> */}
      </SoftBox>
    </Card>
  );
}

export default EditQuestion;
