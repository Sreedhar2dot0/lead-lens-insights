
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from "recharts";
import { 
  ArrowUp, ArrowDown, Download, TrendingUp, Users, AlertCircle, CheckCircle2, Clock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getIntermediaryDetails, getPerformanceMetrics, formatCurrency, formatPercentage } from "@/lib/mockData";

// Helper function to calculate performance indicator
const getPerformanceIndicator = (actual: number, target: number) => {
  const percentage = (actual / target) * 100;
  if (percentage >= 100) return { label: "Excellent", color: "text-finance-green" };
  if (percentage >= 90) return { label: "Good", color: "text-finance-blue" };
  if (percentage >= 75) return { label: "Average", color: "text-finance-yellow" };
  return { label: "Needs Improvement", color: "text-finance-red" };
};

const PerformanceAnalysisPage = () => {
  const intermediary = getIntermediaryDetails();
  const metrics = getPerformanceMetrics();
  
  // Calculate total values
  const totalLeadsReferred = metrics.reduce((sum, m) => sum + m.leadsReferred, 0);
  const totalTargetLeads = metrics.reduce((sum, m) => sum + m.targetLeads, 0);
  const totalLeadsConverted = metrics.reduce((sum, m) => sum + m.leadsConverted, 0);
  const totalAmountDisbursed = metrics.reduce((sum, m) => sum + m.amountDisbursed, 0);
  const totalTargetDisbursement = metrics.reduce((sum, m) => sum + m.targetDisbursement, 0);
  
  // Calculate loan quality metrics
  const totalAccounts = metrics.reduce((sum, m) => sum + m.totalAccounts, 0);
  const totalOnTimeAccounts = metrics.reduce((sum, m) => sum + m.onTimeAccounts, 0);
  const totalDpd30Accounts = metrics.reduce((sum, m) => sum + m.dpd30Accounts, 0);
  const totalDpd60Accounts = metrics.reduce((sum, m) => sum + m.dpd60Accounts, 0);
  const totalDpd90Accounts = metrics.reduce((sum, m) => sum + m.dpd90Accounts, 0);
  const totalNpaAccounts = metrics.reduce((sum, m) => sum + m.npaAccounts, 0);
  
  // Convert to percentages
  const onTimePercentage = (totalOnTimeAccounts / totalAccounts) * 100;
  const dpd30Percentage = (totalDpd30Accounts / totalAccounts) * 100;
  const dpd60Percentage = (totalDpd60Accounts / totalAccounts) * 100;
  const dpd90Percentage = (totalDpd90Accounts / totalAccounts) * 100;
  const npaPercentage = (totalNpaAccounts / totalAccounts) * 100;

  // Calculate lead conversion rate
  const leadConversionRate = (totalLeadsConverted / totalLeadsReferred) * 100;
  
  // Calculate performance against targets
  const leadsPerformance = (totalLeadsReferred / totalTargetLeads) * 100;
  const disbursementPerformance = (totalAmountDisbursed / totalTargetDisbursement) * 100;
  
  // Get latest month performance
  const latestMonth = metrics[metrics.length - 1];
  
  // Create data for portfolio quality pie chart
  const portfolioQualityData = [
    { name: "On-time", value: totalOnTimeAccounts, color: "#00B368" },
    { name: "DPD 1-30", value: totalDpd30Accounts, color: "#FFB800" },
    { name: "DPD 31-60", value: totalDpd60Accounts, color: "#FF9500" },
    { name: "DPD 61-90", value: totalDpd90Accounts, color: "#FF6B00" },
    { name: "NPA", value: totalNpaAccounts, color: "#FF3B3B" }
  ];

  // Helper function for performance trend
  const getPerformanceTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      isUp: change >= 0,
      change: Math.abs(change).toFixed(1)
    };
  };
  
  // Calculate performance trends (comparing last month with previous month)
  const leadsReferredTrend = getPerformanceTrend(
    metrics[metrics.length - 1].leadsReferred,
    metrics[metrics.length - 2].leadsReferred
  );
  
  const disbursementTrend = getPerformanceTrend(
    metrics[metrics.length - 1].amountDisbursed,
    metrics[metrics.length - 2].amountDisbursed
  );

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-finance-blue-dark">Performance Analysis</h1>
          <p className="text-gray-500">
            Performance metrics for {intermediary.name}
          </p>
        </div>
        
        <Button variant="outline" className="flex items-center mt-2 sm:mt-0">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Lead Referrals</CardTitle>
            <CardDescription>vs Target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{totalLeadsReferred}</span>
              <Badge className={leadsReferredTrend.isUp ? "bg-finance-green" : "bg-finance-red"}>
                {leadsReferredTrend.isUp ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {leadsReferredTrend.change}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xs flex justify-between">
                <span>Progress</span>
                <span>{leadsPerformance.toFixed(1)}%</span>
              </div>
              <Progress value={leadsPerformance > 100 ? 100 : leadsPerformance} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Target: {totalTargetLeads}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Disbursement</CardTitle>
            <CardDescription>vs Target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{formatCurrency(totalAmountDisbursed)}</span>
              <Badge className={disbursementTrend.isUp ? "bg-finance-green" : "bg-finance-red"}>
                {disbursementTrend.isUp ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {disbursementTrend.change}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xs flex justify-between">
                <span>Progress</span>
                <span>{disbursementPerformance.toFixed(1)}%</span>
              </div>
              <Progress value={disbursementPerformance > 100 ? 100 : disbursementPerformance} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Target: {formatCurrency(totalTargetDisbursement)}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
            <CardDescription>Leads to Disbursals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{leadConversionRate.toFixed(1)}%</span>
              <div className="text-finance-blue bg-finance-blue-light p-1.5 rounded-full">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs flex justify-between">
                <span>Total Conversions</span>
                <span>{totalLeadsConverted} / {totalLeadsReferred}</span>
              </div>
              <Progress value={leadConversionRate} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Industry Avg: 35%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Portfolio Quality</CardTitle>
            <CardDescription>Repayment Status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{onTimePercentage.toFixed(1)}%</span>
              <div className="text-finance-green bg-finance-green-light p-1.5 rounded-full">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs flex justify-between">
                <span>On-time Repayments</span>
                <span>{totalOnTimeAccounts} / {totalAccounts}</span>
              </div>
              <Progress value={onTimePercentage} className="h-2 bg-finance-red-light">
                <div className="bg-finance-green h-full" style={{ width: `${onTimePercentage}%` }}></div>
              </Progress>
              <div className="text-xs text-muted-foreground">
                DPD Accounts: {(totalAccounts - totalOnTimeAccounts)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="leads">Lead Performance</TabsTrigger>
          <TabsTrigger value="disbursement">Disbursement</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Quality</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Lead Referral Trend</CardTitle>
                <CardDescription>
                  Monthly lead referrals vs targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={metrics}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="leadsReferred" name="Leads Referred" fill="#0066CC" />
                      <Bar dataKey="targetLeads" name="Target" fill="#94A3B8" />
                      <Bar dataKey="leadsConverted" name="Converted" fill="#00B368" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rates</CardTitle>
                <CardDescription>
                  Lead to disbursement ratios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Conversion</span>
                      <span className="text-sm font-medium">{leadConversionRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={leadConversionRate} className="h-2" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-4">Last 3 Months</h4>
                    {metrics.slice(-3).map((month, idx) => {
                      const convRate = (month.leadsConverted / month.leadsReferred) * 100;
                      const performance = getPerformanceIndicator(convRate, 40); // Assuming 40% is the target
                      
                      return (
                        <div key={idx} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{month.month}</span>
                            <span className={`text-sm ${performance.color}`}>
                              {convRate.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Progress value={convRate} className="h-1.5 flex-1 mr-2" />
                            <span className="text-xs">{month.leadsConverted}/{month.leadsReferred}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-finance-blue" />
                        <span className="text-sm font-medium">Total Leads</span>
                      </div>
                      <span className="font-bold">{totalLeadsReferred}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-finance-green" />
                        <span className="text-sm font-medium">Converted</span>
                      </div>
                      <span className="font-bold">{totalLeadsConverted}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="disbursement">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Disbursement Trend</CardTitle>
                <CardDescription>
                  Monthly loan amount disbursement vs targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={metrics}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                      <Tooltip formatter={(value) => [`₹${(value as number / 10000000).toFixed(2)} Cr`, "Amount"]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="amountDisbursed" 
                        name="Disbursed" 
                        stroke="#0066CC" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="targetDisbursement" 
                        name="Target" 
                        stroke="#94A3B8" 
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Achievement Analysis</CardTitle>
                <CardDescription>
                  Performance against targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Achievement</span>
                      <span className="text-sm font-medium">{disbursementPerformance.toFixed(1)}%</span>
                    </div>
                    <Progress value={disbursementPerformance > 100 ? 100 : disbursementPerformance} className="h-2" />
                    <div className="text-xs mt-1 text-muted-foreground">
                      {formatCurrency(totalAmountDisbursed)} of {formatCurrency(totalTargetDisbursement)}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-4">Last 3 Months</h4>
                    {metrics.slice(-3).map((month, idx) => {
                      const achievementRate = (month.amountDisbursed / month.targetDisbursement) * 100;
                      const performance = getPerformanceIndicator(achievementRate, 100);
                      
                      return (
                        <div key={idx} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{month.month}</span>
                            <span className={`text-sm ${performance.color}`}>
                              {achievementRate.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Progress value={achievementRate > 100 ? 100 : achievementRate} className="h-1.5 flex-1 mr-2" />
                            <span className="text-xs">{performance.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Avg. Ticket Size</div>
                        <div className="font-bold mt-1">
                          {formatCurrency(totalAmountDisbursed / totalLeadsConverted)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Largest Deal</div>
                        <div className="font-bold mt-1">
                          {formatCurrency(Math.max(...metrics.map(m => m.amountDisbursed / m.leadsConverted)))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Portfolio Quality Overview</CardTitle>
                <CardDescription>
                  Analysis of repayment status and delinquency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioQualityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                          {portfolioQualityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} accounts`, ""]}
                          itemStyle={{ color: "#000" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-6 flex flex-col justify-center">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Portfolio Breakdown</h3>
                      <div className="space-y-3">
                        {portfolioQualityData.map((item, idx) => (
                          <div key={idx} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="text-sm">{item.name}</span>
                                <span className="text-sm font-medium">
                                  {formatPercentage(item.value, totalAccounts)}
                                </span>
                              </div>
                              <Progress 
                                value={(item.value / totalAccounts) * 100} 
                                className="h-1 mt-1"
                                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                              >
                                <div 
                                  className="h-full" 
                                  style={{ backgroundColor: item.color, width: `${(item.value / totalAccounts) * 100}%` }}
                                ></div>
                              </Progress>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span>Total Accounts:</span>
                        <span className="font-bold">{totalAccounts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Accounts:</span>
                        <span className="font-bold text-finance-red">{totalDpd90Accounts + totalNpaAccounts}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Delinquency Trend</CardTitle>
                <CardDescription>
                  Month-wise delinquency analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-3 bg-finance-gray-lightest rounded-md">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-finance-blue" />
                      <span className="text-sm font-medium">Current Weighted DPD</span>
                    </div>
                    <div className="text-lg font-bold">
                      {((totalDpd30Accounts * 15 + totalDpd60Accounts * 45 + totalDpd90Accounts * 75 + totalNpaAccounts * 90) / 
                        (totalDpd30Accounts + totalDpd60Accounts + totalDpd90Accounts + totalNpaAccounts || 1)).toFixed(1)} days
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold mb-4">Monthly DPD Trend</h4>
                    <div className="space-y-4">
                      {metrics.slice(-5).map((month, idx) => {
                        const dpd = month.dpd30Accounts + month.dpd60Accounts + month.dpd90Accounts + month.npaAccounts;
                        const dpdPercentage = (dpd / month.totalAccounts) * 100;
                        
                        return (
                          <div key={idx}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{month.month}</span>
                              <span className="text-sm font-medium">
                                {dpdPercentage.toFixed(1)}% DPD
                              </span>
                            </div>
                            <div className="flex">
                              <div 
                                className="h-2 bg-finance-green rounded-l-full" 
                                style={{ width: `${(month.onTimeAccounts / month.totalAccounts) * 100}%` }}
                              ></div>
                              <div 
                                className="h-2 bg-finance-yellow" 
                                style={{ width: `${(month.dpd30Accounts / month.totalAccounts) * 100}%` }}
                              ></div>
                              <div 
                                className="h-2 bg-[#FF9500]" 
                                style={{ width: `${(month.dpd60Accounts / month.totalAccounts) * 100}%` }}
                              ></div>
                              <div 
                                className="h-2 bg-[#FF6B00]" 
                                style={{ width: `${(month.dpd90Accounts / month.totalAccounts) * 100}%` }}
                              ></div>
                              <div 
                                className="h-2 bg-finance-red rounded-r-full" 
                                style={{ width: `${(month.npaAccounts / month.totalAccounts) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-4">Risk Assessment</h4>
                    <div className="flex items-center space-x-2 p-3 rounded-md bg-finance-yellow-light">
                      <AlertCircle className="h-5 w-5 text-finance-yellow" />
                      <div>
                        <p className="text-sm font-medium">Portfolio Health: Good</p>
                        <p className="text-xs text-gray-600">
                          {onTimePercentage.toFixed(1)}% accounts are on-time with repayments. 
                          Monitor {dpd90Percentage.toFixed(1)}% accounts in DPD 90+ bucket.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceAnalysisPage;
