


// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import typography from "assets/theme/base/typography";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import EditQuestion from "./component/EditQuestions";
import QuestionList from "./component/QuestionsList";
import { useListCourseQuery } from "layouts/Courses/functions/query";
import { setQuestionCourse } from "./functions/questionSlice";
import { useDispatch, useSelector } from "react-redux";

const loadingState = { courseName: "Loading..." }

function CourseQuestions() {
  const { size } = typography;
  const [isEdit, setEdit] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("");
  const dispatch = useDispatch()
  const { editid } = useSelector(state => state.question)

  const { data: courses, error: courseErr, isLoading: courseLoading, refetch: refreshCourse } = useListCourseQuery()

  useEffect(() => {
    if (!selectedCourse) {
      dispatch(setQuestionCourse(courses?.data[0]))
      setSelectedCourse(courses?.data[0])
    }
  }, [courses])

  function addNew() {
    setEdit(true)
  }
  function editMode() {
    setEdit(false)
  }

  const handleCourseSelect = (event, newValue) => {
    setSelectedCourse(newValue);
    dispatch(setQuestionCourse(newValue))
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SoftBox sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap: "16px" }}>
              <Autocomplete
                disablePortal
                disableClearable
                id="combo-box-demo"
                value={selectedCourse}
                onChange={handleCourseSelect}
                options={courseLoading ? loadingState : courses?.data || []}
                getOptionLabel={(option) => option.courseName}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
              <SoftButton size="small" color="dark" onClick={addNew}>New Question</SoftButton>
            </SoftBox>
          </Grid>
          {isEdit && <Grid item xs={12} >
            <EditQuestion toggleEdit={editMode} />
          </Grid>}
          <Grid item xs={12} >
            <QuestionList isEdit={isEdit} editFun={addNew} loading={courseLoading} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CourseQuestions;



// // @mui material components
// import Grid from "@mui/material/Grid";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";

// // Soft UI Dashboard React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import typography from "assets/theme/base/typography";
// import SoftButton from "components/SoftButton";
// import { useEffect, useState } from "react";
// import { Autocomplete, TextField } from "@mui/material";
// import EditQuestion from "./component/EditQuestions";
// import QuestionList from "./component/QuestionsList";
// import { useListCourseQuery } from "layouts/Courses/functions/query";
// import { setQuestionCourse } from "./functions/questionSlice";
// import { useDispatch, useSelector } from "react-redux";

// const loadingState = { courseName: "Loading..." }

// function CourseQuestions() {
//   const { size } = typography;
//   const [isEdit, setEdit] = useState(false)
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const dispatch = useDispatch()
//   const { editid } = useSelector(state => state.question)

//   const { data: courses, error: courseErr, isLoading: courseLoading, refetch: refreshCourse } = useListCourseQuery()

//   useEffect(() => {
//     if (editid) {
//       setEdit(true)
//     }
//   }, [editid])

//   useEffect(() => {
//     if (!selectedCourse) {
//       dispatch(setQuestionCourse(courses?.data[0]))
//       setSelectedCourse(courses?.data[0])
//     }
//   }, [courses])

//   const handleCourseSelect = (event, newValue) => {
//     setSelectedCourse(newValue);
//     dispatch(setQuestionCourse(newValue))
//   };

//   function editMode() {
//     setEdit(false)
//   }
//   function addApplicant() {
//     setEdit(true)
//   }



//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <SoftBox sx={{ display: "flex", justifyContent: "flex-start", alignItem: "center", gap: "16px" }}>
//               <Autocomplete
//                 disablePortal
//                 disableClearable
//                 id="combo-box-demo"
//                 value={selectedCourse}
//                 onChange={handleCourseSelect}
//                 options={courseLoading ? loadingState : courses?.data || []}
//                 getOptionLabel={(option) => option.courseName}
//                 sx={{ width: 300 }}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//               <SoftButton size="small" color="dark" onClick={addApplicant}>New Question</SoftButton>
//             </SoftBox>
//           </Grid>
//           {isEdit && <Grid item xs={12} >
//             <EditQuestion toggleEdit={editMode} />
//           </Grid>}
//           <Grid item xs={12} >
//             <QuestionList isEdit={isEdit} />
//           </Grid>
//         </Grid>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default CourseQuestions;
