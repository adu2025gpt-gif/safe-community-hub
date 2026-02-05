 import { useLocation, useNavigate } from 'react-router-dom';
 import { Home, MessageSquare, User } from 'lucide-react';
 
 const navItems = [
   { id: 'dashboard', label: 'Home', icon: Home, path: '/dashboard' },
   { id: 'feed', label: 'Feed', icon: MessageSquare, path: '/feed' },
   { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
 ];
 
 const BottomNav = () => {
   const location = useLocation();
   const navigate = useNavigate();
 
   return (
     <nav className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border/30">
       <div className="flex items-center justify-around h-16 max-w-md mx-auto">
         {navItems.map((item) => {
           const Icon = item.icon;
           const isActive = location.pathname === item.path;
           return (
             <button
               key={item.id}
               onClick={() => navigate(item.path)}
               className={`
                 flex flex-col items-center justify-center gap-1 px-6 py-2
                 transition-all
                 ${isActive 
                   ? 'text-primary' 
                   : 'text-muted-foreground hover:text-foreground'
                 }
               `}
             >
               <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
               <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                 {item.label}
               </span>
               {isActive && (
                 <div className="absolute bottom-0 w-12 h-0.5 bg-primary rounded-full" />
               )}
             </button>
           );
         })}
       </div>
     </nav>
   );
 };
 
 export default BottomNav;