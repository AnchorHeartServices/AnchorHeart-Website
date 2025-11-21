import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle2, Clock, Heart, Home, ClipboardList, Activity } from "lucide-react";

type VisitStep = "start" | "personal-care" | "daily-living" | "observation" | "companionship" | "end-visit";

interface Task {
  name: string;
  category: string;
  completed: boolean;
  notes?: string;
}

export default function Caregiver() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<VisitStep>("start");
  const [visitId, setVisitId] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Personal Care Tasks
  const personalCareTasks = [
    "Bathing assistance",
    "Grooming (hair, nails, shaving)",
    "Oral care (teeth brushing)",
    "Dressing assistance",
    "Toileting assistance",
    "Incontinence care",
    "Skin monitoring (redness, rashes)",
    "Mobility assistance (transfers, walking)",
    "Repositioning",
    "Range-of-motion exercises",
  ];

  // Daily Living Tasks
  const dailyLivingTasks = [
    "Meal preparation",
    "Feeding assistance",
    "Hydration encouragement",
    "Bed linen change",
    "Light housekeeping (client area)",
    "Dishes",
    "Laundry",
    "Medication reminder (no administration)",
  ];

  // Observation Tasks
  const observationTasks = [
    "Monitor pulse",
    "Monitor respirations",
    "Monitor temperature",
    "Note appetite changes",
    "Note mood changes",
    "Check skin condition",
    "Assess pain level",
    "Observe behavior changes",
  ];

  // Companionship Tasks
  const companionshipTasks = [
    "Light conversation",
    "Engaging activities",
    "Emotional support",
    "Reassurance provided",
    "Respect privacy maintained",
    "Encourage independence",
  ];

  // End of Visit Tasks
  const endVisitTasks = [
    "Clean area and dispose waste",
    "Wash hands",
    "Check bed height for safety",
    "Ensure call device accessible",
    "Verify lighting adequate",
    "Confirm next visit time",
  ];

  const handleStartVisit = async () => {
    if (!clientName.trim()) {
      toast({
        title: "Client name required",
        description: "Please enter the client's name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // For demo: create a basic visit log
      const response = await apiRequest("POST", "/api/caregiver/visits", {
        caregiverId: "demo-caregiver", // Simplified for now
        clientId: "demo-client",
        timeIn: new Date().toISOString(),
        visitDate: new Date().toISOString().split('T')[0],
      });

      const visit = await response.json();
      setVisitId(visit.id);
      setCurrentStep("personal-care");
      
      toast({
        title: "Visit started",
        description: `Visit with ${clientName} has begun`,
      });
    } catch (error: any) {
      toast({
        title: "Error starting visit",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTask = (taskName: string, category: string) => {
    const existing = tasks.find(t => t.name === taskName);
    if (existing) {
      setTasks(tasks.filter(t => t.name !== taskName));
    } else {
      setTasks([...tasks, { name: taskName, category, completed: true }]);
    }
  };

  const isTaskChecked = (taskName: string) => {
    return tasks.some(t => t.name === taskName);
  };

  const handleNext = () => {
    const steps: VisitStep[] = ["start", "personal-care", "daily-living", "observation", "companionship", "end-visit"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: VisitStep[] = ["start", "personal-care", "daily-living", "observation", "companionship", "end-visit"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleEndVisit = async (notes: string, concerns: string) => {
    if (!visitId) return;

    setIsSubmitting(true);
    try {
      // Submit all tasks
      if (tasks.length > 0) {
        await apiRequest("POST", "/api/caregiver/tasks", {
          tasks: tasks.map(t => ({
            visitLogId: visitId,
            category: t.category,
            taskName: t.name,
            completed: t.completed,
            notes: t.notes,
          })),
        });
      }

      // End the visit
      await apiRequest("PUT", `/api/caregiver/visits/${visitId}/end`, {
        timeOut: new Date().toISOString(),
        generalNotes: notes,
        concernsReported: concerns,
      });

      toast({
        title: "Visit completed",
        description: "All tasks have been recorded successfully",
      });

      // Reset for next visit
      setCurrentStep("start");
      setVisitId(null);
      setClientName("");
      setTasks([]);
    } catch (error: any) {
      toast({
        title: "Error ending visit",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">AnchorHeart Care</h1>
          {visitId && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Visit in progress</span>
            </div>
          )}
        </div>

        {/* Start Visit */}
        {currentStep === "start" && (
          <Card className="p-6">
            <div className="mb-6 text-center">
              <Heart className="mx-auto h-16 w-16 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Start New Visit</h2>
              <p className="text-sm text-muted-foreground">
                Begin documenting your care visit
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="client-name">Client Name</Label>
                <Input
                  id="client-name"
                  data-testid="input-client-name"
                  placeholder="Enter client name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleStartVisit}
                disabled={isSubmitting}
                data-testid="button-start-visit"
              >
                {isSubmitting ? "Starting..." : "Start Visit"}
              </Button>
            </div>
          </Card>
        )}

        {/* Personal Care */}
        {currentStep === "personal-care" && (
          <TaskChecklist
            title="Personal Care"
            icon={<Activity className="h-8 w-8 text-primary" />}
            tasks={personalCareTasks}
            category="personal_care"
            selectedTasks={tasks}
            onToggle={toggleTask}
            isTaskChecked={isTaskChecked}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Daily Living */}
        {currentStep === "daily-living" && (
          <TaskChecklist
            title="Daily Living Support"
            icon={<Home className="h-8 w-8 text-primary" />}
            tasks={dailyLivingTasks}
            category="daily_living"
            selectedTasks={tasks}
            onToggle={toggleTask}
            isTaskChecked={isTaskChecked}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Observation */}
        {currentStep === "observation" && (
          <ObservationForm
            tasks={observationTasks}
            category="observation"
            onToggle={toggleTask}
            isTaskChecked={isTaskChecked}
            onNext={handleNext}
            onBack={handleBack}
            visitId={visitId}
          />
        )}

        {/* Companionship */}
        {currentStep === "companionship" && (
          <TaskChecklist
            title="Companionship"
            icon={<Heart className="h-8 w-8 text-primary" />}
            tasks={companionshipTasks}
            category="companionship"
            selectedTasks={tasks}
            onToggle={toggleTask}
            isTaskChecked={isTaskChecked}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* End Visit */}
        {currentStep === "end-visit" && (
          <EndVisitForm
            tasks={endVisitTasks}
            category="end_visit"
            onToggle={toggleTask}
            isTaskChecked={isTaskChecked}
            onBack={handleBack}
            onSubmit={handleEndVisit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

// Task Checklist Component
function TaskChecklist({
  title,
  icon,
  tasks,
  category,
  selectedTasks,
  onToggle,
  isTaskChecked,
  onNext,
  onBack,
}: {
  title: string;
  icon: React.ReactNode;
  tasks: string[];
  category: string;
  selectedTasks: Task[];
  onToggle: (task: string, category: string) => void;
  isTaskChecked: (task: string) => boolean;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="space-y-3 mb-6">
        {tasks.map((task) => (
          <div key={task} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
            <Checkbox
              id={task}
              checked={isTaskChecked(task)}
              onCheckedChange={() => onToggle(task, category)}
              data-testid={`checkbox-${task.toLowerCase().replace(/ /g, '-')}`}
            />
            <Label htmlFor={task} className="flex-1 cursor-pointer">
              {task}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" data-testid="button-back">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1" data-testid="button-next">
          Next
        </Button>
      </div>
    </Card>
  );
}

// Observation Form with Vitals
function ObservationForm({
  tasks,
  category,
  onToggle,
  isTaskChecked,
  onNext,
  onBack,
  visitId,
}: {
  tasks: string[];
  category: string;
  onToggle: (task: string, category: string) => void;
  isTaskChecked: (task: string) => boolean;
  onNext: () => void;
  onBack: () => void;
  visitId: string | null;
}) {
  const { toast } = useToast();
  const [vitals, setVitals] = useState({
    pulse: "",
    respirations: "",
    temperature: "",
    painLevel: "",
  });

  const handleSaveVitals = async () => {
    if (!visitId) return;

    try {
      await apiRequest("POST", "/api/caregiver/vitals", {
        visitLogId: visitId,
        pulse: vitals.pulse ? parseInt(vitals.pulse) : null,
        respirations: vitals.respirations ? parseInt(vitals.respirations) : null,
        temperature: vitals.temperature || null,
        painLevel: vitals.painLevel ? parseInt(vitals.painLevel) : null,
      });

      toast({
        title: "Vitals recorded",
        description: "Vital signs have been saved",
      });
    } catch (error: any) {
      toast({
        title: "Error saving vitals",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <ClipboardList className="h-8 w-8 text-primary" />
        <h2 className="text-xl font-semibold">Observation & Reporting</h2>
      </div>

      {/* Vital Signs */}
      <div className="mb-6 p-4 rounded-lg bg-accent/50">
        <h3 className="font-semibold mb-4">Vital Signs (Optional)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pulse">Pulse (bpm)</Label>
            <Input
              id="pulse"
              type="number"
              data-testid="input-pulse"
              value={vitals.pulse}
              onChange={(e) => setVitals({...vitals, pulse: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="respirations">Respirations</Label>
            <Input
              id="respirations"
              type="number"
              data-testid="input-respirations"
              value={vitals.respirations}
              onChange={(e) => setVitals({...vitals, respirations: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="temperature">Temperature (°F)</Label>
            <Input
              id="temperature"
              data-testid="input-temperature"
              value={vitals.temperature}
              onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="pain-level">Pain (0-10)</Label>
            <Input
              id="pain-level"
              type="number"
              min="0"
              max="10"
              data-testid="input-pain-level"
              value={vitals.painLevel}
              onChange={(e) => setVitals({...vitals, painLevel: e.target.value})}
            />
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={handleSaveVitals}
          data-testid="button-save-vitals"
        >
          Save Vitals
        </Button>
      </div>

      {/* Observation Checklist */}
      <div className="space-y-3 mb-6">
        {tasks.map((task) => (
          <div key={task} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
            <Checkbox
              id={task}
              checked={isTaskChecked(task)}
              onCheckedChange={() => onToggle(task, category)}
              data-testid={`checkbox-${task.toLowerCase().replace(/ /g, '-')}`}
            />
            <Label htmlFor={task} className="flex-1 cursor-pointer">
              {task}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" data-testid="button-back">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1" data-testid="button-next">
          Next
        </Button>
      </div>
    </Card>
  );
}

// End Visit Form
function EndVisitForm({
  tasks,
  category,
  onToggle,
  isTaskChecked,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  tasks: string[];
  category: string;
  onToggle: (task: string, category: string) => void;
  isTaskChecked: (task: string) => boolean;
  onBack: () => void;
  onSubmit: (notes: string, concerns: string) => void;
  isSubmitting: boolean;
}) {
  const [notes, setNotes] = useState("");
  const [concerns, setConcerns] = useState("");

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <h2 className="text-xl font-semibold">End of Visit</h2>
      </div>

      {/* End of Visit Checklist */}
      <div className="space-y-3 mb-6">
        {tasks.map((task) => (
          <div key={task} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
            <Checkbox
              id={task}
              checked={isTaskChecked(task)}
              onCheckedChange={() => onToggle(task, category)}
              data-testid={`checkbox-${task.toLowerCase().replace(/ /g, '-')}`}
            />
            <Label htmlFor={task} className="flex-1 cursor-pointer">
              {task}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="general-notes">General Notes</Label>
          <Textarea
            id="general-notes"
            data-testid="textarea-general-notes"
            placeholder="Document visit summary, client status, activities..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="concerns">Concerns to Report</Label>
          <Textarea
            id="concerns"
            data-testid="textarea-concerns"
            placeholder="Any concerns about health, safety, or well-being..."
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" data-testid="button-back">
          Back
        </Button>
        <Button 
          onClick={() => onSubmit(notes, concerns)} 
          className="flex-1"
          disabled={isSubmitting}
          data-testid="button-submit-visit"
        >
          {isSubmitting ? "Submitting..." : "Complete Visit"}
        </Button>
      </div>
    </Card>
  );
}
