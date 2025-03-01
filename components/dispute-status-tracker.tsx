'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Send,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

interface DisputeStatusTrackerProps {
  status: 'draft' | 'sent' | 'in_review' | 'completed';
  outcome?: 'success' | 'partial' | 'failure';
  dates: {
    created?: Date;
    sent?: Date;
    responded?: Date;
    completed?: Date;
  };
}

export function DisputeStatusTracker({ status, outcome, dates }: DisputeStatusTrackerProps) {
  const getProgress = () => {
    switch (status) {
      case 'draft': return 25;
      case 'sent': return 50;
      case 'in_review': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'draft':
        return (
          <Badge variant="outline">
            <FileText className="h-4 w-4 mr-1" />
            Draft
          </Badge>
        );
      case 'sent':
        return (
          <Badge className="bg-blue-50 text-blue-600">
            <Send className="h-4 w-4 mr-1" />
            Sent
          </Badge>
        );
      case 'in_review':
        return (
          <Badge className="bg-yellow-50 text-yellow-600">
            <Clock className="h-4 w-4 mr-1" />
            In Review
          </Badge>
        );
      case 'completed':
        if (outcome === 'success') {
          return (
            <Badge className="bg-green-50 text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Success
            </Badge>
          );
        } else if (outcome === 'partial') {
          return (
            <Badge className="bg-yellow-50 text-yellow-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Partial Success
            </Badge>
          );
        } else {
          return (
            <Badge className="bg-red-50 text-red-600">
              <XCircle className="h-4 w-4 mr-1" />
              Failed
            </Badge>
          );
        }
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-900">Dispute Status</h3>
        {getStatusBadge()}
      </div>

      <div className="space-y-6">
        <div>
          <Progress value={getProgress()} className="h-2" />
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="text-center">
              <div className={`text-sm font-medium ${status === 'draft' ? 'text-brand-navy' : 'text-gray-600'}`}>
                Draft
              </div>
              <div className="text-xs text-gray-500">
                {dates.created ? formatDate(dates.created) : '--'}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-sm font-medium ${status === 'sent' ? 'text-brand-navy' : 'text-gray-600'}`}>
                Sent
              </div>
              <div className="text-xs text-gray-500">
                {dates.sent ? formatDate(dates.sent) : '--'}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-sm font-medium ${status === 'in_review' ? 'text-brand-navy' : 'text-gray-600'}`}>
                In Review
              </div>
              <div className="text-xs text-gray-500">
                {dates.responded ? formatDate(dates.responded) : '--'}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-sm font-medium ${status === 'completed' ? 'text-brand-navy' : 'text-gray-600'}`}>
                Completed
              </div>
              <div className="text-xs text-gray-500">
                {dates.completed ? formatDate(dates.completed) : '--'}
              </div>
            </div>
          </div>
        </div>

        {status === 'sent' && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <div className="text-sm font-medium text-blue-900">
                  Response Expected
                </div>
                <div className="text-sm text-blue-700">
                  Within 30 days of submission
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'completed' && outcome && (
          <div className={`rounded-lg p-4 ${
            outcome === 'success' ? 'bg-green-50' :
            outcome === 'partial' ? 'bg-yellow-50' :
            'bg-red-50'
          }`}>
            <div className="flex items-center">
              {outcome === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
              ) : outcome === 'partial' ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <div>
                <div className={`text-sm font-medium ${
                  outcome === 'success' ? 'text-green-900' :
                  outcome === 'partial' ? 'text-yellow-900' :
                  'text-red-900'
                }`}>
                  {outcome === 'success' ? 'Dispute Successful' :
                   outcome === 'partial' ? 'Partially Successful' :
                   'Dispute Failed'}
                </div>
                <div className={`text-sm ${
                  outcome === 'success' ? 'text-green-700' :
                  outcome === 'partial' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {outcome === 'success' ? 'Item removed from credit report' :
                   outcome === 'partial' ? 'Some items updated/removed' :
                   'Item verified as accurate'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}