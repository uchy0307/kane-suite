import React, { useState, useEffect } from 'react';
import App from './App.jsx';
import { codeHashes } from './codeHashes.js';

const STORAGE_KEY = 'KANE_GATE_OK';

async function sha256(text) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function AppGate() {
  const [ok, setOk] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') setOk(true);
  }, []);

  async function tryUnlock() {
    const h = await sha256(code.trim());
    if (codeHashes.includes(h)) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setOk(true);
    } else {
      setError('コードが一致しません');
    }
  }

  if (ok) return <App />;

  return (
    <div style={{ padding: 32, maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>KANE Gate</h1>
      <p style={{ opacity: 0.7, marginBottom: 16 }}>アクセスコードを入力してください。</p>
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="code"
        style={{ width: '100%', padding: 12, fontSize: 16, borderRadius: 8, border: '1px solid #334155', background: '#1e293b', color: '#e2e8f0' }}
      />
      <button
        onClick={tryUnlock}
        style={{ marginTop: 12, padding: '10px 16px', fontSize: 16, borderRadius: 8, border: 0, background: '#3b82f6', color: '#fff', cursor: 'pointer' }}
      >
        Unlock
      </button>
      {error && <p style={{ color: '#f87171', marginTop: 12 }}>{error}</p>}
    </div>
  );
}
