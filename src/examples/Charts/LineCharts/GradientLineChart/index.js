import { useRef, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import gradientChartLine from "assets/theme/functions/gradientChartLine";
import colors from "assets/theme/base/colors";
import configs from "examples/Charts/LineCharts/GradientLineChart/configs";

function GradientLineChart({ title, description, height, dataset, labels }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setChartData(configs(labels || [], dataset));
  }, [dataset, labels])

  const renderChart = useMemo(() => (
    <SoftBox p={2}>
      {title || description ? (
        <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SoftBox mb={1}>
              <SoftTypography variant="h6">{title}</SoftTypography>
            </SoftBox>
          )}
          <SoftBox mb={2}>
            <SoftTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      ) : null}
      <SoftBox ref={chartRef} sx={{ height }}>
        <Line data={chartData.data || {}} options={chartData.options || {}} />
      </SoftBox>
    </SoftBox>
  ), [chartData, description, height, title]);

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}


export default GradientLineChart;
