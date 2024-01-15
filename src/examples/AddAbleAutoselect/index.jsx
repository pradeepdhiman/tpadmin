import { Autocomplete, CircularProgress, IconButton, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useRef, useState } from "react";

const SoftAddAbleAutoSelect = (props) => {
    const componentRef = useRef(null);
    const [inputValue, setInputValue] = useState("")
    const [show, setShow] = useState(false)
    const { dataList, selectedValue, selectHandler, label, placeholder, saveHandler, loading, isEditable } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [componentRef]);

    async function Save() {
        const res = await saveHandler(inputValue)
        if (res?.data?.success) {
            setShow(!show)
        }
    }

    return (
        <SoftBox ref={componentRef}>
            <SoftBox sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Autocomplete
                    id="soft-auto-select"
                    value={selectedValue || null}
                    onChange={selectHandler}
                    options={dataList || []}
                    getOptionLabel={(option) => option.value || ""}
                    disableClearable={true}
                    renderInput={(params) => (
                        <TextField {...params} label={label} placeholder={placeholder} />
                    )}
                    sx={{ flexGrow: 1 }}
                />
                {isEditable && <IconButton onClick={() => setShow(!show)} color="dark" component="span" sx={{ padding: "0px" }}>
                    {loading ? <CircularProgress /> : <AddIcon fontSize="medium" />}
                </IconButton>}
            </SoftBox>
            {show && <SoftBox mt={2} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <SoftInput disabled={loading} type="text" placeholder="Type here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <IconButton onClick={Save} disabled={!inputValue} color="dark" component="span" sx={{ padding: "0px" }}>
                    <SaveIcon fontSize="medium" />
                </IconButton>
            </SoftBox>}
        </SoftBox>
    );
};

export default SoftAddAbleAutoSelect;
