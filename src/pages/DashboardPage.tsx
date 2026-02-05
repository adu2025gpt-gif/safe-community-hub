 import { useState } from 'react';
 import SafetyMap from '@/components/dashboard/SafetyMap';
 import LiveFeed from '@/components/dashboard/LiveFeed';
 import ReportFAB from '@/components/dashboard/ReportFAB';
 import ReportModal from '@/components/ReportModal';
 import BottomNav from '@/components/BottomNav';
 import SafeWatchLogo from '@/components/icons/SafeWatchLogo';
 import LanguageToggle from '@/components/LanguageToggle';
 import { Bell } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 
 const DashboardPage = () => {
   const [reportModalOpen, setReportModalOpen] = useState(false);
 
   return (
     <div className="min-h-screen bg-background flex flex-col pb-20">
       {/* Header */}
       <header className="glass-strong sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b border-border/30">
         <SafeWatchLogo size="sm" />
         <div className="flex items-center gap-2">
           <LanguageToggle />
           <Button variant="ghost" size="icon" className="relative">
             <Bell size={20} className="text-foreground/70" />
             <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-xs">
               3
             </Badge>
           </Button>
         </div>
       </header>
 
       {/* Map Section */}
       <section className="h-[45vh] p-4">
         <SafetyMap />
       </section>
 
       {/* Live Feed Section */}
       <section className="flex-1 px-4 pb-4">
         <LiveFeed />
       </section>
 
       {/* Report FAB */}
       <ReportFAB onClick={() => setReportModalOpen(true)} />
 
       {/* Report Modal */}
       <ReportModal
         open={reportModalOpen}
         onClose={() => setReportModalOpen(false)}
       />
 
       {/* Bottom Navigation */}
       <BottomNav />
     </div>
   );
 };
 
 export default DashboardPage;