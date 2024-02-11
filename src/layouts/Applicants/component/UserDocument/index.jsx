import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { _apiBaseUrl } from "config/constant";
import { _sourcePath } from "config/constant";


const UserDocuments = () => {
    const { activeRow } = useSelector(state => state.applicant);

    // const DocumentItem = () => {
    //     return (
    //         <SoftBox
    //             onClick={() => onSelect(scheduledID)}
    //             component="li"
    //             display="flex"
    //             justifyContent="space-between"
    //             alignItems="center"
    //             py={1}
    //             px={2}
    //             mb={1}
    //             sx={{ cursor: "pointer" }}
    //         >
    //             <SoftBox lineHeight={1}>
    //                 <SoftTypography display="block" variant="button" fontWeight="medium">
    //                     {scheduledName}
    //                 </SoftTypography>
    //                 <SoftTypography variant="caption" fontWeight="regular" color="text">
    //                     {courseName}
    //                 </SoftTypography>
    //             </SoftBox>
    //             <SoftBox lineHeight={1} >
    //                 <SoftBox><SoftTypography display="block" variant="button" fontWeight="medium">
    //                     {instructorName}
    //                 </SoftTypography></SoftBox>
    //                 <SoftTypography variant="caption" fontWeight="regular" color="text">
    //                     {locationName}
    //                 </SoftTypography>
    //             </SoftBox>
    //             <SoftBox lineHeight={1} >
    //                 <SoftBox><SoftTypography display="block" variant="button" fontWeight="medium">
    //                     {moment(scheduleCreatedDateTime).format("DD-MM-YYYY")}
    //                 </SoftTypography></SoftBox>
    //                 <SoftTypography variant="caption" fontWeight="regular" color={statusName === "Active" ? "success" : "error"}>
    //                     {statusName}
    //                 </SoftTypography>
    //             </SoftBox>
    //         </SoftBox>
    //     )
    // }


    return (
        // <Card id="Complete-course" sx={{ height: "100%" }}>
        //     <Grid item xs={12}>
        //         <SoftBox p={2}>
        //             <SoftTypography varient="caption">User Documents</SoftTypography>
        //         </SoftBox>
        //     </Grid>
        //     <Grid xs={12}>
        //         <SoftBox p={2}>
        //             {schDataLoading && <SoftTypography variant="h6" fontWeight="bold">
        //                 Loading...
        //             </SoftTypography>}
        //         </SoftBox>
        //         <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        //             {schData?.data?.length !== 0 ? (
        //                 schData?.data?.map(schItem => (
        //                     <DocumentItem key={schItem.scheduledID} itemData={schItem} onSelect={selectHandler} />
        //                 ))
        //             ) : (
        //                 <SoftTypography variant="h6" fontWeight="bold">
        //                     This course dont have active schedule <SoftButton onClick={() => navigate("/schedule")} color="info" variant="text">Click here</SoftButton> to add one.
        //                 </SoftTypography>
        //             )}
        //         </SoftBox>
        //     </Grid>
        // </Card>

        <p>user Documetn list</p>
    );
}

export default UserDocuments;
