import { Component } from '@angular/core';
interface ManagedUser { name: string; email: string; role: string; reputation: number; reviews: number; status: string; }
@Component({ selector: 'app-user-management', standalone: false, templateUrl: './user-management.component.html', styleUrls: ['./user-management.component.css'] })
export class UserManagementComponent {
  query = '';
  statusFilter = 'All';
  users: ManagedUser[] = [
    { name: 'Elena Rostova', email: 'elena@example.com', role: 'Contributor', reputation: 92, reviews: 64, status: 'Active' },
    { name: 'Marcus Chen', email: 'marcus@example.com', role: 'Contributor', reputation: 88, reviews: 42, status: 'Active' },
    { name: 'User_88291', email: 'user88291@example.com', role: 'Standard', reputation: 34, reviews: 14, status: 'Probation' },
    { name: 'TechReviewer99', email: 'tech99@example.com', role: 'Restricted', reputation: 21, reviews: 31, status: 'Suspended' }
  ];
  get filteredUsers(): ManagedUser[] {
    const q = this.query.toLowerCase();
    return this.users.filter(u => (this.statusFilter === 'All' || u.status === this.statusFilter) && (!q || `${u.name} ${u.email}`.toLowerCase().includes(q)));
  }
  toggleStatus(user: ManagedUser): void { user.status = user.status === 'Suspended' ? 'Active' : 'Suspended'; }
}