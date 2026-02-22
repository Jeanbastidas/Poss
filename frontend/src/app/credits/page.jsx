const reminders = [
  ['Recordar pago (faltan 3 días)', 'bg-blue-700'],
  ['Vence hoy', 'bg-amber-600'],
  ['Pago atrasado', 'bg-red-700'],
  ['Confirmar pago', 'bg-emerald-700']
];

export default function CreditsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Créditos y cuotas</h2>
      <div className="bg-white rounded-2xl p-5 shadow-sm border grid md:grid-cols-2 gap-4">
        <input className="border rounded-lg p-3" placeholder="Cliente (obligatorio)" />
        <input className="border rounded-lg p-3" placeholder="Cuota inicial" />
        <input className="border rounded-lg p-3" placeholder="Número de cuotas" />
        <select className="border rounded-lg p-3"><option>Frecuencia mensual</option><option>Frecuencia quincenal</option><option>Frecuencia semanal</option></select>
        <select className="border rounded-lg p-3"><option>Interés simple</option><option>Interés compuesto</option></select>
        <button className="rounded-lg bg-brand text-white py-3 px-4">Calcular plan</button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <h3 className="font-semibold mb-3">Acciones WhatsApp</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reminders.map(([label, color]) => (
            <button key={label} className={`rounded-lg text-white p-3 text-left ${color}`}>{label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
