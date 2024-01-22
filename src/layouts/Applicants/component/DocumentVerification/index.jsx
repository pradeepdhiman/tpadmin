import { Card, Grid, Switch } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppliedCourseQuery } from "layouts/Applicants/functions/query";
import { useCourseProofMutation } from "layouts/Applicants/functions/query";
import { Link } from "react-router-dom";
import { _apiBaseUrl } from "config/constant";
import { masterCode } from "common/constant";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { useMasterListByTypeQuery } from "common/query";
import { useMasterListMutation } from "common/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { authUser } from "layouts/authentication/functions/query";
import { useUpdateStatusMutation } from "layouts/Applicants/functions/query";
import moment from "moment";


const DocumentVerification = () => {
    const [payStatus, setPayStatus] = useState({})
    const { activeRow } = useSelector(state => state.applicant);
    const { data: appliedCourse, isError: appliedErr, isLoading: appliedLoading } = useAppliedCourseQuery({ ApplicantID: activeRow?.applicantID });
    const [getProof, { data: proofdoc, isError: proofErr, isLoading: proofLoading }] = useCourseProofMutation({ id: appliedCourse?.data?.applicantCourseID });
    const [fetchPaymentStatus, { data: paymentStatusList }] = useMasterListMutation()
    const { data: courseStatusList } = useMasterListByTypeQuery({ TypeID: masterCode?.CourseStatus })
    const [changeStatus, { data: stausRes, isLoading: statusLoading }] = useUpdateStatusMutation()
    let user = authUser()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appliedCourseID = appliedCourse?.data[0]?.applicantCourseID;
                const res = await getProof({ id: appliedCourseID });

                if (res?.data?.success) {
                    const paymentStatusID = masterCode?.PaymentStatus;
                    const paymentRes = await fetchPaymentStatus({ TypeID: paymentStatusID });

                    if (paymentRes?.data?.success) {
                        const foundRes = paymentRes.data?.data?.find(x => x.masterCodeID === appliedCourse?.data[0]?.paymentStatus);
                        setPayStatus(foundRes);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [appliedCourse, masterCode]);



    async function statushandler(_, newVal) {
        setPayStatus(newVal);

        let correspondingCourseStatus;
        if (newVal.value === 'Verified') {
            correspondingCourseStatus = courseStatusList?.data?.find(status => status.value === 'Active');
        } else if (newVal.value === 'Pending') {
            correspondingCourseStatus = courseStatusList?.data?.find(status => status.value === 'Applied');
        }


        const { data } = proofdoc;
        const newData = {
            applicantCourseID: parseInt(data.applicantCourseID),
            applicantID: parseInt(data.applicantID),
            courseID: parseInt(data.courseID),
            scheduleID: parseInt(data.scheduleID),
            enrollmentDate: data.enrollmentDate,
            completionDate: data.completionDate,
            // enrollmentDate: moment(data.enrollmentDate).format("DD-MM-YYYY"),
            // completionDate: moment(data.completionDate).format("DD-MM-YYYY"),
            receiptID: data.receiptID,
            receiptDate: data.receiptDate,
            // receiptDate: moment(data.receiptDate).format("DD-MM-YYYY"),
            amountPaid: data.amountPaid,
            paymentStatus: parseInt(newVal.masterCodeID),
            courseStatus: correspondingCourseStatus ? parseInt(correspondingCourseStatus.masterCodeID) : 0,
            status: parseInt(1),
            updatedById: parseInt(user?.id),
            remarks: ""
        };


        try {
            const res = await changeStatus(newData)
            if (res?.data?.success) {
                const appliedCourseID = appliedCourse?.data[0]?.applicantCourseID;
                await getProof({ id: appliedCourseID })
            }
        } catch (Err) {
            console.log(Err)
        }

    }

    return (
        <Card id="Complete-course" sx={{ height: "100%" }}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <SoftBox p={2} px={4}>
                        <SoftBox display="flex" mb={0.25}>
                            <SoftBox>
                                <SoftAddAbleAutoSelect
                                    dataList={paymentStatusList?.data || []}
                                    selectedValue={payStatus}
                                    selectHandler={statushandler}
                                    placeholder="Activate course"
                                    isEditable={false}
                                />
                            </SoftBox>
                        </SoftBox>
                    </SoftBox>
                    {statusLoading && <SoftBox >
                        <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                            Updating...
                        </SoftTypography>
                    </SoftBox>}
                    {(proofLoading || appliedLoading) && <SoftBarLoader />}
                    {proofdoc?.data && Object.keys(proofdoc?.data).length ? <SoftBox p={2} px={4} >
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium" mb={1}>
                                Applicant Name
                            </SoftTypography>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                {proofdoc?.data?.applicantName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                Course Name
                            </SoftTypography>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                {proofdoc?.data?.courseName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                Schedule Name
                            </SoftTypography>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                {proofdoc?.data?.scheduleName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                Course Fee
                            </SoftTypography>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                ${proofdoc?.data?.trainingfee}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                Amount Received
                            </SoftTypography>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="success">
                                ${proofdoc?.data?.amountPaid}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                Payment Status
                            </SoftTypography>
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                {proofdoc?.data?.paymentStatusName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} >
                            <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                Payment Screeshot
                            </SoftTypography>
                            <SoftTypography
                                onClick={() => window.open(`${_apiBaseUrl}Content/Receipts/${proofdoc?.data?.receipt}`, "_blank")}
                                display="inline-block"
                                variant="caption"
                                fontWeight="bold"
                                color="info"
                                sx={{cursor:"pointer"}}
                            >
                                {proofdoc?.data?.receipt}
                            </SoftTypography>

                            {/* <SoftTypography component={Link} target="_blank" to={`${_apiBaseUrl}Content/Receipts/${proofdoc?.data?.receipt}`} display="inline-block" variant="caption" fontWeight="bold" color="info">
                                {proofdoc?.data?.receipt}
                            </SoftTypography> */}
                        </SoftBox>
                    </SoftBox> : <SoftBox p={2} px={4} >
                        <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                            No course avaialbe for approval.
                        </SoftTypography></SoftBox>}
                </Grid>
            </Grid>
        </Card>
    );
}

export default DocumentVerification;
