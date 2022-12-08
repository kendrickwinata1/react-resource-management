import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "../../event-utils";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import { useState } from "react";
import { v4 as uuid } from "uuid";

const EventItem = ({ info }) => {
	const { event } = info;
	return (
		<div>
			<p>{event.title}</p>
		</div>
	);
};

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

	const handleWeekendsToggle = () => {
		this.setState({
			weekendsVisible: !state.weekendsVisible,
		});
	};

	const handleDateSelect = (selectInfo) => {
		let title = prompt("Please enter a new title for your event");
		let calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection

		if (title) {
			calendarApi.addEvent({
				id: createEventId(),
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
				category: "",
			});
		}
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
		<div className="app">
			<div className="sidebar">
				<div className="sidebar-section">
					<h3>Instructions</h3>
					<ul>
						<li>Select dates and you will be prompted to create a new event</li>
						<li>Drag, drop, and resize events</li>
						<li>Click an event to delete it</li>
					</ul>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Name"
								className="form-input"
							/>
						</Form.Group>

						<Button type="submit" className="button my-3">
							Update
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
			</div>
			<div>
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
					eventContent={(info) => <EventItem info={info} />}
					views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
				/>
			</div>
		</div>
	);
}

export default Homepage;
