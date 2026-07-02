import type { ShopLead, FollowUp, ActivityLog } from '../types';

export const mockCurrentUser = {
  name: 'Alex Rivera',
  email: 'alex.rivera@visionx.ai',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80',
  role: 'Shop Security Operations Lead'
};

export const initialLeads: ShopLead[] = [
  {
    id: 'lead-1',
    businessName: 'Apex Hypermarket',
    ownerName: 'Marcus Vance',
    phone: '+1 (555) 234-5678',
    email: 'm.vance@apexhyper.com',
    address: '8900 Broadway Ave, New York, NY 10001',
    businessType: 'supermarket',
    status: 'trial_running',
    cameraDetails: {
      count: 32,
      brand: 'Hikvision',
      resolution: '4K (8MP)',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate: '2026-06-15',
      completedDate: '2026-06-15',
      trialStartDate: '2026-06-20',
      trialEndDate: '2026-07-20',
      assignedTo: 'Alex Rivera',
      notes: 'Trial is running on 8 cameras covering checkout lanes and warehouse entry. Customer wants to detect queue times and missing items.'
    },
    notes: 'Very interested in integrating the AI queue detection module. High priority conversion candidate.',
    createdAt: '2026-06-01T10:00:00Z',
    updatedAt: '2026-06-20T14:30:00Z'
  },
  {
    id: 'lead-2',
    businessName: 'Bella Vista Ristorante',
    ownerName: 'Sophia Moretti',
    phone: '+1 (555) 345-6789',
    email: 'info@bellavistaristorante.net',
    address: '42 Main St, Boston, MA 02108',
    businessType: 'restaurant',
    status: 'demo_scheduled',
    cameraDetails: {
      count: 12,
      brand: 'Dahua',
      resolution: '1080p (2MP)',
      type: 'mixed',
      recordingDays: 14
    },
    demoDetails: {
      scheduledDate: '2026-07-06',
      assignedTo: 'Alex Rivera',
      notes: 'Scheduled for virtual demo. Wants to see table turn-around alerts and kitchen compliance detection.'
    },
    notes: 'Franchise owner looking to deploy across 4 other locations if trial succeeds.',
    createdAt: '2026-06-10T09:15:00Z',
    updatedAt: '2026-06-12T11:00:00Z'
  },
  {
    id: 'lead-3',
    businessName: 'NextGen Warehousing',
    ownerName: 'David Chen',
    phone: '+1 (555) 456-7890',
    email: 'dchen@nextgenstorage.io',
    address: '1500 Logistic Way, Chicago, IL 60609',
    businessType: 'warehouse',
    status: 'converted',
    cameraDetails: {
      count: 64,
      brand: 'Axis Communications',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 45
    },
    demoDetails: {
      scheduledDate: '2026-05-10',
      completedDate: '2026-05-10',
      trialStartDate: '2026-05-12',
      trialEndDate: '2026-06-12',
      assignedTo: 'Sarah Jenkins',
      notes: 'Trial successfully completed. Focus was on forklift safety zones and perimeter breach warnings.'
    },
    notes: 'Signed a 3-year contract for AI-powered analytics subscription.',
    createdAt: '2026-05-01T08:30:00Z',
    updatedAt: '2026-06-15T16:45:00Z'
  },
  {
    id: 'lead-4',
    businessName: 'Luxe Boutique NYC',
    ownerName: 'Isabella Dubois',
    phone: '+1 (555) 567-8901',
    email: 'isabella@luxeboutiquenyc.com',
    address: '730 Fifth Ave, New York, NY 10019',
    businessType: 'retail',
    status: 'new',
    cameraDetails: {
      count: 8,
      brand: 'Hanwha Techwin',
      resolution: '4MP',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {},
    notes: 'Lead came through website. Interested in heatmaps and demographics profiling of high-value shoppers.',
    createdAt: '2026-07-02T16:00:00Z',
    updatedAt: '2026-07-02T16:00:00Z'
  },
  {
    id: 'lead-5',
    businessName: 'Synergy Office Plaza',
    ownerName: 'Richard Henderson',
    phone: '+1 (555) 678-9012',
    email: 'r.henderson@synergyplaza.com',
    address: '500 Corporate Parkway, San Francisco, CA 94111',
    businessType: 'office',
    status: 'interested',
    cameraDetails: {
      count: 48,
      brand: 'Bosch Security',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate: '2026-06-25',
      completedDate: '2026-06-25',
      assignedTo: 'Alex Rivera',
      notes: 'Demo showed tailgating detection and face verification modules. Client expressed strong interest.'
    },
    notes: 'Reviewing budget for Q3. Needs customized pricing for cloud storage archive integration.',
    createdAt: '2026-06-18T10:45:00Z',
    updatedAt: '2026-06-25T15:20:00Z'
  },
  {
    id: 'lead-6',
    businessName: 'Urban Grocers',
    ownerName: 'Amir Patel',
    phone: '+1 (555) 789-0123',
    email: 'amir@urbangrocers.com',
    address: '104 Urban Court, Seattle, WA 98101',
    businessType: 'supermarket',
    status: 'not_interested',
    cameraDetails: {
      count: 18,
      brand: 'Lorex',
      resolution: '1080p (2MP)',
      type: 'analog',
      recordingDays: 7
    },
    demoDetails: {
      scheduledDate: '2026-06-08',
      completedDate: '2026-06-08',
      assignedTo: 'Sarah Jenkins',
      notes: 'Demo completed. Customer has an older analog system. Upgrading to IP is too expensive for their current budget.'
    },
    notes: 'Closed lead. May re-engage in 6-12 months if they upgrade to hybrid/IP systems.',
    createdAt: '2026-05-20T11:00:00Z',
    updatedAt: '2026-06-08T17:00:00Z'
  },
  {
    id: 'lead-7',
    businessName: 'Quick Stop Bodega',
    ownerName: 'Manuel Santos',
    phone: '+1 (555) 890-1234',
    email: 'manuelsantos@bodegabiz.com',
    address: '542 8th Ave, New York, NY 10018',
    businessType: 'retail',
    status: 'trial_running',
    cameraDetails: {
      count: 6,
      brand: 'Amcrest',
      resolution: '1080p (2MP)',
      type: 'ip',
      recordingDays: 14
    },
    demoDetails: {
      scheduledDate: '2026-06-22',
      completedDate: '2026-06-22',
      trialStartDate: '2026-06-24',
      trialEndDate: '2026-07-08',
      assignedTo: 'Alex Rivera',
      notes: 'Installed temporary bridge for 2 cameras. Checking for shoplifting alerts and crowd count.'
    },
    notes: 'Trial ending soon. Needs active check-in this week.',
    createdAt: '2026-06-12T14:00:00Z',
    updatedAt: '2026-06-24T09:30:00Z'
  },
  {
    id: 'lead-8',
    businessName: 'West End Fitness Center',
    ownerName: 'Clara Oswald',
    phone: '+1 (555) 901-2345',
    email: 'clara@westendgym.com',
    address: '2350 West End Ave, Nashville, TN 37203',
    businessType: 'other',
    status: 'new',
    cameraDetails: {
      count: 14,
      brand: 'Hikvision',
      resolution: '4MP',
      type: 'mixed',
      recordingDays: 30
    },
    demoDetails: {},
    notes: 'Wants to count occupants for gym capacity limits in real-time on their website.',
    createdAt: '2026-07-01T15:30:00Z',
    updatedAt: '2026-07-01T15:30:00Z'
  },
  {
    id: 'lead-9',
    businessName: 'The Daily Grind Cafe',
    ownerName: 'Ethan Hunt',
    phone: '+1 (555) 012-3456',
    email: 'ethan@dailygrind.coffee',
    address: '77 Espresso Way, Seattle, WA 98104',
    businessType: 'restaurant',
    status: 'demo_scheduled',
    cameraDetails: {
      count: 4,
      brand: 'Reolink',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 14
    },
    demoDetails: {
      scheduledDate: '2026-07-05',
      assignedTo: 'Sarah Jenkins',
      notes: 'Interested in employee productivity and customer checkout delay alerts.'
    },
    notes: 'Very energetic owner. Wants automated email reports weekly.',
    createdAt: '2026-06-28T09:00:00Z',
    updatedAt: '2026-06-29T10:15:00Z'
  },
  {
    id: 'lead-10',
    businessName: 'Starlight Cinema Complex',
    ownerName: 'Jameson Thorne',
    phone: '+1 (555) 123-4567',
    email: 'j.thorne@starlighttheatres.net',
    address: '909 Boulevard of Stars, Los Angeles, CA 90028',
    businessType: 'other',
    status: 'interested',
    cameraDetails: {
      count: 42,
      brand: 'Axis Communications',
      resolution: '4K (8MP)',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate: '2026-06-18',
      completedDate: '2026-06-18',
      assignedTo: 'Alex Rivera',
      notes: 'Demoed people counting at turnstiles and ticket booth queue monitoring.'
    },
    notes: 'Requested a custom quotation for an annual enterprise subscription plan.',
    createdAt: '2026-06-05T12:00:00Z',
    updatedAt: '2026-06-18T16:00:00Z'
  },
  {
    id: 'lead-11',
    businessName: 'Metro Logistics Center',
    ownerName: 'Frank Castle',
    phone: '+1 (555) 234-9876',
    email: 'fcastle@metrologistics.com',
    address: '400 Shipping Rd, Newark, NJ 07114',
    businessType: 'warehouse',
    status: 'trial_running',
    cameraDetails: {
      count: 75,
      brand: 'Hikvision',
      resolution: '4MP',
      type: 'ip',
      recordingDays: 60
    },
    demoDetails: {
      scheduledDate: '2026-06-08',
      completedDate: '2026-06-08',
      trialStartDate: '2026-06-10',
      trialEndDate: '2026-07-10',
      assignedTo: 'Sarah Jenkins',
      notes: 'Active trial. Monitoring loading docks for idle trucks and forklift zone breaches.'
    },
    notes: 'Major industrial account. High security compliance criteria.',
    createdAt: '2026-05-25T14:30:00Z',
    updatedAt: '2026-06-10T09:00:00Z'
  },
  {
    id: 'lead-12',
    businessName: 'Green Leaf Dispensary',
    ownerName: 'Chloe Bennett',
    phone: '+1 (555) 345-0987',
    email: 'chloe@greenleafdispense.com',
    address: '888 Herbal Parkway, Denver, CO 80202',
    businessType: 'retail',
    status: 'converted',
    cameraDetails: {
      count: 16,
      brand: 'Hanwha Techwin',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 90
    },
    demoDetails: {
      scheduledDate: '2026-05-22',
      completedDate: '2026-05-22',
      trialStartDate: '2026-05-25',
      trialEndDate: '2026-06-08',
      assignedTo: 'Alex Rivera',
      notes: 'Completed trial. Verified regulatory compliance logs and age verification queue audits.'
    },
    notes: 'Converted in mid-June. Fully active license subscription.',
    createdAt: '2026-05-15T11:45:00Z',
    updatedAt: '2026-06-12T15:30:00Z'
  },
  {
    id: 'lead-13',
    businessName: 'Apex Fashion Hub',
    ownerName: 'Vance Sterling',
    phone: '+1 (555) 456-1029',
    email: 'sterling@apexfashion.org',
    address: '12 Fashion Plaza, Miami, FL 33137',
    businessType: 'retail',
    status: 'new',
    cameraDetails: {
      count: 24,
      brand: 'UniFi',
      resolution: '4MP',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {},
    notes: 'Prospect contacted via industry trade show. Highly interested in customer flow tracking and VIP alerts.',
    createdAt: '2026-07-03T08:10:00Z',
    updatedAt: '2026-07-03T08:10:00Z'
  },
  {
    id: 'lead-14',
    businessName: 'Taco Loco Franchise',
    ownerName: 'Carlos Santini',
    phone: '+1 (555) 567-9102',
    email: 'carlos@tacolocogroup.com',
    address: '99 Cantina Lane, Austin, TX 78701',
    businessType: 'restaurant',
    status: 'interested',
    cameraDetails: {
      count: 36,
      brand: 'Dahua',
      resolution: '4MP',
      type: 'mixed',
      recordingDays: 21
    },
    demoDetails: {
      scheduledDate: '2026-06-12',
      completedDate: '2026-06-12',
      assignedTo: 'Alex Rivera',
      notes: 'Virtual demo completed. Showed POS terminal text overlay sync and drive-thru time tracker.'
    },
    notes: 'Reviewing SaaS SLA terms before agreeing to a pilot program for 5 locations.',
    createdAt: '2026-06-02T13:20:00Z',
    updatedAt: '2026-06-15T10:00:00Z'
  },
  {
    id: 'lead-15',
    businessName: 'Elite Co-Working Spaces',
    ownerName: 'Diana Prince',
    phone: '+1 (555) 678-2345',
    email: 'd.prince@elitecowork.co',
    address: '100 Executive Drive, Washington, DC 20005',
    businessType: 'office',
    status: 'new',
    cameraDetails: {
      count: 28,
      brand: 'Axis Communications',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {},
    notes: 'Wants an API integration with their booking software to audit room occupancy thresholds.',
    createdAt: '2026-07-02T10:00:00Z',
    updatedAt: '2026-07-02T10:00:00Z'
  },
  {
    id: 'lead-16',
    businessName: 'Safeway Depot',
    ownerName: 'Gregory House',
    phone: '+1 (555) 789-3456',
    email: 'ghouse@safewaydepot.net',
    address: '750 Industrial Rd, Philadelphia, PA 19116',
    businessType: 'warehouse',
    status: 'demo_scheduled',
    cameraDetails: {
      count: 50,
      brand: 'Bosch Security',
      resolution: '1080p (2MP)',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate: '2026-07-08',
      assignedTo: 'Sarah Jenkins',
      notes: 'Demo scheduled. Focus will be on automated hazard detection and forklift-pedestrian separation warnings.'
    },
    notes: 'Large storage yard layout. Requires high-range night vision capability.',
    createdAt: '2026-06-25T09:30:00Z',
    updatedAt: '2026-06-27T11:20:00Z'
  },
  {
    id: 'lead-17',
    businessName: 'Oasis Supermarket',
    ownerName: 'Lina Al-Mansoor',
    phone: '+1 (555) 890-4567',
    email: 'lalmansoor@oasismarkets.com',
    address: '382 Desert Wind Blvd, Phoenix, AZ 85001',
    businessType: 'supermarket',
    status: 'trial_running',
    cameraDetails: {
      count: 22,
      brand: 'Dahua',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate: '2026-06-10',
      completedDate: '2026-06-10',
      trialStartDate: '2026-06-14',
      trialEndDate: '2026-07-14',
      assignedTo: 'Alex Rivera',
      notes: 'Active trial. Checking analytics for stock alerts (empty shelf notifications) and checkout line congestion.'
    },
    notes: 'Highly satisfied with the checkout analytics dashboard. Convinced they will sign next week.',
    createdAt: '2026-05-30T10:15:00Z',
    updatedAt: '2026-06-14T09:00:00Z'
  },
  {
    id: 'lead-18',
    businessName: 'Luxe Salon Group',
    ownerName: 'Fiona Gallagher',
    phone: '+1 (555) 901-5678',
    email: 'fiona@luxesalons.com',
    address: '900 N Michigan Ave, Chicago, IL 60611',
    businessType: 'retail',
    status: 'not_interested',
    cameraDetails: {
      count: 5,
      brand: 'Nest/Google',
      resolution: '1080p (2MP)',
      type: 'ip',
      recordingDays: 10
    },
    demoDetails: {
      scheduledDate: '2026-06-03',
      completedDate: '2026-06-03',
      assignedTo: 'Sarah Jenkins',
      notes: 'Completed presentation. Owner has very simple security cameras and does not see a business case for high-end AI compliance analysis.'
    },
    notes: 'Closed. No active business fit.',
    createdAt: '2026-05-18T14:00:00Z',
    updatedAt: '2026-06-03T16:30:00Z'
  },
  {
    id: 'lead-19',
    businessName: 'Hanson Corporate Office',
    ownerName: 'William Hanson',
    phone: '+1 (555) 012-6789',
    email: 'w.hanson@hansoncorp.com',
    address: '1 Hanson Way, Minneapolis, MN 55401',
    businessType: 'office',
    status: 'demo_scheduled',
    cameraDetails: {
      count: 40,
      brand: 'Hanwha Techwin',
      resolution: '4K (8MP)',
      type: 'ip',
      recordingDays: 45
    },
    demoDetails: {
      scheduledDate: '2026-07-09',
      assignedTo: 'Alex Rivera',
      notes: 'Demo scheduled. Focus on building occupancy thresholds and restricted zone entries.'
    },
    notes: 'Multi-story office building. Looking to replace legacy DVR system with pure NVR + AI bridge.',
    createdAt: '2026-06-29T16:45:00Z',
    updatedAt: '2026-06-30T10:00:00Z'
  },
  {
    id: 'lead-20',
    businessName: 'Golden Gate Seafood',
    ownerName: 'Steven Wu',
    phone: '+1 (555) 123-7890',
    email: 'swu@goldengateseafood.com',
    address: '422 Fisherman Wharf, San Francisco, CA 94133',
    businessType: 'restaurant',
    status: 'converted',
    cameraDetails: {
      count: 14,
      brand: 'Hikvision',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 21
    },
    demoDetails: {
      scheduledDate: '2026-05-14',
      completedDate: '2026-05-14',
      trialStartDate: '2026-05-18',
      trialEndDate: '2026-06-01',
      assignedTo: 'Alex Rivera',
      notes: 'Successful trial. Solved fish processing queue timing alerts and kitchen sanitation audits.'
    },
    notes: 'Onboarded early June. 14 channels active.',
    createdAt: '2026-05-02T09:00:00Z',
    updatedAt: '2026-06-03T11:00:00Z'
  },
  {
    id: 'lead-21',
    businessName: 'East Coast Distribution',
    ownerName: 'Vince McMahon',
    phone: '+1 (555) 234-8901',
    email: 'vmcmahon@eastcoastdist.com',
    address: '1 Titan Tower, Stamford, CT 06902',
    businessType: 'warehouse',
    status: 'interested',
    cameraDetails: {
      count: 120,
      brand: 'Axis Communications',
      resolution: '4K (8MP)',
      type: 'ip',
      recordingDays: 60
    },
    demoDetails: {
      scheduledDate: '2026-06-23',
      completedDate: '2026-06-23',
      assignedTo: 'Alex Rivera',
      notes: 'Demo shown. Large enterprise deployment discussion. Client wants custom on-prem edge box deployment.'
    },
    notes: 'Legal team reviewing the enterprise compliance and safety terms.',
    createdAt: '2026-06-05T10:30:00Z',
    updatedAt: '2026-06-24T14:00:00Z'
  },
  {
    id: 'lead-22',
    businessName: 'Sweet Tooth Bakery',
    ownerName: 'Mary Berry',
    phone: '+1 (555) 345-9012',
    email: 'mary@sweettoothbakery.co.uk',
    address: '77 Flour Road, Portland, OR 97201',
    businessType: 'restaurant',
    status: 'new',
    cameraDetails: {
      count: 5,
      brand: 'Reolink',
      resolution: '1080p (2MP)',
      type: 'ip',
      recordingDays: 14
    },
    demoDetails: {},
    notes: 'Interested in counting daily walking traffic outside the shopfront window.',
    createdAt: '2026-07-02T14:20:00Z',
    updatedAt: '2026-07-02T14:20:00Z'
  },
  {
    id: 'lead-23',
    businessName: 'HealthSmart Pharmacy',
    ownerName: 'George Costanza',
    phone: '+1 (555) 456-0123',
    email: 'gcostanza@healthsmart.org',
    address: '448 Vandelay Way, Queens, NY 11375',
    businessType: 'retail',
    status: 'trial_running',
    cameraDetails: {
      count: 10,
      brand: 'Hanwha Techwin',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate: '2026-06-18',
      completedDate: '2026-06-18',
      trialStartDate: '2026-06-22',
      trialEndDate: '2026-07-06',
      assignedTo: 'Sarah Jenkins',
      notes: 'Trial ongoing. Validating HIPAA-compliant blur overlays for checkout monitors.'
    },
    notes: 'Required specific data policy guarantees which have been sent to their compliance officer.',
    createdAt: '2026-06-10T11:00:00Z',
    updatedAt: '2026-06-22T13:45:00Z'
  },
  {
    id: 'lead-24',
    businessName: 'Pinnacle Office Tower',
    ownerName: 'Bruce Wayne',
    phone: '+1 (555) 567-1234',
    email: 'bwayne@wayneenterprises.com',
    address: '1007 Mountain Drive, Gotham, NJ 07102',
    businessType: 'office',
    status: 'interested',
    cameraDetails: {
      count: 150,
      brand: 'Axis Communications',
      resolution: '4K (8MP)',
      type: 'ip',
      recordingDays: 90
    },
    demoDetails: {
      scheduledDate: '2026-06-20',
      completedDate: '2026-06-20',
      assignedTo: 'Alex Rivera',
      notes: 'Full system demo of license plate recognition and access control integration.'
    },
    notes: 'Very positive response. Procurement department is reviewing the quotation.',
    createdAt: '2026-06-08T09:00:00Z',
    updatedAt: '2026-06-20T17:00:00Z'
  },
  {
    id: 'lead-25',
    businessName: 'City Center Plaza',
    ownerName: 'Diana Prince',
    phone: '+1 (555) 678-0192',
    email: 'dprince@citycenterplaza.com',
    address: '500 Constitution Ave, Washington, DC 20001',
    businessType: 'other',
    status: 'new',
    cameraDetails: {
      count: 80,
      brand: 'Bosch Security',
      resolution: '5MP',
      type: 'ip',
      recordingDays: 45
    },
    demoDetails: {},
    notes: 'Public park and plaza layout. Wants object left behind alerts and loitering analysis.',
    createdAt: '2026-07-02T11:30:00Z',
    updatedAt: '2026-07-02T11:30:00Z'
  },
  {
    id: 'lead-26',
    businessName: 'Cornerstone Supermarket',
    ownerName: 'Martha Kent',
    phone: '+1 (555) 789-1029',
    email: 'martha@cornerstonemarket.com',
    address: '12 Smallville Road, Topeka, KS 66601',
    businessType: 'supermarket',
    status: 'demo_scheduled',
    cameraDetails: {
      count: 15,
      brand: 'Lorex',
      resolution: '4MP',
      type: 'ip',
      recordingDays: 30
    },
    demoDetails: {
      scheduledDate: '2026-07-04',
      assignedTo: 'Sarah Jenkins',
      notes: 'Scheduled virtual demo to focus on stockout alerts and warehouse security.'
    },
    notes: 'Lead generated via partner referral.',
    createdAt: '2026-06-28T14:00:00Z',
    updatedAt: '2026-06-29T09:30:00Z'
  }
];

export const initialFollowUps: FollowUp[] = [
  {
    id: 'followup-1',
    leadId: 'lead-7',
    date: '2026-06-28', // OVERDUE (relative to July 3rd, 2026)
    notes: 'Follow up on security bridge setup details. Check if the Bodega is experiencing router lags.',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'followup-2',
    leadId: 'lead-23',
    date: '2026-06-30', // OVERDUE
    notes: 'Send pharmacy manager the custom privacy blur documentation.',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'followup-3',
    leadId: 'lead-1',
    date: '2026-07-04', // UPCOMING
    notes: 'Weekly trial progress call. Present statistics on checkout line queue reductions.',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'followup-4',
    leadId: 'lead-2',
    date: '2026-07-05', // UPCOMING
    notes: 'Send meeting link and prep details for virtual kitchen compliance demo.',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'followup-5',
    leadId: 'lead-5',
    date: '2026-07-07', // UPCOMING
    notes: 'Call Richard to discuss pricing options for third-party cloud archiver integration.',
    status: 'pending',
    priority: 'low'
  },
  {
    id: 'followup-6',
    leadId: 'lead-16',
    date: '2026-07-08', // UPCOMING
    notes: 'Prepare safety zone hazard warning slides for logistics demo.',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'followup-7',
    leadId: 'lead-3',
    date: '2026-06-15', // COMPLETED
    notes: 'Discuss service agreement details and finalize contract for NextGen Warehousing.',
    status: 'completed',
    priority: 'high'
  },
  {
    id: 'followup-8',
    leadId: 'lead-12',
    date: '2026-06-12', // COMPLETED
    notes: 'Confirm hardware setup for dispensary AI subscription channels.',
    status: 'completed',
    priority: 'medium'
  }
];

export const initialActivities: ActivityLog[] = [
  {
    id: 'act-1',
    leadId: 'lead-1',
    timestamp: '2026-06-01T10:00:00Z',
    userId: 'user-1',
    userName: 'Alex Rivera',
    action: 'Lead Created',
    details: 'Lead added to the dashboard.'
  },
  {
    id: 'act-2',
    leadId: 'lead-1',
    timestamp: '2026-06-15T10:00:00Z',
    userId: 'user-1',
    userName: 'Alex Rivera',
    action: 'Demo Completed',
    details: 'Virtual demo completed successfully. Focus was on checkout lines.'
  },
  {
    id: 'act-3',
    leadId: 'lead-1',
    timestamp: '2026-06-20T14:30:00Z',
    userId: 'user-1',
    userName: 'Alex Rivera',
    action: 'Trial Started',
    details: '8 channels activated for checkout AI analytics.'
  },
  {
    id: 'act-4',
    leadId: 'lead-3',
    timestamp: '2026-05-01T08:30:00Z',
    userId: 'user-2',
    userName: 'Sarah Jenkins',
    action: 'Lead Created',
    details: 'Warehouse operations lead registered.'
  },
  {
    id: 'act-5',
    leadId: 'lead-3',
    timestamp: '2026-05-10T10:00:00Z',
    userId: 'user-2',
    userName: 'Sarah Jenkins',
    action: 'Demo Completed',
    details: 'Forklift zone safety and perimeter breach detection demonstrated.'
  },
  {
    id: 'act-6',
    leadId: 'lead-3',
    timestamp: '2026-06-12T17:00:00Z',
    userId: 'user-2',
    userName: 'Sarah Jenkins',
    action: 'Trial Ended',
    details: '30-day trial concluded with high accuracy alerts.'
  },
  {
    id: 'act-7',
    leadId: 'lead-3',
    timestamp: '2026-06-15T16:45:00Z',
    userId: 'user-2',
    userName: 'Sarah Jenkins',
    action: 'Converted',
    details: '3-year contract signed. Active account established.'
  },
  {
    id: 'act-8',
    leadId: 'lead-23',
    timestamp: '2026-06-22T13:45:00Z',
    userId: 'user-2',
    userName: 'Sarah Jenkins',
    action: 'Trial Started',
    details: '10-camera trial initiated with HIPAA compliant blurring active.'
  }
];

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Trial Ending Soon',
    message: 'Trial for Sweet Bodega is ending in 3 days. Please schedule follow-up.',
    timestamp: '2026-07-02T18:30:00Z',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New Lead Generated',
    message: 'Apex Fashion Hub registered as a new lead under retail category.',
    timestamp: '2026-07-03T08:10:00Z',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Demo Tomorrow',
    message: 'Reminder: Virtual kitchen compliance demo with Bella Vista Ristorante is scheduled for tomorrow at 2 PM.',
    timestamp: '2026-07-03T09:00:00Z',
    read: true
  }
];
