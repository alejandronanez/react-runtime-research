import './App.css';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { Embedded } from './Embedded';
import { CancelRoute, RootRoute, SuccessRoute } from './Routes';

type AppProps = {
  embeddedUrl: string;
  embeddedSuccessEvent: string;
  embeddedCancelEvent: string;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
  },
  {
    path: '/success',
    element: <SuccessRoute />,
  },
  {
    path: '/cancel',
    element: <CancelRoute />,
  },
]);

function App({
  embeddedCancelEvent,
  embeddedSuccessEvent,
  embeddedUrl,
}: AppProps) {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>RechargeApps</h1>

      <Routes>
        <Route path="/">
          <Route index element={<RootRoute />} />
          <Route path="success" element={<SuccessRoute />} />
          <Route path="cancel" element={<CancelRoute />} />
        </Route>
      </Routes>

      <Embedded
        embeddedCancelEvent={embeddedCancelEvent}
        embeddedSuccessEvent={embeddedSuccessEvent}
        embeddedUrl={embeddedUrl}
        onSuccessfulEvent={() => {
          navigate('/success');
        }}
        onCancelEvent={() => {
          navigate('/cancel');
        }}
      />
    </div>
  );
}

export default App;
