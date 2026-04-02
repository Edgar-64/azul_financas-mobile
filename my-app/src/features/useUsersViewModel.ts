'use client';
import { useState, useEffect } from 'react';
import { User } from '../models/User';

export const useUsersViewModel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 800));
      setUsers([
        { id: '1', name: 'Elton', email: 'elton@admin.com', role: 'Admin' },
        { id: '2', name: 'Ta', email: 'exemplo@dev.com', role: 'User' },
        { id: '3', name: 'Teste', email: 'teste@user.com', role: 'User' },
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { users, loading };
};