import { Navigate } from 'react-router-dom'; //pakett

// auth bool olarak saklanir
const AUTH_KEY = 'summitgear_auth';

// admin check
export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

// Admin state updt
export function setAuthenticated(value: boolean): void {
  if (value) {
    localStorage.setItem(AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

interface AuthGuardProps {
  children: React.ReactNode;
}

// protected - m'ddleware g'b' 
export function AuthGuard({ children }: AuthGuardProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
