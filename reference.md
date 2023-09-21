# EveryFile/EveryJob: Universal File Format Ontology

[composable.files](https://www.notion.so/composable-files-d1ee9dfea5174e57a4b67fca683f4497?pvs=21)

# Summary/Abstract

<aside>
💡 **************What?
— “**A meta-standard for scientific knowledge graphs.”
**************—************** “An eBay item categorization system for scientific file formats (data types).”
— ”A web app containing input query filters plus a ‘drag & drop’ schematic diagram-style tool to build data science pipelines”

**Why?**
1. Knowledge graphs automate data availability with a unified ontology.
— Solves lack of control over data, interoperability, and access to quality data

2a. Files represent nodes in the network of data that is human knowledge.

2b. Apps are the edges that connect inputs and outputs reproducibly given a set of defined initial conditions (instructions, a set of properties with structured variables).

2c. File formats are standards, but there is no standard by which to classify or relate them. 

**Example use cases:**
1. ”Sticky-ends” for PLEX tool configs.
2. Enable algorithmic pricing & fees on [CannaData Market v2](https://www.notion.so/CannaData-Market-v2-aa038a9f156e4ea38884d0727faad82a?pvs=21) 
  — [Algorithmic Price Determination](https://www.notion.so/Algorithmic-Price-Determination-91a6651a6daa4ccb9eb2336cf5288c7b?pvs=21) 

********How?********
1. Parse & aggregate lists from [File Format Databases](https://www.notion.so/File-Format-Databases-b1f4fd9ed6b04825b02eb425590c5c06?pvs=21).
2. Reconcile category membership into a unified ontology of file formats (types).
3. Relate fields that describe the same property (e.g. a DNA sequence in FASTA format vs tabular) found in > 1 file format to enable cross-querying between file formats.
4. Create references between fields within a given type.
5. Demarcate categorizations (can one file format belong to multiple categories?).
6. Publish a v1 “Scientific File Format Ontology” on-chain.

</aside>

---

# Knowledge Graphs

[Building a knowledge graph for biological experiments](https://niklasrindtorff.substack.com/p/building-a-knowledge-graph-for-biological)

[Schema.org - Schema.org](https://schema.org/)

[Democratizing knowledge representation with BioCypher](https://doi.org/10.1038/s41587-023-01848-y)

> “To rationalize efforts across the community, we propose a modular architecture that maximizes reuse of data and code in three ways: input, ontology and output”
> 

[Democratising Knowledge Graphs - BioCypher](https://biocypher.org/tutorial-ontology.html)

---

## Example Use Case in Marketplace Fee Determination

[Store selling fees](https://www.ebay.com/help/selling/fees-credits-invoices/store-fees?id=4809#section3)

---

## Make It Web3

<aside>
🔥 Can we use [everything.dev](http://everything.dev) to create a composable front-end that implements an on-chain type system for scientific file formats and PLEX tool config files?

Composable in the sense that anyone could use the core deployment to:

— Import any data using existing types or easily mapping new formats to types

— Query any public data imported by previous users

— Import a new tool easily without having to PR the main branch?

— Search or fork and easily reuse any tools used by previous users

— Query usage statistics about data and tools

************Goal: #1:************ make all data and tools imported to PLEX fully composable for all users
**Goal #2:** make a no-code interface

</aside>

**Everything:** a type-system that leverages the power of the BOS to introduce a new paradigm in web development

- A multidimensional and fully interoperable schema for anything
- Creates a meta-standard to group like things together
- Makes every app interoperable
- Enables simple creation of new no-code tools
- Tutorial: [creating a vibe](https://www.notion.so/creating-a-vibe-53d4eb564c594388adf567a44a282676?pvs=21)

[everything](https://everything.dev/#/)

[#BOSAcademy: Building Anything with Everything w/ Elliot from Everything.dev](https://youtu.be/DukrdJtZtSU)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cbd4e3ef-b54d-49e8-ad59-bd31c2b8f088/Untitled.png)

## Core Concepts

- **Widgets:** pseudo-react code stored on-chain, interpreted by the specific VM installed in the decentralized gateway being accessed by the user
    - [everything Widget on Near.org Gateway](https://near.org/efiz.near/widget/everything)
    - efiz.near/thing/core
    - everything.view
        - a `Widget` that takes in the `path` and `blockheight` of a `Thing`,then renders it
        - gets data from the `socialDB contract` ~ socialGet(Type: JSON)
    - [**BOS Gateways Official Docs**](https://docs.near.org/bos/tutorial/bos-gateway)
        - [Deploy a Gateway in less than 5 minutes with no code](https://near.org/ndcplug.near/widget/DeployGateway)
        - [Website & DAO Dashboard](https://www.notion.so/Website-DAO-Dashboard-c2f19f19f16a4b3da2ae0260cf141c91?pvs=21) & [**CGD Gateway**](https://ns-gateway-opencann.vercel.app/)
        
- **Things**: `JSON` stored on-chain that can serve as a mutable, generic representation of a `Widget`
    - has a `path` and a `blockHeight`
    - enable gasless widget updates
        - How?`JSON` `Thing` is much smaller than the code for a `Widget`
        - Why?
    
- **Types**: `JSON` stored on-chain that describes the *properties* and *default behavior* of a `Thing`
    - Has a “name”, an “owner”, and a list of “properties”
    - Properties have their own `Type` definitions
    - a `Type` can have properties that follow other `Types`
        - enables recursion, attribution/provenance, and
        - use properties to construct creators to put other data inside of it unique to a `Type`
        
- **Templates**: a `Widget` whose `props` follow the `Type`
    - Configured in the `Thing`
    
- **Plugins**: `type`-specific `Widget` that can interact with a `Thing`
    - Installed by the user and stored in the settings

---

![EveryFile_EveryJob.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2d39bc7f-51ec-4dad-8ea3-9ed8945c761d/EveryFile_EveryJob.png)

### Bonus things

<aside>
🔥 [**How to make a widget that lets any number of users co-author a single data set published to IPFS with any number of conditionally permissioned groups (that themselves grant permissions to perform actions on the data) as a subDAO composed of multiple co-governed data sets](https://zoom.us/rec/play/Has23VFc4K6YVi3MrkP7bGJdIsU_bBF6DALrQAgvDvVbCO1MC3NIl1gcpqP2AUM7MFKQjePlFF4pd3Fb.siXIFgtKf85H9NZl?canPlayFromShare=true&from=share_recording_detail&continueMode=true&iet=p2Y_y76wqD0oL_WWxFAV2peZL5LGHDq5N5NXkhxFNsw.AG.V-g9KO7B3etjvw2ikeBafEVzVQNvUCfY5iy1ny6L5cZ_-ivp9lOSdVGZDY9YCilnPIJa23JqHgAk4YDeIML-3fCDdfMs6rQi-ZBf5ywmBNT--Y8yw0F8BPLq74oHQ7s.P3J20WMRLKEL63N6wCT7aA.Ke455XDKF2btNCLJ&componentName=rec-play&originRequestUrl=https%3A%2F%2Fzoom.us%2Frec%2Fshare%2FFMpqFw9KTJAaTEYTFDXhdU42Z2RYrnAvWmn4ityEh_BFX6X0yX3vTVsdoeYsFUIj.C_M_BnX6XknkjiT8%3Fiet%3Dp2Y_y76wqD0oL_WWxFAV2peZL5LGHDq5N5NXkhxFNsw.AG.V-g9KO7B3etjvw2ikeBafEVzVQNvUCfY5iy1ny6L5cZ_-ivp9lOSdVGZDY9YCilnPIJa23JqHgAk4YDeIML-3fCDdfMs6rQi-ZBf5ywmBNT--Y8yw0F8BPLq74oHQ7s.P3J20WMRLKEL63N6wCT7aA.Ke455XDKF2btNCLJ).**

</aside>

[The answer to life, the universe, and everything](https://news.mit.edu/2019/answer-life-universe-and-everything-sum-three-cubes-mathematics-0910)

https://miro.com/app/board/uXjVMAagN8I=/?share_link_id=306551922473

---

## Make It Chain Agnostic

[#BOSAcademy: BOS Component Design Patterns w/ Manza from Meta Pool](https://youtu.be/IJjoTAIr4Pk)

https://github.com/leomanza/chain-agnostic-bos-workshop

---

<aside>
🔥 [**NEAR BOS Hacks**](https://www.notion.so/634d7b082a1b4068b188f804b92f531a?pvs=21) - August 2023

</aside>

## Next Steps

1. **Upload all curated & processed data to IFPS the map to Types**
    - Awaiting response about free storage from [CO2.storage](http://CO2.storage) given the size of the full dataset
    
2. **Integrate SFTO into a[Decentralized Peer-Review](https://www.notion.so/Decentralized-Peer-Review-c7e5a3638d8c4faabdb6bc7e0782a3cd?pvs=21) process**
    1. Enable composable units of reproducible science
    
3. Onboard users to **SFTO to increase data availability for [CGD-GPT](https://www.notion.so/CGD-GPT-ab784ea8e1a24b1b8c94d081bd524a48?pvs=21)** 
    1. Mapping to Types enables identification and query of new data
    2. Create a simple mass-appeal app & farm engagement

1. Onboard genomics tools and other [Computational Biology](https://www.notion.so/Computational-Biology-9aadfce1c2ec4d008de5039ca63ad5db?pvs=21) packages

1. Finish pre-clinical computational study to identify new putative molecular interactions of over 6,500 unique small molecules identified in cannabis with all known cannabinoid receptors.

https://docs.google.com/presentation/d/1G0k1NGrhU80s7Genu0tmt9bDgNaw4eGaqWyMcjFoW9M/edit?usp=sharing

!https://media.tenor.com/9SJkqYxh_gYAAAAC/stapler-pepe.gif