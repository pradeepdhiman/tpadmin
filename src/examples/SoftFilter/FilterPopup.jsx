import { Card, Grid, Icon, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

const FilterPopup = ({ filterObject, applyFilter, popupHandler }) => {
    const [filterValues, setFilterValues] = useState({ ...filterObject });
    const cardRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            popupHandler(false);
        }
    };

    const handleChange = (key, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [key]: { ...prev[key], value }
        }));
    };

    function filterhandler() {
        const filterParams = {};

        for (const key in filterValues) {
            let { value } = filterValues[key];

            if (filterValues[key].type === "date" && value === undefined) {
                value = null;
            }

            filterParams[key] = value;
        }

        applyFilter(filterParams);
        popupHandler(false);
    }


    function clearFilter() {
        const updatedFilterValues = { ...filterValues };
        const filterParams = {};

        for (const key in updatedFilterValues) {
            if (updatedFilterValues[key].type === "date" && updatedFilterValues[key].value === undefined) {
                updatedFilterValues[key].value = null;
            } else {
                updatedFilterValues[key].value = "";
            }
        }
        setFilterValues(updatedFilterValues);

        for (const key in updatedFilterValues) {
            const { value } = updatedFilterValues[key];
            filterParams[key] = value;
        }

        applyFilter(filterParams);
    }


    return (
        <Grid container className={styles.overlay} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
                <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "end", alignItem: 'center' }}>
                    <SoftTypography variant="h6" fontWeight="medium">
                        Filters
                    </SoftTypography>
                    <SoftBox sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'end', gap: "16px" }}>

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

                </SoftBox>
            </Grid>
            <Grid item xs={11} sm={7}>
                <Card ref={cardRef}>
                    <SoftBox p={2}>

                        {Object.keys(filterValues).map((key) => (
                            <Grid container key={key} mb={1}>
                                <Grid xs={12} sm={4}>
                                    <SoftTypography variant="button" fontWeight="regular" color="text">{filterValues[key].label}</SoftTypography>
                                </Grid>
                                <Grid xs={12} sm={8}>
                                    <SoftInput
                                        size="small"
                                        type={filterValues[key].type}
                                        value={filterValues[key].value}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid container >
                            <Grid item xs={6}>
                                <SoftButton color="dark" variant="gradient" size="small" onClick={filterhandler}>Filter</SoftButton>
                            </Grid>
                            <Grid item xs={6} >
                                <SoftButton color="error" variant="gradient" size="small" onClick={clearFilter}>Clear</SoftButton>
                            </Grid>
                        </Grid>

                    </SoftBox>
                </Card>
            </Grid>
        </Grid>
    );
}

export default FilterPopup;
