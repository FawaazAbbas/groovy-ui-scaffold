import React from 'react';

interface IntegrationLogoProps {
  name: string;
  className?: string;
}

export function IntegrationLogo({ name, className = "h-5 w-5" }: IntegrationLogoProps) {
  switch (name) {
    case 'Slack':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.12a2.528 2.528 0 0 1 2.521 2.522v2.523H5.042zm1.26-2.523a2.528 2.528 0 0 1 2.522-2.522 2.528 2.528 0 0 1 2.522 2.522v6.306a2.528 2.528 0 0 1-2.522 2.522A2.528 2.528 0 0 1 6.302 18.95v-6.307H6.3z" fill="#E01E5A"/>
          <path d="M8.825 5.04A2.528 2.528 0 0 1 11.346 2.52 2.528 2.528 0 0 1 13.868 5.04a2.528 2.528 0 0 1-2.522 2.521H8.825V5.04zm2.521 1.26a2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.522H5.042A2.528 2.528 0 0 1 2.52 8.823a2.528 2.528 0 0 1 2.522-2.522h6.303V6.3z" fill="#36C5F0"/>
          <path d="M18.958 8.835a2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.522 2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm-1.26 2.52a2.528 2.528 0 0 1-2.522 2.524 2.528 2.528 0 0 1-2.522-2.524V5.05A2.528 2.528 0 0 1 15.176 2.527a2.528 2.528 0 0 1 2.522 2.523v6.305h-0.001z" fill="#2EB67D"/>
          <path d="M15.175 18.96a2.528 2.528 0 0 1-2.521 2.52 2.528 2.528 0 0 1-2.522-2.52 2.528 2.528 0 0 1 2.522-2.52h2.521v2.52zm-2.521-1.26a2.528 2.528 0 0 1-2.522-2.522 2.528 2.528 0 0 1 2.522-2.522h6.303a2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.522h-6.303z" fill="#ECB22E"/>
        </svg>
      );
    case 'Microsoft Teams':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" fill="#5059C9"/>
          <path d="M22 17.5c0 1.93-1.57 3.5-3.5 3.5h-8c-1.93 0-3.5-1.57-3.5-3.5v-2A3.5 3.5 0 0 1 10.5 12h8A3.5 3.5 0 0 1 22 15.5v2z" fill="#5059C9"/>
          <path d="M6 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="#7B83EB"/>
          <path d="M11 18H5.5A2.5 2.5 0 0 1 3 15.5v-1A2.5 2.5 0 0 1 5.5 12h2a2.5 2.5 0 0 1 2.5 2.5v1c0 .28.05.54.12.79A4.475 4.475 0 0 0 11 18z" fill="#7B83EB"/>
        </svg>
      );
    case 'Discord':
      return (
        <svg viewBox="0 0 127.14 96.36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.67,77.67,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.18ZM42.56,65.36c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.84,9.8,10.74c0,5.91-4.4,10.74-9.8,10.74Zm42,0c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.84,9.8,10.74c0,5.91-4.4,10.74-9.8,10.74Z" fill="#5865F2"/>
        </svg>
      );
    case 'Google Calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V2h-2zm1 4v3H7V6h10zM7 20v-9h10v9H7z" fill="#4285F4"/>
          <path d="M12 13h4v4h-4z" fill="#34A853"/>
        </svg>
      );
    case 'Apple Calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#E5E5EA"/>
          <path d="M2 7h20v2H2V7z" fill="#FF3B30"/>
          <text x="12" y="15" fontSize="8" fontWeight="bold" fontFamily="system-ui" textAnchor="middle" fill="#000">14</text>
        </svg>
      );
    case 'Outlook Calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" fill="#0078D4"/>
          <path d="M8 8h2v2H8V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zM8 12h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM8 16h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" fill="#FFF"/>
        </svg>
      );
    case 'Google Drive':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M8.2 2H15.8L23.4 15H15.8L8.2 2Z" fill="#FFC107"/>
          <path d="M0.6 15L4.4 21.6H19.6L15.8 15H0.6Z" fill="#4CAF50"/>
          <path d="M8.2 2L0.6 15L4.4 21.6L12 8.6L8.2 2Z" fill="#2196F3"/>
        </svg>
      );
    case 'Dropbox':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.6L4.3 7.4L12 11.2L19.7 7.4L12 2.6Z" fill="#0061FE"/>
          <path d="M4.3 7.4L12 11.2L4.3 16L-0 12.2L4.3 7.4Z" fill="#0061FE"/>
          <path d="M19.7 7.4L12 11.2L19.7 16L24 12.2L19.7 7.4Z" fill="#0061FE"/>
          <path d="M12 12.2L4.3 17L12 20.8L19.7 17L12 12.2Z" fill="#0061FE"/>
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
        </svg>
      );
    case 'Jira':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12.923 10.384l3.153-3.153a4.462 4.462 0 1 1 6.31 6.31l-3.23 3.23L12.923 10.38l.001.004zM10.385 12.923l3.23 3.23a4.462 4.462 0 1 1-6.31 6.31l-3.154-3.154 6.234-6.386zm-6.077-6.077L10.616 1.5l3.538 3.538-3.538 3.538-3.538-3.538-.001.001A4.453 4.453 0 0 0 1.616 1.615l2.692 2.692v2.539z" fill="#0052CC"/>
        </svg>
      );
    case 'Salesforce':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8.5C16 6.015 13.985 4 11.5 4S7 6.015 7 8.5c0 .355.045.698.125 1.026C5.352 9.873 4 11.365 4 13.167 4 15.284 5.716 17 7.833 17h8.334C18.284 17 20 15.284 20 13.167c0-2.072-1.649-3.757-3.69-3.829z" fill="#00A1E0"/>
        </svg>
      );
    case 'HubSpot':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4.5L16.5 12L12 19.5L7.5 12L12 4.5Z" fill="#FF7A59"/>
          <circle cx="12" cy="12" r="3.5" fill="#2E3F50"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
        </svg>
      );
  }
}
