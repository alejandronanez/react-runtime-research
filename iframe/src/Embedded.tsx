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
    <div className="embedded-wrapper">
      <button className="cta" onClick={sendMessageToIframe}>
        Send a message to iFrame
      </button>
      <iframe className="iframe-wrapper" ref={iframeRef} src={embeddedUrl} />
    </div>
  );
};
