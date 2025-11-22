import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      if (username && password) {
        const mockUser = {
          id: "USR-001",
          username: username,
          fullName: "Admin User",
          email: `${username}@company.com`,
          roles: ["Admin"],
          status: "Aktif",
        };

        const mockToken = "mock-jwt-token-" + Date.now();

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("token", mockToken);
        
        setUser(mockUser);
        return { success: true, user: mockUser };
      }

      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    // Navigation will be handled by the component calling logout
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
