import {Navigate, RouteProps} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import EventPage from "../pages/EventPage";

export enum AppRoutes {
  LOGIN = 'login',
  EVENT_PAGE = 'event_page',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.EVENT_PAGE]: '/event_page',
  [AppRoutes.NOT_FOUND]: '*',
}

export const publicRouteConfig: Pick<Record<AppRoutes, RouteProps>, AppRoutes.LOGIN | AppRoutes.NOT_FOUND> = {
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage/>
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <Navigate to={RoutePath.login}/>
  }
}

export const privateRouteConfig: Omit<Record<AppRoutes, RouteProps>, AppRoutes.LOGIN> = {
  [AppRoutes.EVENT_PAGE]: {
    path: RoutePath.event_page,
    element: <EventPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <Navigate to={RoutePath.event_page}/>
  },
}