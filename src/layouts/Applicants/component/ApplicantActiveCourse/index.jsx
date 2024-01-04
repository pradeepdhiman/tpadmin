

import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ListItem from "../ListIem";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useApplicantActiveCourseMutation } from "layouts/Applicants/functions/query";

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

const ApplicantActiveCourse = () => {
    const { activeRow } = useSelector(state => state.applicant);
    const [getCompletedcourse, { data: getResp, isError: getErr, isLoading: getLoading }] = useApplicantActiveCourseMutation();

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
        // <Card id="Complete-course" sx={{ height: "100%" }}>
        //     <SoftBox p={2}>
        //         <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        //             {getLoading && <SoftBarLoader />}
        //             {getResp && getResp.data && getResp.data.length !== 0 ? (
        //                 getResp.data.map((item, index) => (
        //                     <ListItem key={index} item={item} />
        //                 ))
        //             ) : (
        //                 <SoftTypography>Data not Available</SoftTypography>
        //             )}
        //         </SoftBox>
        //     </SoftBox>
        // </Card>
        <Card id="Complete-course" sx={{ height: "100%" }}>
            <SoftBox p={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {getLoading && <SoftBarLoader />}
                    {dataObject.length !== 0 ? (
                        dataObject.map((item, index) => (
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
