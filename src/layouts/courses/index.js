

import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import curved9 from "assets/images/curved-images/aboutBanner.png";
import { useAuth } from "auth-context/auth.context";
import PageCoverLayout from "examples/LayoutContainers/PageLayoutCover";
import BuildByDevelopers from "./components/BuildByDevelopers";
import { Card, Grid, Pagination, Stack } from "@mui/material";
import { GetCourseList } from "api/trainingApi";


function Courses() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });

  const { setUser } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    GetCourseList().then(res => console.log(res)).catch(err => console.log(err))
  }, [])

  const renderSearch = (
    <SoftBox component="form" role="form">
      <SoftBox>
        <SoftInput type="text" name="search" value={formData?.search} placeholder="Search" />
      </SoftBox>
    </SoftBox>
  )


  return (
    <PageCoverLayout
      title="Our Courses"
      description="Lorm ipsum doller sit amet dummy cntent rfjjd remedies parlo gaibi"
      image={curved9}
    >
      <SoftBox mb={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" py={1} px={2} mt={2}>
            <SoftBox>
              <SoftTypography variant="h4" gutterBottom>
                Courses
              </SoftTypography>
            </SoftBox>
            {renderSearch}
          </SoftBox>
        </Card>
        <Grid container spacing={3} >
          <Grid item xs={12} lg={3}>
            <BuildByDevelopers />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BuildByDevelopers />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BuildByDevelopers />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BuildByDevelopers />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BuildByDevelopers />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BuildByDevelopers />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BuildByDevelopers />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox>
        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </SoftBox>

      {/* <Projects /> */}
    </PageCoverLayout>
  );
}

export default Courses;
