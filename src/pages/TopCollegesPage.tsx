import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, DollarSign, Calendar, ExternalLink, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Enhanced college data with course mapping
const allCollegesData = [
  { id: 'iit-bombay', name: 'Indian Institute of Technology, Bombay', location: 'Mumbai', ranking: { nirf: '#3', category: 'Engineering' }, fee: '₹2.18L/yr', avgPackage: '₹21.8L', departments: ['CSE', 'AI-ML', 'Data Science'], cutoff: 'JEE Advanced', placements: '95%', image: '/api/placeholder/300/200', courses: ['Engineering', 'Technology'] },
  { id: 'iit-delhi', name: 'Indian Institute of Technology, Delhi', location: 'New Delhi', ranking: { nirf: '#2', category: 'Engineering' }, fee: '₹2.0L/yr', avgPackage: '₹20.1L', departments: ['CSE', 'Cyber Security'], cutoff: 'JEE Advanced', placements: '96%', image: '/api/placeholder/300/200', courses: ['Engineering', 'Technology'] },
  { id: 'iiit-hyderabad', name: 'IIIT Hyderabad', location: 'Hyderabad', ranking: { nirf: 'Top Ranked', category: 'CSE' }, fee: '₹3.2L/yr', avgPackage: '₹32.0L', departments: ['CSE', 'AI', 'Robotics'], cutoff: 'JEE Main/UGEE', placements: '98%', image: '/api/placeholder/300/200', courses: ['Engineering', 'Technology'] },
  { id: 'vit-vellore', name: 'Vellore Institute of Technology', location: 'Vellore', ranking: { nirf: '#11', category: 'Engineering' }, fee: '₹1.98L/yr', avgPackage: '₹9.0L', departments: ['CSE', 'AI & ML', 'Cyber Security'], cutoff: 'VITEEE', placements: '85%', image: '/api/placeholder/300/200', courses: ['Engineering', 'Technology', 'Sciences'] },
  { id: 'iit-hyderabad', name: 'Indian Institute of Technology, Hyderabad', location: 'Hyderabad', ranking: { nirf: '#8', category: 'Engineering' }, fee: '₹2.18L/yr', avgPackage: '₹25.5L', departments: ['AI', 'ML', 'Data Science'], cutoff: 'JEE Advanced', placements: '97%', image: '/api/placeholder/300/200', courses: ['Engineering', 'Technology'] },
  { id: 'iisc-bangalore', name: 'Indian Institute of Science', location: 'Bangalore', ranking: { nirf: '#1', category: 'Overall' }, fee: '₹2.5L/yr', avgPackage: '₹28.0L', departments: ['AI', 'Machine Learning', 'Computational Sciences'], cutoff: 'JEE Advanced/KVPY', placements: '99%', image: '/api/placeholder/300/200', courses: ['Engineering', 'Research'] },
  { id: 'aiims-delhi', name: 'All India Institute of Medical Sciences, Delhi', location: 'New Delhi', ranking: { nirf: '#1', category: 'Medical' }, fee: '₹1.66L/yr', avgPackage: 'N/A', departments: ['MBBS', 'MD', 'MS'], cutoff: 'NEET UG', placements: '100%', image: '/api/placeholder/300/200', courses: ['Medical', 'Health Sciences'] },
  { id: 'iim-ahmedabad', name: 'Indian Institute of Management, Ahmedabad', location: 'Ahmedabad', ranking: { nirf: '#1', category: 'Management' }, fee: '₹23L/yr', avgPackage: '₹33.0L', departments: ['MBA', 'Management'], cutoff: 'CAT', placements: '100%', image: '/api/placeholder/300/200', courses: ['Management', 'Business'] },
  { id: 'mits-madanapalle', name: 'Madanapalle Institute of Technology and Sciences', location: 'Madanapalle, Andhra Pradesh', ranking: { nirf: 'Deemed University', category: 'Engineering' }, fee: '₹1.2L/yr', avgPackage: '₹6.5L', departments: ['CSE', 'ECE', 'Mechanical', 'Civil'], cutoff: 'JEE Main/EAMCET', placements: '80%', image: '/api/placeholder/300/200', courses: ['Engineering', 'Technology', 'Sciences'] }
];

