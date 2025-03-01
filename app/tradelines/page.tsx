'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Plus,
  DollarSign,
  Percent,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function TradelinesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Tradelines</h1>
          <p className="text-gray-600">Manage your authorized user tradelines</p>
        </div>
        <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Tradeline
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Tradelines</h3>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-brand-navy mb-2">0</div>
          <div className="text-sm text-gray-600">No active tradelines</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Credit Limit</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-brand-navy mb-2">$0</div>
          <div className="text-sm text-gray-600">Combined credit limit</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Average Age</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-brand-navy mb-2">0y 0m</div>
          <div className="text-sm text-gray-600">Average account age</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-brand-navy">Your Tradelines</h2>
          <Button variant="outline" className="text-brand-navy border-brand-navy hover:bg-brand-navy/10">
            View All
          </Button>
        </div>

        <div className="text-center py-12">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Tradelines Found</h3>
          <p className="text-gray-600 mb-6">
            Add your first tradeline to start building credit history
          </p>
          <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Tradeline
          </Button>
        </div>
      </Card>
    </div>
  );
}