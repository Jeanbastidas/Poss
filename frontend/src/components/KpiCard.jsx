export function KpiCard({ title, value, helper }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm border">
      <h3 className="text-sm text-slate-500">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <small className="text-xs text-slate-400">{helper}</small>
    </article>
  );
}
