// components/DevOnlyRoute.tsx
import { type ReactNode } from "react";
import NotFound from "../pages/notFound";

interface DevOnlyRouteProps {
  children: ReactNode;
}

const DevOnlyRoute: React.FC<DevOnlyRouteProps> = ({ children }) => {
  const isDevelopment = () => {
    const currentUrl = window.location.hostname;
    // Check if URL contains 'netlify.app' (your dev condition)

    return currentUrl.includes("netlify.app") || currentUrl.includes("localhost");
  };

  // If not in development environment, show 404
  if (!isDevelopment()) {
    return <NotFound />;
  }

  // If in development, render the children (ChatPage)
  return <>{children}</>;
};

export default DevOnlyRoute;
