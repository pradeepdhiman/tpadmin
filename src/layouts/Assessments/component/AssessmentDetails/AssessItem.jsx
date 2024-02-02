
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import moment from "moment";
import SoftBadge from "components/SoftBadge";
import { Grid } from "@mui/material";

function AssessItem({ data, noGutter }) {

    return (
        <SoftBox
            bgColor="grey-100"
            borderRadius="lg"
            p={3}
            mb={noGutter ? 0 : 1}
            mt={2}
        >
            <Grid container >
                <Grid item xs={12}>
                    <SoftBox mb={1}>
                        <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                            {data?.questionTitle}
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={2} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Correct Answer:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.correctAnswer}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={2} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Applicant Answer:&nbsp;&nbsp;&nbsp;
                            <SoftTypography
                                variant="caption"
                                fontWeight="medium"
                                textTransform="capitalize"
                                color={
                                    data?.applicantAnswer?.trim().toLowerCase() === data?.correctAnswer?.trim().toLowerCase()
                                        ? "success"
                                        : "error"
                                }
                            >
                                {data?.applicantAnswer}
                            </SoftTypography>

                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Opton A:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.optionA}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Marks:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.marksOptionA}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Opton B:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.optionB}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Marks:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.marksOptionB}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Opton C:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.optionC}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Marks:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.marksOptionC}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Opton D:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.optionD}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Marks:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.marksOptionD}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Opton E:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.optionE}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
                <Grid item xs={6}>
                    <SoftBox mb={1} lineHeight={0}>
                        <SoftTypography variant="caption" color="text">
                            Marks:&nbsp;&nbsp;&nbsp;
                            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                                {data?.marksOptionE}
                            </SoftTypography>
                        </SoftTypography>
                    </SoftBox>
                </Grid>
            </Grid>
        </SoftBox>
    );
}

// Setting default values for the props of AssessItem
AssessItem.defaultProps = {
    noGutter: false,
};



export default AssessItem;
