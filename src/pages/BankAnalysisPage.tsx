
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Cell 
} from "recharts";
import { FileText, FilterIcon, Download, PieChart, BarChart3, ArrowUpRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getIntermediaryDetails, getBankCreditHistory, formatCurrency } from "@/lib/mockData";
import { Link } from "react-router-dom";

const BankAnalysisPage = () => {
  const intermediary = getIntermediaryDetails();
  const bankCredits = getBankCreditHistory();
  const [selectedLender, setSelectedLender] = useState<string | null>(null);

  // Extract unique lenders
  const lenders = Array.from(new Set(bankCredits.map((credit) => credit.lenderName)));

  // Filter credits by selected lender
  const filteredCredits = selectedLender 
    ? bankCredits.filter(credit => credit.lenderName === selectedLender)
    : bankCredits;

  // Prepare data for charts
  const chartData = bankCredits.reduce((acc: any[], credit) => {
    const month = new Date(credit.date).toLocaleString('default', { month: 'short' });
    const year = new Date(credit.date).getFullYear();
    const monthYear = `${month} ${year}`;
    
    const existingEntry = acc.find(entry => entry.month === monthYear);
    
    if (existingEntry) {
      existingEntry.amount += credit.amount;
      
      // Add or update lender-specific amount
      const lenderKey = `${credit.lenderName.replace(/\s+/g, '')}Amount`;
      if (existingEntry[lenderKey]) {
        existingEntry[lenderKey] += credit.amount;
      } else {
        existingEntry[lenderKey] = credit.amount;
      }
    } else {
      const newEntry: any = {
        month: monthYear,
        amount: credit.amount,
      };
      
      // Add lender-specific amount
      const lenderKey = `${credit.lenderName.replace(/\s+/g, '')}Amount`;
      newEntry[lenderKey] = credit.amount;
      
      acc.push(newEntry);
    }
    
    return acc;
  }, []);
  
  // Sort by date
  chartData.sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA.getTime() - dateB.getTime();
  });

  // Calculate total and average
  const totalCredit = bankCredits.reduce((sum, credit) => sum + credit.amount, 0);
  const averageMonthly = totalCredit / chartData.length;

  // Prepare data for lender distribution chart
  const lenderDistribution = lenders.map(lender => {
    const lenderCredits = bankCredits.filter(credit => credit.lenderName === lender);
    const total = lenderCredits.reduce((sum, credit) => sum + credit.amount, 0);
    return {
      lender,
      amount: total,
      percentage: (total / totalCredit) * 100
    };
  });

  // Define chart colors
  const chartColors = ['#0066CC', '#00B368', '#FFB800', '#FF3B3B'];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-finance-blue-dark">Bank Statement Analysis</h1>
          <p className="text-gray-500">
            Analyze monthly commission credits for {intermediary.name}
          </p>
        </div>
        
        <div className="flex space-x-3 mt-2 sm:mt-0">
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link to="/performance-analysis">
              Performance Analysis
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Commission</CardTitle>
            <CardDescription>All time total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-finance-blue">{formatCurrency(totalCredit)}</div>
              <div className="text-finance-green bg-finance-green-light p-2 rounded-full">
                <PieChart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Monthly Average</CardTitle>
            <CardDescription>Last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-finance-blue">{formatCurrency(averageMonthly)}</div>
              <div className="text-finance-blue bg-finance-blue-light p-2 rounded-full">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Lenders</CardTitle>
            <CardDescription>Sources of commission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-finance-blue">{lenders.length}</div>
              <div className="text-finance-yellow bg-finance-yellow-light p-2 rounded-full">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="lenders">Lender Analysis</TabsTrigger>
          </TabsList>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <FilterIcon className="mr-2 h-4 w-4" />
                {selectedLender || "All Lenders"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedLender(null)}>
                All Lenders
              </DropdownMenuItem>
              {lenders.map((lender) => (
                <DropdownMenuItem key={lender} onClick={() => setSelectedLender(lender)}>
                  {lender}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Commission Trend</CardTitle>
              <CardDescription>
                {selectedLender 
                  ? `Monthly commissions from ${selectedLender}`
                  : "Overall monthly commission trend from all lenders"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      name="Total Commission"
                      stroke="#0066CC"
                      fill="#0066CC"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Commission Transactions</CardTitle>
              <CardDescription>
                {selectedLender 
                  ? `Transactions from ${selectedLender}`
                  : "All commission transactions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>List of commission credits</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Lender</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCredits.map((credit) => (
                    <TableRow key={credit.id}>
                      <TableCell>
                        {new Date(credit.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>{credit.lenderName}</TableCell>
                      <TableCell>{credit.description}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(credit.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lenders">
          <Card>
            <CardHeader>
              <CardTitle>Lender-wise Distribution</CardTitle>
              <CardDescription>
                Breakdown of commissions by lender
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={lenderDistribution}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="lender" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                      <Legend />
                      <Bar dataKey="amount" name="Total Commission">
                        {lenderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Lender Contribution</h3>
                  <div className="space-y-4">
                    {lenderDistribution.map((item, index) => (
                      <div key={item.lender} className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" 
                             style={{ backgroundColor: chartColors[index % chartColors.length] }}></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{item.lender}</span>
                            <span>{formatCurrency(item.amount)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="h-2 rounded-full" 
                                 style={{ 
                                   width: `${item.percentage}%`,
                                   backgroundColor: chartColors[index % chartColors.length] 
                                 }}></div>
                          </div>
                          <div className="text-xs text-right mt-1">
                            {item.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BankAnalysisPage;
