import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { getAttribution } from "@/lib/attribution";
import { trackLead, trackQualifiedLead } from "@/lib/metaPixel";
import { CheckCircle2, Loader2 } from "lucide-react";

/* ---------------------------------------------------------------- options */

const FOCUS_AREAS = [
  "Career",
  "Purpose / Direction",
  "Confidence",
  "Financial situation",
  "Relationships",
  "Personal growth",
  "Other",
] as const;

const DURATIONS = [
  "Less than 3 months",
  "3–12 months",
  "1–3 years",
  "More than 3 years",
] as const;

const FINANCIAL_OPTIONS = [
  "I'm ready to invest $4,000 if I believe MindShift is right for me.",
  "I could invest using a payment plan.",
  "I would need to discuss the investment with my partner.",
  "I'm interested, but I'm not currently able to make this level of investment.",
] as const;

/* ------------------------------------------------------------- validation */
/* Client-side validation mirrors the edge function. The server re-validates
   everything and recomputes qualification — this layer is purely for UX.     */

const stepSchemas = [
  z.object({
    firstName: z.string().trim().min(1, "Please enter your first name.").max(80),
    lastName: z.string().trim().min(1, "Please enter your last name.").max(80),
    email: z.string().trim().email("Please enter a valid email address.").max(255),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(30, "Please enter a valid phone number."),
  }),
  z.object({
    focusArea: z.enum(FOCUS_AREAS, { errorMap: () => ({ message: "Please choose one option." }) }),
    situation: z
      .string()
      .trim()
      .min(10, "Please share a little more detail.")
      .max(4000, "Please keep this under 4000 characters."),
    durationStuck: z.enum(DURATIONS, {
      errorMap: () => ({ message: "Please choose one option." }),
    }),
    triedBefore: z
      .string()
      .trim()
      .min(5, "Please share a little more detail.")
      .max(4000, "Please keep this under 4000 characters."),
  }),
  z.object({
    whyNow: z
      .string()
      .trim()
      .min(5, "Please share a little more detail.")
      .max(4000, "Please keep this under 4000 characters."),
    commitmentScore: z.number().int().min(1).max(10),
    willParticipate: z.enum(["Yes", "No"], {
      errorMap: () => ({ message: "Please choose one option." }),
    }),
    financialFit: z.enum(FINANCIAL_OPTIONS, {
      errorMap: () => ({ message: "Please choose one option." }),
    }),
  }),
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  focusArea: string;
  situation: string;
  durationStuck: string;
  triedBefore: string;
  whyNow: string;
  commitmentScore: number;
  willParticipate: string;
  financialFit: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  focusArea: "",
  situation: "",
  durationStuck: "",
  triedBefore: "",
  whyNow: "",
  commitmentScore: 7,
  willParticipate: "",
  financialFit: "",
};

const STEP_TITLES = ["About You", "Your Situation", "Commitment & Investment"];

/* ------------------------------------------------------------- components */

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="mt-2 text-sm text-destructive" role="alert">
      {message}
    </p>
  ) : null;

