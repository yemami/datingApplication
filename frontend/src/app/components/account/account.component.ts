import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Iprofile } from './Iprofile';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  profileForm!: FormGroup;
  profile!: Iprofile;
  uploadedImage!: object;
  latitude!: number;
  longitude!: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snack: MatSnackBar
  ) {
    // initialize the profile form group
    this.profileForm = this.formBuilder.group({
      name: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      // password: '',
      profilePic: '',
      bio: '',
      location: '',
      interests: '',
    });
    this.userService.getProfileDetails().subscribe((response: any) => {
      this.profile = response.data as any;
      console.log('data', this.profile);
      this.profile = {
        ...this.profile,
        location: this.profile.location?.toString(),
        interests: this.profile.interests?.toString(),
      };
      this.profileForm = this.formBuilder.group(this.profile);
    });
  }

  onFileSelected(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.profileForm.patchValue({
            location: `${this.latitude}, ${this.longitude}`,
          });
        },
        (error) => console.error(error)
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  updateProfile() {
    // Implement the logic to update the user's profile information
    if (!this.profileForm.valid) return;
    let formData = this.profileForm.value;
    let data = {
      ...formData,
      profile: {
        bio: formData.bio,
        profilePic: formData.profilePic,
        location: formData.location.split(','),
        interests: formData.interests.split(','),
      },
    };
    // remove all empty fields
    for (let key in data) {
      if (data[key] === '') {
        delete data[key];
      }
    }
    //remove unwanted fields
    delete data.location;
    delete data.profilePic;

    const fData: FormData = new FormData();
    if (this.uploadedImage) {
      fData.append('profilePic', this.uploadedImage as any);
    }
    this.userService.updateProfileDetails(data, fData).subscribe({
      next: (response) =>
        this.snack.open('User Account updated successfully.', 'Dismiss', {
          duration: 5000,
        }),
      error: (err) =>
        this.snack.open(
          'Error while updating account information.',
          'Dismiss',
          { duration: 5000 }
        ),
    });
  }
}
