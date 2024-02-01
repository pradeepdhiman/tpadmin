import { Grid } from "@mui/material";
import SoftTypography from "components/SoftTypography";

const AssessItem = () => {
    return (
        <Grid container>
            <Grid item xs={3}>
                <SoftTypography variant="button" display="block" color="text" fontWeight="bold">
                    Applicant name
                </SoftTypography>
                <SoftTypography variant="button" display="block" color="text" fontWeight="medium">
                    dfgsdgfsdfsdf
                </SoftTypography>
            </Grid>
        </Grid>
    );
}

export default AssessItem;