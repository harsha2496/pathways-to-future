import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Mic, MessageCircle, Home, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };

      recognition.start();
    }
  };

  const sidebarItems = [
    { name: 'Browse', items: [
      { name: 'Colleges', href: '/colleges' },
      { name: 'Courses', href: '/courses' },
      { name: 'Streams', href: '/' }
    ]},
    { name: 'Guidance', items: [
      { name: 'AI Suggestions', href: '/ai-suggestions' },
      { name: 'Ask a Question', href: '/ask-question' }
    ]},
    { name: 'Quick Links', items: [
      { name: 'Top Careers', href: '/top-careers' },
      { name: 'Nearby Colleges', href: '/nearby-colleges' }
    ]}
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-muted transition-colors"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">What Next</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search courses, colleges, careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 h-10 bg-muted/50 border-border"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceSearch}
                className={cn(
                  "absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0",
                  isListening && "text-primary"
                )}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hidden sm:flex"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/suggestion-box')}
              className="hidden sm:flex"
            >
              Suggestion Box
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-all duration-300 ease-in-out shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="px-4 py-2">
            {sidebarItems.map((section) => (
              <div key={section.name} className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                  {section.name}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.href);
                          setSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted",
                          location.pathname === item.href && "bg-primary text-primary-foreground"
                        )}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary-hover"
        onClick={() => navigate('/ai-chat')}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};