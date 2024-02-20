import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useApplicantCompleteCourseMutation } from "layouts/Applicants/functions/query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";

const dataObject = [
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 1"
    },
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 2"
    },
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 22"
    },
    {
        href: "https://source.unsplash.com/random/300x200",
        title: "Document 855"
    },
    {
        href: "https://via.placeholder.com/150",
        title: "Document 177"
    }
]

const DocumentVerification = () => {
    const { activeRow } = useSelector(state => state.applicant);
    const [getCompletedcourse, { data: getResp, isError: getErr, isLoading: getLoading }] = useApplicantCompleteCourseMutation();

    useEffect(() => {
        async function fetchFunction() {
            try {
                const res = await getCompletedcourse({ applicantID: activeRow.applicantID });
                console.log(res, "asdfasd");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchFunction();
    }, [activeRow, getCompletedcourse]);

    return (
        <Card id="Complete-course" sx={{ height: "100%" }}>
            <SoftBox p={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {getLoading && <SoftBarLoader />}
                    {getResp && getResp.data && getResp.data.length !== 0 ? (
                        getResp.data.map((item, index) => (
                            <ListItem key={index} item={item} />
                        ))
                    ) : (
                        <SoftTypography>Data not Available</SoftTypography>
                    )}
                </SoftBox>
            </SoftBox>
        </Card>
        // <Card id="Complete-course" sx={{ height: "100%" }}>
        //     <SoftBox p={2}>
        //         <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        //             {getLoading && <SoftBarLoader />}
        //             {dataObject.length !== 0 ? (
        //                 dataObject.map((item, index) => (
        //                     <SoftTypography p={1} color="dark"  component="a" href={item.href} target="_blank" variant="caption" fontWeight="bold" >
        //                         {item.title}
        //                     </SoftTypography>
        //                 ))
        //             ) : (
        //                 <SoftTypography>Data not Available</SoftTypography>
        //             )}
        //         </SoftBox>
        //     </SoftBox>
        // </Card>
    );
}

export default DocumentVerification;
