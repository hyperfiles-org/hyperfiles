const Card3D = styled.div`
  perspective: 1500px;
`;

const CardContent = styled.div`
  transform: rotateY(-20deg);
  background-color: #fff;
  color: #000;
  padding: 2rem;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s;

  &:hover {
    transform: rotateY(0deg);
  }
`;

const Button = styled.button`
`;


return (
  <div className="d-flex align-items-center justify-content-center vh-100 bg-gray-100">
    <Card3D>
      <CardContent>
        <h1 className="display-4 font-weight-bold text-black mb-4">
          hyperfiles
        </h1>
        <p className="h5 text-success">organize everything</p>
        <Link to="//*__@appAccount__*//widget/create">
          <Button>create</Button>
        </Link>
      </CardContent>
    </Card3D>
  </div>
);
