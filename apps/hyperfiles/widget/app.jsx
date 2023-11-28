const Card3D = styled.div`
  perspective: 1500px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CardContent = styled.div`
  background-color: #fff;
  color: #000;
  padding: 2rem;
`;

const Button = styled.button``;

const [showCover, setShowCover] = useState(true);

return (
  <div className="vh-100 w-100 bg-gray-100">
    {showCover && (
      <Card3D>
        <CardContent>
          <h1
            className="display-4 font-weight-bold text-black mb-2"
            style={{
              textShadow:
                "1px 1px 1px rgba(0, 0, 0, 0.5), 4px 4px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            hyperfiles
          </h1>
          <p
            className="h5 text-success mb-4"
            style={{
              textShadow:
                "1px 1px 1px rgba(0, 0, 0, 0.5), 2px 2px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            organize everything
          </p>
        </CardContent>
        <Button onClick={() => setShowCover(false)}>go</Button>
      </Card3D>
    )}
    <div style={{ display: showCover ? "none" : "block" }} className="mt-4">
      <Widget
        src="/*__@appAccount__*//widget/hyperfile.index"
        props={{ creatorId: context.accountId }}
      />
    </div>
  </div>
);
