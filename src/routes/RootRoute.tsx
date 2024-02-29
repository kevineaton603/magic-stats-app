import { createRootRoute, Outlet } from "@tanstack/react-router";

const Component: React.FC = () => {
  return (
    <>
      <header className="dark:bg-slate-800 h-12 dark:text-slate-50 grid place-content-center">
        <h1 className="text-3xl">Magic Stats</h1>
      </header>
      <main className="dark:bg-slate-700 dark:text-slate-50 min-h-screen">
        <Outlet />
      </main>
      <footer>Kevin Eaton &copy; 2024</footer>
    </>
  );
};

const RootRoute = createRootRoute({
  component: Component,
});

export default RootRoute;
