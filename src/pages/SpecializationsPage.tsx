import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, GraduationCap, Briefcase, BookOpen, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const specializationsData = {
  'mpc': {
    'btech-engineering': {
      name: 'B.Tech / Engineering',
      specializations: [
        {
          id: 'cse',
          name: 'CSE - Computer Science',
          duration: '4 years',
          colleges: '1200+ colleges',
          tags: ['AI', 'Data Science', 'Cyber Security'],
          jobs: [
            { title: 'Software Engineer (CSE)', salary: '₹6L — ₹18L per year', level: 'Entry to Mid' },
            { title: 'ML Engineer (AI/ML)', salary: '₹8L — ₹25L per year', level: 'Growth' },
            { title: 'Data Scientist', salary: '₹6L — ₹25L per year', level: 'Mid to Senior' }
          ],
          skills: {
            core: ['DSA', 'Operating Systems', 'DBMS', 'Networks'],
            aiml: ['Python', 'NumPy', 'Pandas', 'Scikit', 'TensorFlow', 'AI/ML']
          }
        },
        {
          id: 'ai-ml',
          name: 'AI & ML',
          duration: '4 years',
          colleges: '500+ colleges',
          tags: ['Deep Learning', 'MLOps', 'Data Engineering'],
          jobs: [
            { title: 'AI Engineer', salary: '₹8L — ₹30L per year', level: 'Entry to Senior' },
            { title: 'ML Engineer', salary: '₹10L — ₹35L per year', level: 'Mid to Senior' },
            { title: 'Data Scientist', salary: '₹8L — ₹40L per year', level: 'Senior' }
          ],
          skills: {
            core: ['Machine Learning', 'Deep Learning', 'Neural Networks'],
            tools: ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn']
          }
        },
        {
          id: 'ece',
          name: 'ECE - Electronics & Communication',
          duration: '4 years',
          colleges: '800+ colleges',
          tags: ['VLSI', 'Embedded Systems', 'Telecommunications'],
          jobs: [
            { title: 'Electronics Engineer', salary: '₹4L — ₹15L per year', level: 'Entry to Mid' },
            { title: 'VLSI Engineer', salary: '₹6L — ₹20L per year', level: 'Mid' },
            { title: 'Embedded Systems Engineer', salary: '₹5L — ₹18L per year', level: 'Mid' }
          ],
          skills: {
            core: ['Digital Electronics', 'Analog Circuits', 'Microprocessors'],
            specialized: ['VLSI Design', 'Embedded C', 'PCB Design']
          }
        },
        {
          id: 'eee',
          name: 'EEE - Electrical & Electronics',
          duration: '4 years',
          colleges: '1000+ colleges',
          tags: ['Power Systems', 'Automation', 'Renewables'],
          jobs: [
            { title: 'Electrical Engineer', salary: '₹3.5L — ₹12L per year', level: 'Entry to Mid' },
            { title: 'Power Systems Engineer', salary: '₹5L — ₹15L per year', level: 'Mid' },
            { title: 'Automation Engineer', salary: '₹4L — ₹14L per year', level: 'Mid' }
          ],
          skills: {
            core: ['Power Systems', 'Control Systems', 'Electrical Machines'],
            specialized: ['MATLAB', 'AutoCAD', 'PLC Programming']
          }
        }
      ]
    }
  }
};

export default function SpecializationsPage() {
  const { streamId, courseId } = useParams<{ streamId: string; courseId: string }>();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const courseData = streamId && courseId ? 
    specializationsData[streamId as keyof typeof specializationsData]?.[courseId as any] : null;

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const selectedSpec = selectedSpecialization ? 
    courseData.specializations.find(s => s.id === selectedSpecialization) : 
    courseData.specializations[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/courses/${streamId}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {courseData.name} Specializations
              </h1>
              <p className="text-muted-foreground">{streamId?.toUpperCase()} • Undergraduate</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Specializations List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">Choose a specialization</h2>
            
            {/* Filter Section */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Refine</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Duration ≤ 4 years</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Avg Fee ≤ ₹2L/yr</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">High placement rate</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {courseData.specializations.map((spec) => (
                <Card
                  key={spec.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSpecialization === spec.id || (!selectedSpecialization && spec.id === courseData.specializations[0].id)
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedSpecialization(spec.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2">{spec.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {spec.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {spec.colleges}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {spec.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Dynamic Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedSpec && (
              <>
                {/* Why this course section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">₹6.5L/yr</div>
                      <div className="text-sm text-muted-foreground">Avg Salary</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">SWE, Data, DevOps</div>
                      <div className="text-sm text-muted-foreground">Top Roles</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">JEE, EAMCET</div>
                      <div className="text-sm text-muted-foreground">Exams</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">High</div>
                      <div className="text-sm text-muted-foreground">Demand</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Job Title & Salary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Job Title & Salary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedSpec.jobs.map((job, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">{job.level}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{job.salary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* What to Study */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                      What to Study
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(selectedSpec.skills).map(([category, skills]) => (
                        <div key={category}>
                          <h4 className="font-medium mb-2 capitalize">
                            {category === 'aiml' ? 'AI/ML Stack' : category} Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(skills as string[]).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-sm">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary-hover"
                    onClick={() => navigate(`/top-colleges/${streamId}/${courseId}/${selectedSpec.id}`, {
                      state: { specialization: selectedSpec.id }
                    })}
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Top Colleges
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Career Paths
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}