import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Settings, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI career guidance assistant specialized in helping students choose their path after 12th grade. I can provide detailed guidance on:\n\n• Engineering & Technology careers\n• Medical & Healthcare fields\n• Management & Business studies\n• Arts, Science & Commerce streams\n• College selection & admission processes\n• Entrance exam strategies\n\nWhat would you like to explore today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      setIsConfigOpen(false);
      toast.success('API key saved successfully!');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  const callOpenAI = async (userInput: string) => {
    if (!apiKey) {
      toast.error('Please configure your OpenAI API key first');
      setIsConfigOpen(true);
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an expert AI career guidance counselor specializing in helping students choose their path after 12th grade. You have comprehensive knowledge about:

- Engineering fields (Computer Science, Mechanical, Electrical, Civil, etc.)
- Medical careers (MBBS, BDS, Nursing, Pharmacy, Physiotherapy, etc.)
- Management studies (BBA, MBA, Commerce, Economics)
- Science streams (Physics, Chemistry, Mathematics, Biology)
- Arts and Humanities (Literature, Psychology, History, etc.)
- Professional courses (Law, Architecture, Design, etc.)
- Entrance exams (JEE, NEET, CLAT, CAT, etc.)
- College selection and admission processes
- Career prospects and salary expectations

Provide detailed, practical, and personalized advice. Be encouraging and supportive while being realistic about requirements and challenges. Format your responses clearly with bullet points when listing options.`
            },
            ...messages.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            {
              role: 'user',
              content: userInput
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      toast.error('Failed to get AI response. Please check your API key and try again.');
      return 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again later.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const currentInput = inputMessage;
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const aiResponse = await callOpenAI(currentInput);
      
      // Remove typing indicator and add actual response
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      // Remove typing indicator on error
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: 'Hello! I\'m your AI career guidance assistant specialized in helping students choose their path after 12th grade. I can provide detailed guidance on:\n\n• Engineering & Technology careers\n• Medical & Healthcare fields\n• Management & Business studies\n• Arts, Science & Commerce streams\n• College selection & admission processes\n• Entrance exam strategies\n\nWhat would you like to explore today?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Career Assistant</h1>
                <p className="text-sm text-muted-foreground">Powered by ChatGPT • Career guidance specialist</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearChat}>
              Clear Chat
            </Button>
            <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>API Configuration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Enter your OpenAI API key to enable AI responses:
                    </p>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveApiKey} className="flex-1">Save</Button>
                    <Button variant="outline" onClick={() => setIsConfigOpen(false)}>Cancel</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-6 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary' 
                        : 'bg-gradient-to-br from-secondary to-secondary/80 border-2 border-primary/20'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-primary-foreground" />
                      ) : message.isTyping ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <Bot className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    
                    <Card className={`${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground border-primary/20' 
                        : 'bg-card border-border'
                    }`}>
                      <CardContent className="p-4">
                        {message.isTyping ? (
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                            </div>
                            <span className="text-sm text-muted-foreground">AI is thinking...</span>
                          </div>
                        ) : (
                          <>
                            <div className={`prose prose-sm max-w-none ${
                              message.type === 'user' ? 'prose-invert' : ''
                            }`}>
                              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                {message.content}
                              </p>
                            </div>
                            <p className={`text-xs mt-3 ${
                              message.type === 'user' 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-background/50 backdrop-blur-sm p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  placeholder="Ask me about careers, courses, colleges, entrance exams..."
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyDown={handleKeyPress}
                  className="min-h-[50px] max-h-[120px] resize-none pr-12"
                  disabled={isTyping}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {inputMessage.length}/2000
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="lg"
                className="h-[50px] px-6"
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Start Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "What engineering branches have the best career prospects?",
              "How do I prepare for medical entrance exams?",
              "Which colleges are best for computer science?",
              "What are the career options after commerce stream?",
              "How to choose between IIT and NIT?",
              "What are the emerging career fields in 2024?"
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto p-4 whitespace-normal hover:bg-primary/5 transition-colors"
                onClick={() => setInputMessage(question)}
                disabled={isTyping}
              >
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}