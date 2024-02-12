import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { _apiBaseUrl } from "config/constant";
import { _sourcePath } from "config/constant";
import { useVerificationdocFilterMutation } from "layouts/Applicants/functions/query";
import { useEffect, useState } from "react";
import { verificationDocFilter } from "layouts/Applicants/constant";


const UserDocuments = () => {
    const { activeRow } = useSelector(state => state.applicant);
    const [docFilters, setDocFilters] = useState(verificationDocFilter)
    const [getDocFilter, { data: docList, isLoading: docLoading, isError: docErr }] = useVerificationdocFilterMutation()

    useEffect(() => {
        if (activeRow) {

        }
    }, [activeRow])

    useEffect(() => {
        if (activeRow) {
            setDocFilters(prev => ({
                ...prev,
                filter: {
                    ...prev.filter,
                    applicantID: parseInt(activeRow.applicantID),
                }
            }));
        }
    }, [activeRow]);

    useEffect(() => {
        if (docFilters?.filter?.applicantID) {
            async function fatchFilter() {
                try {
                    const res = await getDocFilter(docFilters)

                } catch (err) { console.log(err) }
            }
            fatchFilter()
        }
    }, [docFilters])


    return (
        <Card id="Complete-course" sx={{ height: "100%" }}>
            <Grid item xs={12}>
                <SoftBox p={2}>
                    <SoftTypography varient="caption">User Documents</SoftTypography>
                </SoftBox>
            </Grid>
            <Grid xs={12}>
                <SoftBox p={2}>
                    {docLoading && <SoftTypography variant="h6" fontWeight="bold">
                        Loading...
                    </SoftTypography>}
                </SoftBox>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {docList?.data?.length !== 0 ? (
                        docList?.data?.map(item => (
                            <SoftBox key={item?.documentID} px={2}>
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
                        ))
                    ) : (
                        <SoftTypography variant="h6" fontWeight="bold">
                            No Document Available.
                        </SoftTypography>
                    )}
                </SoftBox>
            </Grid>
        </Card>

    );
}

export default UserDocuments;