const courseCollegeMapping = {
  'Engineering': ['iit-bombay', 'iit-delhi', 'iiit-hyderabad', 'vit-vellore', 'iit-hyderabad', 'iisc-bangalore', 'mits-madanapalle'],
  'Medical': ['aiims-delhi'],
  'Management': ['iim-ahmedabad'],
  'Technology': ['iit-bombay', 'iit-delhi', 'iiit-hyderabad', 'vit-vellore', 'iit-hyderabad', 'mits-madanapalle'],
  'Sciences': ['vit-vellore', 'mits-madanapalle'],
  'Research': ['iisc-bangalore']
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
  
  // Get course name from courseId (e.g., 'btech-engineering' -> 'Engineering')
  const getCourseName = (courseId: string) => {
    if (courseId?.includes('engineering')) return 'Engineering';
    if (courseId?.includes('medical')) return 'Medical';
    if (courseId?.includes('management')) return 'Management';
    return 'Engineering'; // default
  };
  
  const courseName = courseId ? getCourseName(courseId) : 'Engineering';
  
  // Filter colleges based on the selected course
  const relevantCollegeIds = courseCollegeMapping[courseName as keyof typeof courseCollegeMapping] || [];
  const colleges = allCollegesData.filter(college => 
    relevantCollegeIds.includes(college.id) && 
    college.courses.includes(courseName)
  );

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
            <h1 className="text-3xl font-bold text-foreground">
              Top Colleges for {courseName}
            </h1>
            <Badge variant="secondary" className="text-sm">
              {getSpecializationName(currentSpecialization)}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Discover the best colleges for your chosen specialization with comprehensive details about admissions, fees, and placements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Filters</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Location</h4>
                  <div className="space-y-2">
                    {filterOptions.map((filter) => (
                      <div key={filter.name} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={filter.name}
                          name="location"
                          defaultChecked={filter.active}
                          className="w-4 h-4"
                        />
                        <label htmlFor={filter.name} className="text-sm">
                          {filter.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Sort By</h4>
                  <div className="space-y-2">
                    {sortOptions.map((sort) => (
                      <div key={sort.name} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={sort.name}
                          name="sort"
                          defaultChecked={sort.active}
                          className="w-4 h-4"
                        />
                        <label htmlFor={sort.name} className="text-sm">
                          {sort.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admission Snapshot */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Admission Snapshot</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Application Deadline: March 2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Total Seats: 50,000+</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Top Entrance: JEE Advanced</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {colleges.length} colleges for {courseName}
              </p>
            </div>

            <div className="space-y-6">
              {colleges.map((college) => (
                <Card key={college.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* College Image */}
                      <div className="md:col-span-1">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* College Details */}
                      <div className="md:col-span-2 space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {college.location}
                            </div>
                            <Badge variant="outline">
                              {college.ranking.nirf} NIRF {college.ranking.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {college.departments.map((dept) => (
                            <Badge key={dept} variant="secondary" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Fee:</span>
                            <span className="ml-2 font-medium">{college.fee}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Package:</span>
                            <span className="ml-2 font-medium">{college.avgPackage}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Entrance:</span>
                            <span className="ml-2 font-medium">{college.cutoff}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Placements:</span>
                            <span className="ml-2 font-medium">{college.placements}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="md:col-span-1 flex flex-col gap-3">
                        <Button
                          onClick={() => navigate(`/college-details/${college.id}`)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => window.open(`https://www.${college.id.replace('-', '')}.ac.in`, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Visit Website
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {colleges.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No colleges found</h3>
                  <p className="text-muted-foreground">
                    No colleges available for the selected course and specialization.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}