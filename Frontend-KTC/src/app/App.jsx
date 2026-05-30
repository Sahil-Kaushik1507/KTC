import AppRoutes from "../routes/AppRouter.jsx";
import QueryProvider from "./providers/QueryProvider.jsx";

export default function App() {
  return (
  <QueryProvider>
    <AppRoutes />;
  </QueryProvider>)
}