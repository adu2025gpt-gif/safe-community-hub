 import { useLanguage } from '@/contexts/LanguageContext';
 import { Button } from '@/components/ui/button';
 import { Globe } from 'lucide-react';
 
 const LanguageToggle = () => {
   const { language, toggleLanguage } = useLanguage();
 
   return (
     <Button
       variant="ghost"
       size="sm"
       onClick={toggleLanguage}
       className="glass rounded-full px-3 gap-2 text-foreground/80 hover:text-foreground hover:bg-primary/10"
     >
       <Globe size={16} />
       <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
     </Button>
   );
 };
 
 export default LanguageToggle;