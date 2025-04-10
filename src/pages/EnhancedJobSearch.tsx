
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building2, MapPin, Search, ExternalLink, Filter, Calendar, Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Job Type interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // full-time, part-time, contract, etc.
  experience: string; // entry, mid, senior
  description: string;
  postedDate: string;
  salary?: string;
  skills: string[];
  url: string;
  platform: string; // LinkedIn, Indeed, etc.
  logo?: string;
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'full-time',
    experience: 'mid',
    description: 'We are seeking a Frontend Developer proficient in React, TypeScript, and modern CSS frameworks.',
    postedDate: '2023-04-01',
    salary: '$80,000 - $100,000',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    url: 'https://linkedin.com/jobs/view/frontend-developer',
    platform: 'LinkedIn',
    logo: 'https://logo.clearbit.com/techcorp.com'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Remote',
    type: 'full-time',
    experience: 'senior',
    description: 'Join our team as a Backend Engineer working with Node.js, AWS, and microservices architecture.',
    postedDate: '2023-03-28',
    salary: '$110,000 - $140,000',
    skills: ['Node.js', 'AWS', 'MongoDB', 'Microservices'],
    url: 'https://indeed.com/jobs/view/backend-engineer',
    platform: 'Indeed',
    logo: 'https://logo.clearbit.com/datasystems.io'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'CreativeMinds',
    location: 'San Francisco, CA',
    type: 'contract',
    experience: 'mid',
    description: 'Looking for a talented UX/UI Designer with experience in Figma and design systems.',
    postedDate: '2023-04-02',
    salary: '$90 - $110 per hour',
    skills: ['Figma', 'Adobe XD', 'Design Systems', 'User Research'],
    url: 'https://glassdoor.com/jobs/view/ux-ui-designer',
    platform: 'Glassdoor',
    logo: 'https://logo.clearbit.com/creativeminds.co'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Boston, MA',
    type: 'full-time',
    experience: 'senior',
    description: 'Seeking a Data Scientist with expertise in machine learning, Python, and data visualization.',
    postedDate: '2023-03-25',
    salary: '$120,000 - $150,000',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    url: 'https://linkedin.com/jobs/view/data-scientist',
    platform: 'LinkedIn',
    logo: 'https://logo.clearbit.com/analyticspro.com'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    type: 'full-time',
    experience: 'mid',
    description: 'Join our team as a DevOps Engineer to help build and maintain our cloud infrastructure.',
    postedDate: '2023-03-30',
    salary: '$95,000 - $120,000',
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD'],
    url: 'https://indeed.com/jobs/view/devops-engineer',
    platform: 'Indeed',
    logo: 'https://logo.clearbit.com/cloudtech.io'
  },
  {
    id: '6',
    title: 'Junior Software Developer',
    company: 'StartupHub',
    location: 'Austin, TX',
    type: 'full-time',
    experience: 'entry',
    description: 'Great opportunity for a Junior Developer to learn and grow with our expanding team.',
    postedDate: '2023-04-03',
    salary: '$65,000 - $80,000',
    skills: ['JavaScript', 'HTML/CSS', 'Git', 'React Basics'],
    url: 'https://glassdoor.com/jobs/view/junior-software-developer',
    platform: 'Glassdoor',
    logo: 'https://logo.clearbit.com/startuphub.co'
  },
  {
    id: '7',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Chicago, IL',
    type: 'full-time',
    experience: 'senior',
    description: 'Seeking an experienced Product Manager to lead product development for our SaaS platform.',
    postedDate: '2023-03-27',
    salary: '$130,000 - $160,000',
    skills: ['Product Strategy', 'Agile', 'Market Research', 'User Stories'],
    url: 'https://linkedin.com/jobs/view/product-manager',
    platform: 'LinkedIn',
    logo: 'https://logo.clearbit.com/innovateco.com'
  },
  {
    id: '8',
    title: 'Mobile Developer (iOS)',
    company: 'AppWorks',
    location: 'Remote',
    type: 'contract',
    experience: 'mid',
    description: 'Looking for an iOS Developer to work on our consumer mobile applications.',
    postedDate: '2023-04-01',
    salary: '$85 - $100 per hour',
    skills: ['Swift', 'iOS', 'UIKit', 'CoreData'],
    url: 'https://indeed.com/jobs/view/mobile-developer-ios',
    platform: 'Indeed',
    logo: 'https://logo.clearbit.com/appworks.dev'
  },
  {
    id: '9',
    title: 'Full Stack Developer (Entry Level)',
    company: 'WebSolutions',
    location: 'Denver, CO',
    type: 'full-time',
    experience: 'entry',
    description: 'Great opportunity for recent graduates to join our web development team.',
    postedDate: '2023-04-02',
    salary: '$70,000 - $85,000',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    url: 'https://glassdoor.com/jobs/view/full-stack-developer-entry-level',
    platform: 'Glassdoor',
    logo: 'https://logo.clearbit.com/websolutions.io'
  },
  {
    id: '10',
    title: 'QA Engineer',
    company: 'QualityTech',
    location: 'Portland, OR',
    type: 'full-time',
    experience: 'mid',
    description: 'Join our QA team to ensure top-quality software delivery through testing and automation.',
    postedDate: '2023-03-29',
    salary: '$85,000 - $105,000',
    skills: ['Selenium', 'TestNG', 'Cypress', 'JIRA'],
    url: 'https://linkedin.com/jobs/view/qa-engineer',
    platform: 'LinkedIn',
    logo: 'https://logo.clearbit.com/qualitytech.org'
  }
];

