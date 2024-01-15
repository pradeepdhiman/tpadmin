import { Card, Grid, Switch } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useApplicantCompleteCourseMutation } from "layouts/Applicants/functions/query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppliedCourseQuery } from "layouts/Applicants/functions/query";
import { useCourseProofMutation } from "layouts/Applicants/functions/query";
import { Link } from "react-router-dom";
import { _apiBaseUrl } from "config/constant";


const DocumentVerification = () => {
    const { activeRow } = useSelector(state => state.applicant);
    const { data: appliedCourse, isError: appliedErr, isLoading: appliedLoading } = useAppliedCourseQuery({ ApplicantID: activeRow?.applicantID });
    const [getProof, { data: proofdoc, isError: proofErr, isLoading: proofLoading }] = useCourseProofMutation({ id: appliedCourse?.data?.applicantCourseID });
    const [getCompletedcourse, { data: getResp, isError: getErr, isLoading: getLoading }] = useApplicantCompleteCourseMutation();


    useEffect(() => {
        async function fetchFunction() {
            try {
                const res = await getCompletedcourse({ applicantID: activeRow.applicantID });
                console.log(res, "asdfasd");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchFunction();
    }, [activeRow, getCompletedcourse]);

    useEffect(() => {
        async function fetchFunction() {
            try {
                const res = await getProof({ id: appliedCourse?.data[0]?.applicantCourseID });
                console.log(res, "asdfasd");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchFunction();
    }, [appliedCourse]);



    async function statusChangehandler() {
        let status = proofdoc?.data?.status === null || proofdoc?.data?.status === undefined || proofdoc?.data?.status === 1 ? 0 : 1;
        let updatedStatus = { ...proofdoc?.data, status };

        // try {
        //   const res = await updateCourse(updatedStatus)
        //   if (res?.data?.success) {
        //     dispatch(setActiveRow(updatedStatus))
        //   }
        // } catch (err) {
        //   console.log(err)
        // }
    }

    return (
        <Card id="Complete-course" sx={{ height: "100%" }}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <SoftBox p={2} px={4}>
                        <SoftBox display="flex" mb={0.25}>
                            <SoftBox>
                                <Switch checked={proofdoc?.data?.status === 1} onChange={statusChangehandler} />
                            </SoftBox>
                            <SoftBox width="80%" ml={2}>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                    {proofdoc?.data?.status === 1 ? "Course is Active" : "Course is not active"}
                                </SoftTypography>
                            </SoftBox>
                        </SoftBox>
                    </SoftBox>
                    <SoftBox p={2} px={4} sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center" }}>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Applicant Name
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                               {proofdoc?.data?.applicantName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Course Name
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                               {proofdoc?.data?.courseName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Schedule Name
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                               {proofdoc?.data?.scheduleName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Course Fee
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                               ${proofdoc?.data?.trainingfee}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Amount Received
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="success">
                               ${proofdoc?.data?.amountPaid}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Payment Status
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                               {proofdoc?.data?.paymentStatusName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Payment Screeshot
                            </SoftTypography>
                            <SoftTypography component={Link} target="_blank" to={_apiBaseUrl} display="inline-block" variant="caption" fontWeight="regular" color="info">
                               {proofdoc?.data?.receipt}
                            </SoftTypography>
                        </SoftBox>
                    </SoftBox>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DocumentVerification;
