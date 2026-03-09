import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Medal, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Achievement, LeaderboardEntry } from '@/types';
import { useAuth } from '@/hooks/use-auth';

export function PointsCounter({ points }: { points: number }) {
  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:neon-border transition-all duration-300">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Points</p>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl font-bold mt-2 neon-text"
          >
            {points.toLocaleString()}
          </motion.div>
        </div>
        <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
          <Star className="h-7 w-7 text-primary fill-primary" />
        </div>
      </div>
    </div>
  );
}

export function BadgeList({ achievements = [] }: { achievements?: Achievement[] }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Medal className="h-5 w-5 text-primary" />
          <span className="tracking-tight">Achievements</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievements.length > 0 ? achievements.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-300",
                badge.earnedAt 
                  ? "bg-primary/5 border-primary/30 shadow-[0_0_10px_hsl(var(--primary)/0.1)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:-translate-y-1" 
                  : "bg-muted/30 border-transparent opacity-60 grayscale hover:opacity-80"
              )}
            >
              <div className="text-4xl mb-3 drop-shadow-md">{badge.icon || '🏆'}</div>
              <div className="font-bold text-sm line-clamp-1">{badge.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{badge.description}</div>
              {badge.earnedAt && (
                <Badge variant="secondary" className="mt-3 text-[10px] h-5 bg-primary/10 text-primary border-primary/20">
                  Earned
                </Badge>
              )}
            </motion.div>
          )) : (
            <div className="col-span-full py-8 text-center text-muted-foreground italic">
              Keep learning to unlock achievements!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Leaderboard({ entries = [] }: { entries?: LeaderboardEntry[] }) {
  const { user } = useAuth();
  
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="tracking-tight">Top Learners</span>
        </h3>
      </div>
      <div className="divide-y divide-border/50">
        {entries.length > 0 ? entries.map((entry, index) => (
          <motion.div
            key={entry.studentId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors duration-300",
              entry.studentId === user?.id && "bg-primary/5 border-l-2 border-primary"
            )}
          >
            <div className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow-sm",
              index === 0 ? "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-200" :
              index === 1 ? "bg-gray-100 text-gray-700 ring-2 ring-gray-200" :
              index === 2 ? "bg-orange-100 text-orange-700 ring-2 ring-orange-200" :
              "text-muted-foreground bg-muted"
            )}>
              {index < 3 ? <Crown className="h-4 w-4" /> : index + 1}
            </div>
            
            <Avatar className="h-10 w-10 border-2 border-background ring-2 ring-border/50">
              <AvatarImage src={entry.profile_photo} />
              <AvatarFallback>{entry.studentName[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate flex items-center gap-2">
                {entry.studentName}
                {entry.studentId === user?.id && <Badge variant="outline" className="text-[10px] h-5 border-primary/30 text-primary">You</Badge>}
              </div>
              <div className="text-xs text-muted-foreground font-mono">{entry.points.toLocaleString()} pts</div>
            </div>
          </motion.div>
        )) : (
          <div className="p-8 text-center text-muted-foreground italic">
            Leaderboard is being updated...
          </div>
        )}
      </div>
    </div>
  );
}
