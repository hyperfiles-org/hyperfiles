# Hyperfiles NEAR Social Entities and Actions Schema Documentation

This documentation provides a comprehensive guide to the Hyperfiles NEAR Social Entities and Actions schema, which organizes structured data for social entities (accounts and objects) and user interactions (actions) on the NEAR blockchain. The schema facilitates the integration of social entities and actions into the Hyperfiles environment, ensuring interoperability and composability between different applications using socialDB on NEAR.

## Overview

The Hyperfiles schema uses JSON Schema standard to define the structure of social entities and actions. It includes two main categories: `entities` and `actions`.

### Entities

Entities in the Hyperfiles schema can be accounts or objects owned by accounts. The distinction between accounts and objects is specified through the path used, such as `flowscience.near` for accounts and `flowscience.near/type/{typeName}` for objects. Each entity is stored in socialDB at a unique path, with references to related object paths.

#### Entity Structure

Each entity is represented as a JSON object with the following properties:

- **entityName**: A string that uniquely identifies the entity within the NEAR environment. It corresponds to the account or object name.
- **image**: An object specifying the URL or IPFS CID of an image associated with the entity.
- **description**: A string providing a brief description of the entity.
- **tags**: An object containing key-value pairs where each key is a tag category and the value is the tag itself, providing additional categorization for the entity.
- **metadata**: An object containing additional data about the entity, organized into fields and types.

##### Image

- **url**: The URL where the image is hosted.
- **ipfs_cid**: The IPFS CID if the image is stored on IPFS, providing decentralized storage.

##### Metadata

- **fields**: An array of objects, each representing a field of the entity. Each field object has:
  - **fieldName**: The name of the field.
  - **fieldType**: The type of data stored in the field, which can reference another type defined in the schema.

##### Accounts

- Describes key-value pairs where keys are account identifiers and values are empty strings, used primarily to link different accounts under a single entity.

##### Links

- Specifies URLs associated with the entity, facilitating direct access to additional resources or related content.

### Actions

Actions represent user interactions or system behaviors that target entities. Each action is also stored as a separate object in socialDB.

#### Action Structure

Each action is represented as a JSON object with the following properties:

- **actionType**: A string describing the type of action, such as 'like' or 'follow'.
- **target**: The entity that is the target of the action, specified by its unique identifier.

### Storing and Referencing Types, Fields, and Schemas

Each type, field, and schema within the Hyperfiles framework is stored as a separate object in socialDB at a specific path. These objects include references to related paths, ensuring that the relationships between different data elements are maintained and can be navigated efficiently. This approach supports the dynamic linking of types and fields to create complex composite data structures, enhancing the composability and reusability of data within the NEAR ecosystem.

## Conclusion

The Hyperfiles NEAR Social Entities and Actions schema provides a structured and extendable framework for managing social entities and actions within the NEAR blockchain environment. By defining entities and actions in a standardized format, the schema ensures that data is easily manageable, interoperable, and ready for integration with various applications and services in the NEAR ecosystem.
