import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, getToken, setToken, ApiRequestError } from "@/lib/api";

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  addresses: { label?: string; addressLine: string; city?: string; pincode?: string; isDefault?: boolean }[];
}

interface AuthContextValue {
  user: CustomerUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await api.get<{ user: CustomerUser }>("/auth/me");
      setUser(res.user);
    } catch {
      setToken(null);
      setUser(null);
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post<{ token: string; user: CustomerUser }>("/auth/login", { email, password });
    setToken(res.token);
    setUser(res.user);
  }

  async function register(name: string, email: string, phone: string, password: string) {
    const res = await api.post<{ token: string; user: CustomerUser }>("/auth/register", {
      name,
      email,
      phone,
      password,
    });
    setToken(res.token);
    setUser(res.user);
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { ApiRequestError };
