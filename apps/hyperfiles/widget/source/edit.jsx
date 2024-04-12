const sourcePattern = props.sourcePattern ?? "*/profile/source/*";
const placeholder = props.placeholder ?? "Source";
const initialSourceObject = props.initialSourceObject || {};

const sourceObject = Social.keys(sourcePattern, "final");

if (sourceObject === null) {
  return "Loading";
}

const normalizeProf = (prof) =>
  prof
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const sourceCount = {};

const processSourceObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processSourceObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      sourceCount[prof] = (sourceCount[prof] || 0) + 1;
    }
  });
};

const getSource = () => {
  processSourceObject(sourceObject);
  const source = Object.entries(sourceCount);
  source.sort((a, b) => b[1] - a[1]);
  return source.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allSource) {
  initState({
    allSource: getSource(),
    source: Object.keys(initialSourceObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalSource: Object.fromEntries(
      Object.keys(initialSourceObject).map((prof) => [prof, null])
    ),
    id: `source-selector-${Date.now()}`,
  });
}

const setSource = (source) => {
  source = source.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ source });
  if (props.setSourceObject) {
    props.setSourceObject(
      Object.assign(
        {},
        state.originalSource,
        Object.fromEntries(source.map((prof) => [prof.name, ""]))
      )
    );
  }
};

return (
  <>
    <Typeahead
      id={state.id}
      labelKey="name"
      onChange={setSource}
      options={state.allSource}
      placeholder={placeholder}
      selected={state.source}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging source:
        <pre>{JSON.stringify(state.source)}</pre>
      </div>
    )}
  </>
);
