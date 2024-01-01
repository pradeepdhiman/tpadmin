import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';

const MasterForm = (props) => {
  const { onSubmit = null, formFields = {}, loading = false, handleSubmit = null, control = null, reset = null, errors = null } = props

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const submitFormData = (data) => {
    onSubmit(data)
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitFormData)}>
      {Object.keys(formFields).map((fieldName) => (
        formFields[fieldName].hidden ? null : (
          <SoftBox mb={2} key={fieldName}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                {formFields[fieldName].label}
              </SoftTypography>
            </SoftBox>
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <>
                  <SoftInput
                    type={ formFields[fieldName].type ? formFields[fieldName].type :"text"}
                    {...field}
                    placeholder={formFields[fieldName].placeholder}
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
        )
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
