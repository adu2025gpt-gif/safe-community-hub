 import { Shield } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface ReportFABProps {
   onClick: () => void;
 }
 
 const ReportFAB = ({ onClick }: ReportFABProps) => {
   return (
     <Button
       onClick={onClick}
       className="
         fixed bottom-24 left-1/2 -translate-x-1/2 z-50
         h-16 px-8 rounded-full
         bg-gradient-to-r from-primary to-accent
         text-primary-foreground font-bold text-base
         shadow-2xl glow-primary
         hover:scale-105 active:scale-95
         transition-all duration-200
       "
     >
       <Shield className="mr-2" size={22} />
       REPORT
     </Button>
   );
 };
 
 export default ReportFAB;