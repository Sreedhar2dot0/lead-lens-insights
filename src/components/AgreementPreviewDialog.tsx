
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, Send, Clock, CheckCircle } from "lucide-react";

type AgreementPreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendForSignature: () => void;
  agreementData: {
    name: string;
    companyName: string;
    email: string;
  };
};

const AgreementPreviewDialog = ({
  open,
  onOpenChange,
  onSendForSignature,
  agreementData,
}: AgreementPreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Partnership Agreement Preview</DialogTitle>
          <DialogDescription>
            Review the partnership agreement before sending it for e-signature.
          </DialogDescription>
        </DialogHeader>

        <div className="border border-gray-200 rounded-lg p-4 h-[60vh] overflow-auto bg-gray-50">
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold text-center mb-6">PARTNERSHIP AGREEMENT</h1>
            
            <p className="mb-4">This Partnership Agreement (the "Agreement") is made and entered into on {new Date().toLocaleDateString()} by and between:</p>
            
            <p className="mb-6 font-semibold">Finance Partners, Inc. ("Company") and {agreementData.companyName} ("Partner"), collectively referred to as the "Parties".</p>
            
            <h2 className="text-xl font-semibold mb-2">1. PURPOSE OF PARTNERSHIP</h2>
            <p className="mb-4">The purpose of this partnership is to establish a formal relationship between the Company and the Partner for the marketing, referral, and servicing of financial products and services.</p>
            
            <h2 className="text-xl font-semibold mb-2">2. TERM</h2>
            <p className="mb-4">This Agreement shall commence on the date of execution and shall continue for a period of one (1) year, automatically renewing for successive one-year terms unless terminated by either Party.</p>
            
            <h2 className="text-xl font-semibold mb-2">3. PARTNER RESPONSIBILITIES</h2>
            <p className="mb-4">The Partner shall:</p>
            <ul className="list-disc ml-8 mb-4">
              <li>Market and promote the Company's financial products and services.</li>
              <li>Refer qualified leads to the Company.</li>
              <li>Provide accurate information to potential customers.</li>
              <li>Comply with all applicable laws and regulations.</li>
              <li>Maintain confidentiality of all proprietary information.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-2">4. COMPANY RESPONSIBILITIES</h2>
            <p className="mb-4">The Company shall:</p>
            <ul className="list-disc ml-8 mb-4">
              <li>Provide training and support to the Partner.</li>
              <li>Process referred applications in a timely manner.</li>
              <li>Pay commission to the Partner as per the agreed schedule.</li>
              <li>Maintain required licenses and regulatory compliance.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-2">5. COMMISSION STRUCTURE</h2>
            <p className="mb-4">The Partner shall be entitled to commissions based on the successful conversion of leads and disbursement of loans as detailed in Annexure A.</p>
            
            <h2 className="text-xl font-semibold mb-2">6. TERMINATION</h2>
            <p className="mb-4">Either Party may terminate this Agreement with thirty (30) days written notice. The Company reserves the right to terminate the Agreement immediately for violation of laws, regulations, or the terms of this Agreement.</p>
            
            <h2 className="text-xl font-semibold mb-2">7. GOVERNING LAW</h2>
            <p className="mb-4">This Agreement shall be governed by and construed in accordance with the laws of the state/country where the Company is headquartered.</p>
            
            <div className="mt-12 mb-6">
              <p className="font-semibold">SIGNED BY THE PARTIES:</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-semibold">For Finance Partners, Inc.:</p>
                <div className="border-t border-black mt-8 pt-2">
                  <p>Authorized Signatory</p>
                  <p>Name: _________________</p>
                  <p>Title: _________________</p>
                  <p>Date: _________________</p>
                </div>
              </div>
              
              <div>
                <p className="font-semibold">For {agreementData.companyName}:</p>
                <div className="border-t border-black mt-8 pt-2">
                  <p>Authorized Signatory</p>
                  <p>Name: {agreementData.name}</p>
                  <p>Email: {agreementData.email}</p>
                  <p>Date: _________________</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
          <Button onClick={onSendForSignature} className="bg-finance-green hover:bg-finance-green-dark">
            <Send className="mr-2 h-4 w-4" /> Send for E-Signature
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgreementPreviewDialog;
