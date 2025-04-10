
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from "recharts";
import { 
  ArrowUp, ArrowDown, Download, TrendingUp, Users, AlertCircle, CheckCircle2, Clock,
  Target, Edit, Trash2, Plus, Save
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getIntermediaryDetails, getPerformanceMetrics, formatCurrency, formatPercentage } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const getPerformanceIndicator = (actual: number, target: number) => {
  const percentage = (actual / target) * 100;
  if (percentage >= 100) return { label: "Excellent", color: "text-finance-green" };
  if (percentage >= 90) return { label: "Good", color: "text-finance-blue" };
  if (percentage >= 75) return { label: "Average", color: "text-finance-yellow" };
  return { label: "Needs Improvement", color: "text-finance-red" };
};

interface TargetItem {
  id: string;
  category: string;
  count: number;
  amount: number;
  isEditing?: boolean;
}

interface TargetMaster {
  id: string;
  name: string;
  description: string;
  targets: TargetItem[];
}

const targetMasters: TargetMaster[] = [
  {
    id: "small-dsa",
    name: "Small DSA Target",
    description: "Default targets for small DSA partners",
    targets: [
      { id: "lead-q1", category: "Lead Referrals - Q1", count: 30, amount: 1500000 },
      { id: "lead-q2", category: "Lead Referrals - Q2", count: 40, amount: 2000000 },
      { id: "lead-q3", category: "Lead Referrals - Q3", count: 50, amount: 2500000 },
      { id: "lead-q4", category: "Lead Referrals - Q4", count: 60, amount: 3000000 },
      { id: "disb-q1", category: "Disbursements - Q1", count: 20, amount: 1000000 },
      { id: "disb-q2", category: "Disbursements - Q2", count: 30, amount: 1500000 },
      { id: "disb-q3", category: "Disbursements - Q3", count: 35, amount: 1750000 },
      { id: "disb-q4", category: "Disbursements - Q4", count: 40, amount: 2000000 },
    ]
  },
  {
    id: "large-dsa",
    name: "Large DSA Target",
    description: "Default targets for large DSA partners",
    targets: [
      { id: "lead-q1", category: "Lead Referrals - Q1", count: 100, amount: 5000000 },
      { id: "lead-q2", category: "Lead Referrals - Q2", count: 120, amount: 6000000 },
      { id: "lead-q3", category: "Lead Referrals - Q3", count: 140, amount: 7000000 },
      { id: "lead-q4", category: "Lead Referrals - Q4", count: 160, amount: 8000000 },
      { id: "disb-q1", category: "Disbursements - Q1", count: 70, amount: 3500000 },
      { id: "disb-q2", category: "Disbursements - Q2", count: 80, amount: 4000000 },
      { id: "disb-q3", category: "Disbursements - Q3", count: 90, amount: 4500000 },
      { id: "disb-q4", category: "Disbursements - Q4", count: 100, amount: 5000000 },
    ]
  },
  {
    id: "medium-dsa",
    name: "Medium DSA Target",
    description: "Default targets for medium DSA partners",
    targets: [
      { id: "lead-q1", category: "Lead Referrals - Q1", count: 60, amount: 3000000 },
      { id: "lead-q2", category: "Lead Referrals - Q2", count: 70, amount: 3500000 },
      { id: "lead-q3", category: "Lead Referrals - Q3", count: 80, amount: 4000000 },
      { id: "lead-q4", category: "Lead Referrals - Q4", count: 90, amount: 4500000 },
      { id: "disb-q1", category: "Disbursements - Q1", count: 40, amount: 2000000 },
      { id: "disb-q2", category: "Disbursements - Q2", count: 45, amount: 2250000 },
      { id: "disb-q3", category: "Disbursements - Q3", count: 50, amount: 2500000 },
      { id: "disb-q4", category: "Disbursements - Q4", count: 55, amount: 2750000 },
    ]
  }
];

