import React from 'react';
import { useLang } from '../context/LanguageContext';
import { Trophy, Radio } from 'lucide-react';

export default function Esports() {
  const { t } = useLang();

  // ดึงข้อมูล Mock ข้อมูลทีมไทยในตารางคะแนนปัจจุบัน
  const thaiTeams = [
    { rank: 1, name: "MiTH", killPoints: 45, placementPoints: 32, total: 77, status: "live" },
    { rank: 2, name: "Buriram United", killPoints: 38, placementPoints: 28, total: 66, status: "live" },
    { rank: 3, name: "Fierce Esports", killPoints: 29, placementPoints: 22, total: 51, status: "upcoming" },
    { rank: 4, name: "AAA Esports", killPoints: 20, placementPoints: 18, total: 38, status: "ended" },
    { rank: 5, name: "XERXIA", killPoints: 15, placementPoints: 12, total: 27, status: "ended" }
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', minHeight: '80vh' }}>
      <h2 className="apex-section-title">{t('thaiEsports')}</h2>

      <div style={{ backgroundColor: 'var(--apex-card-bg)', padding: '20px', border: '1px solid #232529', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #232529', color: 'var(--apex-light-gray)', fontSize: '14px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 8px' }}>Rank</th>
              <th style={{ padding: '12px 8px' }}>{t('team')}</th>
              <th style={{ padding: '12px 8px' }}>Kills</th>
              <th style={{ padding: '12px 8px' }}>Placements</th>
              <th style={{ padding: '12px 8px' }}>{t('score')}</th>
              <th style={{ padding: '12px 8px' }}>{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {thaiTeams.map((team) => (
              <tr key={team.rank} style={{ borderBottom: '1px solid #1c1d21', transition: 'background 0.2s' }}>
                <td style={{ padding: '15px 8px', fontWeight: 'bold', color: team.rank <= 3 ? 'var(--apex-gold)' : 'white' }}>
                  #{team.rank}
                </td>
                <td style={{ padding: '15px 8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={16} color={team.rank === 1 ? 'var(--apex-gold)' : 'gray'} />
                  {team.name}
                </td>
                <td style={{ padding: '15px 8px' }}>{team.killPoints}</td>
                <td style={{ padding: '15px 8px' }}>{team.placementPoints}</td>
                <td style={{ padding: '15px 8px', fontWeight: 'bold', color: 'var(--apex-gold)' }}>{team.total}</td>
                <td style={{ padding: '15px 8px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    padding: '3px 8px', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    backgroundColor: team.status === 'live' ? '#ff0000' : team.status === 'upcoming' ? '#333' : '#111',
                    color: 'white',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {team.status === 'live' && <Radio size={12} className="animate-pulse" />}
                    {t(team.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
