 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import SafeWatchLogo from '@/components/icons/SafeWatchLogo';
 import LanguageToggle from '@/components/LanguageToggle';
 import { neighborhoods } from '@/data/mockData';
 import { Shield, MapPin, ChevronRight } from 'lucide-react';
 
 const AuthPage = () => {
   const navigate = useNavigate();
   const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
 
   const handleLogin = () => {
     navigate('/dashboard');
   };
 
   const handleGuestLogin = () => {
     navigate('/dashboard');
   };
 
   return (
     <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
       {/* Background gradient effects */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
       
       {/* Header with language toggle */}
       <header className="relative z-10 flex justify-end p-4">
         <LanguageToggle />
       </header>
 
       {/* Main content */}
       <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
         <div className="w-full max-w-sm space-y-8">
           {/* Logo */}
           <div className="flex flex-col items-center space-y-4">
             <SafeWatchLogo size="lg" />
             <p className="text-muted-foreground text-center text-sm">
               Community Safety Network for UAE Residents
             </p>
           </div>
 
           {/* Login Card */}
           <div className="glass-strong rounded-2xl p-6 space-y-6">
             {/* Neighborhood Selector */}
             <div className="space-y-2">
               <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                 <MapPin size={14} className="text-primary" />
                 Select Your Neighborhood
               </label>
               <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                 <SelectTrigger className="w-full bg-secondary/50 border-border/50 h-12">
                   <SelectValue placeholder="Choose neighborhood..." />
                 </SelectTrigger>
                 <SelectContent>
                   {neighborhoods.map((neighborhood) => (
                     <SelectItem key={neighborhood} value={neighborhood}>
                       {neighborhood}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
 
             {/* UAE Pass Login */}
             <Button
               onClick={handleLogin}
               className="w-full h-14 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-base rounded-xl glow-primary hover:opacity-90 transition-all"
             >
               <Shield className="mr-2" size={20} />
               Login with UAE Pass
               <ChevronRight className="ml-auto" size={20} />
             </Button>
 
             {/* Divider */}
             <div className="flex items-center gap-4">
               <div className="flex-1 h-px bg-border/50" />
               <span className="text-xs text-muted-foreground">or</span>
               <div className="flex-1 h-px bg-border/50" />
             </div>
 
             {/* Guest Login */}
             <Button
               variant="outline"
               onClick={handleGuestLogin}
               className="w-full h-12 border-border/50 bg-secondary/30 hover:bg-secondary/50 text-foreground/80"
             >
               Continue as Guest
             </Button>
           </div>
 
           {/* Trust badges */}
           <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-success" />
               <span>Secure</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-primary" />
               <span>Verified</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-accent" />
               <span>Community</span>
             </div>
           </div>
         </div>
       </main>
 
       {/* Footer */}
       <footer className="relative z-10 p-4 text-center text-xs text-muted-foreground">
         Protected by UAE Government Security Standards
       </footer>
     </div>
   );
 };
 
 export default AuthPage;