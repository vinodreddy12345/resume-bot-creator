interface OpenAIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const generateResumeFromChat = async (conversation: { role: 'user' | 'assistant'; content: string }[]): Promise<OpenAIResponse> => {
  try {
    // This is a placeholder for the actual OpenAI API call
    // In a real app, this would make a server-side call to protect your API key
    console.log('Conversation data sent to OpenAI:', conversation);
    
    // Simulate API call for now
    return {
      success: true,
      data: {
        message: 'AI generated resume content would appear here',
      }
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      success: false,
      error: 'Failed to generate resume content. Please try again later.',
    };
  }
};

export const tailorResumeToJob = async (resumeData: any, jobDescription: string): Promise<OpenAIResponse> => {
  try {
    // This is a placeholder for the actual OpenAI API call
    console.log('Tailoring resume to job description:', jobDescription);
    
    // Simulate API call for now
    return {
      success: true,
      data: {
        tailoredResume: resumeData,
        suggestions: [
          'Highlighted relevant skills that match the job description',
          'Rephrased experience to emphasize leadership qualities',
          'Added keywords from the job posting to improve ATS matching'
        ]
      }
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      success: false,
      error: 'Failed to tailor resume. Please try again later.',
    };
  }
};

export const extractResumeFromUpload = async (resumeContent: string): Promise<OpenAIResponse> => {
  try {
    console.log('Extracting data from uploaded resume');
    
    // For this demo, let's use a mock response instead of calling the OpenAI API
    // This will ensure the app works without API issues
    console.log('Using mock response for resume extraction');
    
    // Create a mock structured data response based on the resume content
    const mockExtractedData = {
      personal: {
        name: resumeContent.includes('John') ? 'John Doe' : 'Jane Smith',
        title: 'Software Engineer',
        email: 'example@email.com',
        phone: '(123) 456-7890',
        location: 'San Francisco, CA',
        website: 'https://example.com',
        summary: 'Experienced professional with a passion for technology.'
      },
      experience: [
        {
          id: '1',
          company: 'Tech Company',
          position: 'Senior Developer',
          startDate: '2020-01',
          endDate: 'Present',
          location: 'San Francisco, CA',
          description: 'Led development of key features and mentored junior developers.',
          highlights: ['Increased team productivity by 30%', 'Implemented CI/CD pipeline']
        },
        {
          id: '2',
          company: 'Previous Corp',
          position: 'Developer',
          startDate: '2017-05',
          endDate: '2019-12',
          location: 'Seattle, WA',
          description: 'Worked on various projects using modern technologies.',
          highlights: ['Developed new features', 'Reduced bug count by 25%']
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2013-09',
          endDate: '2017-05',
          location: 'Boston, MA',
          gpa: '3.8',
          highlights: ['Graduated with honors', 'Dean\'s List all semesters']
        }
      ],
      skills: [
        {
          id: '1',
          name: 'JavaScript',
          level: 'Expert'
        },
        {
          id: '2',
          name: 'React',
          level: 'Advanced'
        },
        {
          id: '3',
          name: 'Node.js',
          level: 'Advanced'
        },
        {
          id: '4',
          name: 'TypeScript',
          level: 'Intermediate'
        },
        {
          id: '5',
          name: 'HTML/CSS',
          level: 'Expert'
        }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce solution with React and Node.js.',
          url: 'https://github.com/example/ecommerce',
          highlights: ['Implemented payment processing', 'Built responsive UI']
        },
        {
          id: '2',
          name: 'Mobile App',
          description: 'Developed a cross-platform mobile application using React Native.',
          url: 'https://github.com/example/mobile-app',
          highlights: ['100,000+ downloads', 'Featured in App Store']
        }
      ],
      certifications: [
        {
          id: '1',
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2021-06',
          url: 'https://aws.amazon.com/certification/'
        }
      ],
      languages: [
        {
          id: '1',
          name: 'English',
          proficiency: 'Native'
        },
        {
          id: '2',
          name: 'Spanish',
          proficiency: 'Professional Working'
        }
      ]
    };
    
    // Simulate a delay to make it feel like it's processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        extractedData: mockExtractedData
      }
    };
    
    /* Commented out the actual API call for now
    // Get the OpenAI API key from environment variables
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.REACT_APP_OPENAI_API_KEY;
    
    console.log('API Key available:', !!apiKey);
    
    if (!apiKey) {
      console.error('OpenAI API key is missing');
      return {
        success: false,
        error: 'API key is missing. Please check your configuration.',
      };
    }
    
    // Prepare the content for OpenAI
    const cleanedContent = resumeContent.substring(0, 10000); // Limit content length
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that extracts structured data from resumes. Extract the following information: name, title, email, phone, location, summary, experience, education, skills, projects, certifications, languages. Return the data as a JSON object.'
            },
            {
              role: 'user',
              content: `Extract structured data from this resume: ${cleanedContent}`
            }
          ],
          temperature: 0.3
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API call failed with status: ${response.status}`, errorText);
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('OpenAI API response:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        console.error('Unexpected API response format:', data);
        throw new Error('Unexpected API response format');
      }
      
      const extractedContent = data.choices[0].message.content;
      console.log('Extracted content:', extractedContent);
      
      // Parse the JSON response
      try {
        const extractedData = JSON.parse(extractedContent);
        return {
          success: true,
          data: {
            extractedData
          }
        };
      } catch (parseError) {
        console.error('Failed to parse OpenAI response:', parseError, extractedContent);
        return {
          success: false,
          error: 'Failed to parse the extracted data. Please try again.',
        };
      }
    } catch (apiError) {
      console.error('OpenAI API error:', apiError);
      return {
        success: false,
        error: 'Failed to communicate with OpenAI. Please try again later.',
      };
    }
    */
  } catch (error) {
    console.error('Error extracting resume data:', error);
    return {
      success: false,
      error: 'Failed to extract data from resume. Please try again later.',
    };
  }
};
