import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, ExternalLink, Calendar, Users, BookOpen, Award, DollarSign, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Extended college data with detailed information
const collegeDetailsData: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Indian Institute of Technology Madras',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    nirf: 1,
    category: 'Engineering',
    entranceExams: ['JEE Advanced'],
    website: 'https://www.iitm.ac.in',
    courses: ['Engineering', 'Technology', 'Research'],
    established: 1959,
    affiliation: 'Institute of National Importance',
    campus: '617 acres',
    totalFee: '₹8.5 Lakhs (4 years)',
    avgPackage: '₹21.5 Lakhs',
    highestPackage: '₹2.5 Crores',
    placementRate: '85%',
    departments: [
      'Computer Science & Engineering',
      'Electrical Engineering', 
      'Mechanical Engineering',
      'Chemical Engineering',
      'Civil Engineering',
      'Aerospace Engineering',
      'Biotechnology',
      'Mathematics',
      'Physics',
      'Chemistry'
    ],
    facilities: [
      'Central Library with 5+ lakh books',
      'Research Labs & Centers',
      'Sports Complex',
      'Hostels for 8000+ students',
      'Medical Center',
      'Entrepreneurship Cell',
      'Alumni Network of 50,000+'
    ],
    admissionProcess: [
      'Qualify JEE Advanced with minimum required rank',
      'Participate in JoSAA Counseling',
      'Choice filling and seat allocation',
      'Document verification and fee payment',
      'Report to college for admission'
    ],
    eligibilityReqs: [
      '10+2 with Physics, Chemistry, Mathematics',
      'Minimum 75% in 12th (65% for SC/ST)',
      'JEE Main qualification required for JEE Advanced',
      'Age limit: Maximum 25 years (30 for SC/ST/PwD)'
    ],
    importantDates: [
      'JEE Advanced: May 2025',
      'JoSAA Counseling: June-July 2025',
      'Academic Session: July 2025'
    ],
    contact: {
      phone: '+91-44-2257-4802',
      email: 'admissions@iitm.ac.in',
      address: 'IIT Madras, Chennai - 600036, Tamil Nadu'
    }
  },
  // Add more detailed data for other colleges as needed
};

export default function CollegeDetailsPage() {
  const { collegeId } = useParams<{ collegeId: string }>();
  const navigate = useNavigate();
  
  const college = collegeId ? collegeDetailsData[collegeId] : null;

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">College Not Found</h2>
          <Button onClick={() => navigate('/colleges')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Colleges
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/colleges')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </Button>
        </div>

        {/* College Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold text-foreground mb-3">
                  {college.name}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{college.city}, {college.state}</span>
                  </div>
                  <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                    {college.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-semibold">NIRF Rank #{college.nirf}</span>
                  </div>
                  <Badge variant="outline">Est. {college.established}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{college.affiliation}</p>
              </div>
              <Button 
                onClick={() => window.open(college.website, '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Website
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{college.campus}</div>
                    <div className="text-sm text-muted-foreground">Campus Area</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{college.placementRate}</div>
                    <div className="text-sm text-muted-foreground">Placement Rate</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{college.avgPackage}</div>
                    <div className="text-sm text-muted-foreground">Avg Package</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{college.totalFee}</div>
                    <div className="text-sm text-muted-foreground">Total Fee</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Departments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Departments & Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {college.departments.map((dept: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/20 rounded">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{dept}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How to Join */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  How to Join
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Entrance Exams</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.entranceExams.map((exam: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {exam}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Eligibility Requirements</h4>
                    <ul className="space-y-2">
                      {college.eligibilityReqs.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Admission Process</h4>
                    <div className="space-y-3">
                      {college.admissionProcess.map((step: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm text-muted-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Campus Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {college.facilities.map((facility: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{college.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{college.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{college.contact.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle>Important Dates 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {college.importantDates.map((date: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/20 rounded">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">{date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Placement Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Placement Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Placement Rate</span>
                  <span className="font-semibold">{college.placementRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Package</span>
                  <span className="font-semibold">{college.avgPackage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Highest Package</span>
                  <span className="font-semibold text-primary">{college.highestPackage}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => window.open(college.website, '_blank')}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Official Website
                </Button>
                <Button variant="outline" className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Calculate Fee & Expenses
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Connect with Alumni
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}