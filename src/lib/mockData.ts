
// Types
export interface Intermediary {
  id: string;
  name: string;
  companyName: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  panNumber: string;
  gstNumber: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  establishedYear: number;
  onboardedDate: string;
}

export interface BankCredit {
  id: string;
  date: string;
  amount: number;
  lenderName: string;
  transactionId: string;
  description: string;
}

export interface PerformanceMetric {
  month: string;
  leadsReferred: number;
  targetLeads: number;
  leadsConverted: number;
  amountDisbursed: number;
  targetDisbursement: number;
  onTimeAccounts: number;
  totalAccounts: number;
  dpd30Accounts: number;
  dpd60Accounts: number;
  dpd90Accounts: number;
  npaAccounts: number;
}

// Mock Data
export const getIntermediaryDetails = (): Intermediary => {
  return {
    id: "INT-2023-001",
    name: "Exemplar Financial Services",
    companyName: "Exemplar Financial Services Pvt Ltd",
    type: "DSA",
    contactPerson: "Rahul Sharma",
    email: "rahul@exemplarfinancial.com",
    phone: "9876543210",
    address: "504, Business Tower, Financial District",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    panNumber: "ABCDE1234F",
    gstNumber: "27ABCDE1234F1Z5",
    accountNumber: "12345678901",
    ifscCode: "SBIN0001234",
    bankName: "State Bank of India",
    branchName: "Financial District Branch",
    establishedYear: 2015,
    onboardedDate: "2023-03-15"
  };
};

export const getBankCreditHistory = (): BankCredit[] => {
  return [
    {
      id: "CR-2023-001",
      date: "2023-04-10",
      amount: 42750,
      lenderName: "ABC Housing Finance",
      transactionId: "TXN123456",
      description: "Commission for March 2023"
    },
    {
      id: "CR-2023-002",
      date: "2023-05-12",
      amount: 51200,
      lenderName: "ABC Housing Finance",
      transactionId: "TXN234567",
      description: "Commission for April 2023"
    },
    {
      id: "CR-2023-003",
      date: "2023-06-10",
      amount: 48600,
      lenderName: "ABC Housing Finance",
      transactionId: "TXN345678",
      description: "Commission for May 2023"
    },
    {
      id: "CR-2023-004",
      date: "2023-07-11",
      amount: 53500,
      lenderName: "ABC Housing Finance",
      transactionId: "TXN456789",
      description: "Commission for June 2023"
    },
    {
      id: "CR-2023-005",
      date: "2023-08-10",
      amount: 62300,
      lenderName: "ABC Housing Finance",
      transactionId: "TXN567890",
      description: "Commission for July 2023"
    },
    {
      id: "CR-2023-006",
      date: "2023-09-11",
      amount: 58700,
      lenderName: "ABC Housing Finance",
      transactionId: "TXN678901",
      description: "Commission for August 2023"
    },
    {
      id: "CR-2023-007",
      date: "2023-10-10",
      amount: 63100,
      lenderName: "XYZ Bank",
      transactionId: "TXN789012",
      description: "Commission for September 2023"
    },
    {
      id: "CR-2023-008",
      date: "2023-11-10",
      amount: 68200,
      lenderName: "XYZ Bank",
      transactionId: "TXN890123",
      description: "Commission for October 2023"
    },
    {
      id: "CR-2023-009",
      date: "2023-12-11",
      amount: 71500,
      lenderName: "XYZ Bank",
      transactionId: "TXN901234",
      description: "Commission for November 2023"
    },
    {
      id: "CR-2024-001",
      date: "2024-01-10",
      amount: 74800,
      lenderName: "XYZ Bank",
      transactionId: "TXN012345",
      description: "Commission for December 2023"
    },
    {
      id: "CR-2024-002",
      date: "2024-02-12",
      amount: 79500,
      lenderName: "PQR Finance Ltd",
      transactionId: "TXN123456",
      description: "Commission for January 2024"
    },
    {
      id: "CR-2024-003",
      date: "2024-03-11",
      amount: 82300,
      lenderName: "PQR Finance Ltd",
      transactionId: "TXN234567",
      description: "Commission for February 2024"
    }
  ];
};

