import { Autocomplete, Card, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useUploadMatMutation } from "layouts/Courses/functions/query";
import { useMatListQuery } from "layouts/Courses/functions/query";
import { authUser } from "layouts/authentication/functions/query";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MatItem from "../MatItem";
import { useMasterListByTypeQuery } from "common/query";
import { masterCode } from "common/constant";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { useUploadMatFormMutation } from "layouts/Courses/functions/query";
import { useForm } from "react-hook-form";
import { useMatListbycourseQuery } from "layouts/Courses/functions/query";
import { toastHandler } from "utils/utils";
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
    const [fileData, setFileData] = useState("");
    const [matType, setMyType] = useState({
        masterCodeID: 0,
        code: 0,
        value: "",
        fixedColumnName: null,
        description: null,
        masterCodeTypeID: 0,
        masterTypeName: ""
    });
    const fileInputRef = useRef(null);

    const user = authUser()

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // const { data: matList, error: matListErr, isLoading: matListLoading, refetch: refreshmatList } = useMatListQuery()
    const { data: matList, error: matListErr, isLoading: matListLoading, refetch: refreshmatList } = useMatListbycourseQuery({ CourseID: activeRow?.courseID })
    const [uploadMat, { data: addMatRes, error: addMatErr, isLoading: addMatLoading }] = useUploadMatFormMutation()
    // const [uploadMat, { data: addMatRes, error: addMatErr, isLoading: addMatLoading }] = useUploadMatMutation()
    const { data: matTypeList, isLoading: loadingmatType } = useMasterListByTypeQuery({ TypeID: masterCode.TrainingMaterialType })

    useEffect(() => {
        async function fetchData() {
            try {
                await refreshmatList({ CourseID: activeRow?.courseID });
            } catch (err) {
                console.error(err);
            }
        }
    
        fetchData();
    
      
        return () => {
           
        };
    }, [activeRow, refreshmatList]);
    

    function uploadchangeHandler(event) {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
            const selectedFile = fileInput.files[0];
            setFileData(selectedFile)
        }
    }


    async function uploadHandler(data) {
        const file = data.file[0];
        const { courseID } = activeRow;

        const formData = new FormData();
        formData.append('MaterialID', '0');
        formData.append('MaterialType', matType.masterCodeID.toString());
        formData.append('CourseID', courseID.toString());
        formData.append('FilePath', file, file.name);
        formData.append('CreatedById', user.id.toString());
        formData.append('Remarks', '');
        try {
            const res = await uploadMat(formData)
            toastHandler(res)
            if (res?.data?.success) {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setFileData("")
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
        <form onSubmit={handleSubmit(uploadHandler)}>
            <SoftBox py={1} mb={0.25} display="flex" sx={{ gap: "16px" }}>


                <SoftBox>
                    <SoftInput
                        type="file"
                        onChange={uploadchangeHandler}
                        ref={fileInputRef}
                        {...register('file', { required: 'File is required' })}
                    />
                    {errors?.file && <SoftTypography color="error" variant="caption">{errors.file?.message}</SoftTypography>}

                </SoftBox>
                <SoftBox>
                    <Autocomplete
                        disablePortal
                        disableClearable
                        id="combo-box-demo"
                        value={matType}
                        onChange={matTypeHandler}
                        options={matTypeList?.data || []}
                        getOptionLabel={(option) => option?.value}
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...register('MaterialType')}
                            error={Boolean(errors.MaterialType)}
                            helperText={errors.MaterialType?.message} placeholder="Material type required" {...params} />}
                    />
                </SoftBox>
                <SoftButton variant="outlined" type="submit" disabled={addMatLoading}
                    size="small" color="dark">{addMatLoading ? "Uploading" : "Upload"}</SoftButton>

            </SoftBox>
        </form>
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