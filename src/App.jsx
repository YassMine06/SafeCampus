import { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';

/* ─── Bar chart data ────────────────────────────────────────────── */
const BARS = [
  { label: 'Feel uncomfortable', pct: 60, color: '#dc2626' },
  { label: 'Self-censor ideas',  pct: 52, color: '#ea580c' },
  { label: 'Less participation', pct: 45, color: '#d97706' },
  { label: 'Report anxiety',     pct: 71, color: '#7c3aed' },
];

/* ─── Demo: Campus map zone ──────────────────────────────────────── */
const MAP_ZONES = [
  { id: 'lib',    label: 'Library',      status: 'red',    row: 0, col: 0, span: 2 },
  { id: 'cafe',   label: 'Cafeteria',    status: 'yellow', row: 0, col: 2, span: 1 },
  { id: 'gatea',  label: 'Gate A',       status: 'green',  row: 0, col: 3, span: 1 },
  { id: 'sports', label: 'Sports Hall',  status: 'green',  row: 1, col: 0, span: 1 },
  { id: 'lab',    label: 'Lab Block',    status: 'yellow', row: 1, col: 1, span: 1 },
  { id: 'admin',  label: 'Admin',        status: 'green',  row: 1, col: 2, span: 1 },
  { id: 'gateb',  label: 'Gate B',       status: 'red',    row: 1, col: 3, span: 1 },
  { id: 'park',   label: 'Parking',      status: 'green',  row: 2, col: 0, span: 2 },
  { id: 'dorm',   label: 'Dormitory',    status: 'green',  row: 2, col: 2, span: 2 },
];

const LIVE_ALERTS = [
  { id: 1, icon: '🔴', text: 'High crowd density – Library',      time: '2 min ago',  level: 'high'   },
  { id: 2, icon: '🟠', text: 'Unusual movement – Gate B',         time: '5 min ago',  level: 'medium' },
  { id: 3, icon: '🟡', text: 'Elevated density – Lab Block',      time: '11 min ago', level: 'low'    },
  { id: 4, icon: '🟢', text: 'All clear – Sports Hall',           time: '15 min ago', level: 'ok'     },
];

const LEADERBOARD = [
  { rank: 1, name: 'Alex M.',   pts: 1240, badge: '🥇' },
  { rank: 2, name: 'Sara K.',   pts: 1105, badge: '🥈' },
  { rank: 3, name: 'Omar B.',   pts:  980, badge: '🥉' },
  { rank: 4, name: 'Léa T.',    pts:  870, badge: '🏅' },
  { rank: 5, name: 'Youssef A.',pts:  754, badge: '🏅' },
];

/* ─── Demo Dashboard component ───────────────────────────────────── */
function DemoDashboard() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="demo-panel">
      <div className="demo-two-col">
        {/* Campus Map */}
        <div className="demo-card demo-map-card">
          <div className="demo-card-title">🗺️ Campus Map — Live View</div>
          <div className="campus-grid">
            {MAP_ZONES.map(z => (
              <div
                key={z.id}
                className={`campus-zone zone-${z.status}`}
                style={{ gridColumn: `span ${z.span}` }}
              >
                <span className="zone-label">{z.label}</span>
                <span className={`zone-dot ${pulse && z.status === 'red' ? 'pulse' : ''}`} />
              </div>
            ))}
          </div>
          <div className="map-legend">
            <span className="ml-item"><span className="ml-dot green" />Safe</span>
            <span className="ml-item"><span className="ml-dot yellow" />Warning</span>
            <span className="ml-item"><span className="ml-dot red" />Risk</span>
          </div>
        </div>

        <div className="demo-right-col">
          {/* Stats */}
          <div className="demo-stats-row">
            <div className="demo-stat-box">
              <div className="dsb-value">12</div>
              <div className="dsb-label">Active Zones</div>
            </div>
            <div className="demo-stat-box warn">
              <div className="dsb-value">4</div>
              <div className="dsb-label">Alerts Today</div>
            </div>
            <div className="demo-stat-box ok">
              <div className="dsb-value">✅</div>
              <div className="dsb-label">System OK</div>
            </div>
          </div>

          {/* Live Alerts */}
          <div className="demo-card demo-alerts-card">
            <div className="demo-card-title">🔔 Live Alerts</div>
            <div className="alerts-list">
              {LIVE_ALERTS.map(a => (
                <div key={a.id} className={`alert-item alert-${a.level}`}>
                  <span className="alert-icon">{a.icon}</span>
                  <span className="alert-text">{a.text}</span>
                  <span className="alert-time">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Demo Student App component ─────────────────────────────────── */
function DemoStudentApp() {
  const [sharing, setSharing] = useState(false);
  const [points, setPoints] = useState(320);
  const [reported, setReported] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleReport = () => {
    if (!reported) {
      setReported(true);
      setPoints(p => p + 50);
      setTimeout(() => setReported(false), 2500);
    }
  };
  const handleJoin = () => {
    if (!joined) { setJoined(true); setPoints(p => p + 100); }
  };

  return (
    <div className="demo-panel student-app-panel">
      <div className="phone-mockup">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-header">
            <span>🛡️ SafeCamp</span>
            <span className="phone-status">● Live</span>
          </div>

          <div className="phone-points-box">
            <div className="pp-value">⭐ {points} pts</div>
            <div className="pp-label">Your Guardian Points</div>
            <div className="pp-bar"><div className="pp-fill" style={{ width: `${Math.min(points/20, 100)}%` }} /></div>
          </div>

          <div className="phone-toggle-row">
            <span className="pt-label">Share Anonymous Presence</span>
            <button
              className={`toggle-btn ${sharing ? 'on' : 'off'}`}
              onClick={() => setSharing(s => !s)}
              aria-label="Toggle anonymous sharing"
            >
              <span className="toggle-thumb" />
            </button>
          </div>
          {sharing && <div className="sharing-badge">📡 Broadcasting anonymously...</div>}

          <button className={`phone-btn join-btn ${joined ? 'done' : ''}`} onClick={handleJoin}>
            {joined ? '✅ Joined Network!' : '👋 Join Safety Network'}
          </button>

          <button
            className={`phone-btn report-btn ${reported ? 'done' : ''}`}
            onClick={handleReport}
          >
            {reported ? '✅ Report Sent (+50 pts)' : '🚨 Report Incident'}
          </button>

          <div className="phone-rewards">
            <div className="reward-chip">🎁 Cafeteria 10% off</div>
            <div className="reward-chip">🎟️ Event Access</div>
          </div>
        </div>
      </div>

      <div className="student-app-info">
        <h3 className="sai-title">Student App Features</h3>
        {[
          { icon: '🔒', t: 'Fully Anonymous', d: 'Your identity is never revealed to anyone.' },
          { icon: '📡', t: 'Presence Sharing', d: 'Opt-in anonymous signal — no GPS or name.' },
          { icon: '🚨', t: 'Incident Reports', d: 'Alert security instantly and earn points.' },
          { icon: '⭐', t: 'Earn Rewards',     d: 'Points → badges → real campus perks.' },
        ].map(f => (
          <div className="sai-feature" key={f.t}>
            <span className="sai-icon">{f.icon}</span>
            <div><div className="sai-feat-title">{f.t}</div><div className="sai-feat-desc">{f.d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Demo Guardians component ───────────────────────────────────── */
function DemoGuardians() {
  return (
    <div className="demo-panel guardians-panel">
      <div className="badges-row">
        {[
          { icon: '🥉', name: 'Bronze', pts: '0–500',   color: '#cd7f32', bg: '#fff7ed' },
          { icon: '🥈', name: 'Silver', pts: '501–1000', color: '#9ca3af', bg: '#f9fafb' },
          { icon: '🥇', name: 'Gold',   pts: '1001+',   color: '#d97706', bg: '#fffbeb' },
        ].map(b => (
          <div className="badge-card" key={b.name} style={{ background: b.bg, borderColor: b.color }}>
            <div className="badge-icon">{b.icon}</div>
            <div className="badge-name" style={{ color: b.color }}>{b.name}</div>
            <div className="badge-pts">{b.pts} pts</div>
          </div>
        ))}
      </div>

      <div className="leaderboard">
        <div className="lb-title">🏆 Top Guardians This Week</div>
        {LEADERBOARD.map(l => (
          <div className={`lb-row ${l.rank === 1 ? 'lb-first' : ''}`} key={l.rank}>
            <span className="lb-badge">{l.badge}</span>
            <span className="lb-rank">#{l.rank}</span>
            <span className="lb-name">{l.name}</span>
            <span className="lb-pts">{l.pts} pts</span>
            <div className="lb-bar"><div className="lb-fill" style={{ width: `${(l.pts/1240)*100}%` }} /></div>
          </div>
        ))}
      </div>

      <div className="how-earn">
        <div className="he-title">How to Earn Points</div>
        <div className="he-grid">
          {[
            { icon: '📡', t: 'Share Presence', pts: '+10/day' },
            { icon: '🚨', t: 'Report Incident', pts: '+50' },
            { icon: '✅', t: 'Verified Report', pts: '+100' },
            { icon: '🗓️', t: '7-Day Streak',    pts: '+200' },
          ].map(h => (
            <div className="he-item" key={h.t}>
              <span className="he-icon">{h.icon}</span>
              <span className="he-text">{h.t}</span>
              <span className="he-pts">{h.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Demo Privacy component ─────────────────────────────────────── */
function DemoPrivacy() {
  return (
    <div className="demo-panel privacy-panel">
      <div className="privacy-cards">
        {[
          { icon: '🚫', title: 'No Facial Recognition',   desc: 'Cameras detect motion patterns only. Zero face data is captured or stored.', color: '#dc2626', bg: '#fff1f2' },
          { icon: '🙈', title: 'No Personal Data',        desc: 'No names, IDs, or photos are ever collected. You are just an anonymous signal.', color: '#7c3aed', bg: '#f5f3ff' },
          { icon: '👤', title: 'Fully Anonymous System',  desc: 'All data is aggregated and anonymized before any analysis takes place.', color: '#0369a1', bg: '#eff6ff' },
          { icon: '⏱️', title: 'Auto-Delete in 24h',      desc: 'All sensor data is automatically purged every 24 hours — no long-term storage.', color: '#059669', bg: '#ecfdf5' },
        ].map(p => (
          <div className="privacy-card" key={p.title} style={{ background: p.bg, borderColor: p.color + '55' }}>
            <div className="priv-icon" style={{ color: p.color }}>{p.icon}</div>
            <div className="priv-title" style={{ color: p.color }}>{p.title}</div>
            <div className="priv-desc">{p.desc}</div>
          </div>
        ))}
      </div>
      <div className="privacy-footer">
        <div className="pf-badge">🔐 GDPR Compliant</div>
        <div className="pf-badge">🏛️ Ethical AI Charter</div>
        <div className="pf-badge">✅ University Approved</div>
      </div>
    </div>
  );
}

/* ─── Main Demo Interface (tabbed slide) ─────────────────────────── */
const DEMO_TABS = [
  { id: 'dashboard', label: '🖥️ Dashboard',   Component: DemoDashboard },
  { id: 'app',       label: '📱 Student App',  Component: DemoStudentApp },
  { id: 'guardians', label: '🏆 Guardians',    Component: DemoGuardians },
  { id: 'privacy',   label: '🔐 Privacy',      Component: DemoPrivacy },
];

function DemoInterface() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const Tab = DEMO_TABS.find(t => t.id === activeTab).Component;
  return (
    <div className="demo-interface">
      <div className="demo-topbar">
        <div className="demo-topbar-left">
          <span className="dtb-dot red" /><span className="dtb-dot yellow" /><span className="dtb-dot green" />
          <span className="dtb-url">safecampus.edu / dashboard</span>
        </div>
        <div className="demo-topbar-right">🔒 Secure · Private · Anonymous</div>
      </div>
      <div className="demo-tabs">
        {DEMO_TABS.map(t => (
          <button
            key={t.id}
            className={`demo-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="demo-content">
        <Tab />
      </div>
    </div>
  );
}

function BarChart({ active }) {
  return (
    <div className="chart-container">
      <div className="chart-label-text">Impact of Surveillance on Student Behavior (%)</div>
      {BARS.map(b => (
        <div className="chart-row" key={b.label}>
          <div className="chart-row-label">{b.label}</div>
          <div className="chart-track">
            <div
              className="chart-fill"
              style={{ background: b.color, width: active ? `${b.pct}%` : '0%' }}
            >
              {b.pct}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Flow step ─────────────────────────────────────────────────── */
function FlowStep({ icon, label, isLast }) {
  return (
    <div className="flow-step">
      <div className="flow-box">
        <span className="flow-icon">{icon}</span>
        {label}
      </div>
      {!isLast && <div className="flow-arrow">→</div>}
    </div>
  );
}

/* ─── Slides definition ─────────────────────────────────────────── */
/* Each slide is a render function that receives { isActive } */
const SLIDES = [
  /* 0 – Cover */
  ({ isActive }) => (
    <div className="slide-inner">
      <div className="slide-num">Group 7 · Privacy vs Safety Paradox</div>
      <div className="cover-badge">🛡️ Smart Campus Security</div>
      <h1 className="cover-title">SAFECAMP</h1>
      <p className="cover-tagline">Smart Campus Security Without Surveillance</p>
      <p className="cover-group">Privacy vs Safety Paradox — Group 7</p>
      <div className="quote-block">"Safety should protect students, not control them."</div>
      <div className="hero-pills">
        <div className="hero-pill green">✅ Privacy First</div>
        <div className="hero-pill blue">🤖 AI-Powered</div>
        <div className="hero-pill purple">🎓 Student-Centered</div>
      </div>
    </div>
  ),

  /* 1 – The Problem */
  () => (
    <div className="slide-inner">
      <div className="slide-num">The Problem</div>
      <h2>⚠️ The Problem</h2>
      <p className="problem-intro">
        After a security threat, the university plans to install facial tracking systems.
        But this creates serious issues:
      </p>
      <ul className="bullet-list bad-list">
        <li><span className="b-icon">🔒</span><span><strong>Loss of privacy</strong> — every face identified and logged</span></li>
        <li><span className="b-icon">👁️</span><span><strong>Constant surveillance feeling</strong> — students feel watched at all times</span></li>
        <li><span className="b-icon">😰</span><span><strong>Stress and anxiety</strong> — behavioral changes under pressure</span></li>
        <li><span className="b-icon">🤐</span><span><strong>Reduced freedom of expression</strong> — self-censorship kicks in</span></li>
      </ul>
      <div className="quote-block">A safe campus should not feel like a prison.</div>
    </div>
  ),

  /* 2 – Chilling Effect */
  ({ isActive }) => (
    <div className="slide-inner">
      <div className="slide-num">Evidence</div>
      <h2>📊 The Chilling Effect</h2>
      <p className="slide-subtitle">Constant surveillance changes behavior — and the data proves it.</p>
      <BarChart active={isActive} />
      <div className="stat-card">
        <div className="stat-big">60%</div>
        <div className="stat-text">
          of students feel uncomfortable expressing themselves<br />
          <strong>when they know they are being monitored</strong>
        </div>
      </div>
    </div>
  ),

  /* 3 – Solution */
  () => (
    <div className="slide-inner">
      <div className="slide-num">Our Solution</div>
      <h2>🌿 SafeCamp: Privacy-First Security</h2>
      <p className="slide-subtitle">We monitor situations, not people.</p>
      <ul className="check-list">
        <li><span className="check-dot">✓</span>No facial recognition — anonymous by design</li>
        <li><span className="check-dot">✓</span>No identity tracking — only behavioral patterns</li>
        <li><span className="check-dot">✓</span>Fully anonymous — zero personal data collected</li>
      </ul>
      <p style={{ marginTop: 22, fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-500)' }}>
        Technologies used:
      </p>
      <div className="tech-tags">
        {['📡 Motion Detection', '👥 Crowd Analysis', '🤖 AI Anomaly Detection',
          '🗺️ Heatmap Visualization', '🔐 Anonymization Layer'].map(t => (
          <span className="tech-tag" key={t}>{t}</span>
        ))}
      </div>
    </div>
  ),

  /* 4 – How It Works */
  () => (
    <div className="slide-inner">
      <div className="slide-num">System Overview</div>
      <h2>⚙️ How It Works</h2>
      <p className="slide-subtitle">A simple, transparent pipeline — no personal data at any stage.</p>
      <div className="flow-wrapper">
        {[
          { icon: '📷', label: 'Camera /\nSensors' },
          { icon: '🤖', label: 'AI\nAnalysis' },
          { icon: '🔐', label: 'Anonymi-\nzation' },
          { icon: '🗺️', label: 'Heatmap' },
          { icon: '🔔', label: 'Real-Time\nAlerts' },
        ].map((s, i, arr) => (
          <FlowStep key={s.label} icon={s.icon} label={s.label} isLast={i === arr.length - 1} />
        ))}
      </div>
      <div className="legend-row">
        <div className="legend-item"><span className="legend-dot" style={{ background: '#22c55e' }} />Safe Zones</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#eab308' }} />Unusual Activity</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} />Risk Detected</div>
      </div>
      <div className="quote-block" style={{ marginTop: 18 }}>No personal data stored — ever.</div>
    </div>
  ),

  /* 5 – Why It's Better */
  () => (
    <div className="slide-inner">
      <div className="slide-num">Why SafeCamp?</div>
      <h2>🏆 Why It&apos;s Better</h2>
      <div className="card-grid cols-2">
        {[
          { icon: '🔒', title: 'Respects Privacy',        desc: 'Zero identity data collected. Students remain fully anonymous at all times.' },
          { icon: '🤝', title: 'Builds Trust',            desc: 'Transparent, ethical system that students and staff can believe in.' },
          { icon: '😌', title: 'Reduces Fear',            desc: 'No more anxiety of being watched. Freedom of expression is restored.' },
          { icon: '🤲', title: 'Encourages Cooperation',  desc: 'When trust exists, people actively participate in keeping campus safe.' },
        ].map(c => (
          <div className="card" key={c.title}>
            <div className="card-icon">{c.icon}</div>
            <div className="card-title">{c.title}</div>
            <div className="card-desc">{c.desc}</div>
          </div>
        ))}
      </div>
      <div className="quote-block" style={{ marginTop: 18 }}>Trust creates real security.</div>
    </div>
  ),

  /* 5.5 – Demo Intro (inserted after slide 5) */
  () => (
    <div className="slide-inner demo-intro-inner">
      <div className="slide-num">Live Demo</div>
      <div className="demo-intro-badge">🎬 Interactive Prototype</div>
      <h2 className="demo-intro-title">See SafeCamp in Action</h2>
      <p className="demo-intro-sub">A real-time prototype of our privacy-first security system</p>
      <div className="demo-preview-cards">
        {[
          { icon: '🗺️', label: 'Campus Map' },
          { icon: '📱', label: 'Student App' },
          { icon: '🏆', label: 'Guardians' },
          { icon: '🔐', label: 'Privacy' },
        ].map(p => (
          <div className="dpc-item" key={p.label}>
            <span className="dpc-icon">{p.icon}</span>
            <span className="dpc-label">{p.label}</span>
          </div>
        ))}
      </div>
      <p className="demo-nav-hint">Press → or click the arrow to launch the demo interface</p>
    </div>
  ),

  /* 5.6 – Demo Interface */
  () => (
    <div className="slide-inner demo-full-inner">
      <div className="demo-header-row">
        <div>
          <div className="slide-num">Live Demo – SafeCamp System</div>
          <h2 className="demo-h2">Interactive Demo</h2>
        </div>
      </div>
      <DemoInterface />
    </div>
  ),

  /* 6 – Risk & Mitigation */
  () => (
    <div className="slide-inner">
      <div className="slide-num">Risk &amp; Ethics</div>
      <h2>⚖️ Risk &amp; Mitigation</h2>
      <p className="slide-subtitle">We anticipated the challenges and designed transparent safeguards.</p>
      <div className="risk-grid">
        <div className="risk-box danger">
          <div className="risk-box-title">⚠️ The Risk</div>
          <ul className="risk-items">
            <li><span>⚡</span><span>False alerts triggered by normal campus events</span></li>
            <li><span>🏃</span><span>Sports, concerts, and large gatherings misread</span></li>
            <li><span>🔊</span><span>Routine activities flagged as threats</span></li>
          </ul>
        </div>
        <div className="risk-box safe">
          <div className="risk-box-title">✅ Our Solution</div>
          <ul className="risk-items">
            <li><span>👤</span><span>Human validation required before any action</span></li>
            <li><span>🚫</span><span>No automatic punishment — ever</span></li>
            <li><span>🕐</span><span>All sensor data deleted after 24 hours</span></li>
          </ul>
        </div>
      </div>
      <div className="quote-block" style={{ marginTop: 18 }}>Technology assists — humans decide.</div>
    </div>
  ),

  /* 7 – Campus Guardians */
  () => (
    <div className="slide-inner">
      <div className="slide-num">X Factor</div>
      <h2>🌟 Campus Guardians Program</h2>
      <p className="slide-subtitle">100% voluntary — students become partners in safety.</p>
      <div className="reward-grid">
        {[
          { icon: '⭐', title: 'Points System', desc: 'Earn points for each safety contribution you make on campus.' },
          { icon: '🏅', title: 'Badges',        desc: 'Unlock Guardian badges and recognition from the university.' },
          { icon: '🎁', title: 'Rewards',       desc: 'Cafeteria discounts, event access, and exclusive campus perks.' },
          { icon: '🤝', title: 'Community',     desc: 'Build a culture of shared responsibility and mutual care.' },
        ].map(r => (
          <div className="reward-card" key={r.title}>
            <div className="reward-icon">{r.icon}</div>
            <div className="reward-title">{r.title}</div>
            <div className="reward-desc">{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  ),

  /* 8 – Conclusion */
  () => (
    <div className="slide-inner">
      <div className="slide-num">Conclusion</div>
      <h2>A New Vision of Security</h2>
      <p className="slide-subtitle">Not surveillance. Not control.</p>
      <div className="conclusion-pillars">
        <div className="pillar trust">🤝 Trust</div>
        <div className="pillar privacy">🔒 Privacy</div>
        <div className="pillar safety">🛡️ Safety</div>
      </div>
      <div className="final-quote">"We protect students without knowing who they are."</div>
      <p className="final-sub">Security and privacy can — and must — coexist on a modern campus.</p>
    </div>
  ),
];

const SLIDE_CLASSES = [
  'slide-cover', 'slide-problem', 'slide-chilling', 'slide-solution',
  'slide-howitworks', 'slide-whybetter',
  'slide-demo-intro', 'slide-demo-interface',
  'slide-risk', 'slide-guardians', 'slide-conclusion',
];

const TOTAL = SLIDES.length;

/* ─── Slide state machine ────────────────────────────────────────
   Each slide can be in one of these states:
   'hidden'         → display:none equivalent (not rendered with transitions)
   'enter-forward'  → starting position when coming in going forward
   'enter-back'     → starting position when coming in going backward
   'active'         → fully visible, in place
   'exit-forward'   → zooms forward and out (leaving going forward)
   'exit-back'      → shrinks back (leaving going backward)
────────────────────────────────────────────────────────────────── */
function buildStates(current) {
  return SLIDES.map((_, i) => {
    if (i === current) return 'active';
    return 'hidden';
  });
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [states, setStates]   = useState(() => buildStates(0));
  const [barsAnimated, setBarsAnimated] = useState(false);
  const animating = useRef(false);

  /* Navigate to a slide */
  const goTo = useCallback((next) => {
    if (next < 0 || next >= TOTAL || animating.current) return;
    const prev = current; // capture before state updates
    const forward = next > prev;
    animating.current = true;

    /* Phase 1: set exit on current, set enter-position on next */
    setStates(s => s.map((_, i) => {
      if (i === prev) return forward ? 'exit-forward' : 'exit-back';
      if (i === next) return forward ? 'enter-forward' : 'enter-back';
      return 'hidden';
    }));

    /* Phase 2: after a tiny delay, activate next slide
       The tiny delay lets the browser apply the enter-* class first
       so the transition has a starting point */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setStates(s => s.map((_, i) => {
          if (i === next) return 'active';
          if (i === prev) return forward ? 'exit-forward' : 'exit-back';
          return 'hidden';
        }));
        setCurrent(next);

        // Animate bars when landing on slide 3 (index 2)
        if (next === 2) setBarsAnimated(true);
        else if (next !== 2) setBarsAnimated(false);
      });
    });

    /* Phase 3: clean up exiting slide after transition */
    setTimeout(() => {
      setStates(s => s.map((state, i) => (i === next ? 'active' : 'hidden')));
      animating.current = false;
    }, 600);
  }, [current]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  const progress = `${((current + 1) / TOTAL) * 100}%`;

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar" style={{ width: progress }} />

      {/* Logo */}
      <div className={`logo-bar ${SLIDE_CLASSES[current]}`}>🛡️ SafeCamp</div>

      {/* Keyboard hint */}
      <div className={`key-hint ${SLIDE_CLASSES[current]}`}>← → to navigate</div>

      {/* Presentation stage */}
      <div className="stage">
        {SLIDES.map((SlideContent, i) => {
          const state = states[i];
          if (state === 'hidden') return null;
          return (
            <div
              key={i}
              className={`slide ${SLIDE_CLASSES[i]} ${state}`}
            >
              <SlideContent isActive={i === current && barsAnimated} />
            </div>
          );
        })}
      </div>

      {/* Bottom navigation */}
      <nav className="nav">
        <button
          id="btn-prev"
          className="nav-btn"
          aria-label="Previous slide"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          ←
        </button>

        <div className="nav-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`nav-dot${current === i ? ' active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="nav-counter">{current + 1} / {TOTAL}</div>

        <button
          id="btn-next"
          className="nav-btn"
          aria-label="Next slide"
          onClick={() => goTo(current + 1)}
          disabled={current === TOTAL - 1}
        >
          →
        </button>
      </nav>
    </>
  );
}
