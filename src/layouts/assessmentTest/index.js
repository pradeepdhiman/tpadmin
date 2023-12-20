
import curved9 from "assets/images/curved-images/homeBanner.png";
import HomeLayout from "./components/homelayout";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import { Card, Checkbox, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import SoftAlert from "components/SoftAlert";

const initialQuestion = [
  {
    id: "1",
    question: "lorem ipsume doller sit amete 1",
    options: [
      "Answer 1", "Answer 2", "Answer 3", "Answer 4"
    ]
  },
  {
    id: "2",
    question: "lorem ipsume doller sit amete 2",
    options: [
      "Answer 1", "Answer 2", "Answer 3", "Answer 4"
    ]
  }
]


function AssessmentTest() {
  const [testStarted, setTestStarted] = useState(false)
  const [questions, setQuestions] = useState(initialQuestion);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answeerlist, setAnsweerlist] = useState([]);
  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(600);
  const [timerRunning, setTimerRunning] = useState(false);


  function startTestHandler() {
    setTestStarted(!testStarted)
    setSeconds(600);
    setTimerRunning(true);
  }

  function submitHandler() {
    if (!answer) return
    const id = questions[activeQuestionIndex].id
    setAnsweerlist(prev => ([...prev, { id: id, answer }]))
    if (questions[activeQuestionIndex + 1]) {
      setAnswer("")
      setActiveQuestionIndex(activeQuestionIndex + 1)
    }
  }

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(intervalId);
            setTimerRunning(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);

  }, [timerRunning]);

  
  const finelSubmitHandler = () => {
    // AuthApi.Login(formData)
    //   .then((response) => {
    //     if (response.data.success) {
    //       return setProfile(response);
    //     } else {
    //       setError(response.data.msg);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       return setError(error.response.data.msg);
    //     }
    //     return setError("There has been an error.");
    //   });

  };


  return (
    <HomeLayout>
      {/* <SoftAlert>Thanks for submission</SoftAlert> */}
      {!testStarted && <SoftBox mt={3}>
        <SoftTypography variant="h3" fontWeight="bold" color="info" textGradient>Welcome to Assessment Test</SoftTypography>
        <SoftTypography variant="body2" fontWeight="regular" color="text">Do not refresh or move to another page while test.</SoftTypography>
        <SoftBox mt={2}>
          <SoftButton color="dark" onClick={startTestHandler}>Start Test</SoftButton>
        </SoftBox>
      </SoftBox>}
      {testStarted && <SoftBox mt={3}>
        <Card elevation={3}>
          <SoftBox py={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
            <SoftTypography variant="h5" fontWeight="bold" color="text">
              Advance Javascript
            </SoftTypography>
            <SoftTypography variant="h6" fontWeight="bold" color="error">
              {Math.floor(seconds / 60)}:{seconds % 60} Minutes
            </SoftTypography>
          </SoftBox>
          <Divider sx={{ margin: 0, width: "100%" }} />
          <SoftBox py={3} px={3}>
            <Grid container gap={2} direction="column" alignItems="flex-start">
              <Grid item>
                <SoftTypography><b>Question :- </b> {questions[activeQuestionIndex].question} </SoftTypography>
              </Grid>
              <Grid item>
                <FormControl>
                  <RadioGroup name="radio-buttons-group" onChange={(e) => setAnswer(e.target.value)} value={answer}                  >
                    {questions[activeQuestionIndex] && questions[activeQuestionIndex].options?.map((item, index) => (
                      <FormControlLabel value={item} control={<Radio />} label={item} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>

            </Grid>
          </SoftBox>
          <SoftBox py={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
            <SoftTypography
              variant="text"
              fontWeight="bold"
              sx={{ cursor: "poiner", userSelect: "none", fontSize: "15px" }}
            >
              1 &nbsp; of &nbsp;25
            </SoftTypography>
            <SoftButton onClick={submitHandler} color="info">Submit</SoftButton>
          </SoftBox>
        </Card>
      </SoftBox>}
    </HomeLayout>
  );
}

export default AssessmentTest;
