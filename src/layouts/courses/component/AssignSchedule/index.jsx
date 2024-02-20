import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import ScheduleItem from "../ScheduleItem";
import SoftTypography from "components/SoftTypography";
import { useListSchedulesQuery } from "layouts/Courses/functions/query";
import SoftInput from "components/SoftInput";
import { useAssignScheduleMutation } from "layouts/Courses/functions/query";
import { authUser } from "layouts/authentication/functions/query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRow } from "layouts/Courses/functions/coursesSlice";
import { useScheduleByIdMutation } from "layouts/Courses/functions/query";
import moment from "moment";
import SoftButton from "components/SoftButton";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { toastHandler } from "utils/utils";
import { useNavigate } from "react-router-dom";
import { useUpdateScheduleMutation } from "layouts/Courses/functions/query";

const AssignSchedule = () => {
    let user = authUser()
    const dispatch = useDispatch()
    const [meetingLink, setMeetingLink] = useState("")
    const [selected, setSelected] = useState("")
    const [scheduleStatus, setScheduleStatus] = useState({})
    const [err, setErr] = useState(false)
    const { activeRow } = useSelector(state => state.courses)
    const { data: schedules, isError: schErr, isLoading: schLoading } = useListSchedulesQuery()
    const [assign, { data: assignData, isError: assignErr, isLoading: assignLoading }] = useAssignScheduleMutation()
    const [getSchedule, { data: schData, isError: schDataErr, isLoading: schDataLoading }] = useScheduleByIdMutation()
    const [updateSchedule, { isError: schdErr, isLoading: schLoad }] = useUpdateScheduleMutation()
    const { data: courseScheduleStatusList, isLoading: loadingStatus } = useMasterListByTypeQuery({ TypeID: masterCode.CourseScheduleStatus })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSchedule({ courseID: activeRow?.courseID });
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        if (activeRow) {
            fetchData();
        }
    }, [activeRow]);

    async function assignhandler() {
        if (!meetingLink) {
            setErr(true)
            return
        }
        const newData = {
            courseScheduleID: 0,
            scheduledID: selected?.scheduledID,
            courseID: selected?.courseID,
            // applicantID: activeRow?.applicantID,
            meetingLink: meetingLink,
            courseScheduleStatus: scheduleStatus?.masterCodeID || courseScheduleStatusList?.data[0]?.masterCodeID,
            createdById: parseInt(user?.id),
            remarks: "remark"
        }
        try {
            const res = await assign(newData)
            toastHandler(res)
            if (res?.data?.success) {
                const scheduleData = {
                    scheduledID: parseInt(selected?.scheduledID),
                    courseID: parseInt(selected?.courseID),
                    scheduledName: selected?.scheduledName,
                    startDate: selected?.startDate,
                    endDate: selected?.endDate,
                    scheduleCreatedDateTime: selected?.scheduleCreatedDateTime,
                    validityDateTime: selected?.validityDateTime,
                    location: parseInt(selected?.location),
                    instructor: parseInt(selected?.instructor),
                    status: 26,
                    updatedById: parseInt(selected?.updatedById),
                    remarks: selected?.remarks
                }
                await updateSchedule(scheduleData)
                await getSchedule({ courseID: activeRow?.courseID });
                // dispatch(setActiveRow({}))
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
    function selectHandler(id) {
        const data = schData?.data?.find(x => x.scheduledID === id)
        setSelected(data)
    }
    function scheduleStatusHandler(_, newVal) {
        setScheduleStatus(newVal)
    }
    return (
        <Grid container spacing={2}>
            <Grid item sx={12} sm>
                <Card>
                    <SoftBox p={2}>
                        {schDataLoading && <SoftTypography variant="h6" fontWeight="bold">
                            Loading...
                        </SoftTypography>}
                    </SoftBox>
                    <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                        {schData?.data?.length !== 0 ? (
                            schData?.data?.map(schItem => (
                                <ScheduleItem key={schItem.scheduledID} itemData={schItem} onSelect={selectHandler} />
                            ))
                        ) : (
                            <SoftTypography variant="h6" fontWeight="bold">
                                This course dont have active schedule <SoftButton onClick={() => navigate("/schedule")} color="info" variant="text">Click here</SoftButton> to add one.
                            </SoftTypography>
                        )}
                    </SoftBox>
                </Card>
            </Grid>
            {selected && <Grid item sx={12} sm>
                <Card>
                    <SoftBox p={2}>
                        <SoftBox mb={1}>
                            <SoftBox sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap: "15px" }}>
                                <SoftInput value={meetingLink} onChange={changeHandler} type="text" placeholder="Meeting link" />
                                <SoftButton disabled={!meetingLink || assignLoading} onClick={assignhandler} color="dark">{assignLoading ? "Loading" : "Assign"}</SoftButton>
                            </SoftBox>
                            {err && <SoftTypography variant="h6" fontWeight="regular" color="error">
                                Meeting link required.
                            </SoftTypography>}
                        </SoftBox>
                        <SoftBox mb={1}>
                            <SoftBox >
                                <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                    Course Schedule Status
                                </SoftTypography>
                                <SoftAddAbleAutoSelect
                                    dataList={courseScheduleStatusList?.data || []}
                                    selectedValue={scheduleStatus}
                                    selectHandler={scheduleStatusHandler}
                                    label={null}
                                    placeholder="Schedule Status"
                                    loading={loadingStatus}
                                    isEditable={false}
                                />
                            </SoftBox>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Schedule Name :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{selected.scheduledName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Course Name :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{selected.courseName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Start Date :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{moment(selected.startDate).format("DD-MM-YYYY")}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                End Date :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{moment(selected.endDate).format("DD-MM-YYYY")}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Created Datetime :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{moment(selected.scheduleCreatedDateTime).format("DD-MM-YYYY")}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Valid Date :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{moment(selected.validityDateTime).format("DD-MM-YYYY")}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Location :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{selected?.locationName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Instructor :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{selected?.instructorName}
                            </SoftTypography>
                        </SoftBox>
                        <SoftBox >
                            <SoftTypography display="inline-block" variant="button" fontWeight="medium">
                                Status :
                            </SoftTypography>
                            <SoftTypography display="inline-block" variant="caption" fontWeight="regular" color="text">
                                &nbsp;{selected?.statusName}
                            </SoftTypography>
                        </SoftBox>
                    </SoftBox>
                </Card>
            </Grid>}
        </Grid>
    );
}

export default AssignSchedule;