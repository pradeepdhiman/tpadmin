import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import { useApplicantCompleteCourseMutation } from "layouts/Applicants/functions/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListItem from "../ListIem";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import moment from "moment";

const dataObject = [
    {
      applicantCourseID: 0,
      applicantID: 0,
      courseID: 0,
      enrollmentDate: "2024-01-04T05:18:07.355Z",
      completionDate: "2024-01-04T05:18:07.355Z",
      receiptID: "string",
      receiptDate: "2024-01-04T05:18:07.355Z",
      amountPaid: "string",
      status: 0,
      createdById: 0,
      updatedById: 0,
      updatedDate: "2024-01-04T05:18:07.355Z",
      isDeleted: true,
      remarks: "string"
    },
    {
      applicantCourseID: 2,
      applicantID: 0,
      courseID: 0,
      enrollmentDate: "2024-01-04T05:18:07.355Z",
      completionDate: "2024-01-04T05:18:07.355Z",
      receiptID: "string",
      receiptDate: "2024-01-04T05:18:07.355Z",
      amountPaid: "string",
      status: 0,
      createdById: 0,
      updatedById: 0,
      updatedDate: "2024-01-04T05:18:07.355Z",
      isDeleted: true,
      remarks: "string"
    }
  ]

const ApplicantCompleteCourse = () => {
    const [pipedData, setPipedData] = useState([])
    const { activeRow } = useSelector(state => state.applicant);
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
        if (getResp?.success) {
            const data = getResp?.data?.map(item => ({
                applicantCourseID: item?.applicantCourseID,
                applicantName: item?.applicantName,
                courseName: item?.courseName,
                scheduleName: item?.scheduleName,
                enrollmentDate: moment(item?.enrollmentDate).format("DD-MM-YYYY"),
                completionDate: moment(item?.completionDate).format("DD-MM-YYYY"),
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

export default ApplicantCompleteCourse;
