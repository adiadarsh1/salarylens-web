import { useMemo, useState } from 'react';
import { computeInHand, compareRegimes, type CtcInput } from '../lib/ctc';
import { formatINR, formatCompactINR } from '../lib/format';

interface Props {
  initialCtc?: number;
  initialBasicPct?: number;
  initialVariablePct?: number;
  initialPfOnActualBasic?: boolean;
  initialStock?: number;
}

const PT_ANNUAL = 2_400;

function Row({ label, value, sub, strong }: { label: string; value: string; sub?: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-2">
      <span className={strong ? 'font-medium text-ink' : 'text-slate-600'}>
        {label}
        {sub && <span className="ml-1 text-xs text-slate-400">{sub}</span>}
      </span>
      <span className={strong ? 'font-semibold text-ink' : 'text-slate-700'}>{value}</span>
    </div>
  );
}

export default function Calculator({
  initialCtc = 1_800_000,
  initialBasicPct = 45,
  initialVariablePct = 10,
  initialPfOnActualBasic = true,
  initialStock = 0,
}: Props) {
  const [ctc, setCtc] = useState(initialCtc);
  const [basicPct, setBasicPct] = useState(initialBasicPct);
  const [variablePct, setVariablePct] = useState(initialVariablePct);
  const [pfOnActualBasic, setPfOnActualBasic] = useState(initialPfOnActualBasic);
  const [stock, setStock] = useState(initialStock);
  const [deductions, setDeductions] = useState(150_000);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const input: CtcInput = {
    ctc,
    basicPct,
    variablePct,
    pfOnActualBasic,
    professionalTaxAnnual: PT_ANNUAL,
    stockAnnual: stock,
  };

  const b = useMemo(() => computeInHand(input), [ctc, basicPct, variablePct, pfOnActualBasic, stock]);
  const cmp = useMemo(() => compareRegimes(input, deductions), [ctc, basicPct, variablePct, pfOnActualBasic, deductions]);

  const monthly = b.inHandMonthly;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Inputs */}
      <div className="card p-5 lg:col-span-2">
        <label className="block text-sm font-medium text-slate-700">Annual CTC (cash, ₹)</label>
        <input
          type="number"
          value={ctc}
          min={0}
          step={50000}
          onChange={(e) => setCtc(Math.max(0, Number(e.target.value)))}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-lg font-semibold focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <input
          type="range"
          min={300000}
          max={10000000}
          step={50000}
          value={Math.min(ctc, 10000000)}
          onChange={(e) => setCtc(Number(e.target.value))}
          className="mt-3 w-full accent-brand-600"
        />
        <p className="mt-1 text-xs text-slate-400">{formatCompactINR(ctc)} per year</p>

        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          {showAdvanced ? '− Hide' : '+ Show'} advanced options
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
            <div>
              <label className="flex items-center justify-between text-sm text-slate-600">
                Basic salary <span className="font-medium text-ink">{basicPct}% of CTC</span>
              </label>
              <input type="range" min={30} max={60} value={basicPct} onChange={(e) => setBasicPct(Number(e.target.value))} className="w-full accent-brand-600" />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-slate-600">
                Variable / bonus <span className="font-medium text-ink">{variablePct}% of CTC</span>
              </label>
              <input type="range" min={0} max={30} value={variablePct} onChange={(e) => setVariablePct(Number(e.target.value))} className="w-full accent-brand-600" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Annual stock / RSU (₹, shown separately)</label>
              <input type="number" value={stock} min={0} step={50000} onChange={(e) => setStock(Math.max(0, Number(e.target.value)))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-500 focus:outline-none" />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={pfOnActualBasic} onChange={(e) => setPfOnActualBasic(e.target.checked)} className="h-4 w-4 accent-brand-600" />
              PF on actual basic (uncheck for ₹1,800/mo statutory cap)
            </label>
            <div>
              <label className="block text-sm text-slate-600">Old-regime deductions (80C/80D/HRA, ₹)</label>
              <input type="number" value={deductions} min={0} step={10000} onChange={(e) => setDeductions(Math.max(0, Number(e.target.value)))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-500 focus:outline-none" />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="card overflow-hidden">
          <div className="bg-brand-600 p-5 text-white">
            <p className="text-sm text-brand-50">Estimated monthly in-hand</p>
            <p className="text-4xl font-bold">{formatINR(monthly)}</p>
            <p className="mt-1 text-sm text-brand-50">
              {formatINR(b.inHandAnnual)} / year · {(b.takeHomePct * 100).toFixed(1)}% of cash CTC take-home
            </p>
          </div>
          <div className="divide-y divide-slate-100 p-5">
            <Row label="Cash CTC" value={formatINR(b.ctc)} strong />
            <Row label="Basic salary" value={formatINR(b.basic)} sub={`(${basicPct}%)`} />
            <Row label="Variable / bonus" value={formatINR(b.variableAnnual)} sub="(paid separately)" />
            <Row label="Employer PF" value={`− ${formatINR(b.employerPfAnnual)}`} />
            <Row label="Gratuity" value={`− ${formatINR(b.gratuityAnnual)}`} />
            <Row label="Employee PF" value={`− ${formatINR(b.employeePfAnnual)}`} />
            <Row label="Professional tax" value={`− ${formatINR(b.professionalTaxAnnual)}`} />
            <Row label="Income tax (new regime, incl. cess)" value={`− ${formatINR(b.incomeTaxAnnual)}`} />
            <Row label="Annual in-hand" value={formatINR(b.inHandAnnual)} strong />
            <Row label="Total EPF savings / year" value={formatINR(b.totalEpfAnnual)} sub="(your retirement corpus)" />
            {b.stockAnnual > 0 && <Row label="Stock / RSU per year" value={formatINR(b.stockAnnual)} sub="(separate from cash)" />}
          </div>
        </div>

        {/* Regime comparison */}
        <div className="card mt-4 p-5">
          <h3 className="text-sm font-semibold text-ink">New vs Old regime</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-3 ring-1 ${cmp.better === 'new' ? 'bg-brand-50 ring-brand-200' : 'ring-slate-100'}`}>
              <p className="text-xs text-slate-500">New regime</p>
              <p className="text-lg font-semibold text-ink">{formatINR(cmp.newRegime.inHandMonthly)}<span className="text-xs font-normal text-slate-400">/mo</span></p>
              <p className="text-xs text-slate-400">tax {formatINR(cmp.newRegime.incomeTaxAnnual)}</p>
            </div>
            <div className={`rounded-xl p-3 ring-1 ${cmp.better === 'old' ? 'bg-brand-50 ring-brand-200' : 'ring-slate-100'}`}>
              <p className="text-xs text-slate-500">Old regime</p>
              <p className="text-lg font-semibold text-ink">{formatINR(cmp.oldRegime.inHandMonthly)}<span className="text-xs font-normal text-slate-400">/mo</span></p>
              <p className="text-xs text-slate-400">tax {formatINR(cmp.oldRegime.incomeTaxAnnual)}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            {cmp.better === 'same'
              ? 'Both regimes give roughly the same take-home at this CTC.'
              : <>The <b>{cmp.better} regime</b> gives you <b>{formatINR(cmp.savingsAnnual)}</b> more per year (assuming {formatINR(cmp.oldRegimeDeductions)} of old-regime deductions).</>}
          </p>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Estimate for FY 2025-26 (new regime default). Actual pay varies with your exact salary structure and employer policy. Not tax advice.
        </p>
      </div>
    </div>
  );
}
