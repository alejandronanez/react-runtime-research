import { useCallback, useEffect, useRef } from 'react';

type EmbeddedProps = {
  embeddedUrl: string;
  embeddedCancelRoute: string;
  embeddedSuccessRoute: string;
  embeddedResetRoute: string;
  onNavigationEvent: (event: string) => void;
};

type EventType = 'SUCCESS' | 'CANCEL' | 'RESET';

type IncomingEvent = {
  type: EventType;
};

export const Embedded = ({
  embeddedCancelRoute,
  embeddedSuccessRoute,
  embeddedResetRoute,
  embeddedUrl,
  onNavigationEvent,
}: EmbeddedProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const receiveMessageCallback = useCallback(
    (e: MessageEvent<IncomingEvent>) => {
      /**
       * e.data could be an object with information from React. We can't update the state with an object
       *
       * Objects look like:
       * https://cdn.zappy.app/7f3ffc8c626d9c2b04d64a7f4048027b.png
       */
      if (e.data?.type === 'SUCCESS') {
        onNavigationEvent(embeddedSuccessRoute);
      }

      if (e.data?.type === 'CANCEL') {
        onNavigationEvent(embeddedCancelRoute);
      }

      if (e.data?.type === 'RESET') {
        onNavigationEvent(embeddedResetRoute);
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener('message', receiveMessageCallback);

    return () => window.removeEventListener('message', receiveMessageCallback);
  }, []);

  const sendMessageToIframe = () => {
    if (!iframeRef?.current?.contentWindow) {
      return;
    }

    iframeRef.current.contentWindow.postMessage(
      'message sent from the parent',
      embeddedUrl,
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: 20,
      }}
    >
      <button onClick={sendMessageToIframe}>
        Send a message to the iFrame
      </button>
      <iframe
        ref={iframeRef}
        style={{ height: 600, width: 600, border: 'none' }}
        src={embeddedUrl}
      />
    </div>
  );
};
