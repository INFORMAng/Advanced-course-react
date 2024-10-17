import {memo, Suspense, useCallback, useEffect} from 'react'
import {Route, RouteProps, Routes} from 'react-router-dom'
import { getAuthState } from '../store/selectors/authSelectors'
import { StateSchema } from '../store/config/stateChema'
import { useSelector } from 'react-redux'
import { privateRouteConfig, publicRouteConfig } from '../router/routeConfig'
import { LOCAL_STORAGE_KEYS } from '../helpers/lib/localStorage'
import { useAppDispatch } from '../helpers/hooks/useAppDispatch'
import { setAuth } from '../store/slices/authSlice'

const AppRouter = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH)) {
            dispatch(setAuth())
        }
    }, [])

    const {auth: isAuth} = useSelector((state: StateSchema) => getAuthState(state))
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