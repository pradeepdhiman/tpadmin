import { Grid } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import { Bars } from "react-loader-spinner";

function SoftBarLoader() {
    return (
        <Grid container justifyContent="center" alignItems="center" mt={2}>
            <Grid item>
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    visible={true}
                />
                <SoftTypography variant="body2" fontWeight="regular" color="text">Loading...</SoftTypography>
            </Grid>
        </Grid>
    );
}

export default SoftBarLoader;