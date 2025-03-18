import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Sparkles, BarChart3, BookOpen, Target } from 'lucide-react';
import { FIDOChat } from '../components/FIDOChat';
import { demoUser } from '../data/demoData';

export function HomePage() {
  const [showFIDOChat, setShowFIDOChat] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <button
        onClick={() => setShowFIDOChat(true)}
        className="w-full bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors text-left"
      >
        {/* ...existing FIDO chat button code... */}
      </button>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => navigate('/feedback')}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-orange-100 hover:border-orange-300"
        >
          {/* ...existing feedback button code... */}
        </button>

        {/* ...other grid buttons... */}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
        {/* ...existing growth summary code... */}
      </div>

      {showFIDOChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
          {/* ...existing FIDO chat modal code... */}
        </div>
      )}
    </div>
  );
}
