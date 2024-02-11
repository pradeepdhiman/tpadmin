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
import { _sourcePath } from "config/constant";
import { toastHandler } from "utils/utils";
import SoftButton from "components/SoftButton";
import { verificationDocFilter } from "layouts/Applicants/constant";
import { useVerificationdocFilterMutation } from "layouts/Applicants/functions/query";


const DocumentVerification = () => {
    const [payStatus, setPayStatus] = useState({})
    const [selectedOption, setSelectedOption] = useState({})
    const [docFilters, setDocFilters] = useState(verificationDocFilter)
    const { activeRow } = useSelector(state => state.applicant);
    const { data: appliedCourse, isError: appliedErr, isLoading: appliedLoading, refatch: refreshAppliedCourse } = useAppliedCourseQuery({ ApplicantID: activeRow?.applicantID });
    // const [getProof, { data: proofdoc, isError: proofErr, isLoading: proofLoading }] = useCourseProofMutation({ id: appliedCourse?.data?.applicantCourseID });
    const [fetchPaymentStatus, { data: paymentStatusList }] = useMasterListMutation()
    const [getDocFilter, { data: docList, isLoading: docLoading, isError: docErr }] = useVerificationdocFilterMutation()
    const { data: courseStatusList } = useMasterListByTypeQuery({ TypeID: masterCode?.CourseStatus })
    const [changeStatus, { data: stausRes, isLoading: statusLoading }] = useUpdateStatusMutation()
    let user = authUser()

    useEffect(() => {
        if (selectedOption) {
            setDocFilters(prev => ({
                ...prev,
                filter: {
                    ...prev.filter,
                    applicantID: parseInt(selectedOption.applicantID),
                    courseID: parseInt(selectedOption.courseID),
                }
            }));
        }
    }, [selectedOption]);


    useEffect(() => {
        if (docFilters?.filter?.applicantID && docFilters?.filter?.courseID) {
            async function fatchFilter() {
                try {
                    const paymentStatusID = masterCode?.PaymentStatus;
                    const res = await getDocFilter(docFilters)

                    const paymentRes = await fetchPaymentStatus({ TypeID: paymentStatusID });

                    if (paymentRes?.data?.success) {
                        const foundRes = paymentRes.data?.data?.find(x => x.masterCodeID === selectedOption?.paymentStatus);
                        setPayStatus(foundRes);
                    }

                } catch (err) { console.log(err) }
            }
            fatchFilter()
        }
    }, [docFilters])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const appliedCourseID = appliedCourse?.data[0]?.applicantCourseID;
    //             const res = await getProof({ id: appliedCourseID });
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, [appliedCourse, masterCode]);



    async function statushandler(_, newVal) {
        setPayStatus(newVal);
    }

    async function statusUploadhandler() {

        let correspondingCourseStatus;
        if (payStatus.value === 'Verified') {
            correspondingCourseStatus = courseStatusList?.data?.find(status => status.value === 'Active');
        } else if (payStatus.value === 'Pending') {
            correspondingCourseStatus = courseStatusList?.data?.find(status => status.value === 'Applied');
        }

        // const { data } = proofdoc;
        const newData = {
            applicantCourseID: parseInt(selectedOption.applicantCourseID),
            applicantID: parseInt(selectedOption.applicantID),
            courseID: parseInt(selectedOption.courseID),
            scheduleID: parseInt(selectedOption.scheduleID),
            enrollmentDate: selectedOption.enrollmentDate,
            completionDate: selectedOption.completionDate,
            // enrollmentDate: moment(selectedOption.enrollmentDate).format("DD-MM-YYYY"),
            // completionDate: moment(selectedOption.completionDate).format("DD-MM-YYYY"),
            receiptID: selectedOption.receiptID,
            receiptDate: selectedOption.receiptDate,
            // receiptDate: moment(selectedOption.receiptDate).format("DD-MM-YYYY"),
            amountPaid: selectedOption.amountPaid,
            paymentStatus: parseInt(payStatus?.masterCodeID),
            courseStatus: correspondingCourseStatus ? parseInt(correspondingCourseStatus.masterCodeID) : 0,
            status: parseInt(1),
            updatedById: parseInt(user?.id),
            remarks: ""
        };


        try {
            const res = await changeStatus(newData)
            toastHandler(res)
            await refreshAppliedCourse()
            // if (res?.data?.success) {
            //     const appliedCourseID = appliedCourse?.data[0]?.applicantCourseID;
            //     await getProof({ id: appliedCourseID })
            // }
        } catch (Err) {
            console.log(Err)
        }

    }

    return (
        <Card id="Complete-course" sx={{ height: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SoftBox p={2} px={4}>
                        <SoftBox display="flex" mb={0.25} gap="16px">
                            <SoftBox>
                                <SoftAddAbleAutoSelect
                                    dataList={paymentStatusList?.data || []}
                                    selectedValue={payStatus}
                                    selectHandler={statushandler}
                                    placeholder="Activate course"
                                    isEditable={false}
                                />
                            </SoftBox>
                            <SoftButton onClick={statusUploadhandler} disabled={statusLoading} variant="gradient" color="info">Change Status</SoftButton>
                        </SoftBox>
                    </SoftBox>
                </Grid>
                {appliedLoading && <Grid item xs>
                    <Card>
                        <SoftBarLoader />
                    </Card>
                </Grid>}
                {appliedCourse && <Grid item xs>
                    <Card>
                        <SoftBox p={2}>
                            {appliedCourse && appliedCourse?.data?.map(item => (
                                <SoftBox
                                    onClick={() => setSelectedOption(item)}
                                    p={1}
                                    key={item.applicantCourseID}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        "&:hover": { backgroundColor: "#d7d7d7" }
                                    }}
                                >
                                    <SoftTypography
                                        sx={{ textTransform: "uppercase" }}
                                        display="inline-block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {item.courseName}
                                    </SoftTypography>
                                    <SoftTypography
                                        display="inline-block"
                                        variant="caption"
                                        fontWeight="regular"
                                        color="text"
                                    >
                                        {item.paymentStatusName}
                                    </SoftTypography>
                                </SoftBox>

                            ))}
                        </SoftBox>
                    </Card>
                </Grid>}
                {docLoading && <Grid item xs={7}>
                    <Card>
                        <SoftBarLoader />
                    </Card>
                </Grid>}
                {docList && <Grid item xs={7}>
                    <Card>
                        <SoftBox p={2}>
                            <SoftBox p={2} px={4} >
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium" mb={1}>
                                        Applicant Name
                                    </SoftTypography>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                        {selectedOption.applicantName}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                        Course Name
                                    </SoftTypography>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                        {selectedOption.courseName}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                        Schedule Name
                                    </SoftTypography>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                        {selectedOption.scheduleName}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                        Course Fee
                                    </SoftTypography>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                        ${selectedOption.trainingfee}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                        Amount Received
                                    </SoftTypography>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="success">
                                        ${selectedOption.amountPaid}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} mb={1}>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="button" fontWeight="medium">
                                        Payment Status
                                    </SoftTypography>
                                    <SoftTypography sx={{ textTransform: "uppercase" }} display="inline-block" variant="caption" fontWeight="bold" color="text">
                                        {selectedOption.paymentStatusName}
                                    </SoftTypography>
                                </SoftBox>
                            </SoftBox>
                            {docList && docList?.data?.map(item => (
                                <SoftBox p={2} px={4} >
                                    <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }} >
                                        <SoftTypography display="inline-block" variant="button" fontWeight="regular">
                                            Payment Screeshot
                                        </SoftTypography>
                                        <SoftTypography
                                            onClick={() => window.open(`${_sourcePath}Content/ApplicantDocs/${item.document}`, "_blank")}
                                            display="inline-block"
                                            variant="caption"
                                            fontWeight="bold"
                                            color="info"
                                            sx={{ cursor: "pointer" }}
                                        >
                                            {item.document}
                                        </SoftTypography>
                                    </SoftBox>
                                </SoftBox>

                            ))}
                        </SoftBox>
                    </Card>
                </Grid>}
            </Grid>

        </Card>
    );
}

export default DocumentVerification;