// Direct links to job platforms
interface JobPlatform {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const EnhancedJobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('all');
  const [experienceLevel, setExperienceLevel] = useState('all');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [platform, setPlatform] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  
  // Get job platforms for direct links
  const getJobPlatforms = (query: string, loc: string): JobPlatform[] => {
    const encodedQuery = encodeURIComponent(query || 'jobs');
    const encodedLocation = encodeURIComponent(loc || '');
    
    return [
      {
        name: 'LinkedIn',
        url: `https://www.linkedin.com/jobs/search/?keywords=${encodedQuery}&location=${encodedLocation}`,
        icon: <Briefcase className="w-4 h-4" />,
        color: 'bg-[#0077B5]'
      },
      {
        name: 'Indeed',
        url: `https://www.indeed.com/jobs?q=${encodedQuery}&l=${encodedLocation}`,
        icon: <Briefcase className="w-4 h-4" />,
        color: 'bg-[#003A9B]'
      },
      {
        name: 'Glassdoor',
        url: `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodedQuery}&locT=C&locKeyword=${encodedLocation}`,
        icon: <Building2 className="w-4 h-4" />,
        color: 'bg-[#0CAA41]'
      },
      {
        name: 'Monster',
        url: `https://www.monster.com/jobs/search?q=${encodedQuery}&where=${encodedLocation}`,
        icon: <Briefcase className="w-4 h-4" />,
        color: 'bg-[#6E00FF]'
      },
      {
        name: 'ZipRecruiter',
        url: `https://www.ziprecruiter.com/candidate/search?search=${encodedQuery}&location=${encodedLocation}`,
        icon: <Search className="w-4 h-4" />,
        color: 'bg-[#5d5d66]'
      },
      {
        name: 'Naukri',
        url: `https://www.naukri.com/jobs-in-${encodedLocation}?keywordsearch=${encodedQuery}`,
        icon: <Globe className="w-4 h-4" />,
        color: 'bg-[#ff7555]'
      }
    ];
  };

  // Apply filters to jobs
  useEffect(() => {
    const results = mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
      
      const matchesJobType = jobType === 'all' || job.type === jobType;
      
      const matchesExperience = experienceLevel === 'all' || job.experience === experienceLevel;
      
      const matchesPlatform = platform === 'all' || job.platform === platform;
      
      return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesPlatform;
    });
    
    setFilteredJobs(results);
  }, [searchTerm, location, jobType, experienceLevel, platform]);

  const getExperienceBadgeColor = (level: string) => {
    switch(level) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-blue-100 text-blue-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformBadgeColor = (platform: string) => {
    switch(platform) {
      case 'LinkedIn': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Indeed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Glassdoor': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will handle filtering
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6">Find Your Next Opportunity</h1>
      
      <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="search">Search Jobs</TabsTrigger>
          <TabsTrigger value="direct">Direct Links</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="mt-0">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Job title, skills, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Location (city, state, remote)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button type="submit" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find Jobs
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </form>
          
          {isFiltersVisible && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-1">Job Type</label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Experience Level</label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Indeed">Indeed</SelectItem>
                    <SelectItem value="Glassdoor">Glassdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center p-10 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or check out the direct links to job platforms.</p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <Card key={job.id} className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Building2 className="h-3.5 w-3.5" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={getPlatformBadgeColor(job.platform)}>
                        {job.platform}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> 
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" /> 
                        Posted {formatDate(job.postedDate)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{job.type}</Badge>
                      <Badge className={getExperienceBadgeColor(job.experience)}>
                        {job.experience === 'entry' ? 'Entry Level' : 
                         job.experience === 'mid' ? 'Mid Level' : 'Senior Level'}
                      </Badge>
                      {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                    </div>
                    
                    <p className="line-clamp-2 text-sm text-muted-foreground mb-3">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.slice(0, 4).map(skill => (
                        <Badge key={skill} variant="outline" className="bg-primary/5">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge variant="outline" className="bg-primary/5">
                          +{job.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm" className="text-primary">
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(job.url, '_blank');
                        }}
                      >
                        Apply <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="direct" className="mt-0">
          <div className="bg-muted/30 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-medium mb-3">Search Across Job Platforms</h2>
            <p className="text-muted-foreground mb-4">
              Use the form below to search for jobs across multiple platforms at once.
            </p>
            
            <form className="flex flex-col md:flex-row gap-3 mb-6">
              <Input
                placeholder="Job title, skills, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:flex-1"
              />
              
              <Input
                placeholder="Location (city, state, remote)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="md:flex-1"
              />
            </form>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getJobPlatforms(searchTerm, location).map(platform => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-4 rounded-lg text-white ${platform.color} hover:opacity-90 transition-opacity`}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-3">Track Your Applications</h2>
            <p className="text-muted-foreground mb-4">
              Keep track of your job applications, interviews, and offers in one place.
              Coming soon!
            </p>
            
            {/* Placeholder for application tracking */}
            <div className="text-center p-10 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Application Tracking</h3>
              <p className="text-muted-foreground mb-4">Track your job applications and their status.</p>
              <Button disabled>Coming Soon</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedJob(null)}>
          <div className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="h-4 w-4" />
                    {selectedJob.company}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedJob(null)}>×</Button>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary">{selectedJob.type}</Badge>
                <Badge className={getExperienceBadgeColor(selectedJob.experience)}>
                  {selectedJob.experience === 'entry' ? 'Entry Level' : 
                   selectedJob.experience === 'mid' ? 'Mid Level' : 'Senior Level'}
                </Badge>
                {selectedJob.salary && <Badge variant="outline">{selectedJob.salary}</Badge>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Posted {formatDate(selectedJob.postedDate)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="whitespace-pre-line">{selectedJob.description}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="bg-primary/5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedJob(null)}
                >
                  Back to Search
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => window.open(selectedJob.url, '_blank')}
                >
                  Apply Now <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedJobSearch;
