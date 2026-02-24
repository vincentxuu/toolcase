'use client'
import { useState, useMemo } from 'react'

interface WeightLossPlanProps {
  labels?: {
    // Basic Info
    age: string
    gender: string
    male: string
    female: string
    height: string
    currentWeight: string
    targetWeight: string
    cm: string
    kg: string
    // Activity
    activityLevel: string
    sedentary: string
    light: string
    moderate: string
    active: string
    veryActive: string
    // Weight Loss Settings
    weeklyGoal: string
    conservative: string
    moderate_goal: string
    aggressive: string
    veryAggressive: string
    // Running Settings
    runningDays: string
    daysPerWeek: string
    runningDuration: string
    minutes: string
    // Results
    currentMetrics: string
    bmr: string
    tdee: string
    dailyCalories: string
    weightToLose: string
    estimatedTime: string
    weeks: string
    // Nutrition
    macros: string
    protein: string
    carbs: string
    fat: string
    grams: string
    calories: string
    // Plan Details
    planSummary: string
    dailyCalorieTarget: string
    dailyDeficit: string
    weeklyWeightLoss: string
    targetDate: string
    // Running Plan
    runningPlan: string
    runningBurnPerSession: string
    weeklyRunningBurn: string
    distancePerSession: string
    heartRateZone: string
    maxHeartRate: string
    fatBurningZone: string
    bpm: string
    // Reality Check
    realityCheck: string
    runningOnlyWeight: string
    dietOnlyWarning: string
    combinedApproach: string
    // Tips
    tipsTitle: string
    tip1: string
    tip2: string
    tip3: string
    tip4: string
    tip5: string
    disclaimer: string
    // Additional labels
    basicInformation: string
    perWeek: string
    km: string
    caloriesPerWeek: string
    kgPerWeek: string
    runningSchedule: string
    weeklyDeficitNeeded: string
    fromRunning: string
    stillNeedFromDiet: string
    runningProvidesOnly: string
  }
}

const activityMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9]
const weeklyGoals = [0.25, 0.5, 0.75, 1.0] // kg per week
const caloriesPer1Kg = 7700 // calories to lose 1 kg

