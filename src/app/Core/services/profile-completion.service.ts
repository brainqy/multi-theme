import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileField } from 'src/app/Component/profile/profile.component';

interface ProfileData {
  profileFields: ProfileField[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletionService {
  private profileUrl = 'assets/data/profile/profilecompletion.json';

  // List of required fields for profile completion
  private profileFields: ProfileField[] = [
    { field: "profilePicture", weight: 10, completed: false },
    { field: "username", weight: 15, completed: true },
    { field: "email", weight: 15, completed: true },
    { field: "bio", weight: 10, completed: false },
    { field: "location", weight: 10, completed: false },
    { field: "skills", weight: 20, completed: true },
    { field: "experience", weight: 20, completed: true }
  ];
  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileData> {
    return this.http.get<ProfileData>(this.profileUrl);
  }

  getProfileFields(): ProfileField[] {
    return this.profileFields;
  }
  calculateCompletion(profileData: ProfileData): number {
    const totalWeight = profileData.profileFields.reduce((acc, field) => acc + field.weight, 0);
    const completedWeight = profileData.profileFields
      .filter(field => field.completed)
      .reduce((acc, field) => acc + field.weight, 0);

    return Math.round((completedWeight / totalWeight) * 100);
  }

  calculateProfileCompletion(): number {
    const totalWeight = this.profileFields.reduce((sum, field) => sum + field.weight, 0);
    const completedWeight = this.profileFields
      .filter(field => field.completed)
      .reduce((sum, field) => sum + field.weight, 0);
    
    return Math.round((completedWeight / totalWeight) * 100);
  }

  updateProfileField(field: string, status: boolean): void {
    const profileField = this.profileFields.find(f => f.field === field);
    if (profileField) {
      profileField.completed = status;
    }
  }

}
