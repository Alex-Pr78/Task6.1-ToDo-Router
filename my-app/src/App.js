import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TodosList } from './TodosList';
import { TaskPage } from './TaskPage';
import { NotFound } from './NotFound';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TodosList />} />
      <Route path="/task/:id" element={<TaskPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </BrowserRouter>
);