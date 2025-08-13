import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

interface ProtectedProps {
  children: React.ReactNode;
  redirectTo?: string;
  debugBypass?: boolean;
}

export function Protected({ children, redirectTo = "/login", debugBypass = false }: PropsWithChildren<ProtectedProps>) {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (debugBypass) return; // show content regardless
    if (!loading && !session) {
      const next = encodeURIComponent(location.pathname + location.search);
      const target = `${redirectTo}?next=${next}`;
      if (location.pathname !== redirectTo) {
        navigate(target, { replace: true, state: { from: location } });
      }
    }
  }, [debugBypass, loading, session, navigate, location, redirectTo]);

  if (debugBypass) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <div className="h-8 w-8 rounded-full border-2 border-accent/40 border-t-accent animate-spin" aria-label="Carregando" />
      </div>
    );
  }

  if (!session) return null; // redirected

  return <>{children}</>;
}
