

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import SoftInput from "components/SoftInput";
import { useEffect, useRef, useState } from "react";
import SoftButton from "components/SoftButton";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, Grid, Switch } from "@mui/material";
import { useDeleteCourseMutation } from "layouts/Courses/functions/query";
import { useCreateCourseMutation } from "layouts/Courses/functions/query";
import { useUpdateCourseMutation } from "layouts/Courses/functions/query";
import styles from "../../style.module.css"
import { useCreateCategoryMutation } from "common/query";
import { useListCategoryQuery } from "common/query";
import { setActiveRow } from "layouts/Courses/functions/coursesSlice";
import { schema } from "layouts/Courses/constant";
import { authUser } from "layouts/authentication/functions/query";
import UploadMaterial from "../Uploadmaterial";
import AssignSchedule from "../AssignSchedule";
import SoftAddAbleAutoSelect from "examples/AddAbleAutoselect";
import { masterCode } from "common/constant";
import { useMasterListByTypeQuery } from "common/query";
import AssessmentInfo from "../AssessmentInfo";
import { toastHandler } from "utils/utils";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { _sourcePath } from "config/constant";
import { newschema } from "layouts/Courses/constant";
import { editschema } from "layouts/Courses/constant";

const tabs = [
  { label: 'Info', value: 'info' },
  // { label: 'Status', value: 'status' },
  { label: 'Study Material', value: 'material' },
  { label: 'Schedule', value: 'schedule' },
  { label: 'Assessment Settings', value: 'assessInfo' },
];


