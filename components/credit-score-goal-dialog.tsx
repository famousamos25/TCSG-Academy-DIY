"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X, ChevronRight, Target, Clock, Rocket, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

export interface CreditGoals {
  purpose: string;
  currentScore: string;
  motivation: string;
  timeframe: string;
  targetScore: number;
  createdAt: Date;
}

interface CreditScoreGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creditGoal?: CreditGoals | null;
}

const PURPOSES = [
  "Repair my credit",
  "Build my credit",
  "Maintain my credit",
  "Monitor my credit",
];

const SCORE_RANGES = ["300-579", "580-669", "670-739", "740-799", "800-850"];

const MOTIVATIONS = [
  "Qualify for a mortgage",
  "Qualify for an auto loan",
  "Get approved for a credit card",
  "Lower interest rates",
  "Improve employment prospects",
  "Personal goal",
];

const TIMEFRAMES = [
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "1-2 years",
  "2+ years",
];

const getScoreColor = (score: number) => {
  if (score >= 800) return "text-emerald-500";
  if (score >= 740) return "text-green-500";
  if (score >= 670) return "text-blue-500";
  if (score >= 580) return "text-orange-500";
  return "text-red-500";
};

const getScoreLabel = (score: number) => {
  if (score >= 800) return "Exceptional";
  if (score >= 740) return "Very Good";
  if (score >= 670) return "Good";
  if (score >= 580) return "Fair";
  return "Poor";
};

const CreditScoreGoalDialog = ({
  open,
  onOpenChange,
  creditGoal
}: CreditScoreGoalDialogProps) => {
  const [purpose, setPurpose] = useState(creditGoal?.purpose || "");
  const [currentScore, setCurrentScore] = useState(creditGoal?.currentScore || "");
  const [motivation, setMotivation] = useState(creditGoal?.motivation || "");
  const [timeframe, setTimeframe] = useState(creditGoal?.timeframe || "");
  const [targetScore, setTargetScore] = useState(creditGoal?.targetScore ? [creditGoal?.targetScore] : [700]);
  const [step, setStep] = useState(1);
  const [user] = useAuthState(auth);

  // set correct step
  useEffect(() => {
    if (creditGoal) {
      setStep(5);
    }
  }, [creditGoal]);

  const router = useRouter();

  const handleSubmit = async () => {
    const goalData = {
      purpose,
      currentScore,
      motivation,
      timeframe,
      targetScore: targetScore[0],
      createdAt: serverTimestamp(),
    };

    // 1. Save to Firestore in "credit_goals/current"
    if (user) {
      await setDoc(
        doc(db, "users", user.uid, "credit_goals", "current"),
        goalData
      );
    }

    onOpenChange(false);
    router.refresh();
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return !!purpose;
      case 2:
        return !!currentScore;
      case 3:
        return !!motivation;
      case 4:
        return !!timeframe;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-semibold text-brand-navy">
                Edit Your Credit Score Goal
              </DialogTitle>
              <p className="mt-2 text-gray-600">
                Let&apos;s dive into your credit goals and customize your experience!
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="relative">
          {/* Progress Steps */}
          <div className="relative flex justify-between mb-8">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-brand-yellow transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
            {[1, 2, 3, 4, 5].map((number) => (
              <div
                key={number}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300",
                  step >= number
                    ? "bg-brand-yellow text-brand-navy"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {number}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right">
                <div className="flex items-center space-x-3 text-brand-navy">
                  <Target className="w-5 h-5" />
                  <Label className="text-lg font-medium">
                    What brings you here?
                  </Label>
                </div>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="I am here to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right">
                <div className="flex items-center space-x-3 text-brand-navy">
                  <Award className="w-5 h-5" />
                  <Label className="text-lg font-medium">
                    What&apos;s your current credit score?
                  </Label>
                </div>
                <Select value={currentScore} onValueChange={setCurrentScore}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="My current score is..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SCORE_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right">
                <div className="flex items-center space-x-3 text-brand-navy">
                  <Rocket className="w-5 h-5" />
                  <Label className="text-lg font-medium">
                    What&apos;s your motivation?
                  </Label>
                </div>
                <Select value={motivation} onValueChange={setMotivation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="I am motivated to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MOTIVATIONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in slide-in-from-right">
                <div className="flex items-center space-x-3 text-brand-navy">
                  <Clock className="w-5 h-5" />
                  <Label className="text-lg font-medium">
                    How soon do you want to reach your goal?
                  </Label>
                </div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="I want to reach my goal in..." />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEFRAMES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-in slide-in-from-right">
                <div className="flex items-center space-x-3 text-brand-navy">
                  <Target className="w-5 h-5" />
                  <Label className="text-lg font-medium">
                    What&apos;s your target credit score?
                  </Label>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="mb-8">
                    <Slider
                      value={targetScore}
                      onValueChange={setTargetScore}
                      max={850}
                      min={300}
                      step={1}
                      className="[&_[role=slider]]:bg-brand-yellow [&_[role=slider]]:border-brand-yellow [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:shadow-lg"
                    />
                    <div className="flex justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        Poor
                        <br />
                        300
                      </span>
                      <span className="text-sm text-gray-500">
                        Fair
                        <br />
                        580
                      </span>
                      <span className="text-sm text-gray-500">
                        Good
                        <br />
                        670
                      </span>
                      <span className="text-sm text-gray-500">
                        Very Good
                        <br />
                        740
                      </span>
                      <span className="text-sm text-gray-500">
                        Exceptional
                        <br />
                        850
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={cn(
                        "text-4xl font-bold mb-2",
                        getScoreColor(targetScore[0])
                      )}
                    >
                      {targetScore[0]}
                    </div>
                    <div className="text-gray-600">
                      {getScoreLabel(targetScore[0])}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 min-w-[140px]"
          >
            {step === 5 ? "Save Goal" : "Continue"}{" "}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CreditScoreGoalDialog };
export default CreditScoreGoalDialog;
