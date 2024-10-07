import {memo, Suspense, useCallback} from 'react'
import {Route, RouteProps, Routes} from 'react-router-dom'
import { getAuth } from '../store/selectors/authSelectors'
import { StateSchema } from '../store/config/stateChema'
import { useSelector } from 'react-redux'
import { privateRouteConfig, publicRouteConfig } from '../router/routeConfig'

const AppRouter = () => {
    const isAuth = useSelector((state: StateSchema) => getAuth(state))
    const routeConfig = isAuth ? privateRouteConfig : publicRouteConfig

    const renderWithWrapper = useCallback((route: RouteProps) => {
        const element = (
            <Suspense fallback="Loading...">
                {route.element}
            </Suspense>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        )
    }, [])

  return (
    <Routes>
        {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  )
}
  
export default memo(AppRouter)