function EditCourse(props) {
  const dispatch = useDispatch()
  const { toggleEdit = false, loading = false } = props
  const [activeTab, setActiveTab] = useState({ label: 'Info', value: 'info' });
  const [newCategory, setNewCategory] = useState(false);
  const [selectedCat, setSelectedCat] = useState({});
  const [crsStatus, setCrsStatus] = useState({});
  const fileInputRef = useRef(null);
  const [newCategoryValue, setNewCategoryValue] = useState({
    categoryID: 0,
    categoryName: '',
    createdById: 0,
    remarks: ''
  });
  const [openOption, setOpenOption] = useState(false);
  const optionListRef = useRef(null);
  const [fileData, setFileData] = useState("");

  const [updateCourse, { data: updateData, error: updateErr, isLoading: updateLoading }] = useUpdateCourseMutation()
  const [createCourse, { data: newApplicant, error: createError, isLoading: createLoading }] = useCreateCourseMutation()
  const [deleteCourse, { data: delData, error: delErr, isLoading: delLoading }] = useDeleteCourseMutation()

  const { data: categories, error: catErr, isLoading: catLoading, refetch: refreshCat } = useListCategoryQuery()
  const [addCatCourse, { data: addCatRes, error: addCatErr, isLoading: addCatLoading }] = useCreateCategoryMutation()
  const { data: courseStatusList, isLoading: loadingStatus } = useMasterListByTypeQuery({ TypeID: masterCode.Status })

  const { activeRow } = useSelector(state => state.courses)


  const user = authUser()

  useEffect(() => {
    if (categories?.success && activeRow && activeRow.categoryID) {
      const selectedCategory = categories.data.find(x => x.categoryID === activeRow.categoryID);
      setSelectedCat(selectedCategory);
    }
  }, [categories, activeRow]);

  useEffect(() => {
    if (courseStatusList?.success && activeRow && activeRow.status) {
      const foundStatus = courseStatusList.data.find(x => x.masterCodeID === activeRow.status);
      setCrsStatus(foundStatus);
    }
  }, [courseStatusList, activeRow]);


  const { handleSubmit, control, register, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(Object.keys(activeRow).length !== 0 ? editschema : newschema),
    defaultValues: activeRow,
  });

  const trainingFee = watch('trainingfee');
  const vat = watch('vat');

  const submitFormData = async (data) => {

    const isEditing = Object.keys(activeRow).length !== 0;
    let file = data.file ? data.file : null;
    try {
      let formData = new FormData();

      if (isEditing) {
        formData.append('CourseID', parseInt(activeRow.courseID));
        formData.append('CourseName', data?.courseName);
        if (file) {
          formData.append('CourseImageFIle', file, file?.name);
        }
        formData.append('Duration', parseFloat(data?.duration));
        formData.append('Description', data?.description || "");
        formData.append('Remarks', data?.remarks || "");
        formData.append('CategoryID', parseInt(selectedCat?.categoryID));
        formData.append('Syllabus', data?.syllabus);
        formData.append('Trainingfee', parseInt(data?.trainingfee));
        formData.append('VAT', parseInt(data?.vat));
        formData.append('Status', parseInt(crsStatus?.masterCodeID));
        formData.append('TotalAmount', parseInt(data?.totalAmount));
        formData.append('CreatedById', parseInt(user?.id));
        formData.append('UpdatedById', parseInt(user.id));

      } else {

        formData.append('CourseID', 0);
        formData.append('CourseName', data?.courseName);
        formData.append('CourseImageFIle', file, file.name);
        formData.append('Duration', parseFloat(data?.duration));
        formData.append('Description', data?.description || "");
        formData.append('Remarks', data?.remarks || "");
        formData.append('CategoryID', parseInt(selectedCat?.categoryID));
        formData.append('Syllabus', data?.syllabus);
        formData.append('Trainingfee', parseInt(data?.trainingfee));
        formData.append('VAT', parseInt(data?.vat));
        formData.append('TotalAmount', parseInt(data?.totalAmount));
        formData.append('CreatedById', parseInt(user?.id));
      }

      const apiFunction = isEditing ? updateCourse : createCourse;

      const res = await apiFunction(formData);
      toastHandler(res);

      if (res?.data?.success) {
        dispatch(setActiveRow(res?.data?.data));
        if (!isEditing) {
          setActiveTab({ label: 'Study Material', value: 'material' });
        }
        // closeEdit()
      }

      return res;
    } catch (err) {
      console.error(err);
    }
  };



  function closeEdit() {
    dispatch(setActiveRow({}))
    reset()
    toggleEdit()
  }

  function tabhandler(tab) {
    setActiveTab(tab)
  }



  const MySwal = withReactContent(Swal)
  async function onDelete() {
    const result = await MySwal.fire({
      icon: 'alert',
      title: 'Delete Course',
      text: "Are you sure!",
      confirmButtonText: 'Yes',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        try {
          const res = await deleteCourse({ id: activeRow?.courseID })
          toastHandler(res)
          if (res.data.success) {
            closeEdit()
          }
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const calculateTotalAmount = () => {
      const trainingFeeValue = parseFloat(trainingFee) || 0;
      const vatPercentage = parseFloat(vat) || 0;

      const vatValue = (trainingFeeValue * vatPercentage) / 100;
      const totalAmount = trainingFeeValue + vatValue;

      setValue('totalAmount', totalAmount.toFixed(2));
    };

    calculateTotalAmount();
  }, [trainingFee, vat, setValue]);



  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionListRef.current && !optionListRef.current.contains(event.target)) {
        setOpenOption(false)
        setNewCategory(false)
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [optionListRef]);


  function optionListhandler(data) {
    setOpenOption(false)
    setNewCategory(false)
    setSelectedCat(data)
    setNewCategoryValue({
      categoryID: 0,
      categoryName: '',
      createdById: 0,
      remarks: ''
    })
  }
  function categoryChangehandler(e) {
    const value = e.target.value;
    setNewCategoryValue(prev => ({ ...prev, categoryName: value, createdById: parseInt(user?.id) }));
  }

  function addCat() {
    setNewCategory(true)
  }

  function toogleoptionlist() {
    setOpenOption(!openOption)
  }

  async function saveCategory() {
    let duplicateEntry = categories?.data?.find(x => x.categoryName === newCategoryValue?.categoryName)
    if (duplicateEntry && Object.keys(duplicateEntry).length) {
      toast.error('Duplicate category not allowed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
      return
    }
    try {
      const res = await addCatCourse(newCategoryValue)
      toastHandler(res)
      if (res?.data?.success) {
        setSelectedCat(res?.data?.data)
        setOpenOption(!openOption)
        setNewCategory(false)
        refreshCat()
        setNewCategoryValue({
          categoryID: 0,
          categoryName: '',
          createdById: 0,
          remarks: ''
        })
      }
    } catch (err) {
      console.log(err)
    }
  }



  function statushandler(_, newVal) {
    setValue("Status", parseInt(newVal.masterCodeID))
    setCrsStatus(newVal)
  }

  function uploadchangeHandler(event) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      setFileData(selectedFile); // Set the selected file in state
      setValue("file", selectedFile); // Update the form value for "file"
    }
  }



  const optionList = () => {
    return (<SoftBox mt={.5} sx={{ position: "absolute", zIndex: 2, width: "100%" }} >
      <Card>
        <SoftBox p={2}>
          {!newCategory && <SoftButton onClick={addCat} fullWidth size="small" variant="outlined" color="info">New Category</SoftButton>}
          {newCategory && <SoftBox className={styles.flexBox}>
            <SoftInput
              value={newCategoryValue.categoryName}
              onChange={categoryChangehandler}
              placeholder="Category name"
              sx={{ grow: 1 }}
            />

            <SoftButton variant="gradient" onClick={saveCategory} disabled={!newCategoryValue || addCatLoading} color="dark">Add</SoftButton>
          </SoftBox>}
          <SoftBox mt={1} sx={{ maxHeight: "200px", overflowY: "auto" }}>
            {categories?.data?.map(item => (<SoftBox py={.5} sx={{ cursor: "pointer" }} onClick={() => optionListhandler(item)} key={item.categoryID}>
              <SoftTypography fontWeight="regular" color="text" sx={{ fontSize: "15px" }}>{item.categoryName}</SoftTypography>
            </SoftBox>))}
          </SoftBox>
        </SoftBox>
      </Card>
    </SoftBox>)
  }

  return (
    <Card className="h-100">
      {Object.keys(activeRow).length !== 0 && <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "flex-start", gap: "16px", alignItem: 'center' }}>
        {tabs.map((item) => (
          <SoftButton
            key={item.value}
            onClick={() => tabhandler(item)}
            variant="outlined"
            size="small"
            color={activeTab.value === item.value ? 'primary' : 'secondary'}
          >
            {item.label}
          </SoftButton>
        ))}
      </SoftBox>}
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium" sx={{ textTransform: "capitalize" }}>
          {activeTab.label || activeRow?.courseName || "New Course"}
        </SoftTypography>
        <SoftBox sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'end', gap: "16px" }}>
          {Object.keys(activeRow).length !== 0 && (
            <>
              {delLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <Icon
                  sx={{
                    fontWeight: "bold",
                    color: ({ palette: { error } }) => error.main,
                    cursor: "pointer",
                    mt: -0.5,
                  }}
                  onClick={onDelete}
                >
                  <DeleteIcon />
                </Icon>
              )}
            </>
          )}
          <Icon
            sx={{
              fontWeight: "bold",
              color: ({ palette: { error } }) => error.main,
              cursor: "pointer",
              mt: -0.5,
            }}
            onClick={closeEdit}
          >
            <CloseIcon />
          </Icon>
        </SoftBox>

      </SoftBox>
      <SoftBox p={2}>
        {activeTab.value === "info" && <SoftBox p={2}>
          <form onSubmit={handleSubmit(submitFormData)}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Controller
                  name="courseName"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Course Name
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="Course Name"
                      />
                      {errors.courseName && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.courseName.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Duration(mnts)
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder="Duration(mnts)"
                      />
                      {errors.duration && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.duration.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <SoftBox mb={2} ref={optionListRef} sx={{ position: "relative" }}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Course Category
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    readOnly
                    placeholder="Course Category"
                    value={selectedCat.categoryName}
                    icon={{ component: <ArrowDropDownIcon sx={{ cursor: "pointer" }} onClick={toogleoptionlist} />, direction: "right" }}
                  />
                  {errors.categoryID && (
                    <SoftTypography component="label" variant="caption" color="error">
                      {errors.categoryID.message}
                    </SoftTypography>
                  )}

                  {openOption && optionList()}
                </SoftBox>
              </Grid>
              <Grid item xs={6} >
                <Controller
                  name="syllabus"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Course Contents
                        </SoftTypography>
                      </SoftBox>
                      {/* <SoftInput
                        type="text"
                        {...field}
                        placeholder="Syllabus"
                      /> */}
                      <SoftBox>
                        <textarea rows={3} cols={3} style={{ border: "none", resize: "none", width: "100%", border: "0.0625rem solid #d2d6da", borderRadius: "10px", overflow: "hidden", padding: "10px", fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}
                          type="text"
                          {...field}
                          placeholder="Details"
                        />
                      </SoftBox>
                      {errors.syllabus && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.syllabus.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Course Image
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    name="file"
                    type="file"
                    onChange={uploadchangeHandler}
                    ref={fileInputRef}
                  />
                  {errors.file && (
                    <SoftTypography component="label" variant="caption" color="error">
                      {errors.file.message}
                    </SoftTypography>
                  )}
                </SoftBox>
              </Grid>
              <Grid item xs={3} style={{ position: "relative", marginLeft: "auto" }} >
                <SoftBox
                  height="100%"
                  display="grid"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <SoftBox component="img" src={_sourcePath + "Content/CourseImage/" + activeRow?.courseImage} alt={activeRow?.courseImage} width="100%" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="trainingfee"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Training Fee
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="number"
                        {...field}
                        placeholder=" Training Fee"
                      />
                      {errors.trainingfee && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.trainingfee.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="vat"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Tax/VAT (%)
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="number"
                        {...field}
                        placeholder=" Tax/VAT (%)"
                      />
                      {errors.vat && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.vat.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="totalAmount"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Total Amount
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput
                        type="text"
                        {...field}
                        placeholder=" Total Amount"
                        readOnly
                      />
                      {errors.totalAmount && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.totalAmount.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
              {Object.keys(activeRow).length !== 0 ? <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Status
                        </SoftTypography>
                      </SoftBox>
                      <SoftAddAbleAutoSelect
                        dataList={courseStatusList?.data || []}
                        selectedValue={crsStatus}
                        selectHandler={statushandler}
                        label={null}
                        placeholder=" Status"
                        loading={loadingStatus}
                        isEditable={false}
                      />
                      {errors.status && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.status.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid> : null}
              <Grid item xs={12} >
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field }) => (
                    <SoftBox mb={2}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Remarks
                        </SoftTypography>
                      </SoftBox>
                      {/* <SoftInput
                        type="text"
                        {...field}
                        placeholder=" Remarks"
                      /> */}
                      <SoftBox>
                        <textarea rows={3} cols={3} style={{ border: "none", resize: "none", width: "100%", border: "0.0625rem solid #d2d6da", borderRadius: "10px", overflow: "hidden", padding: "10px", fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}
                          type="text"
                          {...field}
                          placeholder="Remarks"
                        />
                      </SoftBox>
                      {errors.remarks && (
                        <SoftTypography component="label" variant="caption" color="error">
                          {errors.remarks.message}
                        </SoftTypography>
                      )}
                    </SoftBox>
                  )}
                />
              </Grid>
            </Grid>


            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" type="submit" fullWidth>
                {(loading || updateLoading || createLoading) ? 'Loading..' : 'Submit'}
              </SoftButton>
            </SoftBox>
          </form>
        </SoftBox>}
        {/* {activeTab === "status" && <SoftBox>
          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftBox mt={0.25}>
              <Switch checked={activeRow.status === 1} onChange={statusChangehandler} />
            </SoftBox>
            <SoftBox width="80%" ml={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                {activeRow.status === 1 ? "Course is Active" : "Course is Deactivated"}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>} */}
        {activeTab.value === "material" && <UploadMaterial setTab={setActiveTab} />}
        {activeTab.value === "schedule" && <AssignSchedule setTab={setActiveTab} />}
        {activeTab.value === "assessInfo" && <AssessmentInfo />}
      </SoftBox>
    </Card>
  );
}

export default EditCourse;
