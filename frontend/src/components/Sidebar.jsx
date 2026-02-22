import Link from 'next/link';

const links = [
  ['Dashboard', '/dashboard'],
  ['Ventas', '/sales'],
  ['Créditos', '/credits'],
  ['Clientes', '/customers'],
  ['Inventario', '/inventory'],
  ['Reportes', '/reports'],
  ['Configuración', '/settings']
];

export function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-slate-100 min-h-screen p-4 space-y-2 sticky top-0">
      <h1 className="text-2xl font-bold mb-6">POSS PRO</h1>
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="block rounded-lg px-4 py-3 bg-slate-800 hover:bg-brand transition">
          {label}
        </Link>
      ))}
    </aside>
  );
}
