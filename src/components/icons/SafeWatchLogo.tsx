 import { Shield } from 'lucide-react';
 
 interface SafeWatchLogoProps {
   size?: 'sm' | 'md' | 'lg';
   showText?: boolean;
 }
 
 const SafeWatchLogo = ({ size = 'md', showText = true }: SafeWatchLogoProps) => {
   const sizes = {
     sm: { icon: 24, text: 'text-lg' },
     md: { icon: 40, text: 'text-2xl' },
     lg: { icon: 56, text: 'text-4xl' },
   };
 
   return (
     <div className="flex items-center gap-3">
       <div className="relative">
         <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
         <Shield
           size={sizes[size].icon}
           className="relative text-primary fill-primary/20"
           strokeWidth={1.5}
         />
       </div>
       {showText && (
         <div className={`font-bold tracking-tight ${sizes[size].text}`}>
           <span className="text-foreground">Safe</span>
           <span className="text-primary">Watch</span>
         </div>
       )}
     </div>
   );
 };
 
 export default SafeWatchLogo;