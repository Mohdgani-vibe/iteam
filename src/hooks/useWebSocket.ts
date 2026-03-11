import { useEffect, useState, useCallback, useRef } from 'react';

export interface ITEvent {
  type: 'SECURITY_ALERT' | 'DEVICE_STATUS' | 'GATEPASS_REQUEST';
  deviceId?: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message?: string;
  status?: 'online' | 'offline';
  employee?: string;
  asset?: string;
  timestamp: string;
}

export function useWebSocket() {
  const [events, setEvents] = useState<ITEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const socket = new WebSocket(`${protocol}//${host}`);

    socket.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setEvents((prev) => [data, ...prev].slice(0, 50));
      } catch (err) {
        console.error('Failed to parse WS message', err);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket Disconnected, retrying in 5s...');
      setTimeout(connect, 5000);
    };

    socket.onerror = (err) => {
      console.error('WebSocket Error', err);
      socket.close();
    };

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
  }, [connect]);

  return { events, isConnected };
}
