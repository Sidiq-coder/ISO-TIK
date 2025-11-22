import { AlertCircle } from "lucide-react";

/**
 * Error Alert Component for displaying login errors
 */
export const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-red-800 font-medium">Login Gagal</p>
        <p className="text-sm text-red-700 mt-1">{message}</p>
      </div>
    </div>
  );
};
