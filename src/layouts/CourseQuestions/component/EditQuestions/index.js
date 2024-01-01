

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

const initialFormdata = {
  questionID: 0,
  courseID: 0,
  questionTitle: "",
  questionType: "mcq",
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

const validationRules = {
  questionID: { required: false, },
  courseID: { required: false, },
  questionTitle: { required: true, },
  questionType: { required: true, },
  correctAnswer: { required: true, },
  optionA: { required: true, },
  optionB: { required: true, },
  optionC: { required: true, },
  optionD: { required: true, },
  optionE: { required: true, },
  marksOptionA: { required: false, },
  maaksOptionB: { required: false, },
  marksOptionC: { required: false, },
  marksOptionD: { required: false, },
  marksOptionE: { required: false, },
  createdById: { required: false, },
  remarks: { required: false, },
};

function EditQuestion({ toggleEdit, submitdata, actionresponse, loading }) {
  const [formData, setFormData] = useState(initialFormdata);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!actionresponse?.success) {
      setFormData(initialFormdata);
    }
  }, [actionresponse?.success]);


  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitFormData = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData, validationRules);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      submitdata(formData)
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
        <form>
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
        </form>
      </SoftBox>
    </Card>
  );
}

export default EditQuestion;
