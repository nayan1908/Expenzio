import { Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ROUTES from './routes/routes'
import SpinLoader from "./component/Loader/SpinLoader";
import enUS from 'antd-mobile/es/locales/en-US'
import { setDefaultConfig } from 'antd-mobile';
import { getSession } from './helper/auth';
import "./app.css";


function App() {
  const session = getSession();
  const navigate = useNavigate();

  setDefaultConfig({
    locale: enUS,
  })

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [JSON.stringify(session)]);


  return (
      <Suspense fallback={<SpinLoader />}>
        <Routes>
          {ROUTES.map(item =>
            <Route
              exact
              path={item.path}
              key={item.key}
              element={<item.component />}
            />
          )}
        </Routes >
      </Suspense>
  )
}

export default App
