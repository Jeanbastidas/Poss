import { KpiCard } from '../../components/KpiCard';

const notifications = [
  { type: '3 días', client: 'María López', amount: '$120.000' },
  { type: 'Vence hoy', client: 'Carlos Pérez', amount: '$98.500' },
  { type: 'Atrasado', client: 'Ana Gómez', amount: '$210.300' }
];

export default function DashboardPage() {
  const cards = [
    ['Ventas del día', '$4.890.000', '+12% vs ayer'],
    ['Cartera vencida', '$1.240.000', '18 clientes con atraso'],
    ['Intereses generados', '$220.300', 'Mes actual'],
    ['Pendientes WhatsApp', '9', 'Recordatorios por cobrar']
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <KpiCard key={card[0]} title={card[0]} value={card[1]} helper={card[2]} />
        ))}
      </div>

      <article className="rounded-2xl bg-white border p-4">
        <header className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Notificaciones de cartera</h3>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-600 text-white text-sm">{notifications.length}</span>
        </header>
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li key={`${n.client}-${n.type}`} className="rounded-lg border p-3 flex justify-between">
              <span>{n.type} · {n.client}</span>
              <span className="font-medium">{n.amount}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
