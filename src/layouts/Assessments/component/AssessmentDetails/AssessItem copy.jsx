import { Divider, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const AssessItem = ({ data }) => {
    return (
        <SoftBox mb={1}>
             <Divider/>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Question :-
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.questionTitle}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Correct Answer :-
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="success" fontWeight="medium">
                        {data?.correctAnswer}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Applicant Answer :-
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color={data?.correctAnswer === data?.applicantAnswer ? "success" : "error"} fontWeight="medium">
                        {data?.applicantAnswer}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Option A 
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.optionA}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Marks
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.marksOptionA}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Option B 
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.optionB}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Marks
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.marksOptionB}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Option C 
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.optionC}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Marks
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.marksOptionC}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Option D 
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.optionD}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Marks
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.marksOptionD}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Option E 
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.optionE}
                    </SoftTypography>
                </Grid>
                <Grid item xs={6}>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                        Marks
                    </SoftTypography>
                    <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                        {data?.marksOptionE}
                    </SoftTypography>
                </Grid>
            </Grid>
        </SoftBox>
    );
}

export default AssessItem;