export const getPerformanceMetrics = (): PerformanceMetric[] => {
  return [
    {
      month: "Apr 2023",
      leadsReferred: 85,
      targetLeads: 80,
      leadsConverted: 34,
      amountDisbursed: 51000000,
      targetDisbursement: 50000000,
      onTimeAccounts: 33,
      totalAccounts: 34,
      dpd30Accounts: 1,
      dpd60Accounts: 0,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "May 2023",
      leadsReferred: 92,
      targetLeads: 85,
      leadsConverted: 38,
      amountDisbursed: 57000000,
      targetDisbursement: 52500000,
      onTimeAccounts: 37,
      totalAccounts: 38,
      dpd30Accounts: 1,
      dpd60Accounts: 0,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Jun 2023",
      leadsReferred: 88,
      targetLeads: 90,
      leadsConverted: 36,
      amountDisbursed: 54000000,
      targetDisbursement: 55000000,
      onTimeAccounts: 35,
      totalAccounts: 36,
      dpd30Accounts: 1,
      dpd60Accounts: 0,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Jul 2023",
      leadsReferred: 96,
      targetLeads: 90,
      leadsConverted: 43,
      amountDisbursed: 64500000,
      targetDisbursement: 55000000,
      onTimeAccounts: 41,
      totalAccounts: 43,
      dpd30Accounts: 2,
      dpd60Accounts: 0,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Aug 2023",
      leadsReferred: 102,
      targetLeads: 95,
      leadsConverted: 45,
      amountDisbursed: 67500000,
      targetDisbursement: 57500000,
      onTimeAccounts: 42,
      totalAccounts: 45,
      dpd30Accounts: 2,
      dpd60Accounts: 1,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Sep 2023",
      leadsReferred: 94,
      targetLeads: 100,
      leadsConverted: 40,
      amountDisbursed: 60000000,
      targetDisbursement: 60000000,
      onTimeAccounts: 37,
      totalAccounts: 40,
      dpd30Accounts: 2,
      dpd60Accounts: 1,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Oct 2023",
      leadsReferred: 105,
      targetLeads: 100,
      leadsConverted: 48,
      amountDisbursed: 72000000,
      targetDisbursement: 60000000,
      onTimeAccounts: 45,
      totalAccounts: 48,
      dpd30Accounts: 2,
      dpd60Accounts: 1,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Nov 2023",
      leadsReferred: 112,
      targetLeads: 105,
      leadsConverted: 52,
      amountDisbursed: 78000000,
      targetDisbursement: 62500000,
      onTimeAccounts: 48,
      totalAccounts: 52,
      dpd30Accounts: 3,
      dpd60Accounts: 1,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Dec 2023",
      leadsReferred: 118,
      targetLeads: 110,
      leadsConverted: 56,
      amountDisbursed: 84000000,
      targetDisbursement: 65000000,
      onTimeAccounts: 51,
      totalAccounts: 56,
      dpd30Accounts: 3,
      dpd60Accounts: 2,
      dpd90Accounts: 0,
      npaAccounts: 0
    },
    {
      month: "Jan 2024",
      leadsReferred: 124,
      targetLeads: 115,
      leadsConverted: 59,
      amountDisbursed: 88500000,
      targetDisbursement: 67500000,
      onTimeAccounts: 53,
      totalAccounts: 59,
      dpd30Accounts: 4,
      dpd60Accounts: 1,
      dpd90Accounts: 1,
      npaAccounts: 0
    },
    {
      month: "Feb 2024",
      leadsReferred: 130,
      targetLeads: 120,
      leadsConverted: 63,
      amountDisbursed: 94500000,
      targetDisbursement: 70000000,
      onTimeAccounts: 56,
      totalAccounts: 63,
      dpd30Accounts: 4,
      dpd60Accounts: 2,
      dpd90Accounts: 1,
      npaAccounts: 0
    },
    {
      month: "Mar 2024",
      leadsReferred: 135,
      targetLeads: 125,
      leadsConverted: 68,
      amountDisbursed: 102000000,
      targetDisbursement: 72500000,
      onTimeAccounts: 60,
      totalAccounts: 68,
      dpd30Accounts: 5,
      dpd60Accounts: 2,
      dpd90Accounts: 1,
      npaAccounts: 0
    }
  ];
};

// Helper function to format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Helper function to format percentage
export const formatPercentage = (value: number, total: number) => {
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};
