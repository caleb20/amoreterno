import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Handle input blur (for validation)
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur if validation schema exists
    if (validationSchema && validationSchema[name]) {
      const fieldError = validationSchema[name](values[name], values);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError || ''
      }));
    }
  }, [validationSchema, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    if (!validationSchema) return {};

    const newErrors = {};
    Object.keys(validationSchema).forEach(field => {
      const fieldError = validationSchema[field](values[field], values);
      if (fieldError) {
        newErrors[field] = fieldError;
      }
    });

    setErrors(newErrors);
    return newErrors;
  }, [validationSchema, values]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set form values
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  // Set specific field value
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Set field error
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Check if form is valid
  const isValid = useCallback(() => {
    const formErrors = validateForm();
    return Object.keys(formErrors).length === 0;
  }, [validateForm]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    try {
      const formErrors = validateForm();
      
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return false;
      }

      await onSubmit(values);
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormValues,
    setFieldValue,
    setFieldError,
    isValid,
    validateForm
  };
};

// Common validation functions
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'Este campo es requerido';
    }
    return '';
  },

  email: (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Email inválido';
    }
    return '';
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Mínimo ${min} caracteres`;
    }
    return '';
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Máximo ${max} caracteres`;
    }
    return '';
  },

  phone: (value) => {
    if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
      return 'Número de teléfono inválido';
    }
    return '';
  },

  numeric: (value) => {
    if (value && !/^\d+$/.test(value)) {
      return 'Solo números permitidos';
    }
    return '';
  },

  positiveNumber: (value) => {
    if (value && (isNaN(value) || parseFloat(value) <= 0)) {
      return 'Debe ser un número positivo';
    }
    return '';
  }
};

// Helper to combine multiple validators
export const combineValidators = (...validators) => (value, allValues) => {
  for (const validator of validators) {
    const error = validator(value, allValues);
    if (error) return error;
  }
  return '';
}; 