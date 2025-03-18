import { Bot } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { demoUser } from '../data/demoData';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/yourusername/aivengers360/main/public/fido-logo.png" 
                alt="FIDO" 
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                AIVengers360
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-orange-500 transition-colors">
                Profile
              </Link>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-600">{demoUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">© 2024 AIVengers360. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600">Powered by FIDO AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
