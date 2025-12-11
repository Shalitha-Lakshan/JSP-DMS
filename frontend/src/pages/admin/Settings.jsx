import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSave, 
  faUndo, 
  faCog,
  faUserShield,
  faBell,
  faLock,
  faGlobe,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'JSP Admin',
    timezone: 'UTC+05:30',
    dateFormat: 'DD/MM/YYYY',
    itemsPerPage: 10,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    lowStockAlerts: true,
    orderConfirmation: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30, // minutes
    passwordExpiry: 90, // days
    failedLoginAttempts: 5,
    
    // Display Settings
    theme: 'light',
    sidebarCollapsed: false,
    compactMode: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic would go here
    console.log('Saving settings:', settings);
    // Show success message
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to their default values?')) {
      // Reset logic would go here
      console.log('Resetting settings to defaults');
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-4">General Settings</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              id="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={settings.timezone}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="UTC-12:00">(UTC-12:00) International Date Line West</option>
              <option value="UTC-11:00">(UTC-11:00) Coordinated Universal Time-11</option>
              <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
              <option value="UTC">(UTC) Coordinated Universal Time</option>
              <option value="UTC+05:30">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
              <option value="UTC+08:00">(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
              Date Format
            </label>
            <select
              id="dateFormat"
              name="dateFormat"
              value={settings.dateFormat}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MMM D, YYYY">MMM D, YYYY</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="itemsPerPage" className="block text-sm font-medium text-gray-700">
              Items Per Page
            </label>
            <select
              id="itemsPerPage"
              name="itemsPerPage"
              value={settings.itemsPerPage}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value={5}>5 items</option>
              <option value={10}>10 items</option>
              <option value={25}>25 items</option>
              <option value={50}>50 items</option>
              <option value={100}>100 items</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-base font-medium text-gray-900 mb-4">Display Settings</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="sidebarCollapsed"
                name="sidebarCollapsed"
                type="checkbox"
                checked={settings.sidebarCollapsed}
                onChange={handleInputChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="sidebarCollapsed" className="font-medium text-gray-700">Collapse sidebar by default</label>
              <p className="text-gray-500">Minimize the sidebar navigation when loading the application</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="compactMode"
                name="compactMode"
                type="checkbox"
                checked={settings.compactMode}
                onChange={handleInputChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="compactMode" className="font-medium text-gray-700">Compact mode</label>
              <p className="text-gray-500">Reduce padding and spacing for a more compact interface</p>
            </div>
          </div>
          
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <div className="mt-2 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Light</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Dark</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={settings.theme === 'system'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">System Default</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="emailNotifications"
                name="emailNotifications"
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={handleInputChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="emailNotifications" className="font-medium text-gray-700">Enable email notifications</label>
              <p className="text-gray-500">Receive important updates and alerts via email</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="lowStockAlerts"
                name="lowStockAlerts"
                type="checkbox"
                checked={settings.lowStockAlerts}
                onChange={handleInputChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                disabled={!settings.emailNotifications}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="lowStockAlerts" className="font-medium text-gray-700">Low stock alerts</label>
              <p className="text-gray-500">Get notified when inventory items are running low</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="orderConfirmation"
                name="orderConfirmation"
                type="checkbox"
                checked={settings.orderConfirmation}
                onChange={handleInputChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                disabled={!settings.emailNotifications}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="orderConfirmation" className="font-medium text-gray-700">Order confirmations</label>
              <p className="text-gray-500">Receive email confirmations for new orders</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-base font-medium text-gray-900 mb-4">In-App Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="pushNotifications"
                name="pushNotifications"
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={handleInputChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="pushNotifications" className="font-medium text-gray-700">Enable in-app notifications</label>
              <p className="text-gray-500">Show notifications within the application</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Some notification settings may be overridden by your browser's notification permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="twoFactorAuth"
                name="twoFactorAuth"
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={handleInputChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">Two-factor authentication</label>
              <p className="text-gray-500">Add an extra layer of security to your account</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  For enhanced security, we recommend enabling two-factor authentication and using a strong, unique password.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-base font-medium text-gray-900 mb-4">Session Settings</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
              Session Timeout
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <select
                id="sessionTimeout"
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never (not recommended)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-gray-500">Time of inactivity before automatic logout</p>
          </div>
          
          <div>
            <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700">
              Password Expiry
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <select
                id="passwordExpiry"
                name="passwordExpiry"
                value={settings.passwordExpiry}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
                <option value={180}>6 months</option>
                <option value={365}>1 year</option>
                <option value={0}>Never expire (not recommended)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-gray-500">How often passwords must be changed</p>
          </div>
          
          <div>
            <label htmlFor="failedLoginAttempts" className="block text-sm font-medium text-gray-700">
              Failed Login Attempts
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <select
                id="failedLoginAttempts"
                name="failedLoginAttempts"
                value={settings.failedLoginAttempts}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value={3}>3 attempts</option>
                <option value={5}>5 attempts</option>
                <option value={10}>10 attempts</option>
                <option value={0}>No limit (not recommended)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-gray-500">Account lockout after failed attempts</p>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-base font-medium text-gray-900 mb-4">Danger Zone</h3>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Delete Account</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      // Delete account logic would go here
                      console.log('Account deletion requested');
                    }
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutSettings = () => (
    <div className="space-y-6">
      <div className="bg-white overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">JSP Admin Dashboard</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Version 1.0.0
            </p>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Build Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  December 10, 2023
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Environment
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Production
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  License
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Proprietary
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Support
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  support@jspsolutions.com
                </dd>
              </div>
            </dl>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Third-party Licenses</h4>
            <div className="bg-gray-50 p-4 rounded-md overflow-auto" style={{ maxHeight: '200px' }}>
              <pre className="text-xs text-gray-500">
                {`MIT License

Copyright (c) 2023 JSP Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            System Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about your system and environment
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Browser
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {navigator.userAgent}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Screen Resolution
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {window.screen.width} × {window.screen.height} pixels
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Color Depth
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {window.screen.colorDepth} bits
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Online Status
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {navigator.onLine ? 'Online' : 'Offline'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your application settings and preferences
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('general')}
              className={`${activeTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FontAwesomeIcon icon={faCog} className="mr-2 h-4 w-4" />
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${activeTab === 'notifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FontAwesomeIcon icon={faBell} className="mr-2 h-4 w-4" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${activeTab === 'security' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2 h-4 w-4" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`${activeTab === 'about' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2 h-4 w-4" />
              About
            </button>
          </nav>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'about' && renderAboutSettings()}
          
          {activeTab !== 'about' && (
            <div className="pt-6 border-t border-gray-200 mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetToDefaults}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faUndo} className="mr-2 h-4 w-4" />
                Reset to Defaults
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
