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
      <div className="App__main-app-wrapper">
        <h1>Recharge UI Test</h1>

        <p>
          All simple sinners trap each other, only prime individuals have a
          milk.Ecce. Space suits experiment with voyage at the seismic universe!
        </p>

        <Routes>
          <Route path="/">
            <Route index element={<RootRoute />} />
            <Route path="success" element={<SuccessRoute />} />
            <Route path="cancel" element={<CancelRoute />} />
          </Route>
        </Routes>

        <p>
          All simple sinners trap each other, only prime individuals have a
          milk.Ecce. Space suits experiment with voyage at the seismic universe!
        </p>
      </div>

      <div className="App__embedded-wrapper">
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
    </div>
  );
}

export default App;
