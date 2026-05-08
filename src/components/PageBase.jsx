import React from 'react';

/**
 * PageBase - data-driven shared page template for KANE.
 * Renders title, intro, multiple sections, and a conclusion from a JSON spec.
 */
export default function PageBase({ data }) {
  if (!data) return <div style={{ opacity: 0.6 }}>No data.</div>;
  const { id, title, lead, sections = [], conclusion, tags = [], stub } = data;

  if (stub) {
    return (
      <article style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 12, opacity: 0.6 }}>KANE-{String(id).padStart(3, '0')}</div>
        <h1 style={{ fontSize: 24, margin: '8px 0 16px' }}>{title}</h1>
        <p style={{ opacity: 0.7 }}>このページは予約済みのスタブです。本文は今後追加されます。</p>
      </article>
    );
  }

  return (
    <article style={{ maxWidth: 720, margin: '0 auto', lineHeight: 1.8 }}>
      <div style={{ fontSize: 12, opacity: 0.6 }}>KANE-{String(id).padStart(3, '0')}</div>
      <h1 style={{ fontSize: 28, margin: '8px 0 16px' }}>{title}</h1>
      {lead && <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24 }}>{lead}</p>}
      {sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 28 }}>
          {s.heading && <h2 style={{ fontSize: 20, marginBottom: 8 }}>{s.heading}</h2>}
          {(s.paragraphs || []).map((p, j) => (
            <p key={j} style={{ marginBottom: 12 }}>{p}</p>
          ))}
          {s.bullets && (
            <ul style={{ paddingLeft: 20 }}>
              {s.bullets.map((b, j) => <li key={j} style={{ marginBottom: 6 }}>{b}</li>)}
            </ul>
          )}
        </section>
      ))}
      {conclusion && (
        <section style={{ marginTop: 32, padding: 16, background: '#1e293b', borderRadius: 8 }}>
          <h3 style={{ fontSize: 16, marginBottom: 8 }}>まとめ</h3>
          <p>{conclusion}</p>
        </section>
      )}
      {tags.length > 0 && (
        <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map(t => (
            <span key={t} style={{ fontSize: 12, padding: '4px 8px', background: '#334155', borderRadius: 4 }}>#{t}</span>
          ))}
        </div>
      )}
    </article>
  );
}
