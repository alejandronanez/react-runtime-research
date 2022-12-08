import './App.css';
import { Embedded } from './Embedded';

type AppProps = {
  embeddedUrl: string;
  embeddedSuccessEvent: string;
  embeddedCancelEvent: string;
};

function App({
  embeddedCancelEvent,
  embeddedSuccessEvent,
  embeddedUrl,
}: AppProps) {
  return (
    <div className="App">
      <h1>RechargeApps</h1>

      <Embedded
        embeddedCancelEvent={embeddedCancelEvent}
        embeddedSuccessEvent={embeddedSuccessEvent}
        embeddedUrl={embeddedUrl}
        onSuccessfulEvent={(event: string) => {
          console.log('Successful Event: ', event);
        }}
        onCancelEvent={(event: string) => {
          console.log('Cancel Event: ', event);
        }}
      />
    </div>
  );
}

export default App;
