
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, FileSpreadsheet, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-finance-blue-light to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-finance-blue-dark">
            Intermediary Onboarding & Analysis System
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Streamline your DSA onboarding process and gain valuable insights
            into intermediary performance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-finance-blue hover:bg-finance-blue-dark">
              <Link to="/onboarding">
                Start Onboarding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-finance-blue">
                <UserPlus className="mr-2 h-5 w-5" /> Profile Onboarding
              </CardTitle>
              <CardDescription>
                Collect intermediary profile details and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Capture essential information about your DSAs and intermediaries.
                Streamline document collection and verification.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/onboarding">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-finance-blue">
                <FileSpreadsheet className="mr-2 h-5 w-5" /> Bank Statement Analysis
              </CardTitle>
              <CardDescription>
                Track monthly commission payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Analyze bank statements to verify monthly commission credits
                from lenders and track payment history.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/bank-analysis">View Analysis</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-finance-blue">
                <BarChart3 className="mr-2 h-5 w-5" /> Performance Metrics
              </CardTitle>
              <CardDescription>
                Monitor lead conversion and portfolio health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Track lead referrals vs targets, disbursement performance, and
                monitor loan portfolio quality metrics.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/performance-analysis">View Performance</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
