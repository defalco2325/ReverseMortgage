import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalModalProps {
  trigger: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

function LegalModal({ trigger, title, content }: LegalModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] bg-white text-gray-900">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[65vh] pr-4">
          <div className="text-gray-700 leading-relaxed">
            {content}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function TermsOfUseModal({ children }: { children: React.ReactNode }) {
  return (
    <LegalModal
      trigger={children}
      title="Terms of Use"
      content={
        <div className="space-y-6 text-sm text-gray-700">
          <p className="text-xs text-gray-500">Updated: June 3, 2024</p>
          
          <p>
            Welcome to the Nationwide Equities site (the "Sites"). Nationwide Equities and/or its affiliates ("Nationwide Equities" or "us," "we" or "our") provides the Sites to you subject to the following terms of use ("Terms of Use" or "Site Terms"). By visiting the Sites, you accept the Site Terms (the "Acceptance"). Please read them carefully.
          </p>

          <p className="font-semibold text-destructive">
            SECTION 7 OF THESE SITE TERMS CONTAINS IMPORTANT PROVISIONS FOR RESOLVING DISPUTES THROUGH MANDATORY ARBITRATION AND A CLASS ACTION WAIVER.
          </p>

          <p>
            By accessing or using the Sites, Content, or other elements of the Sites, YOU AGREE TO BE BOUND by these Site Terms. If you do not want to accept all of the terms, conditions, and notices of these Site Terms, you must immediately discontinue your use and access of the Sites.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">1. NOTICE AND AGREEMENT</h3>
          <p>
            BEFORE USING ANY WEB PAGES OR APPLICATIONS, THE SITES, OR INFORMATION CONTAINED HEREIN, YOU SHOULD CAREFULLY READ THE FOLLOWING DISCLAIMERS AND IMPORTANT TERMS AND CONDITIONS. THE SITES ARE PROVIDED FOR INFORMATION PURPOSES ONLY. YOUR USE OF ANY OF THE SITES CONSTITUTES YOUR AGREEMENT TO ALL TERMS AND CONDITIONS HEREIN.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">2. LIMITED LICENSE AND OWNERSHIP</h3>
          <p>
            Nationwide Equities grants you a non-exclusive, non-transferable, limited license to access, use, and display the Sites and the information, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and other content and materials thereon ("Content") and any software that may be necessary to use the Sites.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">3. USE OF CONTENT</h3>
          <p>
            Product offers, rates, terms, and other Content provided at the Sites are subject to change without notice. All such changes will be effective as soon as we post them to the Sites. Your eligibility for particular products and services is subject to Nationwide Equities's review and acceptance.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">4. DISCLAIMERS</h3>
          <p>
            NATIONWIDE EQUITIES IS NOT RESPONSIBLE FOR ANY INACCURACIES, ERRORS (INCLUDING TYPOGRAPHICAL ERRORS) OR OMISSIONS, OR FOR THE RESULTS OBTAINED FROM THE USE OF THE SITES OR THE CONTENT. THE SITES, ALL CONTENT, LINKS, AND ANY OF THE SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITES ARE PROVIDED "AS IS" AND "AS AVAILABLE", WITH NO GUARANTEE OF COMPLETENESS, ACCURACY, TIMELINESS, OR OF THE RESULTS OBTAINED THEREFROM.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">5. LIMIT ON DAMAGES</h3>
          <p>
            NATIONWIDE EQUITIES AND OUR AFFILIATES, AGENTS, OFFICERS, OR EMPLOYEES SHALL NOT BE LIABLE FOR ANY LOSS OF PROFITS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, INTERRUPTION OF BUSINESS, NOR FOR INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES OF ANY KIND.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">6. INDEMNITY</h3>
          <p>
            If you are a business or organization, to the extent permitted by law, you will indemnify and hold harmless us, our affiliates, and our personnel, from and against any costs, losses, liabilities, and expenses (including attorneys' fees) from third-party claims arising out of or relating to your use of the Sites and Content.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">7. DISPUTE RESOLUTION</h3>
          <p className="font-semibold">YOU AND NATIONWIDE EQUITIES AGREE TO THE FOLLOWING MANDATORY ARBITRATION AND CLASS ACTION WAIVER PROVISIONS:</p>
          
          <h4 className="font-semibold mt-4">Mandatory Arbitration</h4>
          <p>
            You and Nationwide Equities agree to resolve any claims arising out of or relating to these Site Terms or our Content through final and binding arbitration.
          </p>

          <h4 className="font-semibold mt-4">Class and Jury Trial Waivers</h4>
          <p>
            You and Nationwide Equities agree that Disputes must be brought on an individual basis only and may not be brought as a plaintiff or class member in any purported class, consolidated, or representative proceeding. Class arbitrations, class actions, and representative actions are prohibited.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">8. LINKS TO THIRD-PARTY SITES</h3>
          <p>
            As a convenience to you, Nationwide Equities may provide links to websites operated by entities other than Nationwide Equities. The Linked Sites are not under the control of Nationwide Equities. If you use a Linked Site, you do so at your own risk.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">9. SUBMISSIONS AND PRIVACY</h3>
          <p>
            All information you submit to Nationwide Equities via the Sites will be considered to be the property of Nationwide Equities. Use of the Sites is governed by Nationwide Equities's Privacy Policy.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">10. GOVERNING LAW</h3>
          <p>
            This Agreement is governed by the laws of the State of New Jersey, U.S.A., without regard to its principles of conflict of laws.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">11. COMPLETE AGREEMENT</h3>
          <p>
            This Agreement constitutes the entire agreement between you and Nationwide Equities relating to your access to and use of the Sites.
          </p>
        </div>
      }
    />
  );
}

export function LicensingModal({ children }: { children: React.ReactNode }) {
  return (
    <LegalModal
      trigger={children}
      title="Licensing Information"
      content={
        <div className="space-y-6 text-sm text-gray-700">
          <h3 className="text-lg font-bold text-gray-900">State Licensing Information</h3>
          
          <p>
            <strong>Nationwide Equities Corp.</strong><br />
            NMLS #1408<br />
            225 Brae Blvd. Suite 202<br />
            Park Ridge, NJ 07656<br />
            Phone: 866-312-4370
          </p>

          <p>
            Nationwide Equities is a licensed mortgage lender. We are licensed to conduct business in all 50 states and the District of Columbia.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">NMLS Consumer Access</h3>
          <p>
            You can verify our licensing information through the Nationwide Multistate Licensing System (NMLS) Consumer Access website at{' '}
            <a href="http://www.nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.nmlsconsumeraccess.org
            </a>
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Equal Housing Lender</h3>
          <p>
            Nationwide Equities is an Equal Housing Lender. We do not discriminate on the basis of race, color, religion, national origin, sex, handicap, or familial status.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">State-Specific Licenses</h3>
          <p>
            For detailed state-specific licensing information, please visit our licensing page or contact us at 866-312-4370.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Regulatory Information</h3>
          <p>
            This material has not been reviewed, approved or issued by HUD, FHA or any government agency. The company is not affiliated with or acting on behalf of or at the direction of HUD/FHA or any other government agency.
          </p>

          <p className="mt-6">
            <strong>Important Notice:</strong> A reverse mortgage increases the principal mortgage loan amount and decreases home equity (it is a negative amortization loan). These materials are not from HUD or FHA and the document was not approved by HUD, FHA or any Government Agency.
          </p>
        </div>
      }
    />
  );
}

export function PrivacyNoticeModal({ children }: { children: React.ReactNode }) {
  return (
    <LegalModal
      trigger={children}
      title="Privacy Notice"
      content={
        <div className="space-y-6 text-sm text-gray-700">
          <p className="text-xs text-gray-500">Last Updated: October 14, 2024</p>
          
          <p>
            Nationwide Equities is committed to providing you, our customers, with outstanding products and services while protecting your personal information. This Privacy Notice applies to the websites or mobile applications of Nationwide Equities and our affiliates that link to this Privacy Notice.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Collection and Use of Information</h3>
          <p>We collect data about you from a variety of sources, including the following:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Information we receive from you:</strong> We may collect information we receive from you at the Sites or in connection with your use of Services or Products, including on applications, online forms and calculators, surveys and other communications.</li>
            <li><strong>Information about your transactions:</strong> We may collect information about your transactions with us, our affiliates or others, such as your account balances and payment history.</li>
            <li><strong>Information from third party sources:</strong> We may collect information about you from reporting agencies, including your credit history and creditworthiness.</li>
            <li><strong>Information regarding use of the Site:</strong> We may collect data regarding your use of this Site through the use of cookies and other automation.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Purposes of Collection</h3>
          <p>We may use data we collect for a variety of purposes, including the following:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>To operate our business</li>
            <li>To provide Products and Services to you</li>
            <li>To provide customer support</li>
            <li>To evaluate your eligibility for Services and Products</li>
            <li>To communicate with you about the Products and Services we provide</li>
            <li>To develop and evaluate products and services</li>
            <li>To detect and prevent fraud and other prohibited or illegal activity</li>
            <li>To provide you with advertising, search results, and other personalized content</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Information We May Disclose or Share</h3>
          <p>
            We may share your information within our corporate family and with third parties as permitted or required by law, or as directed or authorized by you. For example, we may disclose your information to:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Marketing Service Providers and Joint Marketing Partners</li>
            <li>Third-Party Service Providers that we have engaged to help deliver our Services and Products</li>
            <li>Banking regulators, law enforcement, governmental authorities, as requested, required, or permitted by law</li>
            <li>Consumer reporting agencies and fraud detection service providers</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Protection of Information</h3>
          <p>
            We maintain policies and procedures to protect the security of your information and to safeguard against unauthorized access to or use of your data. Of course, despite these measures, no network or system is ever entirely secure.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Consumer Choices</h3>
          <p>
            You may choose not to provide your data, even though that might impact your ability to receive a particular Product. If you do not want to receive marketing email from us, you can follow the unsubscribe link provided in those emails.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Links to Third Party Sites</h3>
          <p>
            We may provide links to websites that are owned or operated by other companies. When you use a link to visit a third-party website, you will be subject to that website's privacy and security practices. We are not responsible for the privacy or security of these third party sites.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Children's Privacy Rights</h3>
          <p>
            Our online services are not directed to children under the age of 13. We do not knowingly collect data from children under age 13 without parental consent.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Updates to Our Privacy Notice</h3>
          <p>
            We may update this Privacy Notice from time to time. If we make changes, we will revise the "Last Updated" date at the top of this Privacy Notice. Changes to this Privacy Notice will be effective once they are posted unless otherwise indicated.
          </p>

          <h3 className="text-lg font-bold mt-6 text-gray-900">Contact Us</h3>
          <p>
            If you have questions about this Privacy Notice or our privacy practices, please contact us at 866-312-4370 or at 225 Brae Blvd. Suite 202, Park Ridge, NJ 07656.
          </p>
        </div>
      }
    />
  );
}
