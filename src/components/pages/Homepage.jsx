import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "../../event-utils";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import Message from "../features/Message";
import Loader from "../features/Loader";

function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	);
}

function renderSidebarEvent(event) {
	return (
		<li key={event.id}>
			<b>
				{formatDate(event.start, {
					year: "numeric",
					month: "short",
					day: "numeric",
				})}
			</b>
			<i>{event.title}</i>
		</li>
	);
}

function Homepage() {
	const currentState = {
		weekendsVisible: true,
		currentEvents: [],
	};
	const [events, setEvents] = useState([]);
	const [state, setState] = useState(currentState);
	const [title, setTitle] = useState("");
	const [startDate, setStartDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endDate, setEndDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [category, setCategory] = useState("");
	const [color, setColor] = useState("Green");
	const { handleSubmit } = useForm();
	const calendarRef = React.createRef();
	console.log(calendarRef);

	const handleWeekendsToggle = () => {
		setState({
			weekendsVisible: !state.weekendsVisible,
		});
	};

	const submitForm = () => {
		console.log("submitted");

		const startDateandTime = new Date(
			startDate + " " + startTime + " UTC"
		).toISOString();
		const endDateandTime = new Date(
			endDate + " " + endTime + " UTC"
		).toISOString();
		console.log(startDateandTime);

		console.log(color);

		setEvents([
			...events,
			{
				id: createEventId(),
				title,
				start: startDateandTime,
				end: endDateandTime,
				color: color,
			},
		]);
	};

	useEffect(() => {
		if (category === "Meetings") {
			setColor("Orange");
		} else if (category === "Team Calendar") {
			setColor("Green");
		} else if (category === "Get-together") {
			setColor("Red");
		} else if (category === "Birthdays") {
			setColor("Purple");
		}
	}, [category]);

	const handleDateSelect = (selectInfo) => {
		let title = prompt("Please enter a new title for your event");
		let calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection
		setTitle(title);
		setStartDate(selectInfo.startStr);
		setEndDate(selectInfo.endStr);
	};

	const handleEventClick = (clickInfo) => {
		if (
			window.confirm(
				`Are you sure you want to delete the event '${clickInfo.event.title}'`
			)
		) {
			clickInfo.event.remove();
		}
	};

	const handleEvents = (events) => {
		setState({
			currentEvents: events,
		});
	};

	return (
		<Row>
			<div className="app">
				<Col md={3} className="sidebar">
					<div className="sidebar-section">
						<h3>Instructions</h3>
						<ul>
							<li>
								Select dates and you will be prompted to create a new event
							</li>
							<li>Drag, drop, and resize events</li>
							<li>Click an event to delete it</li>
						</ul>
						<Form onSubmit={handleSubmit(submitForm)}>
							<Form.Group controlId="event-title">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									value={title ? title : ""}
									placeholder="Event Title"
									className="form-input"
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="start-date">
								<Form.Label>Start Date</Form.Label>
								<Form.Control
									type="date"
									value={startDate ? startDate : ""}
									className="form-input"
									onChange={(e) => setStartDate(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="end-time">
								<Form.Label>Start Time</Form.Label>
								<Form.Control
									type="time"
									value={startTime ? startTime : ""}
									className="form-input"
									onChange={(e) => setStartTime(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="end-date">
								<Form.Label>End Date</Form.Label>
								<Form.Control
									type="date"
									value={endDate ? endDate : ""}
									className="form-input"
									onChange={(e) => setEndDate(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="end-time">
								<Form.Label>End Time</Form.Label>
								<Form.Control
									type="time"
									value={endTime ? endTime : ""}
									className="form-input"
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="category">
								<Form.Label>Category</Form.Label>
								<Form.Select
									onChange={(e) => setCategory(e.target.value)}
									variant="success"
									aria-label="Default select example">
									<option value="Team Calendar">Team Calendar</option>
									<option value="Meetings">Meetings</option>
									<option value="Get-together">Get-together</option>
									<option value="Birthdays">Birthdays</option>
								</Form.Select>
							</Form.Group>

							<Button type="submit" className="button my-3">
								Submit
							</Button>
						</Form>
					</div>
					<div className="sidebar-section">
						<label>
							<input
								type="checkbox"
								checked={state.weekendsVisible}
								onChange={handleWeekendsToggle}></input>
							toggle weekends
						</label>
					</div>
					<div className="sidebar-section">
						<h3>All Events ({state.currentEvents.length})</h3>
						<ul>{state.currentEvents.map(renderSidebarEvent)}</ul>
					</div>
				</Col>

				<Col md={9}>
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						headerToolbar={{
							left: "prev,next today",
							center: "title",
							right: "dayGridMonth,timeGridWeek,timeGridDay",
						}}
						initialView="dayGridMonth"
						editable={true}
						selectable={true}
						events={events}
						select={handleDateSelect}
						eventContent={renderEventContent}
						eventClick={handleEventClick}
						eventsSet={handleEvents}
						weekends={state.weekendsVisible}
						initialEvents={INITIAL_EVENTS}
					/>
				</Col>
			</div>
		</Row>
	);
}

export default Homepage;
