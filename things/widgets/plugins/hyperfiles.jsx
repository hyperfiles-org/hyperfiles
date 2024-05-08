const attestations = require('hyperfile-attestations')  // eslint-disable-line 
const { HyperfileWidget } = require('hyperfile-attestations')  // eslint-disable-line


return (
    <HyperfileWidget
        {...props}
        attestations={attestations}
    />  
)