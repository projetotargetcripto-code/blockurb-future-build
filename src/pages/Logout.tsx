import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClient } from "@/lib/dataClient";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { supabase } = getClient();
      await supabase.auth.signOut();
      navigate("/login", { replace: true });
    })();
  }, [navigate]);
  return null;
}
