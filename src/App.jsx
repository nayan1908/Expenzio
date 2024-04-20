import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ROUTES from './routes/routes'
import Loader from "./component/Loader/Loader";
import enUS from 'antd-mobile/es/locales/en-US'
import { setDefaultConfig } from 'antd-mobile';
// import './App.css'

function App() {

  setDefaultConfig({
    locale: enUS,
  })

  return (
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
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
      </BrowserRouter>
  )
}

export default App
