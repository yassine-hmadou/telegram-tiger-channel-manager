import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Send, 
  Calendar, 
  ShieldAlert, 
  BarChart3, 
  Plus, 
  Trash2, 
  Users, 
  Eye, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  Clock,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState([
    { id: 1, title: 'Annonce de la mise à jour v2.0', status: 'Publié', date: '2026-06-05 10:00', views: '1.4k', engagement: '12%' },
    { id: 2, title: 'Tutoriel : Utiliser les bots Telegram', status: 'Planifié', date: '2026-06-06 14:30', views: '-', engagement: '-' },
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [newPostDate, setNewPostDate] = useState('');
  const [moderationLogs, setModerationLogs] = useState([
    { id: 1, user: '@spammer_99', action: 'Message supprimé (Lien interdit)', time: 'Il y a 5 min' },
    { id: 2, user: '@crypto_king', action: 'Utilisateur banni', time: 'Il y a 23 min' },
  ]);

  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newPost = {
      id: posts.length + 1,
      title: newPostText.substring(0, 30) + '...',
      status: newPostDate ? 'Planifié' : 'Publié Immédiatement',
      date: newPostDate || 'Maintenant',
      views: '0',
      engagement: '0%'
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostDate('');
    showNotification('Publication enregistrée avec succès !');
  };

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
    showNotification('Publication supprimée.');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-16">
      {/* En-tête Telegram Mini App */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-inner">
            📢
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">Canal Officiel Admin</h1>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Connecté au Bot Telegram
            </p>
          </div>
        </div>
        <button 
          onClick={() => showNotification('Paramètres synchronisés.')}
          className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700">
          <Settings size={20} />
        </button>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm flex items-center gap-2 animate-bounce">
          <CheckCircle size={16} />
          {notification}
        </div>
      )}

      {/* Contenu dynamique selon l'onglet */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-slate-400 font-medium">Abonnés Totaux</span>
                  <Users size={16} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-black">12,450</h2>
                <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} /> +124 cette semaine
                </span>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-slate-400 font-medium">Taux d'Engagement</span>
                  <BarChart3 size={16} className="text-purple-400" />
                </div>
                <h2 className="text-2xl font-black">18.4%</h2>
                <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} /> +2.1% ce mois
                </span>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-200">
                <Sparkles size={16} className="text-amber-400" />
                Actions Rapides Bot
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setActiveTab('editor')}
                  className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-center transition-all shadow-md flex flex-col items-center gap-1">
                  <Send size={18} />
                  Nouveau Post
                </button>
                <button 
                  onClick={() => showNotification('Rapport analytique exporté avec succès.')}
                  className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-semibold text-center transition-all flex flex-col items-center gap-1">
                  <BarChart3 size={18} className="text-purple-400" />
                  Exporter Rapport
                </button>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-200">
                <Clock size={16} className="text-blue-400" />
                Dernières Activités du Canal
              </h3>
              <div className="space-y-3">
                {posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
                    <div>
                      <p className="text-xs font-bold text-slate-200">{post.title}</p>
                      <p className="text-[10px] text-slate-400">{post.date}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${post.status === 'Publié' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {post.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-bold mb-3 text-slate-200 flex items-center gap-2">
                <Send size={16} className="text-blue-400" />
                Éditeur de Publication Avancé
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Contenu du message (Markdown supporté)</label>
                  <textarea 
                    rows="4" 
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Tapez votre message ici..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Date et Heure de Planification (Optionnel)</label>
                  <input 
                    type="datetime-local"
                    value={newPostDate}
                    onChange={(e) => setNewPostDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2">
                  <Send size={16} />
                  {newPostDate ? 'Planifier le Post' : 'Publier Immédiatement'}
                </button>
              </form>
            </div>

            {/* Aperçu en temps réel */}
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Aperçu Telegram</h4>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-sm space-y-2">
                <p className="whitespace-pre-wrap">{newPostText || 'Votre message apparaîtra ici en temps réel...'}</p>
                <div className="flex justify-end items-center gap-1 text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                  <span>10:42</span>
                  <Eye size={12} />
                  <span>1.2k</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-200">
                <Calendar size={16} className="text-blue-400" />
                Calendrier Éditorial
              </h3>
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="bg-slate-900 p-3 rounded-xl border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{post.title}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {post.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${post.status === 'Publié' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {post.status}
                      </span>
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-200">
                <ShieldAlert size={16} className="text-red-400" />
                Journal de Modération Automatique
              </h3>
              <div className="space-y-2">
                {moderationLogs.map((log) => (
                  <div key={log.id} className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/30 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-red-400">{log.user}</p>
                      <p className="text-[11px] text-slate-300">{log.action}</p>
                    </div>
                    <span className="text-[10px] text-slate-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-bold mb-2 text-slate-200">Règles de filtrage actif</h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" /> Suppression automatique des liens externes non autorisés
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" /> Anti-spam mots-clés crypto & casino
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" /> Limitation du flood (max 3 msg/10s)
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Barre de navigation inférieure Telegram style (Bottom Tab Bar) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 py-2 px-6 flex justify-around items-center z-20">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-medium">Accueil</span>
        </button>
        <button 
          onClick={() => setActiveTab('editor')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'editor' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
          <Send size={20} />
          <span className="text-[10px] font-medium">Éditeur</span>
        </button>
        <button 
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'calendar' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
          <Calendar size={20} />
          <span className="text-[10px] font-medium">Planning</span>
        </button>
        <button 
          onClick={() => setActiveTab('moderation')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'moderation' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
          <ShieldAlert size={20} />
          <span className="text-[10px] font-medium">Modération</span>
        </button>
      </nav>
    </div>
  );
}