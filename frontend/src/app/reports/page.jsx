const reportCards = [
  ['Ventas hoy', '$2.450.000'],
  ['Impuestos hoy', '$465.500'],
  ['Transacciones', '64'],
  ['Ticket promedio', '$38.281']
];

const topProducts = [
  ['Café premium 500g', 24],
  ['Pan artesanal', 18],
  ['Leche deslactosada', 15]
];

export default function ReportsPage() {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">Reportes y analítica</h2>
      <div className="grid md:grid-cols-4 gap-3">
        {reportCards.map(([label, value]) => (
          <article key={label} className="bg-white border rounded-xl p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-xl font-semibold">{value}</p>
          </article>
        ))}
      </div>

      <article className="bg-white border rounded-2xl p-5">
        <h3 className="font-semibold mb-3">Top productos</h3>
        <ul className="space-y-2">
          {topProducts.map(([name, qty]) => (
            <li key={name} className="flex justify-between border rounded-lg p-3">
              <span>{name}</span>
              <span className="font-medium">{qty} uds</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
