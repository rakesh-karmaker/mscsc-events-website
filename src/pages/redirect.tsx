import Loader from "@/components/ui/loader";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

export default function Redirect(): ReactNode {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className="w-full h-[calc(100vh-var(--nav-height))]">
      <Loader />
    </div>
  );
}
