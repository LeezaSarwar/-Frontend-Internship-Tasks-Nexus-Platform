import React, { useState } from 'react';
import { User, Lock, Bell, Globe, Palette, CreditCard, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  if (!user) return null;

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-error-500' };
    if (strength <= 3) return { strength, label: 'Fair', color: 'bg-warning-500' };
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-primary-500' };
    return { strength, label: 'Strong', color: 'bg-success-500' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handlePasswordChange = () => {
    if (!password) {
      toast.error('Please enter your current password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordStrength.strength < 3) {
      toast.error('Password is too weak. Please use a stronger password.');
      return;
    }
    toast.success('Password updated successfully!');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEnable2FA = () => {
    setShowOtpModal(true);
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join('');
    if (code.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }
    setTwoFactorEnabled(true);
    setShowOtpModal(false);
    setOtpCode(['', '', '', '', '', '']);
    toast.success('Two-factor authentication enabled successfully!');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar src={user.avatarUrl} alt={user.name} size="xl" />
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="mt-2 text-sm text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" defaultValue={user.name} />
                <Input label="Email" type="email" defaultValue={user.email} />
                <Input label="Role" value={user.role} disabled />
                <Input label="Location" defaultValue="San Francisco, CA" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={4}
                  defaultValue={user.bio}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardBody>
          </Card>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Security Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-primary-600" />
                  <h2 className="text-lg font-medium text-gray-900">Security Overview</h2>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {twoFactorEnabled ? (
                        <CheckCircle size={20} className="text-success-600" />
                      ) : (
                        <XCircle size={20} className="text-error-600" />
                      )}
                      <span className="text-sm font-medium text-gray-900">2FA</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {twoFactorEnabled ? 'Enabled' : 'Not enabled'}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={20} className="text-success-600" />
                      <span className="text-sm font-medium text-gray-900">Password</span>
                    </div>
                    <p className="text-xs text-gray-600">Strong password set</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={20} className="text-success-600" />
                      <span className="text-sm font-medium text-gray-900">Email</span>
                    </div>
                    <p className="text-xs text-gray-600">Verified</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      Authenticator App
                    </h3>
                    <p className="text-sm text-gray-600">
                      Use an authentication app to generate one-time codes
                    </p>
                    <Badge variant={twoFactorEnabled ? 'success' : 'error'} className="mt-2">
                      {twoFactorEnabled ? 'Enabled' : 'Not Enabled'}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    onClick={twoFactorEnabled ? () => setTwoFactorEnabled(false) : handleEnable2FA}
                  >
                    {twoFactorEnabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>

                {twoFactorEnabled && (
                  <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-success-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-success-900">
                          Two-factor authentication is active
                        </p>
                        <p className="text-sm text-success-700 mt-1">
                          Your account is protected with an additional security layer
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                  <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password strength:</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength.strength <= 2 ? 'text-error-600' :
                          passwordStrength.strength <= 3 ? 'text-warning-600' :
                          passwordStrength.strength <= 4 ? 'text-primary-600' :
                          'text-success-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          {newPassword.length >= 8 ? (
                            <CheckCircle size={14} className="text-success-600" />
                          ) : (
                            <XCircle size={14} className="text-gray-400" />
                          )}
                          <span className={newPassword.length >= 8 ? 'text-success-600' : 'text-gray-600'}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? (
                            <CheckCircle size={14} className="text-success-600" />
                          ) : (
                            <XCircle size={14} className="text-gray-400" />
                          )}
                          <span className={/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'text-success-600' : 'text-gray-600'}>
                            Upper and lowercase letters
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {/\d/.test(newPassword) ? (
                            <CheckCircle size={14} className="text-success-600" />
                          ) : (
                            <XCircle size={14} className="text-gray-400" />
                          )}
                          <span className={/\d/.test(newPassword) ? 'text-success-600' : 'text-gray-600'}>
                            At least one number
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {/[^a-zA-Z0-9]/.test(newPassword) ? (
                            <CheckCircle size={14} className="text-success-600" />
                          ) : (
                            <XCircle size={14} className="text-gray-400" />
                          )}
                          <span className={/[^a-zA-Z0-9]/.test(newPassword) ? 'text-success-600' : 'text-gray-600'}>
                            At least one special character
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {confirmPassword && newPassword !== confirmPassword && (
                  <div className="flex items-center gap-2 text-sm text-error-600">
                    <AlertCircle size={16} />
                    <span>Passwords do not match</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={handlePasswordChange}>Update Password</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600">This section is under development</p>
            </CardBody>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings navigation */}
        <Card className="lg:col-span-1">
          <CardBody className="p-2">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Lock size={18} className="mr-3" />
                Security
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bell size={18} className="mr-3" />
                Notifications
              </button>

              <button
                onClick={() => setActiveTab('language')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'language'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Globe size={18} className="mr-3" />
                Language
              </button>

              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'appearance'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Palette size={18} className="mr-3" />
                Appearance
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'billing'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                Billing
              </button>
            </nav>
          </CardBody>
        </Card>

        {/* Main settings content */}
        <div className="lg:col-span-3">{renderTabContent()}</div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Enable Two-Factor Authentication</h2>
              <p className="text-sm text-gray-600 mt-1">Enter the 6-digit code from your authenticator app</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex justify-center gap-2">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-primary-500"
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowOtpModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleVerifyOtp}>
                  Verify & Enable
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
