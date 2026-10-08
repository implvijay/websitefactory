import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProjectEditor } from './pages/ProjectEditor';
import { Preview } from './pages/Preview';
import { getCurrentUser } from './storage/BrowserStorage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <ProtectedRoute>
              <ProjectEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview/:projectId"
          element={
            <ProtectedRoute>
              <Preview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
