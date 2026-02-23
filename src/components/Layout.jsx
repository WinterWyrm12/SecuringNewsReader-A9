import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;