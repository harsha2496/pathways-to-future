import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, GraduationCap, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const coursesData = {
  'mpc': {
    name: 'MPC (Maths, Physics, Chemistry)',
    courses: [
      {
        id: 'btech-engineering',
        name: 'B.Tech / Engineering',
        duration: '4 years',
        specializations: ['CSE', 'AI/ML', 'ECE', 'EEE', 'Mechanical', 'Civil'],
        description: 'Technology, Software Development, Innovation'
      },
      {
        id: 'bsc-computer-science',
        name: 'B.Sc (Computer Science)',
        duration: '3 years',
        specializations: ['CS', 'Data Science', 'Statistics'],
        description: 'Programming, Analytics, Research'
      },
      {
        id: 'architecture',
        name: 'Architecture (B.Arch)',
        duration: '5 years',
        specializations: ['Urban', 'Landscape', 'Interior'],
        description: 'Design, Planning, Construction'
      },
      {
        id: 'aviation',
        name: 'Aviation',
        duration: '1-3 years',
        specializations: ['Pilot Training', 'Aircraft Maintenance'],
        description: 'Flying, Aircraft Systems, Safety'
      }
    ]
  },
  'bipc': {
    name: 'BiPC (Biology, Physics, Chemistry)',
    courses: [
      {
        id: 'mbbs',
        name: 'MBBS / BDS / BAMS / BHMS',
        duration: '5-6 years',
        specializations: ['General Medicine', 'Surgery', 'Pediatrics', 'Cardiology'],
        description: 'Healthcare, Treatment, Patient Care'
      },
      {
        id: 'pharmacy',
        name: 'B.Pharmacy / Pharm.D',
        duration: '4-6 years',
        specializations: ['Clinical Pharmacy', 'Pharmaceutical Sciences'],
        description: 'Drug Development, Healthcare'
      },
      {
        id: 'nursing',
        name: 'Nursing / Physiotherapy',
        duration: '3-4 years',
        specializations: ['Critical Care', 'Rehabilitation'],
        description: 'Patient Care, Recovery'
      },
      {
        id: 'biotechnology',
        name: 'Biotechnology / Genetics',
        duration: '3-4 years',
        specializations: ['Genetic Engineering', 'Microbiology'],
        description: 'Research, Lab Work, Innovation'
      }
    ]
  },
  'cec-mec': {
    name: 'CEC / MEC (Commerce & Economics)',
    courses: [
      {
        id: 'bcom-bba',
        name: 'B.Com / BBA / BMS',
        duration: '3 years',
        specializations: ['Finance', 'Marketing', 'HR'],
        description: 'Business, Management, Strategy'
      },
      {
        id: 'ca-cma-cs',
        name: 'CA / CMA / CS',
        duration: '3-5 years',
        specializations: ['Auditing', 'Taxation', 'Corporate Law'],
        description: 'Accounting, Finance, Legal'
      },
      {
        id: 'law',
        name: 'Law (LLB)',
        duration: '3-5 years',
        specializations: ['Corporate Law', 'Criminal Law', 'Civil Law'],
        description: 'Legal Practice, Justice'
      },
      {
        id: 'economics',
        name: 'Economics / Statistics',
        duration: '3 years',
        specializations: ['Econometrics', 'Data Analysis'],
        description: 'Analysis, Policy, Research'
      }
    ]
  },
  'arts-humanities': {
    name: 'Arts / Humanities',
    courses: [
      {
        id: 'ba-psychology',
        name: 'BA (Psychology, Sociology)',
        duration: '3 years',
        specializations: ['Clinical Psychology', 'Social Work'],
        description: 'Human Behavior, Society'
      },
      {
        id: 'mass-communication',
        name: 'Mass Communication & Journalism',
        duration: '3 years',
        specializations: ['Print Media', 'Digital Media', 'TV Production'],
        description: 'Media, Communication, Storytelling'
      },
      {
        id: 'fashion-arts',
        name: 'Fashion / Fine Arts / Design',
        duration: '3-4 years',
        specializations: ['Fashion Design', 'Graphic Design', 'Interior Design'],
        description: 'Creativity, Design, Aesthetics'
      },
      {
        id: 'civil-services',
        name: 'Civil Services (UPSC, PSC)',
        duration: '3+ years',
        specializations: ['IAS', 'IPS', 'IFS'],
        description: 'Public Service, Administration'
      }
    ]
  },
  'vocational-diploma': {
    name: 'Vocational / Diploma',
    courses: [
      {
        id: 'polytechnic',
        name: 'Polytechnic Diploma (Engineering)',
        duration: '3 years',
        specializations: ['Mechanical', 'Electrical', 'Computer'],
        description: 'Technical Skills, Hands-on Training'
      },
      {
        id: 'skill-courses',
        name: 'Skill-based Courses',
        duration: '6 months - 2 years',
        specializations: ['Web Development', 'Digital Marketing', 'Data Entry'],
        description: 'Industry Skills, Quick Employment'
      }
    ]
  }
};

