const data = props.data || {};
const type = props.type || "";
const typeSrc = props.typeSrc || "every.near";
const buildEdges = props.buildEdges;
const template = props.template || "";
const thingId = props.thingId;
//const defaultView = props.defaultView || "CREATE_THING";

if (type !== "") {
  const parts = type.split("/");
  typeSrc = parts[0];
}

const Container = styled.div`
    display: flex;
  `;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #FAFAFA;
  width: auto;
  z-index: 50;
  min-width: 400px;
  border: 1px solid;
  border-radius: 0.5rem;
  @media (max-width: 768px) {
        min-width: 100%;  // Take up full width on mobile
        box-sizing: border-box;  // Ensure padding and borders are included in the width calculation
}
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 20px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    gap: 8px;
    background-color: #f2f2f2;
    padding: 30px;
  `;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-self: flex-start;
  width: 100%;
`;

const Button = styled.button`
  background-color:#4472c4;
  color: white;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100px;  // specific width
  `;

const SecondaryButton = styled.button`
  border-radius: 0.25rem;
  width: 100px;  // specific width
  background-color: transparent; 
  color: #4472c4;
  border: 1px solid #4472c4;
  `;

const LeftPanelItem = styled.div`
    padding: 8px;
    background-color: #ccc;
    color: white;
    border-radius: 4px;
  `;

const Select = styled.select`
  `;

const Label = styled.label`
`;

const Input = styled.input`
  `;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  min-width: 500px;
  height: 100%;
  overflow: scroll;
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

State.init({
  data,
  config: data,
  isModalOpen: false,
  typeSrc: "flowscience.near",
  selectedType: "flowscience.near/type/field",
  view: defaultView,
  isPreview: false, //"TEMPLATE",
  template: "efiz.near/widget/every.type.metadata",
  templateVal: template,
  thingId,
});

const fieldNameOnChange = (value) => {
  State.update({ data: { ...state.data, ...value } });
};

const fieldNameApply = () => {
  State.update({
    config: state.data,
    isPreview: !state.isPreview,
    //template: state.templateVal,
  });
  // set the props for the main content
};

const fieldNameSave = () => {
  // create the thing
  State.update({ isModalOpen: false });
  const thingId = state.data.fieldName;
  //state.thingId || Math.random();
  let edges = [];
  if (buildEdges) {
    const newPath = `${context.accountId}/thing/${thingId}`;
    edges = buildEdges(newPath, state.selectedType);
  }

  const data = {
    thing: {
      field: {
        [thingId]: JSON.stringify({
          data: state.config,
          template: {
            src: state.template,
          },
          type: state.selectedType,
        }),
      },
    },
    index: {
      thing: JSON.stringify({
        key: thingId,
        value: {
          type: state.selectedType,
        },
      }),
    },
  };
  if (edges.length) {
    data.index.edge = JSON.stringify(edges);
  }
  Social.set(data, {
    onCommit: () => {
      State.update({
        data: {},
        isModalOpen: false,
        config: undefined,
      });
    },
    onCancel: () => {
      State.update({
        isModalOpen: false,
      });
    },
  });
};

const fieldNameTypeChange = (e) => {
  State.update({ selectedType: e.target.value, templateVal: "", data: {} });
};

const fieldNameProfileSave = () => {
  State.update({
    config: state.data,
  });
  //check if fieldName is present
  // in future check if fieldName is unique
  if (!state.data.fieldName) {
    console.log("Needs fieldName.");
    //Alert does not work.
  } else {
    //State.update({ isModalOpen: true });
    fieldNameSave();
  }
};

//  <MainContent>
//       <>
//         {(state.isPreview && (
//           <Widget src={state.template} props={{ data: state.config }} />
//         )) || <CenteredDiv>Click on Preview to see your profile.</CenteredDiv>}
//       </>
//     </MainContent>

return (
  <Container>
    <SidePanel>
      <>
        <FormContainer>
          {state.isPreview ? (
            <Widget src={state.template} props={{ data: state.config }} />
          ) : (
            <Widget
              src="efiz.near/widget/create"
              props={{
                item: {
                  type: state.selectedType,
                  value: state.data,
                },
                onChange: fieldNameOnChange,
              }}
            />
          )}
        </FormContainer>
        <Footer>
          <Button
            //onClick={() => State.update({ isModalOpen: true })}
            onClick={() => fieldNameProfileSave()}
            disabled={state.config === undefined}
          >
            Save
          </Button>
          <SecondaryButton onClick={() => fieldNameApply()}>
            {state.isPreview ? "Edit" : "Preview"}
          </SecondaryButton>
        </Footer>
      </>
    </SidePanel>
    {state.isModalOpen && (
      <ModalOverlay>
        <ModalContent>
          <ModalTitle>Create Profile</ModalTitle>
          <Widget
            src="efiz.near/widget/Every.Raw.View"
            props={{
              value: { data: state.config, template: { src: state.template } },
            }}
          />
          <Button onClick={fieldNameSave}>Save</Button>
          <Button onClick={() => State.update({ isModalOpen: false })}>
            Cancel
          </Button>
        </ModalContent>
      </ModalOverlay>
    )}
  </Container>
);
