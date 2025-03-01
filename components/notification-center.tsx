'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { getUnreadNotifications, markNotificationAsRead, type Notification } from '@/lib/notifications';
import { formatDate } from '@/lib/date-utils';

export function NotificationCenter() {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const unreadNotifications = await getUnreadNotifications(user.uid);
        setNotifications(unreadNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleMarkAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      await markNotificationAsRead(user.uid, notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string, status?: string) => {
    if (status === 'success') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (status === 'warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    if (status === 'error') return <XCircle className="h-4 w-4 text-red-500" />;
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-yellow text-xs font-medium text-brand-navy flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-brand-navy">Notifications</h3>
        </div>
        <ScrollArea className="max-h-[400px]">
          {loading ? (
            <div className="p-4 text-center">
              <RefreshCw className="h-5 w-5 animate-spin text-brand-yellow mx-auto" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No new notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type, notification.status)}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={() => notification.id && handleMarkAsRead(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}