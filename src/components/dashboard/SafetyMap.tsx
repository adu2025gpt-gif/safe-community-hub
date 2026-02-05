 import { mockHotspots } from '@/data/mockData';
 import { AlertTriangle, Lightbulb, Volume2, Car } from 'lucide-react';
 
 const SafetyMap = () => {
   const getHotspotColor = (intensity: string) => {
     switch (intensity) {
       case 'high':
         return 'bg-destructive/60';
       case 'medium':
         return 'bg-warning/60';
       case 'low':
         return 'bg-primary/60';
       default:
         return 'bg-primary/60';
     }
   };
 
   const getHotspotIcon = (type: string) => {
     switch (type) {
       case 'suspicious':
         return <AlertTriangle size={12} />;
       case 'lighting':
         return <Lightbulb size={12} />;
       case 'noise':
         return <Volume2 size={12} />;
       case 'traffic':
         return <Car size={12} />;
       default:
         return <AlertTriangle size={12} />;
     }
   };
 
   return (
     <div className="relative h-full w-full bg-secondary/30 rounded-xl overflow-hidden">
       {/* Mock map background with grid */}
       <div className="absolute inset-0">
         <div
           className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `
               linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
               linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px',
           }}
         />
         {/* Simulated roads */}
         <div className="absolute top-1/3 left-0 right-0 h-2 bg-muted/40" />
         <div className="absolute top-2/3 left-0 right-0 h-1 bg-muted/30" />
         <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-muted/40" />
         <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-muted/30" />
       </div>
 
       {/* Heatmap overlays */}
       {mockHotspots.map((hotspot, index) => (
         <div
           key={hotspot.id}
           className={`absolute rounded-full blur-xl ${getHotspotColor(hotspot.intensity)}`}
           style={{
             width: hotspot.intensity === 'high' ? '120px' : hotspot.intensity === 'medium' ? '80px' : '50px',
             height: hotspot.intensity === 'high' ? '120px' : hotspot.intensity === 'medium' ? '80px' : '50px',
             top: `${20 + index * 20}%`,
             left: `${15 + index * 22}%`,
           }}
         />
       ))}
 
       {/* Alert pins */}
       {mockHotspots.map((hotspot, index) => (
         <div
           key={`pin-${hotspot.id}`}
           className="absolute transform -translate-x-1/2 -translate-y-1/2"
           style={{
             top: `${25 + index * 20}%`,
             left: `${20 + index * 22}%`,
           }}
         >
           <div
             className={`
               flex items-center justify-center w-8 h-8 rounded-full 
               ${hotspot.intensity === 'high' ? 'bg-destructive glow-warning' : 'bg-card border border-border'}
               text-foreground shadow-lg
             `}
           >
             {getHotspotIcon(hotspot.type)}
           </div>
         </div>
       ))}
 
       {/* Location indicator */}
       <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2 flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
         <span className="text-xs text-foreground/80">Al Ain District</span>
       </div>
 
       {/* Legend */}
       <div className="absolute top-4 left-4 glass rounded-lg p-3 space-y-2">
         <p className="text-xs font-medium text-foreground/80">Safety Hotspots</p>
         <div className="flex items-center gap-3 text-xs">
           <div className="flex items-center gap-1.5">
             <div className="w-3 h-3 rounded-full bg-destructive/60" />
             <span className="text-muted-foreground">High</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-3 h-3 rounded-full bg-warning/60" />
             <span className="text-muted-foreground">Med</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-3 h-3 rounded-full bg-primary/60" />
             <span className="text-muted-foreground">Low</span>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default SafetyMap;