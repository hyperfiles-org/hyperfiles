**Types**: `JSON` stored on-chain that describes the *properties* and *default behavior* of a `Thing`
    - Has a “name”, an “owner”, and a list of “properties”
    - Properties have their own `Type` definitions
    - a `Type` can have properties that follow other `Types`
        - enables recursion, attribution/provenance, and
        - use properties to construct creators to put other data inside of it unique to a `Type`