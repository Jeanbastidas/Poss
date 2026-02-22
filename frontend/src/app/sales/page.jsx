const methods = ['Efectivo', 'Tarjeta', 'Transferencia', 'Mixto', 'Crédito'];

export default function SalesPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Caja principal</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-2xl p-4 shadow-sm border">
          <input className="w-full border rounded-lg p-3" placeholder="Buscar por nombre, código interno o código de barras" />
          <div className="mt-4 text-sm text-slate-500">Carrito editable, descuentos y cálculo de subtotal/impuestos/total/cambio.</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border space-y-2">
          <h3 className="font-semibold">Método de pago</h3>
          {methods.map((m) => (
            <button key={m} className="w-full rounded-lg bg-slate-900 text-white py-3 text-left px-4">
              {m}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
