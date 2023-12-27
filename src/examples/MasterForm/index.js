
// import SoftBox from 'components/SoftBox';
// import SoftButton from 'components/SoftButton';
// import SoftInput from 'components/SoftInput';
// import SoftTypography from 'components/SoftTypography';
// import React, { useEffect, useState } from 'react';
// import { validateForm } from 'utils/utils';

// const MasterForm = ({ onSubmit, formState, validation, loading }) => {
//     const [formData, setFormData] = useState(formState);
//     const [formErrors, setFormErrors] = useState({});

//     useEffect(() => {
//         setFormData(formState)
//     }, [formState])

//     const handleFormData = (e) => {
//         const fieldValue = {[e.target.name]: e.target.value}
//         const fieldValidation = validation[e.target.name]
//         console.log(fieldValue, fieldValidation)
//         const errors = validateForm(fieldValue, fieldValidation);
//         setFormErrors(errors);
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const submitFormData = async (e) => {
//         e.preventDefault();
//         const errors = validateForm(formData, validation);
//         setFormErrors(errors);

//         if (Object.keys(errors).length === 0) {
//             onSubmit(formData)
//         }
//     }


//     return (
//         <form >
//             {Object.keys(formData).map((fieldName) => (
//                 <SoftBox mb={2} key={fieldName}>
//                     <SoftInput
//                         type="text"
//                         name={fieldName}
//                         value={formData[fieldName]}
//                         onChange={handleFormData}
//                         placeholder={fieldName}
//                     />
//                     {formErrors[fieldName] && <SoftTypography component="label" variant="caption" color="error">{formErrors[fieldName]}</SoftTypography>}
//                 </SoftBox>
//             ))}
//             <SoftBox mt={4} mb={1}>
//                 <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
//                     {loading ? "Loading.." : "Submit"}
//                 </SoftButton>
//             </SoftBox>
//         </form>
//     );
// };

// export default MasterForm;

import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const MasterForm = ({ onSubmit, formState, validation, loading }) => {
    const [formData, setFormData] = useState(formState);
    
    useEffect(() => {
        setFormData(formState);
    }, [formState]);

  
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validation),
        defaultValues: formData,
    });

    const submitFormData = async (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(submitFormData)}>
            {Object.keys(formState).map((fieldName) => (
                <SoftBox mb={2} key={fieldName}>
                    <Controller
                        name={fieldName}
                        control={control}
                        render={({ field }) => (
                            <>
                                <SoftInput
                                    type="text"
                                    {...field}
                                    placeholder={fieldName}
                                />
                                {errors[fieldName] && (
                                    <SoftTypography component="label" variant="caption" color="error">
                                        {errors[fieldName]?.message}
                                    </SoftTypography>
                                )}
                            </>
                        )}
                    />
                </SoftBox>
            ))}

            <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" type="submit" fullWidth>
                    {loading ? 'Loading..' : 'Submit'}
                </SoftButton>
            </SoftBox>
        </form>
    );
};

export default MasterForm;
