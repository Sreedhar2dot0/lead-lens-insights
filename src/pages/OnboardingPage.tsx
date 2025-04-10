import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Building, CheckCircle, User, Landmark, FileText, Upload, Send, ClockIcon } from "lucide-react";
import AgreementPreviewDialog from "@/components/AgreementPreviewDialog";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  type: z.string().min(1, { message: "Type is required." }),
  contactPerson: z.string().min(2, { message: "Contact person name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  pincode: z.string().min(6, { message: "Valid pincode is required." }),
  panNumber: z.string().min(10, { message: "Valid PAN number is required." }),
  gstNumber: z.string().optional(),
  accountNumber: z.string().min(10, { message: "Valid account number is required." }),
  ifscCode: z.string().min(11, { message: "Valid IFSC code is required." }),
  bankName: z.string().min(2, { message: "Bank name is required." }),
  branchName: z.string().min(2, { message: "Branch name is required." }),
  establishedYear: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 1900, {
    message: "Please enter a valid year.",
  }),
  targetLeads: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Please enter a valid number.",
  }),
  targetDisbursementAmount: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Please enter a valid amount.",
  }),
});

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);
  const [agreementSent, setAgreementSent] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState<"not_sent" | "pending" | "completed">("not_sent");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      type: "DSA",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      panNumber: "",
      gstNumber: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: "",
      establishedYear: "",
      targetLeads: "100",
      targetDisbursementAmount: "6000000",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (signatureStatus === "completed") {
      toast.success("Intermediary onboarded successfully!");
      navigate("/bank-analysis");
    } else {
      setStep(5);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const validateStep = async () => {
    if (step === 1) {
      const result = await form.trigger(["name", "companyName", "type", "contactPerson", "email", "phone"]);
      if (result) nextStep();
    } else if (step === 2) {
      const result = await form.trigger(["address", "city", "state", "pincode", "panNumber"]);
      if (result) nextStep();
    } else if (step === 3) {
      const result = await form.trigger([
        "accountNumber", "ifscCode", "bankName", "branchName", "establishedYear"
      ]);
      if (result) nextStep();
    } else if (step === 4) {
      const result = await form.trigger(["targetLeads", "targetDisbursementAmount"]);
      if (result) nextStep();
    }
  };

  const handleSendForSignature = () => {
    setShowAgreementDialog(false);
    setSignatureStatus("pending");
    setAgreementSent(true);
    toast.success("Partnership agreement sent for e-signature");
    
    // Simulate signature completion after 5 seconds (for demo purposes)
    setTimeout(() => {
      setSignatureStatus("completed");
      toast.success("Partnership agreement signed successfully!");
    }, 5000);
  };

  const handleGenerateAgreement = () => {
    setShowAgreementDialog(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-finance-blue-dark">Intermediary Onboarding</h1>
      
      <div className="flex mb-8 justify-between">
        <div className="flex flex-col items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
            step >= 1 ? "bg-finance-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <User size={20} />
          </div>
          <span className="text-sm mt-2">Basic Info</span>
        </div>
        <div className="h-0.5 flex-1 self-center mx-2 bg-gray-200 relative">
          <div className={`absolute top-0 left-0 h-full bg-finance-blue transition-all duration-300 ease-in-out`} 
               style={{ width: `${(step - 1) * 25}%` }}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
            step >= 2 ? "bg-finance-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <Building size={20} />
          </div>
          <span className="text-sm mt-2">Business</span>
        </div>
        <div className="h-0.5 flex-1 self-center mx-2 bg-gray-200 relative">
          <div className={`absolute top-0 left-0 h-full bg-finance-blue transition-all duration-300 ease-in-out`} 
               style={{ width: `${(step - 2) * 33.33}%` }}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
            step >= 3 ? "bg-finance-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <Landmark size={20} />
          </div>
          <span className="text-sm mt-2">Banking</span>
        </div>
        <div className="h-0.5 flex-1 self-center mx-2 bg-gray-200 relative">
          <div className={`absolute top-0 left-0 h-full bg-finance-blue transition-all duration-300 ease-in-out`} 
               style={{ width: `${(step - 3) * 33.33}%` }}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
            step >= 4 ? "bg-finance-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <FileText size={20} />
          </div>
          <span className="text-sm mt-2">Documents</span>
        </div>
        <div className="h-0.5 flex-1 self-center mx-2 bg-gray-200 relative">
          <div className={`absolute top-0 left-0 h-full bg-finance-blue transition-all duration-300 ease-in-out`} 
               style={{ width: `${(step - 4) * 100}%` }}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
            step >= 5 ? "bg-finance-blue text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <Send size={20} />
          </div>
          <span className="text-sm mt-2">Agreement</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Basic Information"}
            {step === 2 && "Business Details"}
            {step === 3 && "Banking Information"}
            {step === 4 && "Document Upload & Targets"}
            {step === 5 && "Partnership Agreement"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Enter the basic details of the intermediary"}
            {step === 2 && "Enter business and registration details"}
            {step === 3 && "Enter banking information for commission transfers"}
            {step === 4 && "Upload required documents and set performance targets"}
            {step === 5 && "Review and sign the partnership agreement"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intermediary Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="DSA / Broker / Agent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact person's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input placeholder="Pincode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter PAN number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter GST number if applicable" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="establishedYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Established</FormLabel>
                        <FormControl>
                          <Input placeholder="Year of establishment" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ifscCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter IFSC code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter bank name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="branchName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter branch name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Document Upload</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="font-medium text-sm">PAN Card</p>
                        <p className="text-gray-500 text-xs mt-1">Upload PAN card copy</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Upload File
                        </Button>
                      </div>
                      <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="font-medium text-sm">GST Certificate</p>
                        <p className="text-gray-500 text-xs mt-1">Upload GST certificate if applicable</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Upload File
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="font-medium text-sm">Bank Statement</p>
                        <p className="text-gray-500 text-xs mt-1">Upload last 6 months bank statement</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Upload File
                        </Button>
                      </div>
                      <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="font-medium text-sm">Address Proof</p>
                        <p className="text-gray-500 text-xs mt-1">Upload address proof document</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Upload File
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Performance Targets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="targetLeads"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Lead Target</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter target number of leads" {...field} />
                            </FormControl>
                            <FormDescription>Target number of leads per month</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="targetDisbursementAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Disbursement Target (₹)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter target disbursement amount" {...field} />
                            </FormControl>
                            <FormDescription>Target disbursement amount per month</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-finance-blue-light p-3 rounded-full">
                        <FileText className="h-6 w-6 text-finance-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Partnership Agreement</h3>
                        <p className="text-gray-500 mt-1">
                          The final step is to review and sign the partnership agreement between your organization and our company.
                        </p>
                        
                        <div className="mt-4 flex flex-col space-y-4">
                          {signatureStatus === "not_sent" && (
                            <Button 
                              type="button" 
                              onClick={handleGenerateAgreement}
                              className="w-fit"
                            >
                              <FileText className="mr-2 h-4 w-4" /> 
                              Generate and Preview Agreement
                            </Button>
                          )}
                          
                          {signatureStatus === "pending" && (
                            <div className="flex items-center text-amber-600 bg-amber-50 px-4 py-3 rounded-md">
                              <ClockIcon className="h-5 w-5 mr-2" />
                              <span>Agreement sent for e-signature. Awaiting signatures from all parties.</span>
                            </div>
                          )}
                          
                          {signatureStatus === "completed" && (
                            <div className="flex items-center text-green-600 bg-green-50 px-4 py-3 rounded-md">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              <span>Partnership agreement has been signed by all parties.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-dashed border-gray-300 rounded-md p-6">
                    <h4 className="font-medium mb-2">E-Signature Process:</h4>
                    <ol className="list-decimal ml-5 space-y-2">
                      <li className={`${agreementSent || signatureStatus !== "not_sent" ? "text-gray-400" : ""}`}>
                        Generate and preview the agreement
                      </li>
                      <li className={`${signatureStatus === "pending" || signatureStatus === "completed" ? "text-gray-400" : ""}`}>
                        Send the agreement for e-signature to all parties
                      </li>
                      <li className={`${signatureStatus === "completed" ? "text-gray-400" : ""}`}>
                        All parties digitally sign the agreement
                      </li>
                      <li>Complete the onboarding process</li>
                    </ol>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          ) : (
            <div></div>
          )}
          {step < 5 ? (
            <Button type="button" onClick={validateStep}>
              Next
            </Button>
          ) : (
            <Button 
              type="submit" 
              onClick={form.handleSubmit(onSubmit)} 
              className={`bg-finance-green hover:bg-finance-green-dark ${signatureStatus !== "completed" && "opacity-50 cursor-not-allowed"}`}
              disabled={signatureStatus !== "completed"}
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Complete Onboarding
            </Button>
          )}
        </CardFooter>
      </Card>

      <AgreementPreviewDialog
        open={showAgreementDialog}
        onOpenChange={setShowAgreementDialog}
        onSendForSignature={handleSendForSignature}
        agreementData={{
          name: form.getValues("name"),
          companyName: form.getValues("companyName"),
          email: form.getValues("email"),
        }}
      />
    </div>
  );
};

export default OnboardingPage;
