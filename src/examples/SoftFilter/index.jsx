import { Card, Grid, Icon, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

const SoftFilter = ({ filterObj, listFilter }) => {
    let debounceTimer;

    const [showpopup, setShowpopup] = useState(false);
    const [apply, setApply] = useState(false);
    const [filterValues, setFilterValues] = useState({ ...filterObj });
    const cardRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setShowpopup(false);
        }
    };
    const handleClose = (event) => {
        setShowpopup(false);
    };

    const handleChange = (key, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [key]: { ...prev[key], value }
        }));
    };

    const changeFilter = (data) => {
        listFilter(data);
    };

    const changeSearch = (e) => {
        const searchValue = e.target.value;
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const updatedFilterData = { ...filterValues };
            let updatedObject = {}

            for (const key in updatedFilterData) {
                if (updatedFilterData[key].search) {
                    updatedObject[key] = searchValue;
                } else {
                    updatedObject[key] = "";
                }
            }
            listFilter(updatedObject);
        }, 300);
    };

    const filterhandler = () => {
        const filterParams = {};

        for (const key in filterValues) {
            let { value } = filterValues[key];

            if (filterValues[key].type === "date" && value === undefined) {
                value = null;
            }

            filterParams[key] = value;
        }
        setApply(true)
        changeFilter(filterParams);
        setShowpopup(false);
    };

    const clearFilter = () => {
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
        setApply(false)
        changeFilter(filterParams);
    };

    function filterViewer() {
        if (apply) {
            setApply(false)
            clearFilter()
        } else {
            setShowpopup(true)
        }
    }

    function SearchDyanmicPlaceholder() {
        const objectsWithSearchTrue = Object.keys(filterValues).filter(key => filterValues[key].search);

        return (<SoftInput
            icon={{ component: <SearchIcon />, direction: "left" }}
            placeholder={`Search in ${filterValues[objectsWithSearchTrue].label}`}
            onChange={changeSearch}
        />)
    }

    return (
        <>
            <SoftBox className={styles.container}>
                <div className={styles.input}>
                    <SearchDyanmicPlaceholder />
                </div>
                <SoftButton variant="gradient" color={apply ? "error" : "dark"} size="small" onClick={filterViewer}>{apply ? "Clear" : "Filter"}</SoftButton>
            </SoftBox>
            {showpopup && (
                <Grid container className={styles.overlay} alignItems="center" justifyContent="center">
                    <Grid item xs={11} sm={7}>
                        <Card ref={cardRef}>
                            <SoftBox pt={3} px={3} sx={{ display: "flex", justifyContent: "space-between", alignItem: 'center' }}>
                                <SoftTypography variant="h6" fontWeight="medium">
                                    Filters
                                </SoftTypography>
                                <SoftBox sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'end', gap: "16px" }}>

                                    <Icon
                                        sx={{
                                            fontWeight: "bold",
                                            color: ({ palette: { error } }) => error.main,
                                            cursor: "pointer",
                                        }}
                                        onClick={handleClose}
                                    >
                                        <CloseIcon />
                                    </Icon>
                                </SoftBox>

                            </SoftBox>
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
                                    <Grid item xs={2}>
                                        <SoftButton color="dark" variant="gradient" size="small" onClick={filterhandler}>Apply</SoftButton>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <SoftButton color="error" variant="gradient" size="small" onClick={clearFilter}>Clear</SoftButton>
                                    </Grid>
                                </Grid>
                            </SoftBox>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default SoftFilter;
