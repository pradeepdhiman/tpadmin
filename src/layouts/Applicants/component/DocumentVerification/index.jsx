import { Card, Grid, Switch } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useApplicantCompleteCourseMutation } from "layouts/Applicants/functions/query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppliedCourseQuery } from "layouts/Applicants/functions/query";
import { useCourseProofQuery } from "layouts/Applicants/functions/query";


const DocumentVerification = () => {
    const { activeRow } = useSelector(state => state.applicant);
    const { data: appliedCourse, isError: appliedErr, isLoading: appliedLoading } = useAppliedCourseQuery({ ApplicantID: activeRow?.applicantID });
    const { data: proofdoc, isError: proofErr, isLoading: proofLoading } = useCourseProofQuery({ id: appliedCourse?.data?.applicantCourseID });
    const [getCompletedcourse, { data: getResp, isError: getErr, isLoading: getLoading }] = useApplicantCompleteCourseMutation();

    console.log(activeRow, "asdfasdfasdf")
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
                <Grid item xs={12} sm={6}>
                    <SoftBox p={2}>

                        {/* <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                            {getLoading && <SoftBarLoader />}
                            {dataObject.length !== 0 ? (
                                dataObject.map((item, index) => (
                                    <SoftTypography p={1} color="dark" component="a" href={item.href} target="_blank" variant="caption" fontWeight="bold" >
                                        {item.title}
                                    </SoftTypography>
                                ))
                            ) : (
                                <SoftTypography>Data not Available</SoftTypography>
                            )}
                        </SoftBox> */}
                    </SoftBox>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <SoftBox p={2}>
                        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                            {getLoading && <SoftBarLoader />}
                            {dataObject.length !== 0 ? (
                                dataObject.map((item, index) => (
                                    <SoftTypography p={1} color="dark" component="a" href={item.href} target="_blank" variant="caption" fontWeight="bold" >
                                        {item.title}
                                    </SoftTypography>
                                ))
                            ) : (
                                <SoftTypography>Data not Available</SoftTypography>
                            )}
                        </SoftBox>
                    </SoftBox>
                </Grid> */}
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
                        <ul>
                            {Object.entries(proofdoc?.data || {}).map(([key, value]) => (
                                <SoftTypography component="li" key={key}><strong>{key}:</strong> {value}</SoftTypography>
                            ))}
                        </ul>
                    </SoftBox>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DocumentVerification;
