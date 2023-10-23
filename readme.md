🚧 **_Under active development. Use at your own risk._** 🚧

---

# Hyperfiles

![hypefiles logo](images/logoblack.png)

Organize everything. Hyperfiles is a self-organizing universal knowledge graph.

**Quick Start**
1. [Create a new fileformat](https://everything.dev/flowscience.near/widget/create.fileFormat) (schema)
2. [Create a new file](https://everything.dev/flowscience.near/widget/create.file) (attestation)

**Guides and Example Use Cases** (in progress)
- Guide: ["How to Create a New Fileformat"] - coming soon!
- Guide: ["How to Create a New File"] - coming soon!
- Guide: ["How to Use Attestations"] - coming soon!
- Use Case: ["Hypercerts on BOS"](https://github.com/open-cann/hypercerts-on-bos)
- Use Case: ["Scientific Fileformat Ontology (SFO)"] - coming soon!
- Guide: ["Hyperfiles Development Roadmap"] - coming soon!

---

### Standardized Type Schema
- The Hyperfiles knowledge graph is composed by reducing any piece of data or code into a set of unique objects, called `records`, which map to a set of pre-defined `fields`.
- Each set of `fields` composes into a unique `fileformat`. Likewise, each set of `records` composes into a unique `file`.
- `Files` are an indexed combination of `fields` and `records`.
- `Jobs` are a specific `fileformat` type that contain a set of instructions to run a Docker container using decentralized compute networks.

![hyperfiles schema](images/core_schema.png)

### Self-Assembling Data Structures
This will be developed after a front-end that enables users to manually interact with the knowledge graph.

- [ ] Any data or job can be mixed and matched, enabling seamless composability across apps.
- [ ] Fileformats are automatically detected & categorized when new data is entered or when new fileformats are created during queries and jobs.
- [ ] Fields are analyzed to identify primitive types and basic statistics
- [ ] Core types & user-specific types?
- [ ] Marketplace price determination

---

### Components

**Integrated frontend** [In Progress](https://github.com/flowscience/hyperfiles/tree/master/widgets/plugins/hyperfiles.jsx)
- [ ] Publish (file/fileformat) - coming soon!
- [ ] Explorer - coming soon!
- [ ] Profile - coming soon!

**Top-Level Plugins**
- `newFile`: create a new file via upload, manual input, and queries - [MVP complete](https://everything.dev/flowscience.near/widget/create.file)
- `query`: find any set of things, then mix and match - [coming soon!]
- `newJob`: create a new job file and execute a tool config - [coming soon!]

**Mid-Level Plugins**
- `create.fileformat`: create a new fileformat thing (should fileformats have owners?) - [MVP complete](https://everything.dev/flowscience.near/widget/create.fileFormat)
- `create.record`: create a new record thing - [MVP complete](https://everything.dev/flowscience.near/widget/create.record)

**Backend Plugins**
- `create.field`: create a new field thing - [MVP complete](https://everything.dev/flowscience.near/widget/create.field)

**Core Types**
- [field](https://github.com/flowscience/hyperfiles/blob/master/types/core_types/field.json)
- [record](https://github.com/flowscience/hyperfiles/blob/master/types/core_types/record.json)
- [fileformat](https://github.com/flowscience/hyperfiles/blob/master/types/core_types/fileformat.json)
- [file](https://github.com/flowscience/hyperfiles/blob/master/types/core_types/file.json)
- [metadata](https://github.com/flowscience/hyperfiles/blob/master/types/core_types/metadata.json) - needs update!

---

**To Do**
- [ ] Enable upload if file matches a template. Otherwise, use input fields.
- [ ] Fileformat by creating an array of fields and checking if fields exist, then check if that combination of fields exists
- [ ] Create unique IDs for each unique Thing (start with core types)
- [ ] create.field (xN) → create.fileFormat (x0-1) → create.record (xN) → create.file (x1)
- [ ] Enable using queries to create new files
- [ ] Index [EAS](https://attest.sh/) & enable cross-minting

---

Built by [flowscience](https://github.com/flowscience). <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/PD-icon-black.svg/800px-PD-icon-black.svg.png" alt="Unlicense" width="20" height="20" /> [No rights reserved](https://github.com/flowscience/hyperfiles/blob/master/LICENSE).
