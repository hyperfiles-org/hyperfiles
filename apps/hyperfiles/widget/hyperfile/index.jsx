const TabContent = styled.div`
  margin-top: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button``;

const adapters = [
  // these can come from the user (or app) settings
  // {
  //   title: "Local Storage",
  //   value: "everycanvas.near/widget/adapter.local_storage",
  //   saveRef: false
  // },
  // {
  //   title: "SocialDB",
  //   value: "everycanvas.near/widget/adapter.social",
  // },
  {
    title: "",
    value: "",
  },
  {
    title: "IPFS",
    value: "everycanvas.near/widget/adapter.ipfs",
    refType: { cid: "string" },
  },
  // {
  //   title: "Custom",
  //   value: "custom",
  // },
  {
    title: "GitHub",
    value: "flowscience.near/widget/adapter.github",
  },
  // {
  //   title: "Obsidian",
  //   value: "hack.near/widget/adapter.obsidian",
  // },
  // {
  //   title: "Tldraw",
  //   value: "hack.near/widget/adapter.tldraw",
  // },
];

//const { GitHubAPIExample } = VM.require(  "create.near/widget/GitHub.API.Example");

const [rawData, setRawData] = useState("");
const [source, setSource] = useState("");
const [schema, setSchema] = useState("");
const [adapter, setAdapter] = useState("");
const [reference, setReference] = useState(undefined);
const [activeTab, setActiveTab] = useState("data");
const [name, setName] = useState(props.name ?? "");
const [description, setDescription] = useState(props.description ?? "");
const [hyperfile, setHyperfile] = useState("");
const [type, setType] = useState("");
const [filePath, setFilePath] = useState(null);

const handleSelectRepository = (selectedFilePath) => {
  console.log("Selected repository:", selectedFilePath);
  setFilePath(selectedFilePath);
};

const rawAdapter =
  (adapter !== "" || adapter !== "custom") && Social.get(adapter, "final");
const { create } =
  ((adapter !== "" || adapter !== "custom") && VM.require(adapter)) ||
  (() => {});

const functionRegex = /function\s+(\w+)\s*\(([^)]*)\)\s*{([\s\S]*?)\n}/g;

function parseAdapter(code) {
  let match;
  const functions = [];

  while ((match = functionRegex.exec(code)) !== null) {
    const [_, functionName, params, content] = match;
    functions.push({ functionName, params, content });
  }

  return functions.map((func, index) => (
    <FormGroup key={index}>
      <Label>{func.functionName}</Label>
      <textarea
        className="form-control"
        style={{ width: "100%", height: "100%" }}
        value={func.content.trim()}
        disabled
      />
    </FormGroup>
  ));
}

function generateUID() {
  const maxHex = 0xffffffff;
  const randomNumber = Math.floor(Math.random() * maxHex);
  return randomNumber.toString(16).padStart(8, "0");
}

const handleCreate = () => {
  if (create) {
    console.log("it's something", rawData);
    // store the data somewhere, based on the adapter
    create(rawData).then((reference) => {
      // now we have a reference to the data
      const thingId = generateUID();

      const hyperfile = {
        thing: {
          // which we store in the social contract
          [thingId]: {
            "": JSON.stringify({
              source: source,
              adapter: adapter,
              reference: reference,
            }),
            metadata: {
              name: name,
              description: description,
              schema: schema,
            },
          },
        },
      };

      setHyperfile(JSON.stringify(hyperfile, null, 2));
    });
  } else {
    console.log("invalid adapter");
  }
};

console.log("source: ", source);
console.log("schema: ", schema);
console.log("data: ", rawData);
console.log("adapter: ", adapter);

return (
  <div className="container mt-3">
    <div className="row p-3">
      <h1>Hyperfile Creator</h1>
    </div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "data" ? "active" : ""}`}
          onClick={() => setActiveTab("data")}
        >
          Data
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "metadata" ? "active" : ""}`}
          onClick={() => setActiveTab("metadata")}
        >
          Metadata
        </a>
      </li>
    </ul>
    <div className="row">
      <TabContent>
        {activeTab === "data" && (
          <div className="row">
            <div className="col">
              <div className="p-3 border bg-light">
                <Form>
                  <h3>Content</h3>
                  <FormGroup>
                    <Label>Source</Label>
                    <Widget
                      src="hyperfiles.near/widget/MetadataEditor"
                      props={{
                        initialMetadata: profile,
                        onChange: (newValue) => {
                          console.log("New Source:", newValue);
                          setSource(newValue); // Update local state
                          State.update({
                            profile: { ...profile, source: newValue }, // Update external state
                          });
                        },
                        value: source,
                        options: {
                          source: {
                            sourcePattern: "*/profile/source/*",
                            placeholder: "Select a source",
                          },
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Schema</Label>
                    <Widget
                      src="hyperfiles.near/widget/MetadataEditor"
                      props={{
                        initialMetadata: profile,
                        onChange: (newValue) => {
                          console.log("New Schema:", newValue);
                          setSchema(newValue); // Update local state
                          State.update({
                            profile: { ...profile, schema: newValue }, // Update external state
                          });
                        },
                        value: schema,
                        options: {
                          source: {
                            schemaPattern: "*/profile/schema/*",
                            placeholder: "Select a schema",
                          },
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Raw Data</Label>
                    <textarea
                      className="form-control"
                      style={{ width: "100%", height: "400px" }}
                      value={rawData}
                      onChange={(e) => setRawData(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
            <div className="col">
              <div className="p-3 border bg-light">
                <Form>
                  <h3>Storage</h3>
                  <FormGroup>
                    <Label>Adapter</Label>
                    <Select
                      value={adapter}
                      onChange={(e) => setAdapter(e.target.value)}
                    >
                      {adapters.map((o) => (
                        <option value={o.value}>{o.title}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  {rawAdapter && <>{parseAdapter(rawAdapter)}</>}
                  {adapter === "hyperfiles.near/widget/adapter.github" && (
                    <Widget
                      src="flowscience.near/widget/GitHubSearchSelect"
                      onSelectRepository={handleSelectRepository}
                    ></Widget>
                  )}
                </Form>
              </div>
            </div>
            <div className="col">
              <div className="p-3 border bg-light">
                <Form>
                  <Button
                    onClick={handleCreate}
                    disabled={!adapter || !schema || !source || !rawData}
                  >
                    create reference
                  </Button>
                  {hyperfile !== "" && (
                    <>
                      <FormGroup>
                        <textarea
                          className="form-control"
                          value={hyperfile}
                          disabled
                          style={{ width: "100%", height: "400px" }}
                        />
                      </FormGroup>
                      <Button
                        onClick={() =>
                          Social.set(JSON.parse(hyperfile), { force: true })
                        }
                      >
                        save
                      </Button>
                    </>
                  )}
                </Form>
              </div>
            </div>
          </div>
        )}
      </TabContent>
      <TabContent>
        {activeTab === "metadata" && (
          <Form>
            <h3>metadata</h3>
            <FormGroup>
              <Label>name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>description</Label>
              <textarea
                className="form-control mb-3"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
        )}
      </TabContent>
    </div>
  </div>
);
