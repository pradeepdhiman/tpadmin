

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
import { Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import SoftBadge from "components/SoftBadge";
import { authUser } from "layouts/authentication/functions/query";
import { useUpdateReassessmentMutation } from "layouts/Reassessment/function/query";
import { toastHandler } from "utils/utils";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { _sourcePath } from "config/constant";


function AssessmentDetails(props) {
  const [payStatus, setPayStatus] = useState({})
  const { toggleEdit = false, loading = false } = props
  const { activeRow } = useSelector(state => state.reassessment)
  const [feeAmount, setFeeAmount] = useState()
  const [error, setError] = useState(false)
  const { data: paymentStatusList } = useMasterListByTypeQuery({ TypeID: masterCode?.PaymentStatus })

  const [updateReass, { data: assRes, isLoading: ressLoading, isError: resErr }] = useUpdateReassessmentMutation()


  useEffect(() => {
    if (activeRow?.paymentStatusID && paymentStatusList?.data?.length) {
      const foundRes = paymentStatusList?.data?.find(x => x.masterCodeID === activeRow.paymentStatusID);
      setPayStatus(foundRes);
      setFeeAmount(activeRow?.fee)
    }
  }, [activeRow, paymentStatusList]);



  let user = authUser()
  function closeEdit() {
    toggleEdit()
  }

  async function approvehandler() {
    if (!feeAmount && payStatus?.value === "Pending") {
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
      paymentStatusID: parseInt(payStatus?.masterCodeID),
      status: parseInt(activeRow?.status),
      updatedById: parseInt(user?.id || 1),
      remarks: activeRow?.remarks
    }
    try {
      const res = await updateReass(newVal)
      toastHandler(res)
    } catch (err) { console.log(err) }

  }
  async function statushandler(_, newVal) {
    setPayStatus(newVal);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
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
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ width: "100%" }}>
          <SoftBox px={2} py={.5} mt={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Course name
            </SoftTypography>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {activeRow.courseName}
            </SoftTypography>
          </SoftBox>
          <SoftBox px={2} py={.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Applicant name
            </SoftTypography>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {activeRow.applicantName}
            </SoftTypography>
          </SoftBox>
          <SoftBox px={2} py={.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Re-Assessment Fee ($)
            </SoftTypography>
            <SoftBox display="inline-block">
              <SoftInput error={error} type="number" value={feeAmount} onChange={e => setFeeAmount(e.target.value)} />
            </SoftBox>
          </SoftBox>
          <SoftBox px={2} py={.5} mb={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
              <SoftButton disabled={ressLoading} onClick={approvehandler} variant="gradient" color="info">Send</SoftButton>
            </SoftBox>
          </SoftBox>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ width: "100%" }}>
          <SoftBox px={2} py={.5} mt={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Course Fee
            </SoftTypography>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {activeRow.fee}
            </SoftTypography>
          </SoftBox>
          <SoftBox px={2} py={.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Payment Image
            </SoftTypography>
            <SoftTypography
              onClick={() => window.open(`${_sourcePath}Content/Receipts/${activeRow?.receipt}`, "_blank")}
              display="inline-block"
              variant="caption"
              fontWeight="bold"
              color="info"
              sx={{ cursor: "pointer" }}
            >
              {activeRow?.receipt}
            </SoftTypography>
          </SoftBox>
          <SoftBox px={2} py={.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Payment Date
            </SoftTypography>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {moment(activeRow.receiptDate).format("DD-MM-YYYY")}
            </SoftTypography>
          </SoftBox>
          <SoftBox px={2} py={.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Status
            </SoftTypography>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {activeRow?.statusName}
            </SoftTypography>
          </SoftBox>
          <SoftBox px={2} py={.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftTypography variant="button" color="text" fontWeight="bold">
              Verify  Payment
            </SoftTypography>
            <SoftBox display="inline-block">
              <SoftAddAbleAutoSelect
                dataList={paymentStatusList?.data || []}
                selectedValue={payStatus}
                selectHandler={statushandler}
                placeholder="Payment Status"
                isEditable={false}
              />
            </SoftBox>
          </SoftBox>
          <SoftBox px={2} py={.5} mb={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center", width: "100%" }}>
              <SoftButton disabled={ressLoading} onClick={approvehandler} variant="gradient" color="info">Approved</SoftButton>
            </SoftBox>
          </SoftBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AssessmentDetails;
