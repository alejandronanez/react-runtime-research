export const RootRoute = () => (
  <div className="page-wrapper">
    <h2>I am the root route, let's pretend we have a lot of products here</h2>
  </div>
);

export const SuccessRoute = () => (
  <div className="page-wrapper page-wrapper__success">
    <h2>We just received your payment!</h2>
  </div>
);

export const CancelRoute = () => (
  <div className="page-wrapper page-wrapper__cancel">
    <h2>You just cancelled the operation :(</h2>
  </div>
);
