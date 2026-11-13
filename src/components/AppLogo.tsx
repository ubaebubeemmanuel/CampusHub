import React from 'react';

export const CAMPUS_HUB_LOGO_SRC = '/assets/aistudio/CampusHub_Logo_27d43e34.jpg';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({ size = 'sm', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  }[size];

  return (
    <div
      className={`${sizeClasses} overflow-hidden bg-white border border-slate-200/90 dark:border-slate-700/80 shadow-xs shrink-0 flex items-center justify-center ${className}`}
    >
      <img
        src={CAMPUS_HUB_LOGO_SRC}
        alt="CampusHub Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-[50%_38%] scale-[2.35] select-none"
      />
    </div>
  );
};
