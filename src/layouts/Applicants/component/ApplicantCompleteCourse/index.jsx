import { useApplicantCompleteCourseMutation } from "layouts/Applicants/functions/query";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ApplicantCompleteCourse = () => {
    const { activeRow } = useSelector(state => state.applicant)
    const [getCompletedcourse, { data: getResp, isError: getErr, isLoading: getLoading }] = useApplicantCompleteCourseMutation()
    console.log(activeRow)

    useEffect(() => {
        getCompletedcourse(getCompletedcourse.applicantID)
    }, [])
    return (
        <div>sdfasdfasdf</div>
    );
}

export default ApplicantCompleteCourse;