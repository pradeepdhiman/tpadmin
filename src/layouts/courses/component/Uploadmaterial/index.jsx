import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useUploadMatMutation } from "layouts/Courses/functions/query";
import { useMatListQuery } from "layouts/Courses/functions/query";
import { authUser } from "layouts/authentication/functions/query";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import MatItem from "../MatItem";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
const fileState = {
    materialID: 0,
    courseID: 0,
    materialType: "",
    filePath: "",
    createdById: 0,
    remarks: ""
}

const UploadMaterial = () => {
    const { activeRow } = useSelector(state => state.courses)
    const [fileData, setFileData] = useState(fileState);
    const [matType, setMyType] = useState({});
    const fileInputRef = useRef(null);

    const user = authUser()

    const { data: matList, error: matListErr, isLoading: matListLoading, refetch: refreshmatList } = useMatListQuery()
    const [uploadMat, { data: addMatRes, error: addMatErr, isLoading: addMatLoading }] = useUploadMatMutation()
    const { data: matTypeList, isLoading: loadingmatType } = useMasterListByTypeQuery({ TypeID: masterCode.TrainingMaterialType })

    function uploadchangeHandler(event) {
        const fileInput = event.target;

        if (fileInput.files.length > 0) {
            const selectedFile = fileInput.files[0];
            const fileName = selectedFile.name;
            const filePath = URL.createObjectURL(selectedFile);
            const fileType = selectedFile.type;
            setFileData(prev => ({
                ...prev,
                materialID: 0,
                courseID: activeRow?.courseID || 0,
                materialType: matType?.masterCodeID || "",
                filePath: filePath || "",
                createdById: parseInt(user?.id) || 0,
            }));
        }
    }

    async function uploadHandler() {
        try {
            const res = await uploadMat(fileData)
            if (res?.data?.success) {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setFileData(fileState)
                refreshmatList()
            }
        } catch (err) {
            console.log(err)
        }
    }

    function matTypeHandler(_, newVal) {
        setMyType(newVal)
    }

    return (<SoftBox>
        <SoftBox display="flex" py={1} mb={0.25} sx={{ gap: "16px" }}>
            <SoftInput
                type="file"
                onChange={uploadchangeHandler}
                ref={fileInputRef}
            />
            <SoftAddAbleAutoSelect
                dataList={matTypeList?.data || []}
                selectedValue={matType}
                selectHandler={matTypeHandler}
                label={null}
                placeholder="Material Type"
                loading={loadingmatType}
                isEditable={false}
            />
            <SoftButton variant="outlined" onClick={uploadHandler} disabled={addMatLoading}
                size="small" color="dark">{addMatLoading ? "Uploading" : "Upload"}</SoftButton>
        </SoftBox>
        <Card id="delete-account" sx={{ height: "100%" }}>
            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                <SoftTypography variant="h6" fontWeight="medium">
                    Study Material
                </SoftTypography>
                {matListLoading && <SoftTypography variant="h6" fontWeight="bold">
                    Loading...
                </SoftTypography>}
            </SoftBox>
            <SoftBox p={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    {matList?.data?.length !== 0 ? (
                        matList?.data?.map(matItem => (
                            <MatItem key={matItem.materialID} itemData={matItem} date="March, 01, 2020" id="#MS-415646" price="$180" />
                        ))
                    ) : (
                        <SoftTypography variant="h6" fontWeight="bold">
                            Study material not available
                        </SoftTypography>
                    )}

                </SoftBox>
            </SoftBox>
        </Card>
    </SoftBox>);
}

export default UploadMaterial;