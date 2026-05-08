import React from 'react';
import { appIndex } from '../appIndex.js';

export default function Page000() {
  return (
    <article style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>KANE インデックス</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>全{appIndex.length}ページ。左のサイドバーから選択してください。</p>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        {appIndex.slice(1).map(e => (
          <li key={e.id}>
            <span style={{ opacity: 0.6, marginRight: 8 }}>{String(e.id).padStart(3, '0')}</span>
            {e.title}
            {e.stub && <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.5 }}>(stub)</span>}
          </li>
        ))}
      </ul>
    </article>
  );
}
