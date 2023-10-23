🚧 **_Currently under active development._** 🚧

---

# Hyperfiles

![hypefiles logo](images/logoblack.png)

Organize everything. Hyperfiles is a self-organizing universal knowledge graph.

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

Main frontend: in development (hyperfiles.jsx)

**Top-Level Plugins**
- `newFile`: create a new file via upload, manual input, and queries - MVP complete
- `query`: find any set of things, then mix and match - not started yet
- `newJob`: create a new job file and execute a tool config - not started yet

**Mid-Level Plugins**
- `create.fileformat`: create a new fileformat thing (should fileformats have owners?) - MVP complete
- `create.record`: create a new record thing - MVP complete

**Backend Plugins**
- `create.field`: create a new field thing - MVP complete

**Core Types**
- [field]()
- [record]()
- [fileformat]()
- [file]() 

---

**To Do**
- [ ] Enable upload if file matches a template. Otherwise, use input fields.
- [ ] Fileformat by creating an array of fields and checking if fields exist, then check if that combination of fields exists
- [ ] Create unique IDs for each unique Thing (start with core types)
- [ ] create.field (xN) → create.fileFormat (x0-1) → create.record (xN) → create.file (x1)
- [ ] Enable using queries to create new files