const QuestionBlock = ({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div className="mb-8">
    <Label htmlFor={htmlFor} className="mb-3 block text-base font-semibold text-foreground">
      {label}
    </Label>
    {children}
    <FieldError message={error} />
  </div>
);

const ApplicationForm = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{ qualified: boolean } | null>(null);

  // Anti-spam: hidden honeypot + time-on-form measurement.
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number>(Date.now());
  const headingRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  useEffect(() => {
    if (step > 0 || result) {
      headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, result]);

  const validateStep = (index: number) => {
    const parsed = stepSchemas[index].safeParse(values);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const flat: Record<string, string> = {};
    Object.entries(fieldErrors).forEach(([key, messages]) => {
      if (messages?.[0]) flat[key] = messages[0];
    });
    setErrors(flat);
    return false;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep(2)) return;

    setSubmitting(true);
    setSubmitError(null);

    const attribution = getAttribution();

    const { data, error } = await supabase.functions.invoke("submit-mindshift-application", {
      body: {
        ...values,
        website: honeypot,
        elapsedMs: Date.now() - startedAt.current,
        ...attribution,
      },
    });

    setSubmitting(false);

    if (error || !data?.ok) {
      setSubmitError(
        "We couldn't submit your application right now. Please check your answers and try again.",
      );
      return;
    }

    trackLead();
    if (data.qualified) trackQualifiedLead();
    setResult({ qualified: Boolean(data.qualified) });
  };

  const progress = useMemo(() => ((step + 1) / 3) * 100, [step]);

  /* ----------------------------------------------------------- results UI */

  if (result) {
    return (
      <section id="apply" className="section-padding scroll-mt-20">
        <div className="container-premium">
          <div ref={headingRef} className="card-premium mx-auto max-w-3xl text-center">
            {result.qualified ? (
              <>
                <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-accent" aria-hidden="true" />
                <h2 className="mb-6">Your application looks like it may be a good fit.</h2>
                <div className="mx-auto max-w-2xl space-y-4 text-left text-lg leading-relaxed text-muted-foreground">
                  <p>The next step is a conversation with our team.</p>
                  <p className="text-foreground">This is not a free coaching session.</p>
                  <p>
                    The purpose of the call is to understand where you are today, where you want to
                    go and determine whether MindShift is genuinely the right environment for you.
                  </p>
                </div>

                {/*
                  BOOKING EMBED
                  Replace this placeholder with the real Calendly inline widget once the
                  MindShift booking link exists. When it is installed, also listen for the
                  `calendly.event_scheduled` window message and call trackScheduleHook()
                  from src/lib/metaPixel.ts. No URL is invented here.
                */}
                <div className="mt-10 flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-accent/40 bg-background/60 p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    MindShift Calendly embed — insert booking link here
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-6">Thank you for applying.</h2>
                <div className="mx-auto max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    Based on your answers, this may not be the right time for the complete MindShift
                    coaching experience.
                  </p>
                  <p>
                    We appreciate your interest and encourage you to continue following Pat &amp;
                    Chris and MindShift.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------------- form UI */

  return (
    <section id="apply" className="section-padding bg-secondary/30 scroll-mt-20">
      <div className="container-premium">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4">See if MindShift is the right fit for you.</h2>
          <p className="text-lg text-muted-foreground">
            This application takes approximately 3&ndash;5 minutes. Your answers help the MindShift
            team understand where you are today and whether a conversation makes sense.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="card-premium mx-auto mt-10 max-w-2xl md:p-8"
        >
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm font-semibold text-accent">Step {step + 1} of 3</span>
              <span className="text-sm text-muted-foreground">{STEP_TITLES[step]}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-gold transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Honeypot — hidden from humans, tempting to bots */}
          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* STEP 1 — About You */}
          {step === 0 && (
            <div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName" className="mb-2 block font-semibold">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    className="h-12"
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                  />
                  <FieldError message={errors.firstName} />
                </div>
                <div>
                  <Label htmlFor="lastName" className="mb-2 block font-semibold">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    className="h-12"
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                  />
                  <FieldError message={errors.lastName} />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2 block font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    className="h-12"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  <FieldError message={errors.email} />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block font-semibold">
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    className="h-12"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                  <FieldError message={errors.phone} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Your Situation */}
          {step === 1 && (
            <div>
              <QuestionBlock
                label="What area of your life do you most want to change right now?"
                error={errors.focusArea}
              >
                <RadioGroup
                  value={values.focusArea}
                  onValueChange={(v) => set("focusArea", v)}
                  className="gap-2"
                >
                  {FOCUS_AREAS.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent/60"
                    >
                      <RadioGroupItem value={option} id={`focus-${option}`} />
                      <span className="text-muted-foreground">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </QuestionBlock>

              <QuestionBlock
                label="Tell us a little about what is happening in your life right now."
                htmlFor="situation"
                error={errors.situation}
              >
                <Textarea
                  id="situation"
                  rows={5}
                  value={values.situation}
                  onChange={(e) => set("situation", e.target.value)}
                />
              </QuestionBlock>

              <QuestionBlock
                label="How long have you felt that something needs to change?"
                error={errors.durationStuck}
              >
                <RadioGroup
                  value={values.durationStuck}
                  onValueChange={(v) => set("durationStuck", v)}
                  className="gap-2"
                >
                  {DURATIONS.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent/60"
                    >
                      <RadioGroupItem value={option} id={`duration-${option}`} />
                      <span className="text-muted-foreground">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </QuestionBlock>

              <QuestionBlock
                label="What have you already tried to change your situation?"
                htmlFor="triedBefore"
                error={errors.triedBefore}
              >
                <Textarea
                  id="triedBefore"
                  rows={4}
                  value={values.triedBefore}
                  onChange={(e) => set("triedBefore", e.target.value)}
                />
              </QuestionBlock>
            </div>
          )}

          {/* STEP 3 — Commitment & Investment */}
          {step === 2 && (
            <div>
              <QuestionBlock
                label="Why is making this change important to you now?"
                htmlFor="whyNow"
                error={errors.whyNow}
              >
                <Textarea
                  id="whyNow"
                  rows={4}
                  value={values.whyNow}
                  onChange={(e) => set("whyNow", e.target.value)}
                />
              </QuestionBlock>

              <QuestionBlock
                label="How committed are you to making meaningful changes over the next 12 weeks?"
                error={errors.commitmentScore}
              >
                <div className="rounded-lg border border-border p-4">
                  <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>1</span>
                    <span className="text-2xl font-bold text-accent">
                      {values.commitmentScore}
                    </span>
                    <span>10</span>
                  </div>
                  <Slider
                    value={[values.commitmentScore]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={([v]) => set("commitmentScore", v)}
                    aria-label="Commitment level from 1 to 10"
                  />
                </div>
              </QuestionBlock>

              <QuestionBlock
                label="MindShift requires consistent participation and personal work. Are you prepared to actively engage for the full 12 weeks?"
                error={errors.willParticipate}
              >
                <RadioGroup
                  value={values.willParticipate}
                  onValueChange={(v) => set("willParticipate", v)}
                  className="gap-2"
                >
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent/60"
                    >
                      <RadioGroupItem value={option} id={`participate-${option}`} />
                      <span className="text-muted-foreground">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </QuestionBlock>

              <QuestionBlock
                label="MindShift is a premium 12-week coaching program. The investment is $4,000, with payment plans available. If you believe MindShift is the right fit for you, which best describes your situation?"
                error={errors.financialFit}
              >
                <RadioGroup
                  value={values.financialFit}
                  onValueChange={(v) => set("financialFit", v)}
                  className="gap-2"
                >
                  {FINANCIAL_OPTIONS.map((option, index) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent/60"
                    >
                      <RadioGroupItem
                        value={option}
                        id={`financial-${index}`}
                        className="mt-1"
                      />
                      <span className="text-muted-foreground">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </QuestionBlock>
            </div>
          )}

          {submitError && (
            <p className="mb-4 text-sm text-destructive" role="alert">
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            {step < 2 ? (
              <Button
                type="button"
                size="lg"
                onClick={handleNext}
                className="h-13 flex-1 bg-gradient-gold font-bold text-primary-foreground hover:shadow-glow"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="h-13 flex-1 bg-gradient-gold font-bold text-primary-foreground hover:shadow-glow"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Submitting&hellip;
                  </>
                ) : (
                  "Apply for MindShift"
                )}
              </Button>
            )}

            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleBack}
                className="h-13 sm:w-40"
              >
                Back
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;
