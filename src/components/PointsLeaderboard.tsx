import React from 'react';
import { Trophy, Gift, Star } from 'lucide-react';
import { UserProfile, PointsReward } from '../types';
import { RANKS, REWARDS } from '../config/rankConfig';

interface Props {
  users: UserProfile[];
  currentUser: UserProfile;
  onRedeemPoints: (reward: PointsReward) => void;
}

export function PointsLeaderboard({ users, currentUser, onRedeemPoints }: Props) {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const userRank = RANKS.find(rank => 
    currentUser.points >= rank.minPoints && currentUser.points <= rank.maxPoints
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Current User Stats */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Your Points Dashboard</h2>
            <p className="opacity-90">{currentUser.points} points</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">{userRank?.icon}</div>
            <p className="font-semibold">{userRank?.title}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all"
              style={{ 
                width: `${((currentUser.points - (userRank?.minPoints || 0)) / 
                ((userRank?.maxPoints || 100) - (userRank?.minPoints || 0))) * 100}%` 
              }}
            />
          </div>
          <p className="mt-2 text-sm">
            {userRank?.maxPoints !== Infinity 
              ? `${userRank?.maxPoints - currentUser.points} points to next rank`
              : 'Maximum rank achieved!'}
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-semibold">Company Leaderboard</h2>
        </div>
        <div className="space-y-4">
          {sortedUsers.map((user, index) => {
            const rank = RANKS.find(r => 
              user.points >= r.minPoints && user.points <= r.maxPoints
            );
            return (
              <div 
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  user.id === currentUser.id 
                    ? 'bg-orange-50 border-2 border-orange-200'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">
                    #{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-2xl">{rank?.icon}</span>
                    </div>
                    <p className="text-sm text-gray-600">{user.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">{user.points} pts</p>
                  <p className="text-sm text-gray-600">{rank?.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-semibold">Redeem Points</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REWARDS.map(reward => (
            <div 
              key={reward.id}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
            >
              <img 
                src={reward.imageUrl} 
                alt={reward.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{reward.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-orange-600">
                    {reward.pointsCost} pts
                  </span>
                  <button
                    onClick={() => onRedeemPoints(reward)}
                    disabled={currentUser.points < reward.pointsCost || !reward.available}
                    className={`px-4 py-2 rounded-lg ${
                      currentUser.points >= reward.pointsCost && reward.available
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}