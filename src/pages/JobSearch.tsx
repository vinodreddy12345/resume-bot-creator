
import { useState, useEffect } from 'react';
import { Loader2, Search, Briefcase, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from '@/components/ui/use-toast';

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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { toast } = useToast();

  // Mock data - in a real app, this would come from API calls
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'New York, NY (Remote)',
      description: 'We are looking for a skilled Frontend Developer proficient in React, TypeScript, and modern CSS frameworks.',
      experienceLevel: 'Mid-Level',
      url: 'https://example.com/job1',
      source: 'LinkedIn',
      postedDate: '2 days ago',
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'InnovateTech',
      location: 'San Francisco, CA',
      description: 'Join our team as a Full Stack Engineer working with React, Node.js, and AWS.',
      experienceLevel: 'Senior',
      url: 'https://example.com/job2',
      source: 'Glassdoor',
      postedDate: '1 week ago',
    },
    {
      id: '3',
      title: 'Junior Web Developer',
      company: 'StartupX',
      location: 'Remote',
      description: 'Great opportunity for a beginner developer to gain experience with HTML, CSS, and JavaScript.',
      experienceLevel: 'Entry-Level',
      url: 'https://example.com/job3',
      source: 'Naukri',
      postedDate: '3 days ago',
    },
    {
      id: '4',
      title: 'UX/UI Designer',
      company: 'DesignHub',
      location: 'London, UK (Hybrid)',
      description: 'We need a creative designer with experience in Figma and user research methodologies.',
      experienceLevel: 'Mid-Level',
      url: 'https://example.com/job4',
      source: 'LinkedIn',
      postedDate: '5 days ago',
    },
    {
      id: '5',
      title: 'Data Scientist',
      company: 'DataCorp',
      location: 'Boston, MA',
      description: 'Looking for a data scientist with expertise in machine learning and Python.',
      experienceLevel: 'Senior',
      url: 'https://example.com/job5',
      source: 'Indeed',
      postedDate: '1 day ago',
    },
    {
      id: '6',
      title: 'Software Engineering Intern',
      company: 'TechStartup',
      location: 'Remote',
      description: 'Great opportunity for students to gain real-world software development experience.',
      experienceLevel: 'Entry-Level',
      url: 'https://example.com/job6',
      source: 'Glassdoor',
      postedDate: '2 weeks ago',
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch jobs
    const fetchJobs = () => {
      setLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        const filteredJobs = mockJobs.filter(job => {
          const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesExperience = 
            experienceFilter === 'all' || 
            job.experienceLevel.toLowerCase().includes(
              experienceFilter === 'fresher' ? 'entry' : experienceFilter.toLowerCase()
            );
          
          return matchesSearch && matchesExperience;
        });

        setJobs(filteredJobs);
        setTotalPages(Math.max(1, Math.ceil(filteredJobs.length / 4)));
        setCurrentPage(1);
        setLoading(false);
      }, 500);
    };

    fetchJobs();
  }, [searchTerm, experienceFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already triggered by the useEffect dependency on searchTerm
  };

  const handleApply = (job: Job) => {
    window.open(job.url, '_blank');
    toast({
      title: "Redirecting to job application",
      description: `You're being redirected to apply for ${job.title} at ${job.company}`,
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

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs by title, company, or keyword" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="w-full md:w-64">
                <Label htmlFor="experience-filter" className="sr-only">Experience Level</Label>
                <Select 
                  value={experienceFilter} 
                  onValueChange={setExperienceFilter}
                >
                  <SelectTrigger id="experience-filter" className="w-full">
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Experience Levels</SelectItem>
                    <SelectItem value="fresher">Fresher / Entry-Level</SelectItem>
                    <SelectItem value="mid">Mid-Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter Results
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <div className="text-lg font-medium mt-1">{job.company}</div>
                      <div className="text-sm text-muted-foreground mt-1">{job.location}</div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {job.source}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <div className="flex justify-between mb-4">
                    <Badge variant={
                      job.experienceLevel.includes('Entry') ? 'secondary' :
                      job.experienceLevel.includes('Mid') ? 'default' : 'outline'
                    }>
                      {job.experienceLevel}
                    </Badge>
                    <span className="text-xs">{job.postedDate}</span>
                  </div>
                  <p className="line-clamp-3">{job.description}</p>
                </CardContent>
                <CardFooter className="bg-muted/50 flex justify-between pt-4">
                  <Button variant="outline" size="sm">
                    Save
                  </Button>
                  <Button size="sm" onClick={() => handleApply(job)}>
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default JobSearch;
