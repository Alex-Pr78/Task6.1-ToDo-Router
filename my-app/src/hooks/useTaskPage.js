import { useState, useEffect, useCallback } from 'react';
import { useApi, API_URL } from './useApi';

export const useTaskPage = (id) => {
  const { loading, error, setError, request } = useApi();

  const [task, setTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchTask = useCallback(async () => {
    if (!id) return;

    try {
      const data = await request(`${API_URL}/${id}`);
      if (!data || Object.keys(data).length === 0) {
        // Вместо редиректа — показываем страницу 404
        setNotFound(true);
        return;
      }
      setTask(data);
      setEditText(data.title);
      setEditCompleted(data.completed);
      setNotFound(false); // сбрасываем, если вдруг был
    } catch (err) {
      // Если ошибка 404 или пустой ответ — показываем 404
      if (err.message.includes('404') || err.message.includes('Пустой ответ')) {
        setNotFound(true);
      }
      // Другие ошибки можно оставить для отображения
    }
  }, [id, request]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const saveTask = useCallback(async () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      alert('Текст задачи не может быть пустым');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const updated = await request(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmed, completed: editCompleted }),
      });
      setTask(updated);
    } catch {
      // Ошибка уже в setError
    } finally {
      setSaving(false);
    }
  }, [editText, editCompleted, id, request, setError]);

  const deleteTask = useCallback(async () => {
    if (!window.confirm('Удалить задачу?')) return;

    setError(null);
    try {
      await request(`${API_URL}/${id}`, { method: 'DELETE' });
      // Можно навигировать назад или на главную
      // navigate(-1); — навигация из компонента страницы
    } catch {
      // Ошибка уже в setError
    }
  }, [id, request, setError]);

  return {
    task,
    loading,
    error,
    notFound,
    editText,
    setEditText,
    editCompleted,
    setEditCompleted,
    saving,
    saveTask,
    deleteTask,
  };
};
