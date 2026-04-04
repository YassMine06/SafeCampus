import { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';

/* ─── Bar chart data ────────────────────────────────────────────── */
const BARS = [
  { label: 'Feel uncomfortable', pct: 60, color: '#dc2626' },
  { label: 'Self-censor ideas',  pct: 52, color: '#ea580c' },
  { label: 'Less participation', pct: 45, color: '#d97706' },
  { label: 'Report anxiety',     pct: 71, color: '#7c3aed' },
];

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
      <div className="slide-num">Slide 02 — The Problem</div>
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
      <div className="slide-num">Slide 03 — Evidence</div>
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
      <div className="slide-num">Slide 04 — Our Solution</div>
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
      <div className="slide-num">Slide 05 — System Overview</div>
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
      <div className="slide-num">Slide 06 — Why SafeCamp?</div>
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

  /* 6 – Risk & Mitigation */
  () => (
    <div className="slide-inner">
      <div className="slide-num">Slide 07 — Risk &amp; Ethics</div>
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
      <div className="slide-num">Slide 08 — X Factor</div>
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
      <div className="slide-num">Slide 09 — Conclusion</div>
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
  'slide-howitworks', 'slide-whybetter', 'slide-risk', 'slide-guardians', 'slide-conclusion',
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
