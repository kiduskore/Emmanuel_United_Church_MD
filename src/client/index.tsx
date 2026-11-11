import React from 'react';
import { createRoot } from 'react-dom/client';
import { CommunityCardApp } from './CommunityCardApp';
import { ChmsDashboardApp } from './ChmsDashboardApp';

function mountApps() {
  const chmsContainer = document.getElementById('euc-chms-dashboard-root');
  if (chmsContainer) {
    const root = createRoot(chmsContainer);
    root.render(
      <React.StrictMode>
        <ChmsDashboardApp />
      </React.StrictMode>
    );
  }

  const communityContainer = document.getElementById('euc-community-card-root') || document.getElementById('euc-framer-app');
  if (communityContainer) {
    const root = createRoot(communityContainer);
    root.render(
      <React.StrictMode>
        <CommunityCardApp />
      </React.StrictMode>
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApps);
} else {
  mountApps();
}
