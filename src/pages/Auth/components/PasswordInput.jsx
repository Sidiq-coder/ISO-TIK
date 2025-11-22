import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

/**
 * Reusable Password Input Component with toggle visibility
 */
export const PasswordInput = ({
  id,
  value,
  onChange,
  placeholder = "Masukkan password",
  error,
  showPassword,
  onToggleVisibility,
  disabled = false,
  autoComplete = "current-password",
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        Password <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-12 pr-12 ${error ? "border-red-500 focus:border-red-500" : ""}`}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          disabled={disabled}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
