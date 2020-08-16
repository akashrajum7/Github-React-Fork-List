import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function MyCard(props) {
  let { name, avatar_url, handleFollow } = props;

  const handleClick = (name) => () => handleFollow(name);

  return (
    <div className="col mb-4">
      <Card className="h100">
        <Card.Img variant="top" src={avatar_url} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button onClick={handleClick(name)} variant="primary">
            Follow
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyCard;
