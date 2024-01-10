import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import ScheduleItem from "../ScheduleItem";
import SoftTypography from "components/SoftTypography";
import { useListSchedulesQuery } from "layouts/Courses/functions/query";
import SoftInput from "components/SoftInput";
import { useAssignScheduleMutation } from "layouts/Courses/functions/query";
import { authUser } from "layouts/authentication/functions/query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRow } from "layouts/Courses/functions/coursesSlice";
// {
//     "courseScheduleID": 0,
//     "scheduledID": 0,
//     "courseID": 0,
//     "applicantID": 0,
//     "meetingLink": "string",
//     "courseScheduleStatus": "string",
//     "createdById": 0,
//     "remarks": "string"
//   }
const AssignSchedule = () => {
    let user = authUser()
    const dispatch = useDispatch()
    const [meetingLink, setMeetingLink] = useState("")
    const [err, setErr] = useState(false)
    const { activeRow } = useSelector(state => state.courses)
    const { data: schedules, isError: schErr, isLoading: schLoading } = useListSchedulesQuery()
    const [assign, { data: assignData, isError: assignErr, isLoading: assignLoading }] = useAssignScheduleMutation()
    console.log(schedules, "ssssssssssss")
    async function assignhandler(id) {
        if (!meetingLink) {
            setErr(true)
            return
        }
        const newData = {
            courseScheduleID: 0,
            scheduledID: id,
            courseID: activeRow?.courseID,
            // applicantID: activeRow?.applicantID,
            meetingLink: meetingLink,
            courseScheduleStatus: "active",
            createdById: parseInt(user?.id),
            remarks: "remark"
        }
        try {
            const res = await assign(newData)
            if (res?.data?.success) {
                dispatch(setActiveRow({}))
            }
        } catch (err) {
            console.log(err)
        }
    }
    function changeHandler(e) {
        let value = e.target.value;
        setMeetingLink(value)
        setErr(false)
    }
    return (
        <Card>
            <SoftBox p={2}>
                {schLoading && <SoftTypography variant="h6" fontWeight="bold">
                    Loading...
                </SoftTypography>}
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    <SoftBox mb={1}>
                        <SoftInput value={meetingLink} onChange={changeHandler} type="text" placeholder="Meeting link" />
                        {err && <SoftTypography variant="h6" fontWeight="regular" color="error">
                            Meeting link required.
                        </SoftTypography>}
                    </SoftBox>
                    {schedules?.data?.length !== 0 ? (
                        schedules?.data?.map(schItem => (
                            <ScheduleItem key={schItem.scheduledID} itemData={schItem} onAssign={assignhandler} />
                        ))
                    ) : (
                        <SoftTypography variant="h6" fontWeight="bold">
                            Study material not available
                        </SoftTypography>
                    )}

                </SoftBox>
            </SoftBox>
        </Card>
    );
}

export default AssignSchedule;