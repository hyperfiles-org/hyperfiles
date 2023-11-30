const { path } = props;

if (!path) {
  return <p>No path provided.</p>;
}

const thing = Social.get(`${path}/**`, "final");

if (!thing) {
  return <p>Loading...</p>;
}

const hyperfile = JSON.parse(thing[""]);

const { get } = VM.require(hyperfile.adapter || (() => {}));

if (get) {
  const content = get(hyperfile.reference);

  if (content === null) return <p>no content</p>;

  return (
    <div className="container">
      {thing.metadata.type === "md" ? (
        <Widget
          src="openwebbuild.near/widget/Post.Markdown"
          props={{
            text: content,
          }}
        />
      ) : (
        <p>viewer does not currently support type: {thing.type}</p>
      )}
    </div>
  );
} else {
  return <p>Invalid adapter: {hyperfile.adapter}</p>;
}
