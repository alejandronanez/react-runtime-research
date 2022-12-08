import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Embedded } from './Embedded';
import { CancelRoute, RootRoute, SuccessRoute } from './Routes';

type AppProps = {
  embeddedUrl: string;
  embeddedSuccessRoute: string;
  embeddedCancelRoute: string;
  embeddedResetRoute: string;
};

function App({
  embeddedResetRoute,
  embeddedCancelRoute,
  embeddedSuccessRoute,
  embeddedUrl,
}: AppProps) {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div>
        <h1>RechargeApps</h1>

        <Routes>
          <Route path="/">
            <Route index element={<RootRoute />} />
            <Route path="success" element={<SuccessRoute />} />
            <Route path="cancel" element={<CancelRoute />} />
          </Route>
        </Routes>
      </div>

      <Embedded
        embeddedCancelRoute={embeddedCancelRoute}
        embeddedSuccessRoute={embeddedSuccessRoute}
        embeddedResetRoute={embeddedResetRoute}
        embeddedUrl={embeddedUrl}
        onNavigationEvent={(newRoute) => {
          navigate(newRoute);
        }}
      />
    </div>
  );
}

export default App;
