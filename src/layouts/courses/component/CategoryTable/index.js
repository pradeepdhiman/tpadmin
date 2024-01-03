
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Table from "examples/Tables/Table";
import { useListCategoryQuery } from "common/query";
import { useCreateCategoryMutation } from "common/query";
import { useUpdateCategoryMutation } from "common/query";
import { useDeleteCategoryMutation } from "common/query";
import { categorytableheads } from "layouts/Courses/constant";
import { generateRows } from "utils/utils";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import SoftInput from "components/SoftInput";
import { useState } from "react";
import { authUser } from "layouts/authentication/functions/query";


function CategoryTable() {
  const [catname, setCatname] = useState("")
  const [editFields, setEditFields] = useState("")
  const [isNew, setIsNew] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { data: catList, isError: listErr, isLoading: listLoading, refetch: listFatch } = useListCategoryQuery()
  const [addCat, { data: addData, isError: addErr, isLoading: addLoading }] = useCreateCategoryMutation()
  const [updateCat, { data: updateData, isError: updateErr, isLoading: updateLoading }] = useUpdateCategoryMutation()
  const [delCat, { data: delData, isError: delErr, isLoading: delLoading }] = useDeleteCategoryMutation()
  const user = authUser()
  const rows = generateRows(catList || [], categorytableheads, onEdit, onDelete)

  function onEdit(id) {
    setEditFields(catList.data.find(x => x.categoryID == id))
    setCatname(catList.data.find(x => x.categoryID == id).categoryName)
    setIsEditing(true)
    setIsNew(true)
  }
  async function onDelete(id) {
    try {
      const res = await delCat(id)
      if (res?.data?.success) {
        listFatch()
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function newButtonHandler() {
    if (isNew && catname) {
      let CatData = {
        categoryID: isEditing ? editFields.categoryID : 0,
        categoryName: catname,
        createdById: parseInt(user.id) || 0,
        remarks: isEditing ? editFields.remarks : ""
      }
      const apiFunction = isEditing ? updateCat : addCat
      const res = await apiFunction(CatData)
      if (res?.data?.success) {
        setCatname("")
        setIsNew(false)
        setEditFields("")
        listFatch()
      }
    } else {
      setIsNew(!isNew)
      setIsEditing(!isEditing)
    }
  }
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Categories
        </SoftTypography>
        <SoftBox display="flex" justifyContent="flex-start" gap="16px" alignItems="center" >
          {isNew && <SoftInput value={catname} onChange={e => setCatname(e.target.value)} type="text" placeholder="Category Name" />}
          <SoftButton disabled={addLoading} variant="outlined" color="info" size="small" onClick={newButtonHandler}>
            {(isNew && catname) ? "Save" : (isNew && !catname) ? "Cencel" : "Add"}
          </SoftButton>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        {listLoading ? <SoftBarLoader /> : <SoftBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <Table columns={categorytableheads} rows={rows} />
        </SoftBox>}
      </SoftBox>
    </Card>
  );
}

export default CategoryTable;
