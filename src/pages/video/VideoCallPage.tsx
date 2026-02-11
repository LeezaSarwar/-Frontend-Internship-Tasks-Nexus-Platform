import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, MonitorOff, Phone, PhoneOff, Settings, Users, MessageSquare } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';

interface Participant {
  id: string;
  name: string;
  avatarUrl: string;
  isMuted: boolean;
  isVideoOff: boolean;
}

export const VideoCallPage: React.FC = () => {
  const { user } = useAuth();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Mock participants
  const [participants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
      isMuted: false,
      isVideoOff: false
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatarUrl: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random',
      isMuted: true,
      isVideoOff: false
    }
  ]);

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsVideoOn(true);
    setIsAudioOn(true);
    setIsScreenSharing(false);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  if (!isCallActive) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Calls</h1>
          <p className="text-gray-600">Connect with investors and entrepreneurs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Start Call Card */}
          <Card>
            <CardBody className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4">
                <Video size={40} className="text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Start a New Call</h2>
              <p className="text-gray-600 mb-6">Begin a video meeting with your connections</p>
              <Button size="lg" onClick={handleStartCall}>
                Start Call
              </Button>
            </CardBody>
          </Card>

          {/* Scheduled Meetings */}
          <Card>
            <CardBody>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Pitch Review</h3>
                      <p className="text-xs text-gray-600 mt-1">with Sarah Johnson</p>
                      <p className="text-xs text-gray-500 mt-1">Today at 2:00 PM</p>
                    </div>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Investment Discussion</h3>
                      <p className="text-xs text-gray-600 mt-1">with Michael Chen</p>
                      <p className="text-xs text-gray-500 mt-1">Tomorrow at 10:00 AM</p>
                    </div>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Recent Calls */}
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h2>
            <div className="space-y-3">
              {[
                { name: 'Alex Thompson', date: 'Feb 10, 2026', duration: '45 min', type: 'Incoming' },
                { name: 'Emma Wilson', date: 'Feb 9, 2026', duration: '30 min', type: 'Outgoing' },
                { name: 'David Lee', date: 'Feb 8, 2026', duration: '1 hr 15 min', type: 'Incoming' }
              ].map((call, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(call.name)}&background=random`}
                      alt={call.name}
                      size="sm"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{call.name}</h3>
                      <p className="text-xs text-gray-500">{call.date} • {call.duration}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" leftIcon={<Video size={16} />}>
                    Call Again
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Main Video (Self) */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden">
          {isVideoOn ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
              <div className="text-center">
                <Avatar
                  src={user?.avatarUrl || ''}
                  alt={user?.name || 'You'}
                  size="lg"
                  className="mx-auto mb-4"
                />
                <p className="text-white text-lg font-medium">{user?.name} (You)</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
              <div className="text-center">
                <VideoOff size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-300">Camera Off</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full">
            <p className="text-white text-sm">{user?.name} (You)</p>
          </div>
          {!isAudioOn && (
            <div className="absolute top-4 right-4 bg-error-500 p-2 rounded-full">
              <MicOff size={20} className="text-white" />
            </div>
          )}
        </div>

        {/* Participants */}
        {participants.map((participant) => (
          <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
            {!participant.isVideoOff ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary-600 to-secondary-800">
                <div className="text-center">
                  <Avatar
                    src={participant.avatarUrl}
                    alt={participant.name}
                    size="lg"
                    className="mx-auto mb-4"
                  />
                  <p className="text-white text-lg font-medium">{participant.name}</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                <div className="text-center">
                  <VideoOff size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-300">Camera Off</p>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full">
              <p className="text-white text-sm">{participant.name}</p>
            </div>
            {participant.isMuted && (
              <div className="absolute top-4 right-4 bg-error-500 p-2 rounded-full">
                <MicOff size={20} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <div className="text-white text-sm">
              <p className="font-medium">Meeting in Progress</p>
              <p className="text-gray-400 text-xs">3 participants</p>
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant={isAudioOn ? 'outline' : 'outline'}
              size="lg"
              className={`rounded-full ${!isAudioOn ? 'bg-error-500 hover:bg-error-600 text-white border-error-500' : 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'}`}
              onClick={toggleAudio}
            >
              {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
            </Button>

            <Button
              variant={isVideoOn ? 'outline' : 'outline'}
              size="lg"
              className={`rounded-full ${!isVideoOn ? 'bg-error-500 hover:bg-error-600 text-white border-error-500' : 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'}`}
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </Button>

            <Button
              variant={isScreenSharing ? 'outline' : 'outline'}
              size="lg"
              className={`rounded-full ${isScreenSharing ? 'bg-primary-500 hover:bg-primary-600 text-white border-primary-500' : 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'}`}
              onClick={toggleScreenShare}
            >
              {isScreenSharing ? <MonitorOff size={20} /> : <Monitor size={20} />}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full bg-error-500 hover:bg-error-600 text-white border-error-500"
              onClick={handleEndCall}
            >
              <PhoneOff size={20} />
            </Button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare size={18} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              <Users size={18} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              <Settings size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
