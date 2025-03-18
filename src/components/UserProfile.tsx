import React from 'react';
import { User, Building2, Phone, Mail, MapPin, Users, Calendar, Target } from 'lucide-react';
import { UserProfile as UserProfileType } from '../types';
import { format } from 'date-fns';

interface Props {
  profile: UserProfileType;
}

export function UserProfile({ profile }: Props) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-orange-500" />
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="opacity-90">{profile.title}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{profile.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Department & Team</p>
                <p className="font-medium">{profile.department} - {profile.team}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Join Date</p>
                <p className="font-medium">{format(profile.joinDate, 'MMMM d, yyyy')}</p>
              </div>
            </div>

            {profile.desiredRole && (
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Career Goal</p>
                  <p className="font-medium">{profile.desiredRole}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {profile.manager && (
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-600 font-medium mb-2">Manager</p>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{profile.manager.name}</p>
                    <p className="text-sm text-gray-500">{profile.manager.title}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{profile.contact.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{profile.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{profile.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}