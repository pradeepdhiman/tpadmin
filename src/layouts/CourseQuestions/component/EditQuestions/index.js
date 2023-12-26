

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import SoftInput from "components/SoftInput";
import { useState } from "react";
import SoftButton from "components/SoftButton";
import CloseIcon from '@mui/icons-material/Close';
import { useAddQuestionMutation } from "layouts/CourseQuestions/functions/query";

const initialFormdata = {
  questionID: 0,
  courseID: 0,
  questionTitle: "",
  questionType: "",
  correctAnswer: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  optionE: "",
  marksOptionA: "",
  maaksOptionB: "",
  marksOptionC: "",
  marksOptionD: "",
  marksOptionE: "",
  createdById: 0,
  remarks: ""
}

function EditQuestion({ toggleEdit }) {
  const [formData, setFormData] = useState(initialFormdata);
  const [addQuestion] = useAddQuestionMutation()
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitFormData = async (e) => {
    e.preventDefault();
    try {
      const response = addQuestion(formData);
      console.log("response", response)
    } catch (err) {
      console.log(err, "err")
    }
  }
  function closeEdit() {
    setFormData(initialFormdata)
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
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
            Submit
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default EditQuestion;
