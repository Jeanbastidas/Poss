import './globals.css';
import { Sidebar } from '../components/Sidebar';

export const metadata = {
  title: 'POSS Platform',
  description: 'POS moderno escalable para caja, crédito, inventario y cartera'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
