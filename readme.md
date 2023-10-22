🚧 **_Currently under active development._** 🚧

---

# Hyperfiles

![hypefiles logo](images/logoblack.png)

Organize everything. Hyperfiles is a self-organizing universal knowledge graph.

### A Standardized Type Schema
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

[Types]()
Plugins
- `newFile`: create a new file via upload, manual input, and queries

LOGIC: enable upload if file matches a template. Otherwise, use input fields.

Detect: fileformat by creating an array of fields and checking if fields exist, then check if that combination of fields exists

To Do: create unique IDs for each unique Thing (start with core types)

LOGIC: create.field (xN) → create.fileFormat (x0-1) → create.record (xN) → create.file (x1)

TO DO: enable using queries to create new files.

- fileName (str, s)
- fields (thing, m)
    - fieldName
        - TEST: check if fieldName exists
    - primitive
    - single or multiple???
- records (thing, m)
    - recordValues
    - recordOwners
- permissions

`query`: find any set of things, then mix and match

- formatName
- fieldName
- fileName
- fieldType
- recordNames
- recordValue
- recordOwner
- jobName
- jobType
- jobCode
- description
- image
- backgroundImage

`newJob`: create a new job file and execute a tool config

- jobName (str, s)
- jobType (thing, s)
- inputFiles (thing, m)
- permissions

## Index of Things

metadata

- every thing else has a metadata thing associated with it already, right???
    - or is metadata stored in the socialDB contract?
    - [https://near.org/efiz.near/widget/every.type.metadata](https://near.org/efiz.near/widget/every.type.metadata)

---

### files

Core

- every.file
- every.fileformat
- every.record
- every.field
- every.job
- every.jobtype
- every.toolconfig
- {accountId}/thing/impact.file

Featured

- every.hypercert

---

### fileformats

- [hypercert](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/fileformat.hypercert)

[fileformat.hypercert](fileformat%20hypercert%20cea53b0494314bc4a408ba2c6406ae82.md)

- impact

[fileformat.impact](fileformat%20impact%20c26a1aacf4084e89b4440d9484cbcb15.md)

- fileformat.job
- fileformat.jobType
- fileformat.toolConfig

types = fileformats = types???

[type:artist](type%20artist%20455f0ff7ab2243b5974fb43b0e6bf957.md)

[type:DAO](type%20DAO%20188d1ff79c43474eaa4caf652d66d05d.md)

---

### fields

- [hypercertName](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertName) (string, s)
- [hypercertProject](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertProject) (url, s)
- [hypercertScopeTags](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertScopeTags) (list, s)
- [hypercertWorkStart](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertWorkStart) (date, s)
- [hypercertWorkEnd](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertWorkEnd) (date, s) - how to make indefinite? (leave empty)
- [hypercertContributors](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertContributors) (list, s)
- [hypercertUsageRights](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertUsageRights) (str, s)
- [hypercertAllowlist](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertAllowlist) (list, s)
- [hypercertDistribution](https://everything.dev/mob.near/widget/WidgetSource?src=flowscience.near/thing/field.hypercertDistribution) (int, s) - how to set deduplicate = TRUE???
- description (string, s)
- image (img, s)
- backgroundImage (img, s)

---

### records

- hypercert.1
- file.1
- job.1

---

### jobs

- TBD

---

### jobTypes

- TBD

---

return <Widget src="efiz.testnet/widget/H1" config={{ networkId: 'testnet' }} props={{}} />;