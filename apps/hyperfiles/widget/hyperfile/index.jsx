return (
  <div>
    <div className="container mt-3">
      <div className="row p-3">
        <h1>hyperfile creator</h1>
      </div>
      <div className="row">
        <div className="col">
          <div className="p-3 border bg-light">
            <Widget
              src="/*__@appAccount__*//widget/hyperfile.create"
              props={{
                creatorId: context.accountId,
              }}
            />
          </div>
        </div>
        <div className="col">
          <div className="p-3 border bg-light">
            <Widget
              src="everycanvas.near/widget/feed.index"
              props={{ type: "adapter" }}
            />
          </div>
        </div>
        <div className="col">
          <div className="p-3 border bg-light">Column 3 Content</div>
        </div>
      </div>
    </div>
  </div>
);
