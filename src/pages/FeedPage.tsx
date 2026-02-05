 import { useState } from 'react';
 import { mockReports, Report } from '@/data/mockData';
 import { formatDistanceToNow } from 'date-fns';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import BottomNav from '@/components/BottomNav';
 import ReportFAB from '@/components/dashboard/ReportFAB';
 import ReportModal from '@/components/ReportModal';
 import SafeWatchLogo from '@/components/icons/SafeWatchLogo';
 import LanguageToggle from '@/components/LanguageToggle';
 import {
   AlertTriangle,
   Lightbulb,
   Volume2,
   Trash2,
   Car,
   CheckCircle2,
   ThumbsUp,
   Eye,
   Filter,
   Bell,
 } from 'lucide-react';
 
 const FeedPage = () => {
   const [reportModalOpen, setReportModalOpen] = useState(false);
   const [thankedReports, setThankedReports] = useState<Set<string>>(new Set());
   const [confirmedReports, setConfirmedReports] = useState<Set<string>>(new Set());
 
   const getTypeIcon = (type: Report['type']) => {
     const icons = {
       suspicious: <AlertTriangle size={18} className="text-destructive" />,
       lighting: <Lightbulb size={18} className="text-warning" />,
       noise: <Volume2 size={18} className="text-accent" />,
       vandalism: <Trash2 size={18} className="text-primary" />,
       traffic: <Car size={18} className="text-warning" />,
     };
     return icons[type];
   };
 
   const handleThank = (reportId: string) => {
     setThankedReports((prev) => {
       const newSet = new Set(prev);
       if (newSet.has(reportId)) {
         newSet.delete(reportId);
       } else {
         newSet.add(reportId);
       }
       return newSet;
     });
   };
 
   const handleConfirm = (reportId: string) => {
     setConfirmedReports((prev) => {
       const newSet = new Set(prev);
       if (newSet.has(reportId)) {
         newSet.delete(reportId);
       } else {
         newSet.add(reportId);
       }
       return newSet;
     });
   };
 
   return (
     <div className="min-h-screen bg-background flex flex-col pb-20">
       {/* Header */}
       <header className="glass-strong sticky top-0 z-40 px-4 py-3 border-b border-border/30">
         <div className="flex items-center justify-between mb-3">
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
         </div>
         <div className="flex items-center justify-between">
           <h1 className="text-lg font-semibold">Community Feed</h1>
           <Button variant="outline" size="sm" className="gap-2 border-border/50 bg-secondary/30">
             <Filter size={14} />
             Filter
           </Button>
         </div>
       </header>
 
       {/* Feed Content */}
       <main className="flex-1 px-4 py-4 space-y-4">
         {mockReports.map((report) => (
           <article
             key={report.id}
             className={`
               glass rounded-2xl p-5 space-y-4 transition-all
               ${report.isUrgent ? 'border-warning/50 glow-warning' : ''}
             `}
           >
             {/* Header */}
             <div className="flex items-start gap-4">
               <div className="p-3 rounded-xl bg-secondary/50">
                 {getTypeIcon(report.type)}
               </div>
               <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-2 flex-wrap mb-1">
                   <h3 className="font-semibold text-foreground">
                     {report.title}
                   </h3>
                   {report.isUrgent && (
                     <Badge className="bg-warning/20 text-warning border-warning/30 text-xs">
                       Urgent Alert
                     </Badge>
                   )}
                 </div>
                 <p className="text-sm text-muted-foreground">
                   {report.location}
                 </p>
                 <p className="text-xs text-muted-foreground/70 mt-0.5">
                   {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                 </p>
               </div>
             </div>
 
             {/* Description */}
             <p className="text-sm text-foreground/80 leading-relaxed">
               {report.description}
             </p>
 
             {/* Badges */}
             <div className="flex items-center gap-2 flex-wrap">
               {report.isVerified && (
                 <Badge className="bg-primary/20 text-primary border-primary/30 gap-1">
                   <CheckCircle2 size={12} />
                   Verified by Moderators
                 </Badge>
               )}
               {report.isAnonymous && (
                 <Badge variant="outline" className="border-border/50 text-muted-foreground text-xs">
                   Anonymous
                 </Badge>
               )}
             </div>
 
             {/* Actions */}
             <div className="flex items-center gap-2 pt-2 border-t border-border/30">
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={() => handleThank(report.id)}
                 className={`
                   flex-1 h-10 gap-2
                   ${thankedReports.has(report.id) 
                     ? 'text-primary bg-primary/10' 
                     : 'text-muted-foreground hover:text-primary'
                   }
                 `}
               >
                 <ThumbsUp size={16} />
                 <span>Thank</span>
                 <span className="ml-1 text-xs opacity-70">
                   {report.thanksCount + (thankedReports.has(report.id) ? 1 : 0)}
                 </span>
               </Button>
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={() => handleConfirm(report.id)}
                 className={`
                   flex-1 h-10 gap-2
                   ${confirmedReports.has(report.id) 
                     ? 'text-accent bg-accent/10' 
                     : 'text-muted-foreground hover:text-accent'
                   }
                 `}
               >
                 <Eye size={16} />
                 <span>I see this too</span>
                 <span className="ml-1 text-xs opacity-70">
                   {report.confirmCount + (confirmedReports.has(report.id) ? 1 : 0)}
                 </span>
               </Button>
             </div>
           </article>
         ))}
       </main>
 
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
 
 export default FeedPage;