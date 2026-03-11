import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import EmployeePortal from './pages/EmployeePortal';
import Chatbot from './components/Chatbot';
import DevicesList from './pages/DevicesList';
import DeviceDetail from './pages/DeviceDetail';
import TicketsList from './pages/TicketsList';
import TicketDetail from './pages/TicketDetail';
import AlertsList from './pages/AlertsList';
import StockList from './pages/StockList';
import GatepassList from './pages/GatepassList';
import GatepassDetail from './pages/GatepassDetail';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import AssetAssignments from './pages/AssetAssignments';
import Requirements from './pages/Requirements';
import DeploymentGroups from './pages/DeploymentGroups';
import Automation from './pages/Automation';
import PatchManagement from './pages/PatchManagement';
import ScriptsPage from './pages/ScriptsPage';
import InstallAgent from './pages/InstallAgent';
import Architecture from './pages/Architecture';
import Devices from './pages/Devices';

function ProtectedRoute({ children, roles }: { children: React.ReactNode, roles?: string[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-level-bg">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={user.role === 'employee' ? '/employee' : '/dashboard'} replace />;
  }

  return (
    <Layout>
      {children}
      <Chatbot />
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute roles={['super-admin', 'it-team']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/devices/*" 
            element={
              <ProtectedRoute roles={['super-admin', 'it-team']}>
                <DevicesList />
              </ProtectedRoute>
            } 
          />
          <Route path="/devices/:id" element={<ProtectedRoute roles={['super-admin', 'it-team']}><DeviceDetail /></ProtectedRoute>} />
          
          <Route 
            path="/tickets/*" 
            element={
              <ProtectedRoute roles={['super-admin', 'it-team', 'employee']}>
                <TicketsList />
              </ProtectedRoute>
            } 
          />
          <Route path="/tickets/:id" element={<ProtectedRoute roles={['super-admin', 'it-team', 'employee']}><TicketDetail /></ProtectedRoute>} />
          
          <Route path="/alerts/*" element={<ProtectedRoute roles={['super-admin', 'it-team', 'employee']}><AlertsList /></ProtectedRoute>} />
          <Route path="/stock/*" element={<ProtectedRoute roles={['super-admin', 'it-team']}><StockList /></ProtectedRoute>} />
          <Route path="/gatepasses/*" element={<ProtectedRoute roles={['super-admin', 'it-team']}><GatepassList /></ProtectedRoute>} />
          <Route path="/gatepasses/:id" element={<ProtectedRoute roles={['super-admin', 'it-team']}><GatepassDetail /></ProtectedRoute>} />
          <Route path="/employees/*" element={<ProtectedRoute roles={['super-admin', 'it-team']}><Employees /></ProtectedRoute>} />
          <Route path="/departments" element={<ProtectedRoute roles={['super-admin', 'it-team']}><Departments /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute roles={['super-admin', 'it-team']}><AssetAssignments /></ProtectedRoute>} />
          <Route path="/requirements" element={<ProtectedRoute roles={['super-admin', 'it-team']}><Requirements /></ProtectedRoute>} />
          <Route path="/deployment-groups" element={<ProtectedRoute roles={['super-admin', 'it-team']}><DeploymentGroups /></ProtectedRoute>} />
          <Route path="/automation" element={<ProtectedRoute roles={['super-admin', 'it-team']}><Automation /></ProtectedRoute>} />
          <Route path="/patch-management/*" element={<ProtectedRoute roles={['super-admin', 'it-team']}><PatchManagement /></ProtectedRoute>} />
          <Route path="/scripts" element={<ProtectedRoute roles={['super-admin', 'it-team']}><ScriptsPage /></ProtectedRoute>} />
          <Route path="/install-agent" element={<ProtectedRoute roles={['super-admin', 'it-team']}><InstallAgent /></ProtectedRoute>} />
          <Route path="/architecture" element={<ProtectedRoute roles={['super-admin', 'it-team']}><Architecture /></ProtectedRoute>} />
          <Route path="/devices" element={<ProtectedRoute roles={['super-admin', 'it-team']}><Devices /></ProtectedRoute>} />

          <Route 
            path="/users" 
            element={
              <ProtectedRoute roles={['super-admin']}>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/employee" 
            element={
              <ProtectedRoute roles={['employee']}>
                <EmployeePortal />
              </ProtectedRoute>
            } 
          />

          {/* Fallbacks */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route 
            path="*" 
            element={
              <ProtectedRoute>
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                  <h2 className="text-4xl font-bold text-white">404</h2>
                  <p className="text-xl">This module is currently under development.</p>
                  <button 
                    onClick={() => window.history.back()}
                    className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-lg transition-all"
                  >
                    Go Back
                  </button>
                </div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
