import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Send, TrendingUp, DollarSign, CreditCard, History, Plus } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'funding';
  amount: number;
  sender?: string;
  receiver?: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const [walletBalance, setWalletBalance] = useState(125000);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 50000,
      status: 'completed',
      date: '2026-02-10',
      description: 'Bank transfer deposit'
    },
    {
      id: '2',
      type: 'funding',
      amount: 25000,
      sender: 'You',
      receiver: 'TechWave AI',
      status: 'completed',
      date: '2026-02-09',
      description: 'Series A investment'
    },
    {
      id: '3',
      type: 'withdraw',
      amount: 10000,
      status: 'completed',
      date: '2026-02-08',
      description: 'Bank account withdrawal'
    },
    {
      id: '4',
      type: 'transfer',
      amount: 5000,
      sender: 'Sarah Johnson',
      receiver: 'You',
      status: 'completed',
      date: '2026-02-07',
      description: 'Payment received'
    },
    {
      id: '5',
      type: 'funding',
      amount: 15000,
      sender: 'You',
      receiver: 'GreenLife Solutions',
      status: 'pending',
      date: '2026-02-11',
      description: 'Seed round investment'
    }
  ]);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      type: 'deposit',
      amount: depositAmount,
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      description: 'Bank transfer deposit'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setWalletBalance(prev => prev + depositAmount);
    toast.success(`Successfully deposited $${depositAmount.toLocaleString()}`);
    setShowDepositModal(false);
    setAmount('');
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (withdrawAmount > walletBalance) {
      toast.error('Insufficient balance');
      return;
    }

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      type: 'withdraw',
      amount: withdrawAmount,
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      description: 'Bank account withdrawal'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setWalletBalance(prev => prev - withdrawAmount);
    toast.success(`Successfully withdrew $${withdrawAmount.toLocaleString()}`);
    setShowWithdrawModal(false);
    setAmount('');
  };

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!recipient.trim()) {
      toast.error('Please enter recipient name');
      return;
    }

    if (transferAmount > walletBalance) {
      toast.error('Insufficient balance');
      return;
    }

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      type: 'transfer',
      amount: transferAmount,
      sender: 'You',
      receiver: recipient,
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      description: 'Transfer to ' + recipient
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setWalletBalance(prev => prev - transferAmount);
    toast.success(`Successfully transferred $${transferAmount.toLocaleString()} to ${recipient}`);
    setShowTransferModal(false);
    setAmount('');
    setRecipient('');
  };

  const handleFundDeal = () => {
    const fundingAmount = parseFloat(amount);
    if (isNaN(fundingAmount) || fundingAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!recipient.trim()) {
      toast.error('Please enter startup name');
      return;
    }

    if (fundingAmount > walletBalance) {
      toast.error('Insufficient balance');
      return;
    }

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      type: 'funding',
      amount: fundingAmount,
      sender: 'You',
      receiver: recipient,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      description: 'Investment in ' + recipient
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setWalletBalance(prev => prev - fundingAmount);
    toast.success(`Successfully funded $${fundingAmount.toLocaleString()} to ${recipient}`);
    setShowFundingModal(false);
    setAmount('');
    setRecipient('');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft size={20} className="text-success-600" />;
      case 'withdraw':
        return <ArrowUpRight size={20} className="text-error-600" />;
      case 'transfer':
        return <Send size={20} className="text-primary-600" />;
      case 'funding':
        return <TrendingUp size={20} className="text-accent-600" />;
      default:
        return <DollarSign size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'gray';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments & Wallet</h1>
          <p className="text-gray-600">Manage your funds and transactions</p>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <CardBody className="py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={24} />
                <p className="text-primary-100">Total Balance</p>
              </div>
              <h2 className="text-4xl font-bold mb-4">
                ${walletBalance.toLocaleString()}
              </h2>
              <p className="text-primary-100 text-sm">
                {user?.role === 'investor' ? 'Available for Investment' : 'Available Balance'}
              </p>
            </div>
            <div className="hidden md:block">
              <CreditCard size={80} className="text-primary-400 opacity-50" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => setShowDepositModal(true)}
        >
          <ArrowDownLeft size={24} className="text-success-600" />
          <span>Deposit</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => setShowWithdrawModal(true)}
        >
          <ArrowUpRight size={24} className="text-error-600" />
          <span>Withdraw</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => setShowTransferModal(true)}
        >
          <Send size={24} className="text-primary-600" />
          <span>Transfer</span>
        </Button>

        {user?.role === 'investor' && (
          <Button
            variant="outline"
            className="h-24 flex-col gap-2"
            onClick={() => setShowFundingModal(true)}
          >
            <TrendingUp size={24} className="text-accent-600" />
            <span>Fund Deal</span>
          </Button>
        )}
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-success-100 rounded-lg mr-3">
                <ArrowDownLeft size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Deposits</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${transactions
                    .filter(t => t.type === 'deposit' && t.status === 'completed')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-error-100 rounded-lg mr-3">
                <ArrowUpRight size={20} className="text-error-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Withdrawals</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${transactions
                    .filter(t => t.type === 'withdraw' && t.status === 'completed')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-lg mr-3">
                <TrendingUp size={20} className="text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Investments</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${transactions
                    .filter(t => t.type === 'funding' && t.status === 'completed')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History size={20} />
            <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
          </div>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sender/Receiver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${
                        transaction.type === 'deposit' || (transaction.type === 'transfer' && transaction.receiver === 'You')
                          ? 'text-success-600'
                          : 'text-gray-900'
                      }`}>
                        {transaction.type === 'deposit' || (transaction.type === 'transfer' && transaction.receiver === 'You') ? '+' : '-'}
                        ${transaction.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.sender && transaction.receiver
                          ? `${transaction.sender} → ${transaction.receiver}`
                          : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(transaction.status)} size="sm">
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Deposit Funds</h2>
              <p className="text-sm text-gray-600 mt-1">Add money to your wallet</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={<DollarSign size={18} />}
                fullWidth
              />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowDepositModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleDeposit}>
                  Deposit
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Withdraw Funds</h2>
              <p className="text-sm text-gray-600 mt-1">Transfer money to your bank account</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-lg font-semibold text-gray-900">${walletBalance.toLocaleString()}</p>
              </div>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={<DollarSign size={18} />}
                fullWidth
              />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowWithdrawModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleWithdraw}>
                  Withdraw
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Transfer Funds</h2>
              <p className="text-sm text-gray-600 mt-1">Send money to another user</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                type="text"
                placeholder="Recipient name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                fullWidth
              />
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={<DollarSign size={18} />}
                fullWidth
              />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowTransferModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleTransfer}>
                  Transfer
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Fund Deal Modal */}
      {showFundingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Fund a Deal</h2>
              <p className="text-sm text-gray-600 mt-1">Invest in a startup</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                type="text"
                placeholder="Startup name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                fullWidth
              />
              <Input
                type="number"
                placeholder="Investment amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={<DollarSign size={18} />}
                fullWidth
              />
              <div className="bg-accent-50 p-3 rounded-lg">
                <p className="text-sm text-accent-800">
                  This investment will be marked as pending until the deal is finalized.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowFundingModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleFundDeal}>
                  Fund Deal
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
