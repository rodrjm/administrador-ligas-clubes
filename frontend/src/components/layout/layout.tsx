import { ReactNode } from 'react';
import Navigation from './navigation';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        <div className="px-4 py-6 md:px-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
