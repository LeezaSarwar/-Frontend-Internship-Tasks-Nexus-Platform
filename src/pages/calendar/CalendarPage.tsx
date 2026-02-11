import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon, Clock, Users, Video, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

interface Meeting {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'confirmed' | 'pending' | 'availability';
  attendees?: string[];
  description?: string;
}

interface MeetingRequest {
  id: string;
  from: string;
  title: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
}

export const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock meetings data
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Pitch Meeting with TechVentures',
      start: '2026-02-12T10:00:00',
      end: '2026-02-12T11:00:00',
      type: 'confirmed',
      attendees: ['John Investor'],
      description: 'Series A funding discussion'
    },
    {
      id: '2',
      title: 'Available Slot',
      start: '2026-02-13T14:00:00',
      end: '2026-02-13T15:00:00',
      type: 'availability'
    },
    {
      id: '3',
      title: 'Q&A Session - GreenTech Startup',
      start: '2026-02-14T09:00:00',
      end: '2026-02-14T10:00:00',
      type: 'pending',
      attendees: ['Sarah Entrepreneur']
    }
  ]);

  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([
    {
      id: '1',
      from: 'Alex Johnson',
      title: 'Investment Discussion',
      date: '2026-02-15',
      time: '2:00 PM',
      status: 'pending'
    },
    {
      id: '2',
      from: 'Maria Garcia',
      title: 'Partnership Opportunity',
      date: '2026-02-16',
      time: '11:00 AM',
      status: 'pending'
    }
  ]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setShowAddSlotModal(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    alert(`Meeting: ${event.title}\nTime: ${event.start.toLocaleString()}`);
  };

  const handleAcceptRequest = (requestId: string) => {
    setMeetingRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleDeclineRequest = (requestId: string) => {
    setMeetingRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'declined' } : req
      )
    );
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'confirmed':
        return '#22C55E';
      case 'pending':
        return '#F59E0B';
      case 'availability':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const calendarEvents = meetings.map(meeting => ({
    id: meeting.id,
    title: meeting.title,
    start: meeting.start,
    end: meeting.end,
    backgroundColor: getEventColor(meeting.type),
    borderColor: getEventColor(meeting.type)
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Meeting Calendar</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your schedule and availability</p>
        </div>
        <Button
          leftIcon={<Clock size={18} />}
          onClick={() => setShowAddSlotModal(true)}
          className="w-full sm:w-auto shrink-0"
          size="md"
        >
          <span className="block sm:hidden">Add Slot</span>
          <span className="hidden sm:block">Add Availability</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next',
                  center: 'title',
                  right: 'today'
                }}
                views={{
                  timeGridWeek: {
                    titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
                  }
                }}
                events={calendarEvents}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                height="auto"
                contentHeight="auto"
                aspectRatio={1.5}
              />
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Legend</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-success-500"></div>
                <span className="text-sm text-gray-700">Confirmed Meetings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-warning-500"></div>
                <span className="text-sm text-gray-700">Pending Requests</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-primary-500"></div>
                <span className="text-sm text-gray-700">Available Slots</span>
              </div>
            </CardBody>
          </Card>

          {/* Meeting Requests */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Meeting Requests</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              {meetingRequests.filter(req => req.status === 'pending').length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No pending requests</p>
              ) : (
                meetingRequests
                  .filter(req => req.status === 'pending')
                  .map(request => (
                    <div key={request.id} className="p-3 bg-gray-50 rounded-lg space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{request.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">From: {request.from}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <CalendarIcon size={14} />
                          <span>{request.date}</span>
                          <Clock size={14} className="ml-2" />
                          <span>{request.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          leftIcon={<CheckCircle size={16} />}
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-error-600 hover:text-error-700"
                          leftIcon={<XCircle size={16} />}
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </CardBody>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Upcoming Meetings</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              {meetings
                .filter(m => m.type === 'confirmed' && new Date(m.start) > new Date())
                .slice(0, 3)
                .map(meeting => (
                  <div key={meeting.id} className="p-3 bg-success-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900">{meeting.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                      <Clock size={14} />
                      <span>{new Date(meeting.start).toLocaleString()}</span>
                    </div>
                    {meeting.attendees && (
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                        <Users size={14} />
                        <span>{meeting.attendees.join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
