
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transaction } from './VendingMachine';
import { History, Clock, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-slate-800 border-slate-600 h-fit">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <History className="w-5 h-5" />
          <span>Transaction History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No transactions yet</p>
            <p className="text-sm">Purchase something to see history</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="bg-slate-900 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-medium">{transaction.item}</h4>
                        <div className="flex items-center text-xs text-slate-400 space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(transaction.timestamp)}</span>
                          <span>{formatTime(transaction.timestamp)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">₹{transaction.price}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <div className="flex items-center space-x-1">
                          <ArrowDownLeft className="w-3 h-3 text-red-400" />
                          <span>Paid:</span>
                        </div>
                        <span>₹{transaction.amountPaid}</span>
                      </div>
                      
                      {transaction.change > 0 && (
                        <div className="flex items-center justify-between text-slate-300">
                          <div className="flex items-center space-x-1">
                            <ArrowUpRight className="w-3 h-3 text-blue-400" />
                            <span>Change:</span>
                          </div>
                          <span>₹{transaction.change}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
