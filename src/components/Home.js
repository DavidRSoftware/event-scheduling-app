import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Event from "./Event";
import DatePicker from "react-datepicker";

import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
const _ = require("underscore");
const localizer = BigCalendar.momentLocalizer(moment);

class Home extends Component {
  constructor() {
    super();

    this.state = {
      modal: false,
      calendarModal: false,
      events: [],
      eventName: "",
      eventDate: new Date(),
      idNumber: 1,
      myEventsList: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
        }
      ]
    };
  }

  toggle = () =>
    this.setState({
      modal: !this.state.modal
    });

  calendarToggle = () =>
    this.setState({
      calendarModal: !this.state.calendarModal
    });

  onNameChange = e =>
    this.setState({
      eventName: e.target.value
    });

  onDateChange = date =>
    this.setState({
      eventDate: date
    });

  onSubmit = e => {
    e.preventDefault();
    this.toggle();
    this.setState({
      events: _.sortBy(
        [
          ...this.state.events,
          {
            id: this.state.idNumber,
            name: this.state.eventName,
            date: this.state.eventDate,
            dateDisplay: this.state.eventDate.toLocaleDateString("en-US")
          }
        ],
        "date"
      ).reverse(),
      eventName: "",
      eventDate: new Date(),
      idNumber: this.state.idNumber + 1
    });
  };

  cancelEvent = () => {
    this.setState({ eventName: "" });
    this.setState({ eventDate: new Date() });
    this.toggle();
  };

  render() {
    const { events, eventName, eventDate, myEventsList } = this.state;
    return (
      <div>
        <Row>
          <Col
            sm="7"
            md="5"
            xl="4"
            className="text-center mx-auto h1 bg-secondary p-3 rounded mt-5"
          >
            Event Scheduler
          </Col>
        </Row>
        <Container>
          <Row>
            <Col>
              <Button
                color="primary text-color-grey"
                className="m-4"
                size="lg"
                onClick={this.toggle}
              >
                Add Event
              </Button>
            </Col>
            <Col className="text-right">
              <Button
                color="primary text-color-grey"
                className="m-4"
                size="lg"
                onClick={this.calendarToggle}
              >
                View Calendar
              </Button>
            </Col>
          </Row>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <Form onSubmit={this.onSubmit}>
              <ModalHeader>Add Event</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="eventName">Title</Label>
                  <Input
                    type="text"
                    name="eventName"
                    id="eventName"
                    placeholder="Event Title"
                    value={eventName}
                    onChange={this.onNameChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Date </Label>
                  <div style={datePickerStyle} id="applyFormatting">
                    <DatePicker
                      selected={eventDate}
                      onChange={this.onDateChange}
                      required
                    />
                  </div>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Add Event
                </Button>{" "}
                <Button color="secondary" onClick={this.cancelEvent}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>

          <Modal isOpen={this.state.calendarModal} toggle={this.calendarToggle}>
            <ModalHeader>View Events</ModalHeader>
            <ModalBody>
              <BigCalendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Back
              </Button>
            </ModalFooter>
          </Modal>

          <Row style={HeaderRowStyling}>
            <Col>Event Name</Col>
            <Col>Event Date</Col>
          </Row>
          {events.map(event => (
            <Event key={event.id} name={event.name} date={event.dateDisplay} />
          ))}
        </Container>
      </div>
    );
  }
}

const HeaderRowStyling = {
  padding: "12px",
  fontWeight: "bold",
  backgroundColor: "rgba(0, 0, 0, 0.05)"
};

const datePickerStyle = {
  display: "block"
};

export default Home;
