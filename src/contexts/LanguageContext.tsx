 import React, { createContext, useContext, useState, ReactNode } from 'react';
 
 type Language = 'en' | 'ar';
 
 interface LanguageContextType {
   language: Language;
   toggleLanguage: () => void;
   isRTL: boolean;
 }
 
 const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
 
 export const LanguageProvider = ({ children }: { children: ReactNode }) => {
   const [language, setLanguage] = useState<Language>('en');
 
   const toggleLanguage = () => {
     setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
   };
 
   const isRTL = language === 'ar';
 
   return (
     <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
       <div dir={isRTL ? 'rtl' : 'ltr'}>{children}</div>
     </LanguageContext.Provider>
   );
 };
 
 export const useLanguage = () => {
   const context = useContext(LanguageContext);
   if (!context) {
     throw new Error('useLanguage must be used within a LanguageProvider');
   }
   return context;
 };