const jobsAndSalaries = {
  'mpc': [
    { title: 'Software Developer', salary: '₹3 LPA – ₹20 LPA' },
    { title: 'Data Scientist / AI Engineer', salary: '₹6 LPA – ₹25 LPA' },
    { title: 'Mechanical Engineer', salary: '₹2.5 LPA – ₹10 LPA' },
    { title: 'Civil Engineer', salary: '₹2.5 LPA – ₹12 LPA' },
    { title: 'Cybersecurity Analyst', salary: '₹5 LPA – ₹18 LPA' }
  ],
  'bipc': [
    { title: 'Doctor', salary: '₹6 LPA – ₹30+ LPA' },
    { title: 'Pharmacist', salary: '₹2.5 LPA – ₹8 LPA' },
    { title: 'Nurse', salary: '₹2.5 LPA – ₹8 LPA' },
    { title: 'Biotechnologist', salary: '₹3 LPA – ₹12 LPA' },
    { title: 'Agriculture Officer', salary: '₹3 LPA – ₹12 LPA' }
  ],
  'cec-mec': [
    { title: 'Accountant', salary: '₹2.5 LPA – ₹8 LPA' },
    { title: 'Chartered Accountant', salary: '₹6 LPA – ₹30+ LPA' },
    { title: 'Lawyer', salary: '₹4 LPA – ₹25 LPA' },
    { title: 'Economist', salary: '₹6 LPA – ₹25 LPA' },
    { title: 'Hotel Manager', salary: '₹3 LPA – ₹15 LPA' }
  ],
  'arts-humanities': [
    { title: 'Psychologist', salary: '₹4 LPA – ₹20 LPA' },
    { title: 'Journalist', salary: '₹3 LPA – ₹12 LPA' },
    { title: 'Fashion Designer', salary: '₹3 LPA – ₹15 LPA' },
    { title: 'IAS / IPS Officer', salary: '₹8 LPA – ₹25 LPA' }
  ],
  'vocational-diploma': [
    { title: 'Junior Engineer', salary: '₹2.5 LPA – ₹8 LPA' },
    { title: 'Web Developer', salary: '₹3 LPA – ₹12 LPA' },
    { title: 'Graphic Designer', salary: '₹2.5 LPA – ₹10 LPA' }
  ]
};

export default function CoursesPage() {
  const { streamId } = useParams<{ streamId: string }>();
  const navigate = useNavigate();
  
  const streamData = streamId ? coursesData[streamId as keyof typeof coursesData] : null;

  if (!streamData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Stream not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleCourseClick = (courseId: string) => {
    navigate(`/specializations/${streamId}/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Streams
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Courses for {streamData.name}
              </h1>
              <p className="text-muted-foreground">Selected Stream</p>
            </div>
          </div>
        </div>

        {/* Popular Courses Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamData.courses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md"
                onClick={() => handleCourseClick(course.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {course.name}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {course.duration}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex flex-wrap gap-1">
                      {course.specializations.slice(0, 3).map((spec, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                        >
                          {spec}
                        </span>
                      ))}
                      {course.specializations.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          +{course.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-primary hover:bg-primary-hover"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course.id);
                      }}
                    >
                      View Specializations
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Top Colleges
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter Options */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Filter by</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Undergraduate</Button>
            <Button variant="outline" size="sm">Postgraduate</Button>
            <Button variant="outline" size="sm">Diploma</Button>
          </div>
        </div>
      </div>
    </div>
  );
}