import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-text text-sm">{label}</label>

      <div className="relative flex items-center">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="input-box pr-12"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <div className="absolute right-4 cursor-pointer">
            {showPassword ? (
              <FaEye
                size={22}
                className="text-contrast"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaEyeSlash
                size={22}
                className="text-contrast"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
