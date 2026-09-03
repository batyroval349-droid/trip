import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ServiceBoundaries: React.FC = () => {
  return (
    <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <ShieldCheck size={16} style={{ color: 'var(--accent-emerald)' }} />
        <span>100% Remote Advisory Notice: All planning is remote; no physical apartment visits or realtor services provided.</span>
      </div>
    </div>
  );
};
