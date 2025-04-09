
import React, { useState, useRef, useEffect } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { Bot, Send, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateResumeFromChat } from '@/services/openaiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI Resume Assistant. Tell me about your work experience, education, and skills, and I'll help you create a professional resume. What would you like to include in your resume?",
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setResumeData } = useResumeStore();
  const { toast } = useToast();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Add thinking indicator
      setMessages((prev) => [...prev, { role: 'assistant', content: '...' }]);
      
      // Call OpenAI service
      const response = await generateResumeFromChat([...messages, userMessage]);
      
      // Remove thinking indicator
      setMessages((prev) => prev.slice(0, -1));
      
      if (response.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: response.data.message || "I've updated your resume based on our conversation." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: response.error || "I'm having trouble processing that right now. Please try again." },
        ]);
        toast({
          title: "Error",
          description: response.error || "Failed to process your request.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove thinking indicator
        { role: 'assistant', content: "I encountered an error. Please try again later." },
      ]);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateResume = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would extract structured resume data from the conversation
      toast({
        title: "Resume Generated",
        description: "Your resume has been created based on our conversation!",
      });
      
      // For demo purposes, navigate to form builder with some sample data
      setResumeData({
        personal: {
          name: "Alex Johnson",
          title: "Software Developer",
          email: "alex@example.com",
          phone: "(555) 123-4567",
          location: "San Francisco, CA",
          summary: "Experienced software developer with 5 years of experience building web applications.",
        },
        experience: [
          {
            id: "exp1",
            company: "Tech Solutions Inc.",
            position: "Senior Developer",
            startDate: "01/2020",
            endDate: "Present",
            location: "San Francisco, CA",
            description: "Leading development of web applications using React and Node.js.",
            highlights: ["Increased site performance by 40%", "Led a team of 5 developers"],
          },
        ],
        education: [
          {
            id: "edu1",
            institution: "University of California",
            degree: "Bachelor's",
            field: "Computer Science",
            startDate: "08/2014",
            endDate: "05/2018",
            location: "Berkeley, CA",
            gpa: "3.8",
            highlights: [],
          },
        ],
        skills: [
          { id: "skill1", name: "JavaScript", level: "Expert" },
          { id: "skill2", name: "React", level: "Advanced" },
          { id: "skill3", name: "Node.js", level: "Advanced" },
        ],
        projects: [],
        certifications: [],
        languages: [],
      });
      
      // Add confirmation message
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: "I've created your resume based on our conversation! You can now view and edit it in the Form Builder section." 
        },
      ]);
      
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: "Error",
        description: "Failed to generate your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <h1 className="text-2xl font-bold mb-4">AI Resume Chat</h1>
      
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto pr-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 mb-4 ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <Bot className="h-5 w-5" />
                  </Avatar>
                )}
                <div
                  className={`chatbot-message ${
                    message.role === 'assistant' ? 'chatbot-message-bot' : 'chatbot-message-user'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 bg-secondary">
                    <User className="h-5 w-5" />
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleGenerateResume} 
              disabled={isLoading || messages.length <= 1}
              className="w-full md:w-auto"
            >
              Generate Resume from Conversation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