export default function WeightLossPlan({ labels }: WeightLossPlanProps) {
  const l = {
    age: labels?.age ?? 'Age',
    gender: labels?.gender ?? 'Gender',
    male: labels?.male ?? 'Male',
    female: labels?.female ?? 'Female',
    height: labels?.height ?? 'Height',
    currentWeight: labels?.currentWeight ?? 'Current Weight',
    targetWeight: labels?.targetWeight ?? 'Target Weight',
    cm: labels?.cm ?? 'cm',
    kg: labels?.kg ?? 'kg',
    activityLevel: labels?.activityLevel ?? 'Activity Level',
    sedentary: labels?.sedentary ?? 'Sedentary (little/no exercise)',
    light: labels?.light ?? 'Light (1-3 days/week)',
    moderate: labels?.moderate ?? 'Moderate (3-5 days/week)',
    active: labels?.active ?? 'Active (6-7 days/week)',
    veryActive: labels?.veryActive ?? 'Very Active (athlete)',
    weeklyGoal: labels?.weeklyGoal ?? 'Weekly Weight Loss Goal',
    conservative: labels?.conservative ?? 'Conservative (0.25 kg/week)',
    moderate_goal: labels?.moderate_goal ?? 'Moderate (0.5 kg/week)',
    aggressive: labels?.aggressive ?? 'Aggressive (0.75 kg/week)',
    veryAggressive: labels?.veryAggressive ?? 'Very Aggressive (1 kg/week)',
    runningDays: labels?.runningDays ?? 'Running Days',
    daysPerWeek: labels?.daysPerWeek ?? 'days/week',
    runningDuration: labels?.runningDuration ?? 'Running Duration',
    minutes: labels?.minutes ?? 'minutes',
    currentMetrics: labels?.currentMetrics ?? 'Current Metrics',
    bmr: labels?.bmr ?? 'BMR',
    tdee: labels?.tdee ?? 'TDEE',
    dailyCalories: labels?.dailyCalories ?? 'cal/day',
    weightToLose: labels?.weightToLose ?? 'Weight to Lose',
    estimatedTime: labels?.estimatedTime ?? 'Estimated Time',
    weeks: labels?.weeks ?? 'weeks',
    macros: labels?.macros ?? 'Macro Breakdown',
    protein: labels?.protein ?? 'Protein',
    carbs: labels?.carbs ?? 'Carbs',
    fat: labels?.fat ?? 'Fat',
    grams: labels?.grams ?? 'g/day',
    calories: labels?.calories ?? 'cal',
    planSummary: labels?.planSummary ?? 'Your Weight Loss Plan',
    dailyCalorieTarget: labels?.dailyCalorieTarget ?? 'Daily Calorie Target',
    dailyDeficit: labels?.dailyDeficit ?? 'Daily Calorie Deficit',
    weeklyWeightLoss: labels?.weeklyWeightLoss ?? 'Weekly Weight Loss',
    targetDate: labels?.targetDate ?? 'Estimated Target Date',
    runningPlan: labels?.runningPlan ?? 'Running Plan for Fat Loss',
    runningBurnPerSession: labels?.runningBurnPerSession ?? 'Calories Burned per Run',
    weeklyRunningBurn: labels?.weeklyRunningBurn ?? 'Weekly Running Burn',
    distancePerSession: labels?.distancePerSession ?? 'Estimated Distance',
    heartRateZone: labels?.heartRateZone ?? 'Heart Rate Zone',
    maxHeartRate: labels?.maxHeartRate ?? 'Max Heart Rate',
    fatBurningZone: labels?.fatBurningZone ?? 'Fat Burning Zone',
    bpm: labels?.bpm ?? 'bpm',
    realityCheck: labels?.realityCheck ?? 'Reality Check',
    runningOnlyWeight: labels?.runningOnlyWeight ?? 'Weekly weight loss from running only',
    dietOnlyWarning: labels?.dietOnlyWarning ?? 'Running alone may not be enough - diet control is crucial',
    combinedApproach: labels?.combinedApproach ?? 'Combined exercise + diet for best results',
    tipsTitle: labels?.tipsTitle ?? 'Tips for Success',
    tip1: labels?.tip1 ?? 'Drink at least 2-3 liters of water daily',
    tip2: labels?.tip2 ?? 'Get 7-9 hours of quality sleep each night',
    tip3: labels?.tip3 ?? 'Include strength training 2-3 times per week to preserve muscle',
    tip4: labels?.tip4 ?? 'Track your food intake and stay consistent',
    tip5: labels?.tip5 ?? 'If you only run without controlling diet, fat loss may be <50% effective',
    disclaimer: labels?.disclaimer ?? 'This tool provides estimates only. Consult a healthcare professional or registered dietitian before starting any weight loss program.',
    basicInformation: labels?.basicInformation ?? 'Basic Information',
    perWeek: labels?.perWeek ?? 'per week',
    km: labels?.km ?? 'km',
    caloriesPerWeek: labels?.caloriesPerWeek ?? 'cal/week',
    kgPerWeek: labels?.kgPerWeek ?? 'kg/week',
    runningSchedule: labels?.runningSchedule ?? 'Running Schedule',
    weeklyDeficitNeeded: labels?.weeklyDeficitNeeded ?? 'Weekly deficit needed',
    fromRunning: labels?.fromRunning ?? 'From running',
    stillNeedFromDiet: labels?.stillNeedFromDiet ?? 'Still need from diet control',
    runningProvidesOnly: labels?.runningProvidesOnly ?? 'Running provides only',
  }

  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState(175)
  const [currentWeight, setCurrentWeight] = useState(80)
  const [targetWeight, setTargetWeight] = useState(70)
  const [activity, setActivity] = useState(2)
  const [weeklyGoalIndex, setWeeklyGoalIndex] = useState(1) // 0.5 kg/week default
  const [runningDaysPerWeek, setRunningDaysPerWeek] = useState(3)
  const [runningDuration, setRunningDuration] = useState(30) // minutes

  const activityLabels = [l.sedentary, l.light, l.moderate, l.active, l.veryActive]
  const weeklyGoalLabels = [l.conservative, l.moderate_goal, l.aggressive, l.veryAggressive]

  const result = useMemo(() => {
    // Calculate BMR using Mifflin-St Jeor equation
    const bmr = gender === 'male'
      ? 10 * currentWeight + 6.25 * height - 5 * age + 5
      : 10 * currentWeight + 6.25 * height - 5 * age - 161

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[activity]

    // Weight to lose
    const weightToLose = Math.max(0, currentWeight - targetWeight)

    // Weekly goal in kg
    const weeklyGoalKg = weeklyGoals[weeklyGoalIndex]

    // Daily calorie deficit needed
    const dailyDeficit = (weeklyGoalKg * caloriesPer1Kg) / 7

    // Daily calorie target
    const dailyTarget = Math.max(1200, tdee - dailyDeficit) // Minimum 1200 cal/day

    // Estimated weeks to reach goal
    const weeksToGoal = weightToLose > 0 ? Math.ceil(weightToLose / weeklyGoalKg) : 0

    // Calculate macros (40% carbs, 30% protein, 30% fat)
    const proteinCal = dailyTarget * 0.30
    const carbsCal = dailyTarget * 0.40
    const fatCal = dailyTarget * 0.30

    const proteinGrams = Math.round(proteinCal / 4)
    const carbsGrams = Math.round(carbsCal / 4)
    const fatGrams = Math.round(fatCal / 9)

    // Target date
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + weeksToGoal * 7)

    // Running calculations
    // Estimate: 30 min slow jog ≈ 4-5 km
    const kmPerSession = (runningDuration / 30) * 4.5
    const caloriesPerKm = currentWeight * 1 // Simplified: 1 kcal per kg per km
    const caloriesBurnPerSession = Math.round(kmPerSession * caloriesPerKm)
    const weeklyRunningBurn = caloriesBurnPerSession * runningDaysPerWeek
    const runningOnlyWeeklyLoss = weeklyRunningBurn / caloriesPer1Kg

    // Heart rate calculations
    const maxHeartRate = 220 - age
    const fatBurningLower = Math.round(maxHeartRate * 0.6)
    const fatBurningUpper = Math.round(maxHeartRate * 0.75)

    // Reality check: calories still needed from diet
    const totalDeficitNeeded = weeklyGoalKg * caloriesPer1Kg
    const remainingDeficitFromDiet = totalDeficitNeeded - weeklyRunningBurn
    const dietContributionPct = Math.round((remainingDeficitFromDiet / totalDeficitNeeded) * 100)

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightToLose,
      dailyTarget: Math.round(dailyTarget),
      dailyDeficit: Math.round(dailyDeficit),
      weeklyGoalKg,
      weeksToGoal,
      targetDate: targetDate.toLocaleDateString(),
      macros: {
        protein: { grams: proteinGrams, calories: Math.round(proteinCal) },
        carbs: { grams: carbsGrams, calories: Math.round(carbsCal) },
        fat: { grams: fatGrams, calories: Math.round(fatCal) },
      },
      running: {
        kmPerSession: kmPerSession.toFixed(1),
        caloriesBurnPerSession,
        weeklyRunningBurn,
        runningOnlyWeeklyLoss: runningOnlyWeeklyLoss.toFixed(2),
        maxHeartRate,
        fatBurningLower,
        fatBurningUpper,
        totalDeficitNeeded,
        remainingDeficitFromDiet,
        dietContributionPct,
      },
    }
  }, [age, gender, height, currentWeight, targetWeight, activity, weeklyGoalIndex, runningDaysPerWeek, runningDuration])

  return (
    <div className="flex flex-col gap-6">
      {/* Basic Information */}
      <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold mb-4">
          {l.basicInformation}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.age}</label>
            <input
              type="number"
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={10}
              max={120}
            />
          </div>

          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.gender}</label>
            <div className="flex gap-2">
              <button
                className={`flex-1 ${gender === 'male' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}`}
                onClick={() => setGender('male')}
              >
                {l.male}
              </button>
              <button
                className={`flex-1 ${gender === 'female' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}`}
                onClick={() => setGender('female')}
              >
                {l.female}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.height} ({l.cm})</label>
            <input
              type="number"
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min={50}
              max={300}
            />
          </div>

          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.currentWeight} ({l.kg})</label>
            <input
              type="number"
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(Number(e.target.value))}
              min={30}
              max={300}
              step={0.1}
            />
          </div>

          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.targetWeight} ({l.kg})</label>
            <input
              type="number"
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              min={30}
              max={300}
              step={0.1}
            />
          </div>
        </div>
      </div>

      {/* Activity & Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.activityLevel}</label>
          <select
            className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
          >
            {activityLabels.map((label, i) => (
              <option key={i} value={i}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.weeklyGoal}</label>
          <select
            className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
            value={weeklyGoalIndex}
            onChange={(e) => setWeeklyGoalIndex(Number(e.target.value))}
          >
            {weeklyGoalLabels.map((label, i) => (
              <option key={i} value={i}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Running Settings */}
      <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h3 className="text-lg font-semibold mb-4">
          {l.runningPlan}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.runningDays} ({l.daysPerWeek})</label>
            <input
              type="number"
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
              value={runningDaysPerWeek}
              onChange={(e) => setRunningDaysPerWeek(Number(e.target.value))}
              min={1}
              max={7}
            />
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.runningDuration} ({l.minutes})</label>
            <input
              type="number"
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)]"
              value={runningDuration}
              onChange={(e) => setRunningDuration(Number(e.target.value))}
              min={10}
              max={180}
              step={5}
            />
          </div>
        </div>
      </div>

      {/* Current Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {l.currentMetrics}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">
              {l.bmr}
            </div>
            <div className="text-3xl font-bold">{result.bmr.toLocaleString()}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">{l.dailyCalories}</div>
          </div>

          <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">
              {l.tdee}
            </div>
            <div className="text-3xl font-bold text-[var(--color-primary)]">
              {result.tdee.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">{l.dailyCalories}</div>
          </div>
        </div>
      </div>

      {/* Plan Summary */}
      {result.weightToLose > 0 && (
        <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <h3 className="text-xl font-bold mb-6 text-[var(--color-primary)]">
            {l.planSummary}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.dailyCalorieTarget}
              </div>
              <div className="text-3xl font-bold text-emerald-500">
                {result.dailyTarget.toLocaleString()}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.calories}</div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.dailyDeficit}
              </div>
              <div className="text-3xl font-bold text-amber-500">
                -{result.dailyDeficit.toLocaleString()}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.calories}</div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.weeklyWeightLoss}
              </div>
              <div className="text-3xl font-bold text-blue-500">
                {result.weeklyGoalKg} {l.kg}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.perWeek}</div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.estimatedTime}
              </div>
              <div className="text-3xl font-bold text-purple-500">
                {result.weeksToGoal}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.weeks}</div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm">
            <strong>{l.weightToLose}:</strong> {result.weightToLose.toFixed(1)} {l.kg}
            <br />
            <strong>{l.targetDate}:</strong> {result.targetDate}
          </div>
        </div>
      )}

      {/* Running Plan Details */}
      {result.weightToLose > 0 && (
        <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🏃</span> {l.runningPlan}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.runningBurnPerSession}
              </div>
              <div className="text-3xl font-bold text-orange-600">
                {result.running.caloriesBurnPerSession}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.calories}</div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.weeklyRunningBurn}
              </div>
              <div className="text-3xl font-bold text-red-500">
                {result.running.weeklyRunningBurn.toLocaleString()}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.caloriesPerWeek}</div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.distancePerSession}
              </div>
              <div className="text-3xl font-bold text-cyan-500">
                {result.running.kmPerSession}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.km}</div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {l.runningOnlyWeight}
              </div>
              <div className="text-3xl font-bold text-purple-500">
                {result.running.runningOnlyWeeklyLoss}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{l.kgPerWeek}</div>
            </div>
          </div>

          {/* Heart Rate Zone */}
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm mb-4">
            <strong>❤️ {l.heartRateZone}:</strong>
            <br />
            <strong>{l.maxHeartRate}:</strong> {result.running.maxHeartRate} {l.bpm}
            <br />
            <strong>{l.fatBurningZone} (60-75%):</strong> {result.running.fatBurningLower}-{result.running.fatBurningUpper} {l.bpm}
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm">
            💡 <strong>{l.runningSchedule}:</strong> {runningDaysPerWeek} {l.daysPerWeek} × {runningDuration} {l.minutes} = ~{result.running.kmPerSession} {l.km}
          </div>
        </div>
      )}

      {/* Reality Check */}
      {result.weightToLose > 0 && (
        <div className="p-6 rounded-xl bg-orange-500/10 border-2 border-orange-500/50">
          <h3 className="text-lg font-bold mb-4 text-orange-600">
            ⚠️ {l.realityCheck}
          </h3>

          <div className="text-sm leading-7 text-[var(--color-text)]">
            <p className="mb-3">
              <strong>{l.weeklyDeficitNeeded}:</strong> {result.running.totalDeficitNeeded.toLocaleString()} kcal
            </p>
            <p className="mb-3">
              <strong>{l.fromRunning}:</strong> {result.running.weeklyRunningBurn.toLocaleString()} kcal
              ({Math.round((result.running.weeklyRunningBurn / result.running.totalDeficitNeeded) * 100)}%)
            </p>
            <p className="mb-3">
              <strong>{l.stillNeedFromDiet}:</strong> {result.running.remainingDeficitFromDiet.toLocaleString()} kcal
              ({result.running.dietContributionPct}%)
            </p>

            <div className="mt-4 p-3 bg-red-500/15 rounded-md text-xs">
              <strong>⚠️ {l.dietOnlyWarning}</strong>
              <br />
              {result.running.dietContributionPct > 50 && (
                <span>{l.runningProvidesOnly} {Math.round((result.running.weeklyRunningBurn / result.running.totalDeficitNeeded) * 100)}%</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Macros Breakdown */}
      {result.weightToLose > 0 && (
        <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold mb-4">
            {l.macros}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center border-l-4 border-l-red-500">
              <div className="text-sm font-semibold text-red-500 mb-2">
                {l.protein}
              </div>
              <div className="text-2xl font-bold">
                {result.macros.protein.grams} {l.grams}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {result.macros.protein.calories} {l.calories} (30%)
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center border-l-4 border-l-blue-500">
              <div className="text-sm font-semibold text-blue-500 mb-2">
                {l.carbs}
              </div>
              <div className="text-2xl font-bold">
                {result.macros.carbs.grams} {l.grams}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {result.macros.carbs.calories} {l.calories} (40%)
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center border-l-4 border-l-amber-500">
              <div className="text-sm font-semibold text-amber-500 mb-2">
                {l.fat}
              </div>
              <div className="text-2xl font-bold">
                {result.macros.fat.grams} {l.grams}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {result.macros.fat.calories} {l.calories} (30%)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <h3 className="text-lg font-semibold mb-4 text-emerald-600">
          💡 {l.tipsTitle}
        </h3>
        <ul className="list-disc pl-6 text-sm leading-7">
          <li>{l.tip1}</li>
          <li>{l.tip2}</li>
          <li>{l.tip3}</li>
          <li>{l.tip4}</li>
          <li><strong>{l.tip5}</strong></li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="py-3 px-4 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-[var(--color-text-secondary)]">
        ⚠️ {l.disclaimer}
      </div>
    </div>
  )
}
