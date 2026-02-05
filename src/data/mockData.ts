 export interface Report {
   id: string;
   type: 'suspicious' | 'lighting' | 'noise' | 'vandalism' | 'traffic';
   title: string;
   description: string;
   location: string;
   timestamp: Date;
   status: 'submitted' | 'acknowledged' | 'in_progress' | 'resolved';
   isAnonymous: boolean;
   isVerified: boolean;
   thanksCount: number;
   confirmCount: number;
   isUrgent?: boolean;
   userId?: string;
 }
 
 export interface User {
   id: string;
   name: string;
   neighborhood: string;
   contributionScore: number;
   reportsSubmitted: number;
   reportsResolved: number;
 }
 
 export interface Hotspot {
   id: string;
   lat: number;
   lng: number;
   intensity: 'low' | 'medium' | 'high';
   type: string;
 }
 
 export const neighborhoods = [
   'Al Ain District',
   'Downtown Abu Dhabi',
   'Al Reem Island',
   'Khalifa City',
   'Yas Island',
   'Saadiyat Island',
   'Al Maryah Island',
 ];
 
export const mockUser: User = {
  id: '1',
  name: 'Mukesh',
  neighborhood: 'Al Ain District',
  contributionScore: 847,
  reportsSubmitted: 23,
  reportsResolved: 18,
};
 
 export const mockReports: Report[] = [
   {
     id: '1',
     type: 'suspicious',
     title: 'Suspicious Vehicle Reported',
     description: 'Unknown white van parked near school for extended period',
     location: 'Al Ain District, Zone 3',
     timestamp: new Date(Date.now() - 1000 * 60 * 15),
     status: 'acknowledged',
     isAnonymous: false,
     isVerified: true,
     thanksCount: 24,
     confirmCount: 8,
     isUrgent: true,
   },
   {
     id: '2',
     type: 'lighting',
     title: 'Street Light Outage',
     description: 'Multiple street lights not functioning on main road',
     location: 'Downtown, Block 7',
     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
     status: 'in_progress',
     isAnonymous: true,
     isVerified: true,
     thanksCount: 15,
     confirmCount: 12,
   },
   {
     id: '3',
     type: 'noise',
     title: 'Late Night Construction Noise',
     description: 'Construction work continuing past permitted hours',
     location: 'Al Reem Island, Tower 5',
     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
     status: 'submitted',
     isAnonymous: false,
     isVerified: false,
     thanksCount: 7,
     confirmCount: 3,
   },
   {
     id: '4',
     type: 'vandalism',
     title: 'Graffiti on Public Wall',
     description: 'New graffiti spotted on community center wall',
     location: 'Khalifa City, Park Area',
     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
     status: 'resolved',
     isAnonymous: true,
     isVerified: true,
     thanksCount: 31,
     confirmCount: 5,
   },
 ];
 
 export const mockHotspots: Hotspot[] = [
   { id: '1', lat: 24.4539, lng: 54.3773, intensity: 'high', type: 'suspicious' },
   { id: '2', lat: 24.4639, lng: 54.3673, intensity: 'medium', type: 'lighting' },
   { id: '3', lat: 24.4439, lng: 54.3873, intensity: 'low', type: 'noise' },
   { id: '4', lat: 24.4739, lng: 54.3573, intensity: 'medium', type: 'traffic' },
 ];
 
 export const myReports: Report[] = [
   {
     id: '5',
     type: 'lighting',
     title: 'Broken Street Lamp',
     description: 'Street lamp flickering and needs replacement',
     location: 'Al Ain District, Zone 1',
     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
     status: 'resolved',
     isAnonymous: false,
     isVerified: true,
     thanksCount: 12,
     confirmCount: 4,
     userId: '1',
   },
   {
     id: '6',
     type: 'suspicious',
     title: 'Unknown Person Loitering',
     description: 'Individual seen around parking area multiple times',
     location: 'Al Ain District, Zone 2',
     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
     status: 'in_progress',
     isAnonymous: true,
     isVerified: true,
     thanksCount: 19,
     confirmCount: 7,
     userId: '1',
   },
   {
     id: '7',
     type: 'traffic',
     title: 'Speeding Vehicles on Residential Road',
     description: 'Multiple vehicles exceeding speed limit near playground',
     location: 'Al Ain District, Zone 3',
     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
     status: 'acknowledged',
     isAnonymous: false,
     isVerified: false,
     thanksCount: 28,
     confirmCount: 15,
     userId: '1',
   },
 ];
