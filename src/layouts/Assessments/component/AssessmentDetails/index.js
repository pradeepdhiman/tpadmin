

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
import Header from "../Header";
import { Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import SoftBadge from "components/SoftBadge";
import AssessItem from "./AssessItem";
import { useTestDetailQuery } from "layouts/Assessments/function/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";

let dummy = {
  "data": {
    "candidateAssesmentID": 0,
    "applicantID": 0,
    "applicantName": "string",
    "coursesAssesmentID": 0,
    "assesmentDate": "2024-02-01T07:35:04.418Z",
    "totalQuestions": "string",
    "correctAnswers": 0,
    "result": "string",
    "status": 0,
    "createdById": 0,
    "updatedById": 0,
    "updatedDate": "2024-02-01T07:35:04.418Z",
    "isDeleted": true,
    "remarks": "string",
    "candidateAssesmentDeatilList": [
      {
        "detailID": 0,
        "candidateAssesmentID": 0,
        "questionID": 0,
        "questionTitle": "string",
        "questionType": 0,
        "correctAnswer": "string",
        "optionA": "string",
        "optionB": "string",
        "optionC": "string",
        "optionD": "string",
        "optionE": "string",
        "marksOptionA": "string",
        "marksOptionB": "string",
        "marksOptionC": "string",
        "marksOptionD": "string",
        "marksOptionE": "string",
        "applicantAnswer": "string",
        "weightage": "string",
        "weightageScored": "string",
        "result": "string",
        "grade": "string",
        "status": 0,
        "createdById": 0,
        "updatedById": 0,
        "updatedDate": "2024-02-01T07:35:04.418Z",
        "isDeleted": true,
        "remarks": "string"
      },
      {
        "detailID": 0,
        "candidateAssesmentID": 0,
        "questionID": 0,
        "questionTitle": "string",
        "questionType": 0,
        "correctAnswer": "string",
        "optionA": "string",
        "optionB": "string",
        "optionC": "string",
        "optionD": "string",
        "optionE": "string",
        "marksOptionA": "string",
        "marksOptionB": "string",
        "marksOptionC": "string",
        "marksOptionD": "string",
        "marksOptionE": "string",
        "applicantAnswer": "string",
        "weightage": "string",
        "weightageScored": "string",
        "result": "string",
        "grade": "string",
        "status": 0,
        "createdById": 0,
        "updatedById": 0,
        "updatedDate": "2024-02-01T07:35:04.418Z",
        "isDeleted": true,
        "remarks": "string"
      }
    ]
  }
}

function AssessmentDetails(props) {
  const { toggleEdit = false, loading = false } = props
  const { activeRow } = useSelector(state => state.assessment)
  const { data: testdata, isLoading: testLoading, isError: testErr } = useTestDetailQuery({ id: activeRow?.candidateAssesmentID })

  function closeEdit() {
    toggleEdit()
  }

  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Assessment Details
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Applicant name
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {activeRow.applicantName}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={6}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Course name
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {activeRow.courseName}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={6}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Assessment Date
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {moment(activeRow.assesmentDate).format("DD-MM-YYYY")}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={6}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Total Questions
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {activeRow.totalQuestions}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={6}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Correct Answer
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {activeRow.correctAnswers}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={6}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Result
                </SoftTypography>
                {activeRow.result === "Pass" ? <SoftBadge variant="gradient" badgeContent={activeRow.result} color="success" size="xs" container /> : <SoftBadge variant="gradient" badgeContent={activeRow.result} color="error" size="xs" container />}
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
        <Divider />
        <SoftBox mb={2} mt={2}>
          <SoftBox mb={1}>
            <SoftTypography variant="h6" fontWeight="medium">
              Test Details
            </SoftTypography>
          </SoftBox>
          {testLoading && <SoftBarLoader />}
          {testdata?.data?.candidateAssesmentDeatilList?.map(item => <AssessItem key={item.detailID} data={item} />)}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default AssessmentDetails;