const PerformanceAnalysisPage = () => {
  const intermediary = getIntermediaryDetails();
  const metrics = getPerformanceMetrics();
  const [selectedTargetMaster, setSelectedTargetMaster] = useState<string>("");
  const [currentTargets, setCurrentTargets] = useState<TargetItem[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { toast } = useToast();
  
  // Calculate performance metrics from the data
  const totalLeadsReferred = metrics.reduce((sum, month) => sum + month.leadsReferred, 0);
  const totalLeadsConverted = metrics.reduce((sum, month) => sum + month.leadsConverted, 0);
  const totalTargetLeads = metrics.reduce((sum, month) => sum + month.targetLeads, 0);
  const totalAmountDisbursed = metrics.reduce((sum, month) => sum + month.amountDisbursed, 0);
  const totalTargetDisbursement = metrics.reduce((sum, month) => sum + month.targetDisbursement, 0);
  const totalOnTimeAccounts = metrics.reduce((sum, month) => sum + month.onTimeAccounts, 0);
  const totalAccounts = metrics.reduce((sum, month) => sum + month.totalAccounts, 0);
  const totalDpd30Accounts = metrics.reduce((sum, month) => sum + month.dpd30Accounts, 0);
  const totalDpd60Accounts = metrics.reduce((sum, month) => sum + month.dpd60Accounts, 0);
  const totalDpd90Accounts = metrics.reduce((sum, month) => sum + month.dpd90Accounts, 0);
  const totalNpaAccounts = metrics.reduce((sum, month) => sum + month.npaAccounts, 0);
  
  // Calculate percentage metrics
  const leadsPerformance = (totalLeadsReferred / totalTargetLeads) * 100;
  const disbursementPerformance = (totalAmountDisbursed / totalTargetDisbursement) * 100;
  const leadConversionRate = (totalLeadsConverted / totalLeadsReferred) * 100;
  const onTimePercentage = (totalOnTimeAccounts / totalAccounts) * 100;
  const dpd90Percentage = ((totalDpd90Accounts + totalNpaAccounts) / totalAccounts) * 100;
  
  // Trend data (compare with previous period)
  const leadsReferredTrend = {
    isUp: metrics[metrics.length - 1].leadsReferred > metrics[metrics.length - 2].leadsReferred,
    change: Math.abs(((metrics[metrics.length - 1].leadsReferred - metrics[metrics.length - 2].leadsReferred) / 
             metrics[metrics.length - 2].leadsReferred) * 100).toFixed(1)
  };
  
  const disbursementTrend = {
    isUp: metrics[metrics.length - 1].amountDisbursed > metrics[metrics.length - 2].amountDisbursed,
    change: Math.abs(((metrics[metrics.length - 1].amountDisbursed - metrics[metrics.length - 2].amountDisbursed) / 
             metrics[metrics.length - 2].amountDisbursed) * 100).toFixed(1)
  };
  
  // Portfolio quality data for pie chart
  const portfolioQualityData = [
    { name: "On-time", value: totalOnTimeAccounts, color: "#00B368" },
    { name: "1-30 DPD", value: totalDpd30Accounts, color: "#F5C60D" },
    { name: "31-60 DPD", value: totalDpd60Accounts, color: "#FF9500" },
    { name: "61-90 DPD", value: totalDpd90Accounts, color: "#FF6B00" },
    { name: "NPA", value: totalNpaAccounts, color: "#D20A0A" }
  ];
  
  const handleTargetMasterChange = (value: string) => {
    setSelectedTargetMaster(value);
    const selectedMaster = targetMasters.find(tm => tm.id === value);
    if (selectedMaster) {
      setCurrentTargets(JSON.parse(JSON.stringify(selectedMaster.targets)));
    } else {
      setCurrentTargets([]);
    }
  };
  
  const toggleEditTarget = (id: string) => {
    setCurrentTargets(prev => 
      prev.map(target => 
        target.id === id 
          ? { ...target, isEditing: !target.isEditing } 
          : target
      )
    );
  };
  
  const deleteTarget = (id: string) => {
    setCurrentTargets(prev => prev.filter(target => target.id !== id));
    toast({
      title: "Target deleted",
      description: "Target has been deleted successfully"
    });
  };
  
  const updateTargetValue = (id: string, field: 'count' | 'amount', value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;
    
    setCurrentTargets(prev => 
      prev.map(target => 
        target.id === id 
          ? { ...target, [field]: numValue } 
          : target
      )
    );
  };
  
  const addNewTarget = () => {
    const newId = `new-target-${Date.now()}`;
    setCurrentTargets(prev => [
      ...prev, 
      { 
        id: newId, 
        category: "New Target", 
        count: 0, 
        amount: 0, 
        isEditing: true 
      }
    ]);
  };
  
  const saveTargets = () => {
    toast({
      title: "Success",
      description: "Targets saved successfully"
    });
    setSaveSuccess(true);
    
    setCurrentTargets(prev => 
      prev.map(target => ({ ...target, isEditing: false }))
    );
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };
  
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
          <TabsTrigger value="target-setting">Target Setting</TabsTrigger>
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
                      const performance = getPerformanceIndicator(convRate, 40);
                      
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
        
        <TabsContent value="target-setting">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center text-finance-blue-dark">
                      <Target className="mr-2 h-5 w-5" />
                      Target Setting
                    </CardTitle>
                    <CardDescription>
                      Set sourcing lead and disbursement targets for this intermediary
                    </CardDescription>
                  </div>
                  {selectedTargetMaster && (
                    <Button 
                      onClick={saveTargets}
                      className="bg-finance-blue hover:bg-finance-blue-dark"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Targets
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="max-w-md">
                    <label htmlFor="target-template" className="block text-sm font-medium mb-1">
                      Select Target Template
                    </label>
                    <Select 
                      value={selectedTargetMaster} 
                      onValueChange={handleTargetMasterChange}
                    >
                      <SelectTrigger id="target-template" className="w-full">
                        <SelectValue placeholder="Select a target template" />
                      </SelectTrigger>
                      <SelectContent>
                        {targetMasters.map((master) => (
                          <SelectItem key={master.id} value={master.id}>
                            {master.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedTargetMaster && (
                      <p className="text-sm text-gray-500 mt-1">
                        {targetMasters.find(tm => tm.id === selectedTargetMaster)?.description}
                      </p>
                    )}
                  </div>
                  
                  {selectedTargetMaster && (
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-finance-blue-dark">
                          Current Targets
                        </h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={addNewTarget}
                          className="flex items-center text-finance-blue border-finance-blue"
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Add Target
                        </Button>
                      </div>
                      
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-finance-blue-light">
                              <TableHead className="text-finance-blue-dark">Category</TableHead>
                              <TableHead className="text-finance-blue-dark text-right">Count</TableHead>
                              <TableHead className="text-finance-blue-dark text-right">Amount (₹)</TableHead>
                              <TableHead className="text-finance-blue-dark text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentTargets.map((target) => (
                              <TableRow key={target.id}>
                                <TableCell>
                                  {target.isEditing ? (
                                    <Input 
                                      value={target.category} 
                                      onChange={(e) => {
                                        setCurrentTargets(prev => 
                                          prev.map(t => 
                                            t.id === target.id 
                                              ? { ...t, category: e.target.value } 
                                              : t
                                          )
                                        );
                                      }}
                                      className="max-w-[200px]"
                                    />
                                  ) : (
                                    target.category
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {target.isEditing ? (
                                    <Input 
                                      type="number"
                                      value={target.count} 
                                      onChange={(e) => updateTargetValue(target.id, 'count', e.target.value)}
                                      className="max-w-[100px] ml-auto"
                                    />
                                  ) : (
                                    target.count
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {target.isEditing ? (
                                    <Input 
                                      type="number"
                                      value={target.amount} 
                                      onChange={(e) => updateTargetValue(target.id, 'amount', e.target.value)}
                                      className="max-w-[130px] ml-auto"
                                    />
                                  ) : (
                                    formatCurrency(target.amount)
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => toggleEditTarget(target.id)}
                                    >
                                      <Edit className="h-4 w-4 text-finance-blue" />
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <Trash2 className="h-4 w-4 text-finance-red" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          className="text-finance-red focus:text-finance-red"
                                          onClick={() => deleteTarget(target.id)}
                                        >
                                          Confirm Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {currentTargets.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No targets have been set. Click "Add Target" to create a new target.
                        </div>
                      )}
                      
                      {currentTargets.length > 0 && (
                        <div className="mt-4 flex justify-end">
                          <div className="text-sm text-gray-500 mr-4">
                            Total Targets: <span className="font-semibold">{currentTargets.length}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Total Amount: <span className="font-semibold">{formatCurrency(currentTargets.reduce((sum, target) => sum + target.amount, 0))}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!selectedTargetMaster && (
                    <div className="text-center py-10 text-gray-500">
                      Please select a target template to continue.
                    </div>
                  )}
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
