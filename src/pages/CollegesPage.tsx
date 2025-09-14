import { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Star, Users, ExternalLink, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

// Comprehensive college data from the PDF
const collegesData = [
  // IITs
  { id: 1, name: 'Indian Institute of Technology Madras', city: 'Chennai', state: 'Tamil Nadu', type: 'Government', nirf: 1, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitm.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 2, name: 'Indian Institute of Technology Delhi', city: 'New Delhi', state: 'Delhi', type: 'Government', nirf: 2, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitd.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 3, name: 'Indian Institute of Technology Bombay', city: 'Mumbai', state: 'Maharashtra', type: 'Government', nirf: 3, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitb.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 4, name: 'Indian Institute of Technology Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', type: 'Government', nirf: 4, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitk.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 5, name: 'Indian Institute of Technology Kharagpur', city: 'Kharagpur', state: 'West Bengal', type: 'Government', nirf: 5, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitkgp.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 6, name: 'Indian Institute of Technology Roorkee', city: 'Roorkee', state: 'Uttarakhand', type: 'Government', nirf: 6, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitr.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 7, name: 'Indian Institute of Technology Guwahati', city: 'Guwahati', state: 'Assam', type: 'Government', nirf: 7, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitg.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 8, name: 'Indian Institute of Technology Hyderabad', city: 'Hyderabad', state: 'Telangana', type: 'Government', nirf: 8, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iith.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  
  // NITs
  { id: 9, name: 'National Institute of Technology Tiruchirappalli', city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Government', nirf: 9, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.nitt.edu', courses: ['Engineering', 'Technology'] },
  { id: 10, name: 'National Institute of Technology Karnataka', city: 'Surathkal', state: 'Karnataka', type: 'Government', nirf: 10, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.nitk.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 11, name: 'Indian Institute of Technology (Indian School of Mines)', city: 'Dhanbad', state: 'Jharkhand', type: 'Government', nirf: 11, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitism.ac.in', courses: ['Engineering', 'Mining', 'Technology'] },
  
  // Private Institutes
  { id: 12, name: 'Vellore Institute of Technology', city: 'Vellore', state: 'Tamil Nadu', type: 'Private', nirf: 12, category: 'Engineering', entranceExams: ['VITEEE'], website: 'https://vit.ac.in', courses: ['Engineering', 'Technology', 'Sciences'] },
  { id: 13, name: 'Indian Institute of Technology Indore', city: 'Indore', state: 'Madhya Pradesh', type: 'Government', nirf: 13, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iiti.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 14, name: 'Indian Institute of Technology (Banaras Hindu University) Varanasi', city: 'Varanasi', state: 'Uttar Pradesh', type: 'Government', nirf: 14, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitbhu.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 15, name: 'Institute of Chemical Technology', city: 'Mumbai', state: 'Maharashtra', type: 'Government', nirf: 15, category: 'Engineering', entranceExams: ['JEE Main', 'MHT CET'], website: 'https://www.ictmumbai.edu.in', courses: ['Chemical Engineering', 'Technology'] },
  { id: 16, name: 'Amrita Vishwa Vidyapeetham', city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private', nirf: 16, category: 'Engineering', entranceExams: ['AEEE'], website: 'https://www.amrita.edu', courses: ['Engineering', 'Technology', 'Medicine'] },
  { id: 17, name: 'Jadavpur University', city: 'Kolkata', state: 'West Bengal', type: 'Government', nirf: 17, category: 'Engineering', entranceExams: ['WBJEE'], website: 'https://www.jaduniv.edu.in', courses: ['Engineering', 'Arts', 'Sciences'] },
  { id: 18, name: 'Anna University', city: 'Chennai', state: 'Tamil Nadu', type: 'Government', nirf: 18, category: 'Engineering', entranceExams: ['TNEA'], website: 'https://www.annauniv.edu', courses: ['Engineering', 'Technology'] },
  { id: 19, name: 'Indian Institute of Technology Ropar', city: 'Rupnagar', state: 'Punjab', type: 'Government', nirf: 19, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitrpr.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 20, name: 'National Institute of Technology Rourkela', city: 'Rourkela', state: 'Odisha', type: 'Government', nirf: 20, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.nitrkl.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 21, name: 'Indian Institute of Technology Patna', city: 'Patna', state: 'Bihar', type: 'Government', nirf: 21, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitp.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 22, name: 'Indian Institute of Technology Gandhinagar', city: 'Gandhinagar', state: 'Gujarat', type: 'Government', nirf: 22, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitgn.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 23, name: 'National Institute of Technology Warangal', city: 'Warangal', state: 'Telangana', type: 'Government', nirf: 23, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.nitw.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 24, name: 'Thapar Institute of Engineering and Technology', city: 'Patiala', state: 'Punjab', type: 'Private', nirf: 24, category: 'Engineering', entranceExams: ['JEE Main', 'TIET Entrance'], website: 'https://www.thapar.edu', courses: ['Engineering', 'Technology'] },
  { id: 25, name: 'National Institute of Technology Calicut', city: 'Kozhikode', state: 'Kerala', type: 'Government', nirf: 25, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.nitc.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 26, name: 'Birla Institute of Technology & Science -Pilani', city: 'Pilani', state: 'Rajasthan', type: 'Private', nirf: 26, category: 'Engineering', entranceExams: ['BITSAT'], website: 'https://www.bits-pilani.ac.in', courses: ['Engineering', 'Technology', 'Sciences'] },
  { id: 27, name: 'Indian Institute of Engineering Science and Technology', city: 'Shibpur', state: 'West Bengal', type: 'Government', nirf: 27, category: 'Engineering', entranceExams: ['JEE Main', 'WBJEE'], website: 'https://www.iiests.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 28, name: 'Indian Institute of Technology Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', type: 'Government', nirf: 28, category: 'Engineering', entranceExams: ['JEE Advanced'], website: 'https://www.iitbbs.ac.in', courses: ['Engineering', 'Technology', 'Research'] },
  { id: 29, name: 'National Institute of Technology Durgapur', city: 'Durgapur', state: 'West Bengal', type: 'Government', nirf: 29, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.nitdgp.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 30, name: 'Visvesvaraya National Institute of Technology', city: 'Nagpur', state: 'Maharashtra', type: 'Government', nirf: 30, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.vnit.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 31, name: 'Amity University', city: 'Gautam Budh Nagar', state: 'Uttar Pradesh', type: 'Private', nirf: 31, category: 'Engineering', entranceExams: ['Amity JEE'], website: 'https://www.amity.edu', courses: ['Engineering', 'Management', 'Sciences'] },
  { id: 32, name: 'Siksha O Anusandhan', city: 'Bhubaneswar', state: 'Odisha', type: 'Private', nirf: 32, category: 'Engineering', entranceExams: ['SAAT'], website: 'https://www.soa.ac.in', courses: ['Engineering', 'Medicine', 'Management'] },
  { id: 33, name: 'Jamia Millia Islamia', city: 'New Delhi', state: 'Delhi', type: 'Government', nirf: 33, category: 'Engineering', entranceExams: ['JEE Main', 'JMI Entrance'], website: 'https://www.jmi.ac.in', courses: ['Engineering', 'Arts', 'Sciences'] },
  { id: 38, name: 'Madanapalle Institute of Technology and Sciences', city: 'Madanapalle', state: 'Andhra Pradesh', type: 'Deemed', nirf: 34, category: 'Engineering', entranceExams: ['JEE Main', 'EAMCET'], website: 'https://www.mits.ac.in', courses: ['Engineering', 'Technology', 'Sciences'] },
  { id: 34, name: 'S.R.M. Institute of Science and Technology', city: 'Chennai', state: 'Tamil Nadu', type: 'Private', nirf: 34, category: 'Engineering', entranceExams: ['SRMJEEE'], website: 'https://www.srmist.edu.in', courses: ['Engineering', 'Technology', 'Medicine'] },
  { id: 35, name: 'Aligarh Muslim University', city: 'Aligarh', state: 'Uttar Pradesh', type: 'Government', nirf: 35, category: 'Engineering', entranceExams: ['AMUEEE'], website: 'https://www.amu.ac.in', courses: ['Engineering', 'Medicine', 'Arts'] },
  { id: 36, name: 'Delhi Technological University', city: 'New Delhi', state: 'Delhi', type: 'Government', nirf: 36, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.dtu.ac.in', courses: ['Engineering', 'Technology'] },
  { id: 37, name: 'Malaviya National Institute of Technology', city: 'Jaipur', state: 'Rajasthan', type: 'Government', nirf: 37, category: 'Engineering', entranceExams: ['JEE Main'], website: 'https://www.mnit.ac.in', courses: ['Engineering', 'Technology'] }
];

const courses = [
  'All Courses',
  'Engineering',
  'Technology', 
  'Research',
  'Medicine',
  'Management',
  'Sciences',
  'Arts',
  'Mining',
  'Chemical Engineering'
];

const states = [
  'All States',
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function CollegesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedType, setSelectedType] = useState<'All' | 'Government' | 'Private'>('All');
  const [nirfRange, setNirfRange] = useState({ min: 1, max: 100 });
  const [showFilters, setShowFilters] = useState(false);

  const filteredColleges = useMemo(() => {
    return collegesData.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           college.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = selectedState === 'All States' || college.state === selectedState;
      const matchesType = selectedType === 'All' || college.type === selectedType;
      const matchesCourse = selectedCourse === 'All Courses' || 
                           college.courses.some(course => course.includes(selectedCourse));
      const matchesNirf = college.nirf >= nirfRange.min && college.nirf <= nirfRange.max;

      return matchesSearch && matchesState && matchesType && matchesCourse && matchesNirf;
    });
  }, [searchQuery, selectedState, selectedType, selectedCourse, nirfRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Top Colleges in India</h1>
              <p className="text-muted-foreground">Find the best colleges for your career goals</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search colleges by name, city, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/20 rounded-lg">
              <div>
                <label className="text-sm font-medium mb-2 block">State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Course</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="government"
                      checked={selectedType === 'Government'}
                      onCheckedChange={(checked) => setSelectedType(checked ? 'Government' : 'All')}
                    />
                    <label htmlFor="government" className="text-sm">Government</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="private"
                      checked={selectedType === 'Private'}
                      onCheckedChange={(checked) => setSelectedType(checked ? 'Private' : 'All')}
                    />
                    <label htmlFor="private" className="text-sm">Private</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">NIRF Ranking</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={nirfRange.min}
                    onChange={(e) => setNirfRange(prev => ({ ...prev, min: parseInt(e.target.value) || 1 }))}
                    className="w-16"
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={nirfRange.max}
                    onChange={(e) => setNirfRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100 }))}
                    className="w-16"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredColleges.length} colleges
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {college.city}, {college.state}
                        </span>
                      </div>
                      <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                        {college.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">NIRF #{college.nirf}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Courses */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Courses Offered:</p>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* How to Join */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">How to Join:</p>
                  <div className="flex flex-wrap gap-1">
                    {college.entranceExams.map((exam, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {exam}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    onClick={() => navigate(`/college-details/${college.id}`)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(college.website, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
          </div>
        )}

        {/* Course Selection Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Find Top Colleges by Course</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Engineering', 'Medicine', 'Management', 'Technology', 'Sciences', 'Arts', 'Research', 'Chemical Engineering'].map((course) => (
              <Button
                key={course}
                variant="outline"
                className="p-4 h-auto flex flex-col items-center gap-2"
                onClick={() => {
                  setSelectedCourse(course);
                  setShowFilters(true);
                }}
              >
                <GraduationCap className="h-6 w-6" />
                <span className="text-sm font-medium">{course}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}