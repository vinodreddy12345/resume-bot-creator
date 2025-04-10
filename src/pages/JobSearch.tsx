
import { useState } from 'react';
import { Briefcase, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeedbackData {
  email: string;
  feedbackType: 'suggestion' | 'issue' | 'feature';
  message: string;
  rating: number;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  experienceLevel: string;
  url: string;
  source: string;
  postedDate: string;
}

const JobSearch = () => {
  const [activeTab, setActiveTab] = useState<string>('coming-soon');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    email: '',
    feedbackType: 'suggestion',
    message: '',
    rating: 5
  });
  const { toast } = useToast();

  // API endpoints for job search
  const jobApiEndpoints = {
    jsearch: 'https://jsearch.p.rapidapi.com/search',
    findwork: 'https://findwork.dev/api/jobs/',
    github: 'https://jobs.github.com/positions.json',
    remotive: 'https://remotive.io/api/remote-jobs',
    indeed: 'https://indeed-jobs-api.p.rapidapi.com/search',
  };

  // Function to fetch jobs from multiple APIs
  const fetchJobs = async () => {
    setLoading(true);
    
    try {
      // Create an array to store all jobs from different sources
      let allJobs: Job[] = [];
      
      // JSearch API (RapidAPI) - Requires API key
      try {
        const response = await fetch(`${jobApiEndpoints.jsearch}?query=${encodeURIComponent(searchTerm || 'developer')}&page=1&num_pages=1`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY || 'DEMO_KEY',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const jsearchJobs = data.data.map((item: any) => ({
            id: `jsearch-${item.job_id}`,
            title: item.job_title,
            company: item.employer_name,
            location: item.job_city ? `${item.job_city}, ${item.job_country}` : item.job_country,
            description: item.job_description,
            experienceLevel: item.job_required_experience?.required_experience_in_months > 36 ? 'Senior' : 
                          item.job_required_experience?.required_experience_in_months > 12 ? 'Mid-Level' : 'Entry-Level',
            url: item.job_apply_link,
            source: 'JSearch',
            postedDate: item.job_posted_at_datetime_utc ? new Date(item.job_posted_at_datetime_utc).toLocaleDateString() : 'Unknown'
          }));
          allJobs = [...allJobs, ...jsearchJobs];
        }
      } catch (error) {
        console.error('Error fetching from JSearch API:', error);
      }
      
      // Remotive API (Free, no API key required)
      try {
        const response = await fetch(`${jobApiEndpoints.remotive}?search=${encodeURIComponent(searchTerm || '')}`);
        
        if (response.ok) {
          const data = await response.json();
          const remotiveJobs = data.jobs.map((item: any) => ({
            id: `remotive-${item.id}`,
            title: item.title,
            company: item.company_name,
            location: item.candidate_required_location || 'Remote',
            description: item.description,
            experienceLevel: item.title.toLowerCase().includes('senior') ? 'Senior' : 
                          item.title.toLowerCase().includes('junior') ? 'Entry-Level' : 'Mid-Level',
            url: item.url,
            source: 'Remotive',
            postedDate: item.publication_date ? new Date(item.publication_date).toLocaleDateString() : 'Unknown'
          }));
          allJobs = [...allJobs, ...remotiveJobs];
        }
      } catch (error) {
        console.error('Error fetching from Remotive API:', error);
      }
      
      // Indeed API (RapidAPI) - Requires API key
      try {
        const response = await fetch(`${jobApiEndpoints.indeed}?query=${encodeURIComponent(searchTerm || 'developer')}&location=remote`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY || 'DEMO_KEY',
            'X-RapidAPI-Host': 'indeed-jobs-api.p.rapidapi.com'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const indeedJobs = data.results.map((item: any) => ({
            id: `indeed-${item.id}`,
            title: item.title,
            company: item.company,
            location: item.location || 'Unknown',
            description: item.summary || 'No description available',
            experienceLevel: item.title.toLowerCase().includes('senior') ? 'Senior' : 
                          item.title.toLowerCase().includes('junior') ? 'Entry-Level' : 'Mid-Level',
            url: item.url,
            source: 'Indeed',
            postedDate: item.posted_time || 'Unknown'
          }));
          allJobs = [...allJobs, ...indeedJobs];
        }
      } catch (error) {
        console.error('Error fetching from Indeed API:', error);
      }
      
      // Filter jobs based on experience level if selected
      if (experienceFilter !== 'all') {
        allJobs = allJobs.filter(job => 
          job.experienceLevel.toLowerCase().includes(experienceFilter.toLowerCase())
        );
      }
      
      // If no jobs found or APIs failed, use fallback data
      if (allJobs.length === 0) {
        // Fallback data in case APIs fail or return no results
        allJobs = [
          {
            id: 'fallback-1',
            title: 'Frontend Developer',
            company: 'TechCorp',
            location: 'New York, NY (Remote)',
            description: 'We are looking for a skilled Frontend Developer proficient in React, TypeScript, and modern CSS frameworks.',
            experienceLevel: 'Mid-Level',
            url: 'https://example.com/job1',
            source: 'Fallback Data',
            postedDate: 'Recent'
          },
          {
            id: 'fallback-2',
            title: 'Full Stack Engineer',
            company: 'InnovateTech',
            location: 'San Francisco, CA',
            description: 'Join our team as a Full Stack Engineer working with React, Node.js, and AWS.',
            experienceLevel: 'Senior',
            url: 'https://example.com/job2',
            source: 'Fallback Data',
            postedDate: 'Recent'
          },
          {
            id: 'fallback-3',
            title: 'Junior Web Developer',
            company: 'StartupX',
            location: 'Remote',
            description: 'Great opportunity for a beginner developer to gain experience with HTML, CSS, and JavaScript.',
            experienceLevel: 'Entry-Level',
            url: 'https://example.com/job3',
            source: 'Fallback Data',
            postedDate: 'Recent'
          }
        ];
        
        toast({
          title: 'Using demo data',
          description: 'Could not connect to job APIs. Showing sample job listings instead.',
          variant: 'default',
        });
      }
      
      setJobs(allJobs);
      setTotalPages(Math.max(1, Math.ceil(allJobs.length / 4)));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch job listings. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the feedback to a server
    console.log('Feedback submitted:', feedbackData);
    
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your feedback! We will use it to improve our job search feature.',
    });
    
    // Reset form
    setFeedbackData({
      email: '',
      feedbackType: 'suggestion',
      message: '',
      rating: 5
    });
  };

  const updateFeedbackData = (field: keyof FeedbackData, value: any) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApply = (job: Job) => {
    // Open the job application URL in a new tab
    window.open(job.url, '_blank', 'noopener,noreferrer');
    
    toast({
      title: 'Applying for job',
      description: `Opening application for ${job.title} at ${job.company}`,
    });
  };

  // Calculate pagination
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, jobs.length);
  const paginatedJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Find Your Dream Job</h1>
        <p className="text-muted-foreground">
          Search across multiple job platforms including LinkedIn, Glassdoor, Naukri, and more.
        </p>
      </div>
      
      <Tabs defaultValue="coming-soon" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
          <TabsTrigger value="feedback">Provide Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coming-soon" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Job Search Feature Coming Soon!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Briefcase className="h-24 w-24 text-primary opacity-80" />
              </div>
              
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">We're Working On Something Exciting</h3>
                <p className="text-muted-foreground">
                  Our team is currently developing a powerful job search feature that will help you find
                  opportunities across multiple platforms including LinkedIn, Indeed, Glassdoor, and more.
                </p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What to expect:</h4>
                  <ul className="text-left list-disc pl-5 space-y-1">
                    <li>Search across multiple job boards in one place</li>
                    <li>Filter by experience level, location, and more</li>
                    <li>Save your favorite job listings</li>
                    <li>Apply directly from our platform</li>
                    <li>Get personalized job recommendations based on your resume</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => setActiveTab('feedback')}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Share Your Suggestions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Help Us Build the Perfect Job Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Email (optional)</label>
                  <Input 
                    type="email" 
                    placeholder="email@example.com" 
                    value={feedbackData.email}
                    onChange={(e) => updateFeedbackData('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      type="button"
                      variant={feedbackData.feedbackType === 'suggestion' ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => updateFeedbackData('feedbackType', 'suggestion')}
                    >
                      Suggestion
                    </Button>
                    <Button 
                      type="button"
                      variant={feedbackData.feedbackType === 'feature' ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => updateFeedbackData('feedbackType', 'feature')}
                    >
                      Feature Request
                    </Button>
                    <Button 
                      type="button"
                      variant={feedbackData.feedbackType === 'issue' ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => updateFeedbackData('feedbackType', 'issue')}
                    >
                      Issue
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Feedback</label>
                  <Textarea 
                    placeholder="Tell us what you'd like to see in our job search feature..."
                    rows={4}
                    value={feedbackData.message}
                    onChange={(e) => updateFeedbackData('message', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">How excited are you about this feature?</label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => updateFeedbackData('rating', Math.max(1, feedbackData.rating - 1))}
                    >
                      <ThumbsDown className={`h-5 w-5 ${feedbackData.rating < 3 ? 'text-destructive' : 'text-muted-foreground'}`} />
                    </Button>
                    
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(feedbackData.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => updateFeedbackData('rating', Math.min(5, feedbackData.rating + 1))}
                    >
                      <ThumbsUp className={`h-5 w-5 ${feedbackData.rating > 3 ? 'text-primary' : 'text-muted-foreground'}`} />
                    </Button>
                  </div>
                </div>
              
                <Button type="submit" className="w-full mt-6">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default JobSearch;
