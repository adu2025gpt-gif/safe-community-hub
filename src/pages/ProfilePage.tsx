 import { mockUser, myReports, Report } from '@/data/mockData';
 import { formatDistanceToNow } from 'date-fns';
 import { Badge } from '@/components/ui/badge';
 import { Progress } from '@/components/ui/progress';
 import BottomNav from '@/components/BottomNav';
 import SafeWatchLogo from '@/components/icons/SafeWatchLogo';
 import LanguageToggle from '@/components/LanguageToggle';
 import {
   User,
   MapPin,
   Award,
   FileText,
   CheckCircle2,
   Clock,
   AlertTriangle,
   Lightbulb,
   Volume2,
   Trash2,
   Car,
   Settings,
   ChevronRight,
 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 const ProfilePage = () => {
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
 
   const getStatusProgress = (status: Report['status']) => {
     const progress = {
       submitted: 25,
       acknowledged: 50,
       in_progress: 75,
       resolved: 100,
     };
     return progress[status];
   };
 
   const getStatusColor = (status: Report['status']) => {
     const colors = {
       submitted: 'bg-muted',
       acknowledged: 'bg-accent',
       in_progress: 'bg-warning',
       resolved: 'bg-success',
     };
     return colors[status];
   };
 
   return (
     <div className="min-h-screen bg-background flex flex-col pb-20">
       {/* Header */}
       <header className="glass-strong sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b border-border/30">
         <SafeWatchLogo size="sm" />
         <div className="flex items-center gap-2">
           <LanguageToggle />
           <Button variant="ghost" size="icon">
             <Settings size={20} className="text-foreground/70" />
           </Button>
         </div>
       </header>
 
       <main className="flex-1 px-4 py-6 space-y-6">
         {/* Profile Card */}
         <section className="glass rounded-2xl p-6 space-y-4">
           <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
               <User size={28} className="text-primary-foreground" />
             </div>
             <div>
               <h1 className="text-xl font-bold text-foreground">{mockUser.name}</h1>
               <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                 <MapPin size={14} />
                 <span>{mockUser.neighborhood}</span>
               </div>
             </div>
           </div>
 
           {/* Stats */}
           <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/30">
             <div className="text-center">
               <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                 <Award size={20} />
                 {mockUser.contributionScore}
               </div>
               <p className="text-xs text-muted-foreground mt-1">Impact Score</p>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                 <FileText size={18} />
                 {mockUser.reportsSubmitted}
               </div>
               <p className="text-xs text-muted-foreground mt-1">Reports</p>
             </div>
             <div className="text-center">
               <div className="flex items-center justify-center gap-1 text-2xl font-bold text-success">
                 <CheckCircle2 size={18} />
                 {mockUser.reportsResolved}
               </div>
               <p className="text-xs text-muted-foreground mt-1">Resolved</p>
             </div>
           </div>
         </section>
 
         {/* Community Badge */}
         <section className="glass rounded-xl p-4 flex items-center gap-4">
           <div className="p-3 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/30">
             <Award size={28} className="text-warning" />
           </div>
           <div className="flex-1">
             <h3 className="font-semibold text-foreground">Community Guardian</h3>
             <p className="text-xs text-muted-foreground">
               Top 10% contributor in your neighborhood
             </p>
           </div>
           <ChevronRight size={20} className="text-muted-foreground" />
         </section>
 
         {/* My Reports */}
         <section className="space-y-4">
           <div className="flex items-center justify-between">
             <h2 className="text-lg font-semibold text-foreground">My Reports</h2>
             <Badge variant="outline" className="border-border/50 text-muted-foreground">
               {myReports.length} Total
             </Badge>
           </div>
 
           <div className="space-y-3">
             {myReports.map((report) => (
               <article
                 key={report.id}
                 className="glass rounded-xl p-4 space-y-3"
               >
                 <div className="flex items-start gap-3">
                   <div className="p-2 rounded-lg bg-secondary/50">
                     {getTypeIcon(report.type)}
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="font-medium text-sm text-foreground truncate">
                       {report.title}
                     </h4>
                     <p className="text-xs text-muted-foreground mt-0.5">
                       {report.location}
                     </p>
                     <p className="text-xs text-muted-foreground/70 mt-0.5">
                       {formatDistanceToNow(report.timestamp, { addSuffix: true })}
                     </p>
                   </div>
                   <Badge
                     className={`${getStatusColor(report.status)} text-xs capitalize`}
                   >
                     {report.status.replace('_', ' ')}
                   </Badge>
                 </div>
 
                 {/* Status Timeline */}
                 <div className="space-y-2">
                   <div className="flex items-center justify-between text-xs text-muted-foreground">
                     <span>Progress</span>
                     <span className="capitalize">{report.status.replace('_', ' ')}</span>
                   </div>
                   <Progress value={getStatusProgress(report.status)} className="h-2" />
                   <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                     <div className="flex items-center gap-1">
                       <Clock size={10} />
                       <span>Submitted</span>
                     </div>
                     <span>Acknowledged</span>
                     <span>In Progress</span>
                     <div className="flex items-center gap-1">
                       <CheckCircle2 size={10} />
                       <span>Resolved</span>
                     </div>
                   </div>
                 </div>
               </article>
             ))}
           </div>
         </section>
       </main>
 
       {/* Bottom Navigation */}
       <BottomNav />
     </div>
   );
 };
 
 export default ProfilePage;