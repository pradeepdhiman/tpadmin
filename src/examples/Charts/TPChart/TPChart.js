import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';
import { Autocomplete, Card, Grid, Icon, Menu, MenuItem, TextField } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import { useReadChartMutation } from 'layouts/dashboard/functions/query';
import SoftBarLoader from 'components/SoftLoaders/SoftBarLoader';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function TPChart() {
    const [readChart, { data: fetchedChartData, isLoading: chartLoading, isError: chartErr }] = useReadChartMutation()

    const currentYear = new Date().getFullYear();
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

    const monthNames = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1;
        if (currentMonth) {
            let thisMonth = monthNames.find(x => +x.value === currentMonth)
            setSelectedMonth(thisMonth);
        }
    }, []);

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            async function fetchChart() {
                try {
                    await readChart({ year: parseInt(selectedYear), month: parseInt(selectedMonth.value) })
                } catch (err) {
                    console.log(err)
                }
            }
            fetchChart()
        }
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (_, newValue) => {
        setSelectedMonth(newValue);
    };

    const handleYearChange = (_, newValue) => {
        setSelectedYear(newValue);
    };

    const chartLabels = fetchedChartData?.data?.applicants.map(entry => `Day ${entry.day}`) || [];
    const learnersData = fetchedChartData?.data?.applicants.map(entry => entry.totalRecords) || [];
    const coursesData = fetchedChartData?.data?.courseApplied.map(entry => entry.totalRecords) || [];

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: 'Learners vs Courses',
            },
        },
        scales: {
            x: {
                type: 'category', 
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    precision: 0,
                },
            },
        },
    };


    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Learners',
                data: learnersData,
                backgroundColor: '#AF1125',
                borderColor: '#AF1125',
                borderWidth: 1,
                barPercentage: 0.5,
                borderRadius: {
                    topLeft: 10,
                    topRight: 10,
                },
            },
            {
                label: 'Courses',
                data: coursesData,
                backgroundColor: '#312783',
                borderColor: '#312783',
                borderWidth: 1,
                barPercentage: 0.5,
                borderRadius: {
                    topLeft: 10,
                    topRight: 10,
                },
            },
        ],
    };

    return (
        <Card>
            <SoftBox p={2}>
                <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mb={1}>
                    <SoftBox grow={1}>
                        <SoftTypography variant="h5" color="dark" fontWeight="bold">
                            Learners vs Courses
                        </SoftTypography>
                    </SoftBox>
                    <SoftBox sx={{ display: "flex", justifyContent: "end", gap: "16px", alignItems: "center" }}>
                        <Autocomplete
                            sx={{ width: "120px" }}
                            disableClearable={true}
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            options={monthNames}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} placeholder="Month" />}
                        />
                        <Autocomplete
                            sx={{ width: "80px" }}
                            disableClearable={true}
                            value={selectedYear}
                            onChange={handleYearChange}
                            options={years.map(year => year.toString())}
                            renderInput={(params) => <TextField {...params} placeholder="Year" />}
                        />
                    </SoftBox>
                </SoftBox>
                {chartLoading && <SoftBarLoader />}
                {!chartLoading && <Bar options={chartOptions} data={chartData} />}

            </SoftBox>
        </Card>
    );
}

