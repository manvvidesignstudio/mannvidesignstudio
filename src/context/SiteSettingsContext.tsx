import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSiteSettings } from '../lib/cmsStore';
import { SiteSettings } from '../types/database';

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings()
      .then(setSettings)
      .catch((error) => console.error('Failed to load site settings', error));
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = (): SiteSettings | null => useContext(SiteSettingsContext);
