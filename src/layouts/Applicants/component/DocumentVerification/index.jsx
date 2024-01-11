import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useApplicantCompleteCourseMutation } from "layouts/Applicants/functions/query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ListItem from "../ListIem";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { authUser } from "layouts/authentication/functions/query";
import { useAppliedCourseQuery } from "layouts/Applicants/functions/query";

const dataObject = [
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 1"
    },
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 2"
    },
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 22"
    },
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 855"
    },
    {
        href: "https://via.placeholder.com/150",
        title: "Document 177"
    }
]

const DocumentVerification = () => {
    const { activeRow } = useSelector(state => state.applicant);
    const { data: appliedCourse, isError: appliedErr, isLoading: appliedLoading } = useAppliedCourseQuery({ ApplicantID: activeRow?.applicantID });
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
                    <SoftBox p={2} sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center" }}>
                        <ul>
                        {Object.entries(appliedCourse?.data || {}).map(([key, value]) => (
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
