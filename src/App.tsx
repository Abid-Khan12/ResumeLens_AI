import { RouterProvider } from "react-router";

import { ThemeProvider } from "@/providers/theme-provider";

import router from "@/routes";

function App() {
   return (
      <ThemeProvider
         defaultTheme="light"
         storageKey="vite-ui-theme"
      >
         <RouterProvider router={router} />
      </ThemeProvider>
   );
}

export default App;
