# iFrame Approach

The iFrame approach was the most straightforward approach I could find for a POC about how to "Inject a React Component into a React Application at Runtime".

I decided that the best allow developers to run their code on a running React application was to put some hard requirements about how to do it, instead of letting them do whatever they want. This solution also works fine for non-technical people as they only have to update the data in the `external-app-data` DOM node.

To inject an iframe at runtime in the main application, you'd have to create a div with certain `data-*` attributes:

- `data-embedded-url` -> the iframe address
- `data-success-route` -> the route that the parent application should change to when a successful flow happens on the iFrame
- `data-cancel-route` -> the route that the parent application should change to when a failure happens on the iFrame
- `data-reset-route` -> the route that the parent application should change to when the user reset the flow on the iFrame

```html
<div
  id="external-app-data"
  data-embedded-url="http://127.0.0.1:5174"
  data-success-route="/success"
  data-cancel-route="/cancel"
  data-reset-route="/"
></div>
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

We grab this data in `main.tsx` like this:

```tsx
const embeddedDOMNode = document.getElementById('external-app-data');

if (!embeddedDOMNode) {
  throw new Error(
    "We're sorry, you need to have a node with ID `external-app-data`",
  );
}

const embeddedUrl = embeddedDOMNode.dataset.embeddedUrl as string;
const embeddedSuccessRoute = embeddedDOMNode.dataset.successRoute as string;
const embeddedCancelRoute = embeddedDOMNode.dataset.cancelRoute as string;
const embeddedResetRoute = embeddedDOMNode.dataset.resetRoute as string;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App
        embeddedUrl={embeddedUrl}
        embeddedSuccessRoute={embeddedSuccessRoute}
        embeddedCancelRoute={embeddedCancelRoute}
        embeddedResetRoute={embeddedResetRoute}
      />
    </Router>
  </React.StrictMode>,
);
```

Then, `App.tsx` renders the `Embedded` component which takes care of rendering the embedded application.

```jsx
<Embedded
  embeddedCancelRoute={embeddedCancelRoute}
  embeddedSuccessRoute={embeddedSuccessRoute}
  embeddedResetRoute={embeddedResetRoute}
  embeddedUrl={embeddedUrl}
  onNavigationEvent={(newRoute) => {
    navigate(newRoute);
  }}
/>
```

The embedded component has an `onNavigationEvent` callback that is executed whenever an event happens on the iFrame.

## Considerations to build the application that's going to be rendered on the iFrame

- The only way to communicate with the parent application (the one that renders the iFrame) is through a set of messages.
  - `SUCCESS`
  - `CANCEL`
  - `RESET`
    
The parent application will be listening for those events and will trigger a navigation callback whenever those events are triggered

```tsx
// /parent/Embedded.tsx
const receiveMessageCallback = useCallback((e: MessageEvent<IncomingEvent>) => {
  if (e.data?.type === 'SUCCESS') {
    onNavigationEvent(embeddedSuccessRoute);
  }

  if (e.data?.type === 'CANCEL') {
    onNavigationEvent(embeddedCancelRoute);
  }

  if (e.data?.type === 'RESET') {
    onNavigationEvent(embeddedResetRoute);
  }
}, []);

// /embedded/App.tsx
// The events that you have at your disposal
type OutboundEvent = {
  type: 'SUCCESS' | 'CANCEL' | 'RESET';
};

// How to trigger those events on the embedded application
const handleClickSuccess = () => {
  const outboundEvent: OutboundEvent = {
    type: 'SUCCESS',
  };
  window.parent.postMessage(outboundEvent, PARENT_URL);
};

const handleClickCancel = () => {
  const outboundEvent: OutboundEvent = {
    type: 'CANCEL',
  };
  window.parent.postMessage(outboundEvent, PARENT_URL);
};

const handleClickReset = () => {
  const outboundEvent: OutboundEvent = {
    type: 'RESET',
  };
  window.parent.postMessage(outboundEvent, PARENT_URL);
};

// And you can call those events in the app anyway you want it
return (
  <>
    <h1>Embedded application</h1>
    <div className="button-wrapper">
      <button onClick={handleClickSuccess}>Success</button>
      <button onClick={handleClickCancel}>Cancel</button>
      <button onClick={handleClickReset}>Reset</button>
    </div>
  </>
);
```

![](https://cdn.zappy.app/6ca5fea1daf7ccd766bc265866be69a3.png)

## Injecting third party scripts

This is totally possible as you'll have complete control over the index.html

# Pros and Cons

## Pros

- You can run any application you want inside the iFrame, you're not limited to React
- You can get up and running fast. Just update the div `data-*` elements with whatever you need

## Cons

- Working with events to establish communication between the iFrame and the parent is not as straight forward as other options.
- If the maintainers of the parent application roll out a breaking change (like changing a route) and this change is not communicated with the developers of the iframe, the iFrame application could break. Same goes for event names, if the parent application release/deprecate events the iframe developers will be in trouble
- I assume that testing against a sandbox could be slow, as you'd have to deploy your iframe, and then let the sandbox application (the parent) about your iframe's new URL
- Share application state between the iframe<->parent could get messy soon unless there's a standard mechanisms/apis to help you with that. In this POC we don't have that, we can use TypeScript to alleviate that problem, but that's brittle.
