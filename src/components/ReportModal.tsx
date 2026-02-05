 import { useState } from 'react';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from '@/components/ui/dialog';
 import { Button } from '@/components/ui/button';
 import { Textarea } from '@/components/ui/textarea';
 import { Switch } from '@/components/ui/switch';
 import { Label } from '@/components/ui/label';
 import {
   AlertTriangle,
   Lightbulb,
   Volume2,
   Trash2,
   Car,
   Upload,
   MapPin,
   EyeOff,
   Send,
   ChevronLeft,
 } from 'lucide-react';
 
 interface ReportModalProps {
   open: boolean;
   onClose: () => void;
 }
 
 type ReportType = 'suspicious' | 'lighting' | 'noise' | 'vandalism' | 'traffic' | null;
 
 const reportCategories = [
   { id: 'suspicious', label: 'Suspicious Activity', icon: AlertTriangle, color: 'text-destructive' },
   { id: 'lighting', label: 'Lighting Defect', icon: Lightbulb, color: 'text-warning' },
   { id: 'noise', label: 'Noise', icon: Volume2, color: 'text-accent' },
   { id: 'vandalism', label: 'Vandalism', icon: Trash2, color: 'text-primary' },
   { id: 'traffic', label: 'Traffic', icon: Car, color: 'text-warning' },
 ] as const;
 
 const ReportModal = ({ open, onClose }: ReportModalProps) => {
   const [step, setStep] = useState(1);
   const [selectedType, setSelectedType] = useState<ReportType>(null);
   const [description, setDescription] = useState('');
   const [isAnonymous, setIsAnonymous] = useState(false);
   const [locationDetected, setLocationDetected] = useState(false);
 
   const handleCategorySelect = (type: ReportType) => {
     setSelectedType(type);
     setStep(2);
   };
 
   const handleBack = () => {
     if (step === 2) {
       setStep(1);
       setSelectedType(null);
     }
   };
 
   const handleSubmit = () => {
     // Mock submission
     console.log({ type: selectedType, description, isAnonymous });
     handleClose();
   };
 
   const handleClose = () => {
     setStep(1);
     setSelectedType(null);
     setDescription('');
     setIsAnonymous(false);
     setLocationDetected(false);
     onClose();
   };
 
   const detectLocation = () => {
     setLocationDetected(true);
   };
 
   return (
     <Dialog open={open} onOpenChange={handleClose}>
       <DialogContent className="glass-strong border-border/50 max-w-md mx-4 p-0 gap-0 rounded-2xl overflow-hidden">
         <DialogHeader className="p-6 pb-4 border-b border-border/30">
           <div className="flex items-center gap-3">
             {step === 2 && (
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={handleBack}
                 className="h-8 w-8 -ml-2"
               >
                 <ChevronLeft size={20} />
               </Button>
             )}
             <DialogTitle className="text-lg font-semibold">
               {step === 1 ? 'Report an Issue' : 'Provide Details'}
             </DialogTitle>
           </div>
         </DialogHeader>
 
         <div className="p-6 space-y-6">
           {step === 1 ? (
             /* Step 1: Category Selection */
             <div className="grid grid-cols-2 gap-3">
               {reportCategories.map((category) => {
                 const Icon = category.icon;
                 return (
                   <button
                     key={category.id}
                     onClick={() => handleCategorySelect(category.id)}
                     className="
                       glass rounded-xl p-4 flex flex-col items-center gap-3
                       hover:bg-secondary/50 transition-all
                       hover:scale-[1.02] active:scale-[0.98]
                     "
                   >
                     <div className={`p-3 rounded-full bg-secondary/50 ${category.color}`}>
                       <Icon size={24} />
                     </div>
                     <span className="text-sm font-medium text-foreground/80 text-center">
                       {category.label}
                     </span>
                   </button>
                 );
               })}
             </div>
           ) : (
             /* Step 2: Details Form */
             <div className="space-y-5">
               {/* Selected category indicator */}
               <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                 {selectedType && (() => {
                   const category = reportCategories.find(c => c.id === selectedType);
                   if (category) {
                     const Icon = category.icon;
                     return (
                       <>
                         <div className={`p-2 rounded-lg bg-secondary/50 ${category.color}`}>
                           <Icon size={18} />
                         </div>
                         <span className="text-sm font-medium">{category.label}</span>
                       </>
                     );
                   }
                   return null;
                 })()}
               </div>
 
               {/* Description */}
               <div className="space-y-2">
                 <Label className="text-sm text-foreground/80">Description</Label>
                 <Textarea
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="Describe what you observed..."
                   className="bg-secondary/30 border-border/50 min-h-[100px] resize-none"
                 />
               </div>
 
               {/* Photo Upload */}
               <div className="space-y-2">
                 <Label className="text-sm text-foreground/80">Evidence (Optional)</Label>
                 <button className="
                   w-full h-24 rounded-xl border-2 border-dashed border-border/50
                   flex flex-col items-center justify-center gap-2
                   text-muted-foreground hover:border-primary/50 hover:text-primary
                   transition-colors
                 ">
                   <Upload size={24} />
                   <span className="text-sm">Upload Photo</span>
                 </button>
               </div>
 
               {/* Location Detection */}
               <Button
                 variant="outline"
                 onClick={detectLocation}
                 className={`
                   w-full h-12 border-border/50 
                   ${locationDetected ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-secondary/30'}
                 `}
               >
                 <MapPin size={18} className="mr-2" />
                 {locationDetected ? 'Location Detected: Al Ain District' : 'Auto-Detect Location'}
               </Button>
 
               {/* Anonymous Mode Toggle */}
               <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30">
                 <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-muted">
                     <EyeOff size={18} className="text-foreground/70" />
                   </div>
                   <div>
                     <Label className="font-medium">Anonymous Mode</Label>
                     <p className="text-xs text-muted-foreground">Hide My Identity</p>
                   </div>
                 </div>
                 <Switch
                   checked={isAnonymous}
                   onCheckedChange={setIsAnonymous}
                   className="data-[state=checked]:bg-primary"
                 />
               </div>
             </div>
           )}
         </div>
 
         {step === 2 && (
           <div className="p-6 pt-0">
             <Button
               onClick={handleSubmit}
               disabled={!description.trim()}
               className="
                 w-full h-14 rounded-xl
                 bg-gradient-to-r from-primary to-accent
                 text-primary-foreground font-semibold
                 disabled:opacity-50
               "
             >
               <Send size={18} className="mr-2" />
               Submit Report
             </Button>
           </div>
         )}
       </DialogContent>
     </Dialog>
   );
 };
 
 export default ReportModal;