'use client';

import { useState } from 'react';
import Logo from '@/components/Logo';
import { useLang } from '@/components/i18n/LanguageProvider';
import { useToast } from '@/components/ToastProvider';

const AMOUNTS = [25, 50, 100];

export default function GiftPage() {
  const { lang } = useLang();
  const { toast } = useToast();
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState<string | null>(null);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [msg, setMsg] = useState('');
  const [code, setCode] = useState<string | null>(null);

  const value = custom !== null ? Math.max(5, parseFloat(custom) || 0) : amount;
  const es = lang === 'es';

  const generate = () => {
    const c =
      'LP-GIFT-' +
      Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
    setCode(c);
    toast(es ? 'Tarjeta creada' : 'Gift card created', '🎁');
  };

  const copy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    toast(es ? 'Código copiado' : 'Code copied', '🔗');
  };

  return (
    <main className="min-h-screen pb-28 pt-32">
      <div className="container-x grid max-w-4xl gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-magma">{es ? 'Tarjeta de regalo' : 'Gift cards'}</p>
          <h1 className="mt-3 kinetic text-5xl text-ash md:text-6xl">
            {es ? 'Regala' : 'Give the gift of'} <span className="text-magma-grad">{es ? 'fuego' : 'fire'}</span>
          </h1>

          <div className="mt-8 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-ash/60">{es ? 'Monto' : 'Amount'}</span>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      setAmount(a);
                      setCustom(null);
                    }}
                    data-cursor
                    className={`rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
                      custom === null && amount === a
                        ? 'border-magma bg-magma text-obsidian'
                        : 'border-ash/20 text-ash/70 hover:border-magma'
                    }`}
                  >
                    ${a}
                  </button>
                ))}
                <button
                  onClick={() => setCustom((c) => (c === null ? '' : c))}
                  data-cursor
                  className={`rounded-lg border py-2.5 text-xs font-semibold uppercase transition-colors ${
                    custom !== null ? 'border-magma bg-magma text-obsidian' : 'border-ash/20 text-ash/70 hover:border-magma'
                  }`}
                >
                  {es ? 'Otro' : 'Custom'}
                </button>
              </div>
              {custom !== null && (
                <input
                  type="number"
                  min={5}
                  autoFocus
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="75"
                  className="mt-2 w-full rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-2.5 text-sm text-ash outline-none focus:border-magma"
                />
              )}
            </div>
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder={es ? 'Para' : 'To'} className="w-full rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-3 text-sm text-ash outline-none placeholder:text-ash/30 focus:border-magma" />
            <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder={es ? 'De' : 'From'} className="w-full rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-3 text-sm text-ash outline-none placeholder:text-ash/30 focus:border-magma" />
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={2} placeholder={es ? 'Mensaje (opcional)' : 'Message (optional)'} className="w-full rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-3 text-sm text-ash outline-none placeholder:text-ash/30 focus:border-magma" />

            <div className="flex flex-wrap gap-3">
              <button onClick={generate} data-cursor className="rounded-full bg-magma px-8 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-105">
                {es ? 'Crear tarjeta' : 'Create card'}
              </button>
              {code && (
                <button onClick={() => window.print()} data-cursor className="rounded-full border border-magma/50 px-6 py-3 text-sm uppercase tracking-widest text-magma hover:bg-magma hover:text-obsidian">
                  🖨 {es ? 'Imprimir' : 'Print'}
                </button>
              )}
            </div>
            <p className="text-xs text-ash/40">
              {es
                ? 'Demo — canjeable solo en persona en este sitio conceptual.'
                : 'Demo — redeemable in person only on this concept site.'}
            </p>
          </div>
        </div>

        {/* live preview */}
        <div className="print:col-span-2">
          <div className="relative overflow-hidden rounded-3xl border border-magma/30 bg-gradient-to-br from-coal via-obsidian to-[#2a0f08] p-8 shadow-2xl shadow-magma/10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-magma/25 blur-3xl" />
            <div className="flex items-center justify-between">
              <Logo className="h-12 w-12" />
              <span className="kinetic text-4xl text-magma-grad">${value.toFixed(0)}</span>
            </div>
            <p className="mt-6 kinetic text-3xl text-ash">Las Placitas</p>
            <p className="text-xs uppercase tracking-[0.3em] text-ash/50">
              {es ? 'Tarjeta de regalo' : 'Gift card'}
            </p>
            <div className="mt-6 space-y-1 text-sm text-ash/75">
              {to && <p>{es ? 'Para' : 'To'}: <span className="text-ash">{to}</span></p>}
              {from && <p>{es ? 'De' : 'From'}: <span className="text-ash">{from}</span></p>}
              {msg && <p className="italic text-ash/60">&ldquo;{msg}&rdquo;</p>}
            </div>
            <div className="mt-8 flex items-center justify-between rounded-xl border border-dashed border-magma/40 bg-obsidian/60 px-4 py-3">
              <span className="font-mono text-lg tracking-widest text-acid">{code ?? 'LP-GIFT-····'}</span>
              {code && (
                <button onClick={copy} data-cursor className="text-xs uppercase tracking-widest text-magma hover:text-ash print:hidden">
                  {es ? 'Copiar' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
