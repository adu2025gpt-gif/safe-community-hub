 import { Report, mockReports } from '@/data/mockData';
 import { formatDistanceToNow } from 'date-fns';
 import { Badge } from '@/components/ui/badge';
 import { 
   AlertTriangle, 
   Lightbulb, 
   Volume2, 
   Trash2, 
   Car, 
   CheckCircle2,
   ThumbsUp,
   Eye
 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 const LiveFeed = () => {
   const getTypeIcon = (type: Report['type']) => {
     const icons = {
       suspicious: <AlertTriangle size={16} className="text-destructive" />,
       lighting: <Lightbulb size={16} className="text-warning" />,
       noise: <Volume2 size={16} className="text-accent" />,
       vandalism: <Trash2 size={16} className="text-primary" />,
       traffic: <Car size={16} className="text-warning" />,
     };
     return icons[type];
   };
 
   const getStatusBadge = (status: Report['status']) => {
     const styles = {
       submitted: 'bg-muted text-muted-foreground',
       acknowledged: 'bg-accent/20 text-accent',
       in_progress: 'bg-warning/20 text-warning',
       resolved: 'bg-success/20 text-success',
     };
     const labels = {
       submitted: 'Submitted',
       acknowledged: 'Acknowledged',
       in_progress: 'In Progress',
       resolved: 'Resolved',
     };
     return (
       <Badge className={`${styles[status]} text-xs font-medium`}>
         {labels[status]}
       </Badge>
     );
   };
 
   return (
     <div className="space-y-3">
       <div className="flex items-center justify-between">
         <h3 className="font-semibold text-foreground">Live Feed</h3>
         <Badge variant="outline" className="text-xs border-primary/30 text-primary">
           {mockReports.length} Active
         </Badge>
       </div>
 
       <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
         {mockReports.map((report) => (
           <div
             key={report.id}
             className={`
               glass rounded-xl p-4 space-y-3 transition-all
               ${report.isUrgent ? 'border-warning/50 glow-warning' : ''}
             `}
           >
             {/* Header */}
             <div className="flex items-start gap-3">
               <div className="p-2 rounded-lg bg-secondary/50">
                 {getTypeIcon(report.type)}
               </div>
               <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-2 flex-wrap">
                   <h4 className="font-medium text-sm text-foreground truncate">
                     {report.title}
                   </h4>
                   {report.isUrgent && (
                     <Badge className="bg-warning/20 text-warning text-xs">
                       Urgent
                     </Badge>
                   )}
                 </div>
                 <p className="text-xs text-muted-foreground mt-0.5">
                   {report.location} • {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                 </p>
               </div>
             </div>
 
             {/* Description */}
             <p className="text-sm text-foreground/70 line-clamp-2">
               {report.description}
             </p>
 
             {/* Footer */}
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 {report.isVerified && (
                   <div className="flex items-center gap-1 text-xs text-primary">
                     <CheckCircle2 size={12} />
                     <span>Verified</span>
                   </div>
                 )}
                 {getStatusBadge(report.status)}
               </div>
               <div className="flex items-center gap-1">
                 <Button
                   variant="ghost"
                   size="sm"
                   className="h-8 px-2 text-muted-foreground hover:text-primary"
                 >
                   <ThumbsUp size={14} />
                   <span className="ml-1 text-xs">{report.thanksCount}</span>
                 </Button>
                 <Button
                   variant="ghost"
                   size="sm"
                   className="h-8 px-2 text-muted-foreground hover:text-accent"
                 >
                   <Eye size={14} />
                   <span className="ml-1 text-xs">{report.confirmCount}</span>
                 </Button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 export default LiveFeed;