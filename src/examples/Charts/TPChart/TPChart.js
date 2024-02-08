import React, { useState } from 'react';
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
import { Card, Icon, Menu, MenuItem } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Applicant VS Sale',
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
        },
    },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Sale',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(153, 102, 255, 0.7)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            barPercentage: 0.5,
            borderRadius: {
                topLeft: 10,
                topRight: 10,
            },
        },
        {
            label: 'Applicant',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            barPercentage: 0.5,
            borderRadius: {
                topLeft: 10,
                topRight: 10,
            },
        },
    ],
};




export function TPChart() {
    const [menu, setMenu] = useState(null);
    const [year, setYear] = useState(2023);

    const openMenu = ({ currentTarget }) => setMenu(currentTarget);
    const closeMenu = () => setMenu(null)

    const yearChangeHandler = (data) => {
        setYear(data)
        setMenu(null)
    };
    const renderMenu = (
        <Menu
            id="simple-menu"
            anchorEl={menu}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(menu)}
            onClose={closeMenu}
        >
            <MenuItem onClick={() => yearChangeHandler(2023)}>2023</MenuItem>
            <MenuItem onClick={() => yearChangeHandler(2022)}>2022</MenuItem>
        </Menu>
    );
    return <Card>
        <SoftBox p={2}>
            <SoftBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mb={1}>
                <SoftTypography variant="h5" color="dark" fontWeight="bold">
                    Applicant vs Sales
                </SoftTypography>
                <SoftBox>
                    <SoftBox color="text" px={2}>
                        <SoftTypography variant="caption" color="dark" fontWeight="bold">
                            {year}
                        </SoftTypography>

                        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                            <ArrowDownwardIcon />
                        </Icon>
                    </SoftBox>
                    {renderMenu}
                </SoftBox>
            </SoftBox>
            <Bar options={options} data={data} />
        </SoftBox>

    </Card>;
}
