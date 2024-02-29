import { createRouter } from "@tanstack/react-router";
import RootRoute from "./RootRoute";
import LandingRoute from "./landing/LandingRoute";
import UserRoute from "./user/UserRoute";

const RouteTree = RootRoute.addChildren([LandingRoute, UserRoute]);

const Router = createRouter({
  routeTree: RouteTree,
});

export { Router };
