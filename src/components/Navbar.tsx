import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="fixed top-0 bg-accent text-theme w-full left-0 h-12 flex items-center justify-end gap-10 pr-8 shadow-md">
      <a className="nav-item" href="#">Sales</a>
      <a className="nav-item" href="#">Reports</a>
      <a className="nav-item" href="#">Summary</a>
    </nav>
  )
}