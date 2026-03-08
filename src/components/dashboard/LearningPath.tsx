import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_LEARNING_PATH } from '@/lib/mockData';
import { CheckCircle, Lock, PlayCircle, FileText, BookOpen, ArrowRight, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LearningPath() {
  return (
    <div className="glass-panel rounded-2xl h-full overflow-hidden">
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          <span className="tracking-tight">Your Learning Path</span>
        </h3>
        <Button variant="outline" size="sm" className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary">
          Personalize
        </Button>
      </div>
      <div className="p-6">
        <div className="relative pl-6 border-l-2 border-primary/20 space-y-8">
          {MOCK_LEARNING_PATH.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isLocked = step.status === 'locked';

            const Icon = step.type === 'video' ? PlayCircle :
                         step.type === 'quiz' ? FileText :
                         step.type === 'reading' ? BookOpen :
                         CheckCircle;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 transition-all duration-300 bg-background",
                  isCompleted ? "border-primary bg-primary shadow-[0_0_10px_hsl(var(--primary))]" :
                  isCurrent ? "border-primary bg-background animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" :
                  "border-muted-foreground/30"
                )} />

                <div className={cn(
                  "p-4 rounded-xl border transition-all duration-300",
                  isCurrent ? "bg-primary/5 border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.1)]" :
                  isLocked ? "bg-muted/30 border-transparent opacity-70 grayscale" :
                  "bg-card/50 border-border/50 hover:border-primary/30"
                )}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2.5 rounded-lg shrink-0 transition-colors",
                        isCompleted ? "bg-primary/10 text-primary" :
                        isCurrent ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" :
                        "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className={cn("font-bold text-sm", isLocked && "text-muted-foreground")}>
                          {step.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5 font-medium">
                          <span className="capitalize px-2 py-0.5 rounded-full bg-muted">{step.type}</span>
                          <span>{step.duration}</span>
                          <span className="text-primary font-bold">+{step.points} pts</span>
                        </div>
                      </div>
                    </div>
                    
                    {isCurrent && (
                      <Button size="sm" className="shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                        Start <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    )}
                    {isCompleted && (
                      <div className="text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                    {isLocked && (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
