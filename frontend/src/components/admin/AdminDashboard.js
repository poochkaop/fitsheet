import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Activity,
  UserPlus,
  Mail,
  Phone,
  Clock
} from 'lucide-react';
import { mockUsers, mockPayments } from '../../mock/mockData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  // Mock admin stats
  const adminStats = {
    totalMembers: 124,
    paidMembers: 89,
    totalRevenue: 17711, // 89 * 199
    activeWorkouts: 45,
    todaySignups: 3,
    monthlyGrowth: 12.5
  };

  const filteredMembers = mockUsers.members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentPayments = mockPayments.slice(0, 5);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'members', label: 'Members', icon: <Users className="w-4 h-4" /> },
    { key: 'payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400">Welcome back, {user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={logout}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/5 rounded-lg p-1 backdrop-blur-xl">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 ${activeTab === tab.key 
                ? "bg-purple-500 hover:bg-purple-600 text-white" 
                : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Members</p>
                      <p className="text-2xl font-bold text-white">{adminStats.totalMembers}</p>
                      <p className="text-green-400 text-sm">+{adminStats.todaySignups} today</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-500/20">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Paid Members</p>
                      <p className="text-2xl font-bold text-white">{adminStats.paidMembers}</p>
                      <p className="text-gray-400 text-sm">{Math.round((adminStats.paidMembers / adminStats.totalMembers) * 100)}% conversion</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-500/20">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-white">₹{adminStats.totalRevenue.toLocaleString()}</p>
                      <p className="text-green-400 text-sm">+{adminStats.monthlyGrowth}% this month</p>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-500/20">
                      <DollarSign className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Workouts</p>
                      <p className="text-2xl font-bold text-white">{adminStats.activeWorkouts}</p>
                      <p className="text-gray-400 text-sm">In last 24h</p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-500/20">
                      <Activity className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Recent Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockUsers.members.slice(0, 5).map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{member.name}</h4>
                          <p className="text-gray-400 text-sm">{member.email}</p>
                        </div>
                      </div>
                      <Badge className={member.isPaid 
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }>
                        {member.isPaid ? 'Paid' : 'Free'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Recent Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPayments.map((payment, index) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{payment.userName}</h4>
                        <p className="text-gray-400 text-sm">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">₹{payment.amount}</p>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Members List */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  All Members ({filteredMembers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{member.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {member.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {member.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {member.profile && (
                            <div className="text-right text-sm">
                              <p className="text-gray-400">Goal: <span className="text-white">{member.profile.goal?.replace('_', ' ')}</span></p>
                              <p className="text-gray-400">Level: <span className="text-white">{member.profile.activityLevel}</span></p>
                            </div>
                          )}
                          <Badge className={member.isPaid 
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                          }>
                            {member.isPaid ? 'Premium' : 'Free'}
                          </Badge>
                          <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <div key={payment.id} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{payment.userName}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {payment.date}
                              </span>
                              <span>ID: {payment.razorpayId}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-xl">₹{payment.amount}</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">App Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-white font-medium mb-2">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Server Status</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Database</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment Gateway</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <h3 className="text-white font-medium mb-2">App Configuration</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Membership Price</span>
                      <span className="text-white">₹199</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Workout Duration</span>
                      <span className="text-white">60 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reminder Notifications</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;