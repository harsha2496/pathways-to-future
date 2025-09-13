import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, DollarSign, Calendar, ExternalLink, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const collegesData = {
  'mpc': {
    'btech-engineering': {
      'cse': [
        {
          id: 'iit-bombay',
          name: 'Indian Institute of Technology, Bombay',
          location: 'Mumbai',
          ranking: { nirf: '#3', category: 'Engineering' },
          fee: '₹2.18L/yr',
          avgPackage: '₹21.8L',
          departments: ['CSE', 'AI-ML', 'Data Science'],
          cutoff: 'JEE Advanced',
          placements: '95%',
          image: '/api/placeholder/300/200'
        },
        {
          id: 'iit-delhi',
          name: 'Indian Institute of Technology, Delhi',
          location: 'New Delhi',
          ranking: { nirf: '#2', category: 'Engineering' },
          fee: '₹2.0L/yr',
          avgPackage: '₹20.1L',
          departments: ['CSE', 'Cyber Security'],
          cutoff: 'JEE Advanced',
          placements: '96%',
          image: '/api/placeholder/300/200'
        },
        {
          id: 'iiit-hyderabad',
          name: 'IIIT Hyderabad',
          location: 'Hyderabad',
          ranking: { nirf: 'Top Ranked', category: 'CSE' },
          fee: '₹3.2L/yr',
          avgPackage: '₹32.0L',
          departments: ['CSE', 'AI', 'Robotics'],
          cutoff: 'JEE Main/UGEE',
          placements: '98%',
          image: '/api/placeholder/300/200'
        },
        {
          id: 'vit-vellore',
          name: 'Vellore Institute of Technology',
          location: 'Vellore',
          ranking: { nirf: '#11', category: 'Engineering' },
          fee: '₹1.98L/yr',
          avgPackage: '₹9.0L',
          departments: ['CSE', 'AI & ML', 'Cyber Security'],
          cutoff: 'VITEEE',
          placements: '85%',
          image: '/api/placeholder/300/200'
        }
      ],
      'ai-ml': [
        {
          id: 'iit-hyderabad',
          name: 'Indian Institute of Technology, Hyderabad',
          location: 'Hyderabad',
          ranking: { nirf: '#8', category: 'Engineering' },
          fee: '₹2.18L/yr',
          avgPackage: '₹25.5L',
          departments: ['AI', 'ML', 'Data Science'],
          cutoff: 'JEE Advanced',
          placements: '97%',
          image: '/api/placeholder/300/200'
        },
        {
          id: 'iisc-bangalore',
          name: 'Indian Institute of Science',
          location: 'Bangalore',
          ranking: { nirf: '#1', category: 'Overall' },
          fee: '₹2.5L/yr',
          avgPackage: '₹28.0L',
          departments: ['AI', 'Machine Learning', 'Computational Sciences'],
          cutoff: 'JEE Advanced/KVPY',
          placements: '99%',
          image: '/api/placeholder/300/200'
        }
      ]
    }
  }
};

const filterOptions = [
  { name: 'All India', active: true },
  { name: 'State', active: false },
  { name: 'Nearby', active: false }
];

const sortOptions = [
  { name: 'Ranking', active: true },
  { name: 'Fee', active: false },
  { name: 'Package', active: false }
];

export default function TopCollegesPage() {
  const { streamId, courseId, specializationId } = useParams<{ 
    streamId: string; 
    courseId: string; 
    specializationId: string; 
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get specialization from URL state or default to 'cse'
  const currentSpecialization = location.state?.specialization || specializationId || 'cse';
  
  const colleges = streamId && courseId ? 
    collegesData[streamId as keyof typeof collegesData]?.[courseId as any]?.[currentSpecialization] || [] : [];

  const getSpecializationName = (spec: string) => {
    const names: Record<string, string> = {
      'cse': 'CSE - Computer Science',
      'ai-ml': 'AI & ML',
      'ece': 'ECE - Electronics & Communication',
      'eee': 'EEE - Electrical & Electronics'
    };
    return names[spec] || spec.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Top Colleges for B.Tech - {getSpecializationName(currentSpecialization)}
              </h1>
              <p className="text-muted-foreground">Curated • 2025</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">Explore colleges</h2>
            
            {/* Location Filters */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Location</p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.map((option) => (
                      <Badge 
                        key={option.name}
                        variant={option.active ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {option.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Sort by</p>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                      <Badge 
                        key={option.name}
                        variant={option.active ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {option.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">NIRF Top 100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Fee ≤ ₹2.5L/yr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Avg Package ≥ ₹8L</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Within 50 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colleges List */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">{colleges.length} results</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">Government</Button>
                <Button variant="outline" size="sm">Private</Button>
                <Button variant="outline" size="sm">Deemed</Button>
              </div>
            </div>

            <div className="space-y-6">
              {colleges.map((college) => (
                <Card key={college.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* College Image */}
                      <div className="md:col-span-1">
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <Users className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>

                      {/* College Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                              {college.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <MapPin className="h-3 w-3" />
                              {college.location}
                              <Badge variant="outline" className="ml-2">
                                NIRF {college.ranking.nirf}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {college.departments.map((dept) => (
                            <Badge key={dept} variant="secondary" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Avg Fee</p>
                            <p className="font-semibold">{college.fee}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg Package</p>
                            <p className="font-semibold text-primary">{college.avgPackage}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="md:col-span-1 flex flex-col gap-2">
                        <Button className="w-full" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </Button>
                        <div className="text-center mt-2">
                          <p className="text-xs text-muted-foreground">Placements</p>
                          <p className="text-sm font-semibold text-success">{college.placements}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Colleges
              </Button>
            </div>
          </div>
        </div>

        {/* Admission Snapshot */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Admission Snapshot</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-secondary/30">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary">Common Exams</div>
                <div className="text-sm text-muted-foreground mt-1">JEE Main/Adv</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary">Cutoffs (Gen)</div>
                <div className="text-sm text-muted-foreground mt-1">Top 1-5k</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary">Application Window</div>
                <div className="text-sm text-muted-foreground mt-1">Nov-Apr</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary">Scholarships</div>
                <div className="text-sm text-muted-foreground mt-1">Merit & Need</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}