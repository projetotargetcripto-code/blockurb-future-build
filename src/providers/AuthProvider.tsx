import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/dataClient";

interface AuthState {
  session: any | null;
  user: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ session: null, user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure fixed dark theme classes are present (uses design tokens)
    document.body.classList.add("bg-background", "text-foreground");

    let unsub: (() => void) | null = null;

    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setUser(data?.session?.user ?? null);
      setLoading(false);

      const { data: sub } = supabase.auth.onAuthStateChange((_evt: any, sess: any) => {
        setSession(sess ?? null);
        setUser(sess?.user ?? null);
      });
      unsub = () => sub.subscription.unsubscribe();
    })();

    return () => { if (unsub) unsub(); };
  }, []);

  const value = useMemo(() => ({ session, user, loading }), [session, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
