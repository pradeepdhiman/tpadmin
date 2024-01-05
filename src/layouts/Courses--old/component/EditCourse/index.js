

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { initialValue } from "layouts/Courses/constant";
import { schema } from "layouts/Courses/constant";
import SoftButton from "components/SoftButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SoftInput from "components/SoftInput";
import { useDispatch, useSelector } from "react-redux";
import { setCourseEdit } from "layouts/Courses/functions/coursesSlice";
import { useCreateCourseMutation } from "layouts/Courses/functions/query";
import { useUpdateCourseMutation } from "layouts/Courses/functions/query";
import MasterForm from "examples/MasterForm";
import { fields } from "layouts/Courses/constant";
import { useListCategoryQuery } from "common/query";

import styles from "../../style.module.css"
import { authUser } from "layouts/authentication/functions/query";
import { useCreateCategoryMutation } from "common/query";

const categoryArray = [
  {
    categoryID: 0,
    categoryName: 'js',
    createdById: 0,
    remarks: 'string'
  },
  {
    categoryID: 1,
    categoryName: 'react',
    createdById: 0,
    remarks: 'string'
  },
  {
    categoryID: 2,
    categoryName: 'node',
    createdById: 0,
    remarks: 'string'
  }
];

function EditCourse(props) {
  const dispatch = useDispatch()
  const { editid = "", courseList = {} } = useSelector(state => state.courses)
  const { toggleEdit = false, submitAdd = null, loading = false } = props
  const [formData, setFormData] = useState(initialValue);
  const [newCategory, setNewCategory] = useState(false);
  const [selectedCat, setSelectedCat] = useState({});
  const [newCategoryValue, setNewCategoryValue] = useState({
    categoryID: 0,
    categoryName: '',
    createdById: 0,
    remarks: ''
  });
  const [openOption, setOpenOption] = useState(false);
  const optionListRef = useRef(null);
  const user = authUser()

  const { data: categories, error: catErr, isLoading: catLoading, refetch: refreshCat } = useListCategoryQuery()
  const [createCourse, { data: createData, error: createErr, isLoading: createLoading }] = useCreateCourseMutation()
  const [updateCourse, { data: updateData, error: updateErr, isLoading: updateLoading }] = useUpdateCourseMutation()
  const [addCatCourse, { data: addCatRes, error: addCatErr, isLoading: addCatLoading }] = useCreateCategoryMutation()

  const editfields = courseList?.data?.find(x => x.courseID === editid)

  const { handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editfields || [],
  });

  const trainingFee = watch('trainingfee');
  const vat = watch('vat');

  useEffect(() => {
    const calculateTotalAmount = () => {
      const trainingFeeValue = parseFloat(trainingFee) || 0;
      const vatValue = parseFloat(vat) || 0;
      const totalAmount = trainingFeeValue + vatValue;
      setValue('totalAmount', totalAmount.toFixed(2));
    };

    calculateTotalAmount();
  }, [trainingFee, vat, setValue]);


  const submitFormData = async (data) => {

    try {
      const newData = {
        ...data,
        categoryID: selectedCat?.categoryID,
        createdById: !editid ? parseInt(user.id) : parseInt(editfields.createdById),
        courseID: editid ? parseInt(editfields.courseID) : 0
      };

      const apiFunction = editid ? updateCourse : createCourse;

      const res = await apiFunction(newData);

      if (res?.data?.success) {
        closeEdit()
      }

      return res;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionListRef.current && !optionListRef.current.contains(event.target)) {
        setOpenOption(false)
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [optionListRef]);



  function closeEdit() {
    toggleEdit()
    dispatch(setCourseEdit(""))
  }

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
    setNewCategoryValue(prev => ({ ...prev, categoryName: value, createdById: user.id }));
  }

  function addCat() {
    setNewCategory(true)
  }

  function toogleoptionlist() {
    setOpenOption(!openOption)
  }

  async function saveCategory() {
    try {
      const res = await addCatCourse(newCategoryValue)
      if (res?.data?.success) {
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

  const optionList = () => {
    return (<SoftBox mt={.5} >
      <Card>
        <SoftBox p={2}>
          {!newCategory && <SoftButton onClick={addCat} fullWidth size="small" variant="outlined" color="info">New Category</SoftButton>}
          {newCategory && <SoftBox className={styles.flexBox}>
            <SoftInput value={newCategoryValue.categoryName} onChange={categoryChangehandler} placeholder="Category name" sx={{ grow: 1 }} />
            <SoftButton onClick={saveCategory} disabled={!newCategoryValue || addCatLoading} color="dark">Add</SoftButton>
          </SoftBox>}
          <SoftBox mt={1} sx={{maxHeight:"200px", overflowY:"auto"}}>
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
      <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
        <SoftTypography variant="h6" fontWeight="medium">
          Course
        </SoftTypography>
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
      <SoftBox p={2}>
        <form onSubmit={handleSubmit(submitFormData)}>
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
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Duration
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder="Duration"
                />
                {errors.duration && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.duration.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
          <SoftBox mb={2} ref={optionListRef}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Course Category
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              readOnly
              placeholder="Course Category"
              defaultValue={editfields?.categoryID ? categories?.data?.find((x) => x.categoryID === editfields?.categoryID)?.categoryName : ''}
              onClick={toogleoptionlist}
              value={selectedCat.categoryName}
            />
            {errors.categoryID && (
              <SoftTypography component="label" variant="caption" color="error">
                {errors.categoryID.message}
              </SoftTypography>
            )}

            {openOption && optionList()}
          </SoftBox>
          <Controller
            name="syllabus"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Syllabus
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder="Syllabus"
                />
                {errors.syllabus && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.syllabus.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
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
                  type="text"
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
          <Controller
            name="vat"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Tax
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder=" Tax"
                />
                {errors.vat && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.vat.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
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
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Description
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  {...field}
                  placeholder=" Description"
                />
                {errors.description && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.description.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />
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
                <SoftInput
                  type="text"
                  {...field}
                  placeholder=" Remarks"
                />
                {errors.remarks && (
                  <SoftTypography component="label" variant="caption" color="error">
                    {errors.remarks.message}
                  </SoftTypography>
                )}
              </SoftBox>
            )}
          />

          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" type="submit" fullWidth>
              {(loading || updateLoading) ? 'Loading..' : 'Submit'}
            </SoftButton>
          </SoftBox>
        </form>
      </SoftBox>
    </Card>
  );
}

export default EditCourse;
