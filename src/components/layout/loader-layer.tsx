import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import PageLoader from "@/components/ui/page-loader";

export default function LoaderLayer() {
   const location = useLocation();
   return (
      <Suspense
         key={location.pathname}
         fallback={<PageLoader />}
      >
         <Outlet />
      </Suspense>
   );
}
