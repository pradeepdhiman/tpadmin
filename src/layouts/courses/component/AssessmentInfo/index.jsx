import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import { assessmentInfoSchema } from "layouts/Courses/constant";
import { authUser } from "layouts/authentication/functions/query";
import { Controller, useForm } from "react-hook-form";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { useSelector } from "react-redux";
import { useAddAssessmentInfoMutation } from "layouts/Courses/functions/query";
import { useGetAssessmentInfoMutation } from "layouts/Courses/functions/query";
import { useUpdateAssessmentInfoMutation } from "layouts/Courses/functions/query";

const AssessmentInfo = () => {
    const { activeRow } = useSelector(state => state.courses)
    const [selectedType, setSelectedType] = useState({})
    const user = authUser();
    const { data: assessmentTypeList } = useMasterListByTypeQuery({ TypeID: masterCode.AssessmentType })
    const [addAssessmentInfo, { data: assessmentResp, isLoading: assessmentLoading }] = useAddAssessmentInfoMutation()
    const [getAssessmentInfo, { data: getassessmentResp, isLoading: getassessmentLoading }] = useGetAssessmentInfoMutation()
    const [updateAssessmentInfo, { data: updateassessmentResp, isLoading: updateassessmentLoading }] = useUpdateAssessmentInfoMutation()

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(assessmentInfoSchema),
        defaultValues: {},
    });

    useEffect(() => {
        async function fetchInfo() {
            try {
                await getAssessmentInfo({ id: activeRow?.courseID })
            } catch (err) {
                console.log(err)
            }
        }
        fetchInfo()
    }, [activeRow])

    useEffect(() => {
        if (assessmentTypeList?.success && getassessmentResp?.success) {
            const type = getassessmentResp?.data?.assessmentType;
            const foundType = assessmentTypeList?.data?.find(x => x.masterCodeID === type);
            setSelectedType(foundType ?? null);
        }
    }, [assessmentTypeList, getassessmentResp]);

    useEffect(() => {
        if (getassessmentResp?.data) {
            reset(getassessmentResp.data);
        }
    }, [getassessmentResp, reset]);

    const submitFormData = async (data) => {
        const isEdit = Object.keys(activeRow).length
        let newData = {}
        if (isEdit) {
            newData = {

                courseID: activeRow?.courseID,
                assessmentType: parseInt(data?.assessmentType),
                passingScore: data?.passingScore,
                duration: data?.duration,
                numberofQuestions: parseInt(data?.numberofQuestions),
                updatedById: parseInt(user?.id),
                assessmentID: parseInt(getassessmentResp.data.assessmentID),
                status: parseInt(getassessmentResp.data.status),
                weightage: getassessmentResp.data.weightage,
                remarks: data.remarks
            }
        } else {
            newData = {
                assessmentID: 0,
                courseID: activeRow?.courseID,
                assessmentType: parseInt(data?.assessmentType),
                passingScore: parseInt(data?.passingScore),
                duration: parseInt(data?.duration),
                numberofQuestions: parseInt(data?.numberofQuestions),
                weightage: 0,
                createdById: parseInt(user?.id),
                remarks: data.remarks
            }
        }

        try {
            isEdit ? await updateAssessmentInfo(newData) : await addAssessmentInfo(newData)
        } catch (err) {
            console.log(err)
        }
    };

    function assessmentTypeChangeHandler(_, newVal) {
        setValue("assessmentType", newVal?.masterCodeID)
        setSelectedType(newVal)
    }

    return (
        <Card>
            <SoftBox p={2}>
                <SoftBox p={2}>
                    <form onSubmit={handleSubmit(submitFormData)}>
                        <Grid item xs={12} sm={6} md={3}>
                            <SoftBox mb={2}>
                                <SoftBox mb={1} ml={0.5}>
                                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                                        Assessment Type
                                    </SoftTypography>
                                </SoftBox>
                                <SoftAddAbleAutoSelect
                                    dataList={assessmentTypeList?.data || []}
                                    selectedValue={selectedType}
                                    selectHandler={assessmentTypeChangeHandler}
                                    label={null}
                                    placeholder="Assessment Type"
                                    isEditable={false}
                                />
                                {errors.instructor && (
                                    <SoftTypography component="label" variant="caption" color="error">
                                        {errors.assessmentType.message}
                                    </SoftTypography>
                                )}
                            </SoftBox>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Controller
                                    name="passingScore"
                                    control={control}
                                    render={({ field }) => (
                                        <SoftBox mb={2}>
                                            <SoftBox mb={1} ml={0.5}>
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    fontWeight="bold"
                                                >
                                                    Passing Score
                                                </SoftTypography>
                                            </SoftBox>
                                            <SoftInput
                                                type="number"
                                                {...field}
                                                placeholder="Passing Score"
                                            />
                                            {errors.courseName && (
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    color="error"
                                                >
                                                    {errors.passingScore.message}
                                                </SoftTypography>
                                            )}
                                        </SoftBox>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Controller
                                    name="duration"
                                    control={control}
                                    render={({ field }) => (
                                        <SoftBox mb={2}>
                                            <SoftBox mb={1} ml={0.5}>
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    fontWeight="bold"
                                                >
                                                    Duration
                                                </SoftTypography>
                                            </SoftBox>
                                            <SoftInput
                                                type="number"
                                                {...field}
                                                placeholder="Duration"
                                            />
                                            {errors.courseName && (
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    color="error"
                                                >
                                                    {errors.duration.message}
                                                </SoftTypography>
                                            )}
                                        </SoftBox>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Controller
                                    name="numberofQuestions"
                                    control={control}
                                    render={({ field }) => (
                                        <SoftBox mb={2}>
                                            <SoftBox mb={1} ml={0.5}>
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    fontWeight="bold"
                                                >
                                                    Number of Questions
                                                </SoftTypography>
                                            </SoftBox>
                                            <SoftInput
                                                type="number"
                                                {...field}
                                                placeholder="Number of Questions"
                                            />
                                            {errors.courseName && (
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    color="error"
                                                >
                                                    {errors.numberofQuestions.message}
                                                </SoftTypography>
                                            )}
                                        </SoftBox>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Controller
                                    name="remarks"
                                    control={control}
                                    render={({ field }) => (
                                        <SoftBox mb={2}>
                                            <SoftBox mb={1} ml={0.5}>
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    fontWeight="bold"
                                                >
                                                    Remarks
                                                </SoftTypography>
                                            </SoftBox>
                                            <SoftInput
                                                type="test"
                                                {...field}
                                                placeholder="Remarks"
                                            />
                                            {errors.courseName && (
                                                <SoftTypography
                                                    component="label"
                                                    variant="caption"
                                                    color="error"
                                                >
                                                    {errors.remarks.message}
                                                </SoftTypography>
                                            )}
                                        </SoftBox>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <SoftButton type="submit" variant="contained" color="info">
                            {assessmentLoading ? "Loading..." : "Submit"}
                        </SoftButton>
                    </form>
                </SoftBox>
            </SoftBox>
        </Card>
    );
};

export default AssessmentInfo;
