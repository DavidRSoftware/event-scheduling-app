import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class Event extends Component {
  render() {
    const { name, date } = this.props;
    return (
      <div>
        <Row style={RowStyling}>
          <Col>{name}</Col>
          <Col>{date}</Col>
        </Row>
      </div>
    );
  }
}

const RowStyling = {
  padding: "12px"
};

export default Event;
