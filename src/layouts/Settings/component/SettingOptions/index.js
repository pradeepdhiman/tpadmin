

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useGetSettingMutation } from "layouts/Settings/functions/query";
import SoftBarLoader from "components/SoftLoaders/SoftBarLoader";
import { authUser } from "layouts/authentication/functions/query";
import { useUpdateSettingMutation } from "layouts/Settings/functions/query";
import { toastHandler } from "utils/utils";

function SettingsOptions() {
  const [id, setId] = useState(0);
  const [applicantRegister, setApplicantRegister] = useState(true);
  const [courseEnroll, setCourseEnroll] = useState(true);
  const [assessmentComplete, setAssessmentComplete] = useState(true);
  const [reassessmentReq, setReassessmentReq] = useState(true);
  const [coursepayment, setCoursepayment] = useState(true);
  const [reassessmentPayment, setReassessmentPayment] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  const [readSettings, { data: settingData, isLoading: settingloading, isError: settingErr }] = useGetSettingMutation()
  const [settingUpdate, { data: updateData, isLoading: updateLoading, isError: updateErr }] = useUpdateSettingMutation()


  let user = authUser()

  useEffect(() => {
    async function getSettings() {
      try {
        const res = await readSettings()
        if (res?.data?.success) {
          const {
            toEmail,
            applicantRegisterEmail,
            courseEnrollEmail,
            applicantAssesmentEmail,
            applicantReassesmentRequestEmail,
            enrollmentPaymentEmail,
            reassesmentPaymentEmail,
            settingID,
          } = res?.data?.data[0]
          setApplicantRegister(applicantRegisterEmail)
          setCourseEnroll(courseEnrollEmail)
          setAssessmentComplete(applicantAssesmentEmail)
          setReassessmentReq(applicantReassesmentRequestEmail)
          setCoursepayment(enrollmentPaymentEmail)
          setReassessmentPayment(reassesmentPaymentEmail)
          setAdminEmail(toEmail)
          setId(settingID)
        }
      } catch (Err) {
        console.log(Err)
      }
    }
    getSettings()
  }, [])


  async function updateSettings() {
    let data = {
      settingID: id,
      fromEmail: "",
      toEmail: adminEmail,
      applicantRegisterEmail: applicantRegister || false,
      courseEnrollEmail: courseEnroll || false,
      applicantAssesmentEmail: assessmentComplete || false,
      applicantReassesmentRequestEmail: reassessmentReq || false,
      enrollmentPaymentEmail: coursepayment || false,
      reassesmentPaymentEmail: reassessmentPayment || false,
      status: 26,
      updatedById: parseInt(user?.id),
      remarks: ""
    }
    try {
      const res = await settingUpdate(data)
      if (res?.data?.success) {
        toastHandler(res)
      }
    } catch (Err) {
      console.log(Err)
    }
  }

  return (
    <Card>
      {settingloading && <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Loading...
        </SoftTypography>
      </SoftBox>}
      <>
        <SoftBox pt={2} px={2}>
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Settings
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
          <SoftTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            Email
          </SoftTypography>
          <SoftBox display="flex" py={1} mb={0.25} sx={{ alignItems: "start", flexDirection:"column" }}>
            <SoftBox  mb={.5}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Admin Email
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={0.25}>
              <SoftInput
                name="email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </SoftBox>
          </SoftBox>

          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftBox mt={0.25}>
              <Switch checked={applicantRegister} onChange={() => setApplicantRegister(!applicantRegister)} />
            </SoftBox>
            <SoftBox width="80%" ml={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Email on applicant register.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftBox mt={0.25}>
              <Switch checked={courseEnroll} onChange={() => setCourseEnroll(!courseEnroll)} />
            </SoftBox>
            <SoftBox width="80%" ml={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Email on course enroll.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftBox mt={0.25}>
              <Switch checked={assessmentComplete} onChange={() => setAssessmentComplete(!assessmentComplete)} />
            </SoftBox>
            <SoftBox width="80%" ml={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Email on assessment complete.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftBox mt={0.25}>
              <Switch checked={reassessmentReq} onChange={() => setReassessmentReq(!reassessmentReq)} />
            </SoftBox>
            <SoftBox width="80%" ml={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Email on re-assessment request.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftBox mt={0.25}>
              <Switch checked={coursepayment} onChange={() => setCoursepayment(!coursepayment)} />
            </SoftBox>
            <SoftBox width="80%" ml={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Email on course payment recieve.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftBox mt={0.25}>
              <Switch checked={reassessmentPayment} onChange={() => setReassessmentPayment(!reassessmentPayment)} />
            </SoftBox>
            <SoftBox width="80%" ml={2}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Email on re-assessment payment recieve.
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" py={1} mb={0.25}>
            <SoftButton disabled={updateLoading} variant="gradient" color="dark" onClick={updateSettings}>{updateLoading ? "Loading..." : "Save "}</SoftButton>
          </SoftBox>
        </SoftBox>
      </>
    </Card >
  );
}

export default SettingsOptions;
