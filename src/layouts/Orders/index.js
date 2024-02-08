
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import OrderList from "./component/OrderList";
import { useCourselistApplicantQuery } from "./functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { useEffect, useState } from "react";
import { initialFilters } from "./constant";

function Orders() {
  const [filters, setFilters] = useState(initialFilters)
  const { data: applicantCourseList, isLoading: listLoading, isError: listError, refetch: refreshList } = useCourselistApplicantQuery();
  let pendingPaymentCourse = applicantCourseList?.data?.filter(item => item.paymentStatusName === "Pending")
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await filteredList(filters);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [filters]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {listLoading && <SoftBarLoader />}
          {pendingPaymentCourse?.length && (
            <Grid item xs={12}>
              <OrderList list={pendingPaymentCourse} loading={listLoading} changeFilter={setFilters} />
            </Grid>
          )}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
