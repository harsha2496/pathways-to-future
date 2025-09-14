import { useNavigate } from 'react-router-dom';
import { GraduationCap, Microscope, Building, Palette, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const streams = [
  {
    id: 'mpc',
    name: 'MPC',
    subtitle: 'Maths, Physics, Chemistry',
    description: 'Engineering, Technology, Research & Development',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    courses: ['B.Tech / Engineering', 'B.Sc. (Maths, Physics, CS)', 'Architecture (B.Arch)', 'Aviation']
  },
  {
    id: 'bipc',
    name: 'BiPC',
    subtitle: 'Biology, Physics, Chemistry',
    description: 'Medical, Healthcare, Life Sciences',
    icon: Microscope,
    color: 'from-green-500 to-green-600',
    courses: ['MBBS / BDS / BAMS / BHMS', 'B.Pharmacy / Pharm.D', 'Nursing / Physiotherapy', 'Biotechnology / Genetics']
  },
  {
    id: 'cec-mec',
    name: 'CEC / MEC',
    subtitle: 'Commerce & Economics',
    description: 'Business, Finance, Law, Management',
    icon: Building,
    color: 'from-purple-500 to-purple-600',
    courses: ['B.Com / BBA / BMS', 'CA / CMA / CS', 'Law (LLB)', 'Economics / Statistics']
  },
  {
    id: 'arts-humanities',
    name: 'Arts / Humanities',
    subtitle: 'Liberal Arts & Social Sciences',
    description: 'Creative Arts, Media, Social Work, Civil Services',
    icon: Palette,
    color: 'from-orange-500 to-orange-600',
    courses: ['BA (Psychology, Sociology)', 'Mass Communication', 'Fashion / Fine Arts', 'Civil Services']
  },
  {
    id: 'vocational-diploma',
    name: 'Vocational / Diploma',
    subtitle: 'Skill-based Education',
    description: 'Technical Skills, Applied Learning, Industry Ready',
    icon: Wrench,
    color: 'from-teal-500 to-teal-600',
    courses: ['Polytechnic Diploma', 'Skill-based Courses', 'Certificate Programs', 'Industry Training']
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleStreamClick = (streamId: string) => {
    navigate(`/courses/${streamId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What to do next after 12th?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore academic streams, courses, and specializations to find the career that matches your interests and goals.
          </p>
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {streams.map((stream) => (
            <Card
              key={stream.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md"
              onClick={() => handleStreamClick(stream.id)}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stream.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stream.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {stream.name}
                </h3>
                
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {stream.subtitle}
                </p>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {stream.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Popular Courses:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {stream.courses.slice(0, 2).map((course, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {course}
                      </span>
                    ))}
                    {stream.courses.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        +{stream.courses.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary-hover transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStreamClick(stream.id);
                  }}
                >
                  Explore Courses
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Career Options</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Colleges</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Specializations</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">AI Guidance</div>
          </div>
        </div>
      </div>
    </div>
  );
}