import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * Reusable Login Button Component
 */
export const LoginButton = ({ isLoading, disabled, children = "Masuk" }) => {
  return (
    <Button
      type="submit"
      className="w-full h-12 bg-blue hover:bg-blue-600 text-white font-medium transition-colors"
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Memproses...
        </>
      ) : (
        children
      )}
    </Button>
  );
};
