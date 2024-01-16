

import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListItem from "../ListIem";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useApplicantActiveCourseMutation } from "layouts/Applicants/functions/query";
import moment from "moment";



const ApplicantActiveCourse = () => {
    const [pipedData, setPipedData] = useState([])
    const { activeRow } = useSelector(state => state.applicant);
    const [getCompletedcourse, { data: getResp, isError: getErr, isLoading: getLoading }] = useApplicantActiveCourseMutation();


    useEffect(() => {
        async function fetchFunction() {
            try {
                const res = await getCompletedcourse({ applicantID: activeRow.applicantID });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchFunction();
    }, [activeRow, getCompletedcourse]);

    useEffect(() => {
        if (getResp?.success) {
            const data = getResp?.data?.map(item => ({
                applicantCourseID: item?.applicantCourseID,
                applicantName: item?.applicantName,
                courseName: item?.courseName,
                scheduleName: item?.scheduleName,
                enrollmentDate: moment(item?.enrollmentDate).format("DD-MM-YYYY"),
                trainingfee: item?.trainingfee,
                courseStatusName: item?.courseStatusName
            }));

            setPipedData(data)
        }
    }, [getResp]);

    return (
        <Card id="Complete-course" sx={{ height: "100%" }}>
            <SoftBox p={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {getLoading && <SoftBarLoader />}
                    {pipedData.length !== 0 ? (
                        pipedData.map((item, index) => (
                            <ListItem key={index} item={item} />
                        ))
                    ) : (
                        <SoftTypography>Data not Available</SoftTypography>
                    )}
                </SoftBox>
            </SoftBox>
        </Card>
    );
}

export default ApplicantActiveCourse;
