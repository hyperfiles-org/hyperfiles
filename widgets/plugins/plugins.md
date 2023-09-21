**Plugins**: `type`-specific `Widget` that can interact with a `Thing`
    - Installed by the user and stored in the settings

## Core Plugins

### composable.publish: create a new file

LOGIC: enable upload if file matches a template. Otherwise, use input fields.

Detect:

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

### composable.query: find any set of things, then mix and match

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

### composable.job: create a new job file and execute a tool config