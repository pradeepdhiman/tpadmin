

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
import { Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import SoftBadge from "components/SoftBadge";
import { authUser } from "layouts/authentication/functions/query";
import { useUpdateReassessmentMutation } from "layouts/Reassessment/function/query";
import { toastHandler } from "utils/utils";


function AssessmentDetails(props) {
  const { toggleEdit = false, loading = false } = props
  const { activeRow } = useSelector(state => state.reassessment)
  const [feeAmount, setFeeAmount] = useState()
  const [error, setError] = useState(false)

  const [updateReass, { data: assRes, isLoading: ressLoading, isError: resErr }] = useUpdateReassessmentMutation()

  let user = authUser()
  function closeEdit() {
    toggleEdit()
  }

  async function approvehandler() {
    if (!feeAmount) {
      setError(true)
      return
    }
    setError(false)

    let newVal = {
      reassessmentID: parseInt(activeRow?.reassessmentID),
      courseID: parseInt(activeRow?.courseID),
      applicantID: parseInt(activeRow?.applicantID),
      fee: feeAmount,
      receipt: activeRow?.receipt,
      receiptID: activeRow?.receiptID,
      receiptDate: activeRow?.receiptDate,
      amountPaid: activeRow?.amountPaid,
      paymentStatusID: parseInt(activeRow?.paymentStatusID),
      status: parseInt(activeRow?.status),
      updatedById: parseInt(user?.id || 1),
      remarks: activeRow?.remarks
    }
    try {
      const res = await updateReass(newVal)
      toastHandler(res)
    } catch (err) { console.log(err) }

  }

  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Re-Assessment Details
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
            <Grid item xs={4}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Applicant name
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {activeRow.applicantName}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={4}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Course name
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {activeRow.courseName}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={4}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftTypography variant="button" color="text" fontWeight="bold">
                  Assessment Date
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {moment(activeRow.assesmentDate).format("DD-MM-YYYY")}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item xs={12}>
              <SoftBox sx={{ display: "flex", justifyContent: "start", alignItem: "center", width: "100%" }}>
                <SoftBox display="inline-block" mr={2}>
                  <SoftTypography variant="button" color="text" fontWeight="bold">
                    Payment For Re-Assessment:
                  </SoftTypography>
                </SoftBox>

                <SoftBox display="inline-block">
                  <SoftInput error={error} type="number" value={feeAmount} onChange={e => setFeeAmount(e.target.value)} />
                </SoftBox>
              </SoftBox>
            </Grid>
            <Grid item xs={12}>
              <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
                <SoftButton disabled={ressLoading} onClick={approvehandler} variant="gradient" color="info">Send</SoftButton>
              </SoftBox>
            </Grid>

          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default AssessmentDetails;
