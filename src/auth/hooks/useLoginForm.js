import { useState } from "react";
import { validateLoginForm } from "../utils/validation";

/**
 * Custom hook for login form logic
 */
export const useLoginForm = (onSubmit) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateLoginForm(formData.username, formData.password);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit(formData.username, formData.password);
    } catch (error) {
      setErrors({ submit: error.message || "Login gagal" });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    formData,
    errors,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    setErrors,
  };
};
