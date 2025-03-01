'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  RefreshCw,
  FileText,
  Send,
} from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { getDisputeRounds, getDisputeRoundStats } from '@/lib/dispute-rounds';

interface DisputeRoundTrackerProps {
  userId: string;
  disputeId: string;
  onViewRound?: (roundId: string) => void;
}

export function DisputeRoundTracker({
  userId,
  disputeId,
  onViewRound
}: DisputeRoundTrackerProps) {
  const [loading, setLoading] = React.useState(true);
  const [rounds, setRounds] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchRounds = async () => {
      try {
        const [fetchedRounds, roundStats] = await Promise.all([
          getDisputeRounds(userId, disputeId),
          getDisputeRoundStats(userId)
        ]);
        setRounds(fetchedRounds);
        setStats(roundStats);
      } catch (error) {
        console.error('Error fetching rounds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRounds();
  }, [userId, disputeId]);

  const getStatusBadge = (status: string, outcome?: string) => {
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
      case 'waiting':
        return (
          <Badge className="bg-yellow-50 text-yellow-600">
            <Clock className="h-4 w-4 mr-1" />
            Waiting
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
              Partial
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

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-brand-yellow" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-brand-navy" />
          <h3 className="font-medium text-gray-900">Dispute Rounds</h3>
        </div>
        {stats && (
          <div className="flex items-center space-x-4 text-sm">
            <div>
              <span className="text-gray-600">Success Rate:</span>
              <span className="font-medium ml-1">
                {Math.round((stats.successfulRounds / stats.totalRounds) * 100)}%
              </span>
            </div>
            <div>
              <span className="text-gray-600">Avg. Rounds:</span>
              <span className="font-medium ml-1">
                {stats.averageRoundsPerDispute.toFixed(1)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {rounds.map((round, index) => (
          <Card
            key={round.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onViewRound?.(round.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-brand-navy">
                    R{round.roundNumber}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{round.strategy}</div>
                  <div className="text-sm text-gray-600">
                    {formatDate(round.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusBadge(round.status, round.outcome)}
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {round.status === 'completed' && round.responseAnalysis && (
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <strong>Analysis:</strong> {round.responseAnalysis.findings[0]}
                </div>
                {round.nextSteps && round.nextSteps.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    <strong>Next Step:</strong> {round.nextSteps[0]}
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}

        {rounds.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No dispute rounds started yet
          </div>
        )}
      </div>

      {rounds.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{rounds.length} of 12 Rounds</span>
          </div>
          <Progress
            value={(rounds.length / 12) * 100}
            className="h-2"
          />
        </div>
      )}
    </Card>
  );
}