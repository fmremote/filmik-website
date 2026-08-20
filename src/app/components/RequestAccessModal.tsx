import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { trackEvent } from "../../lib/analytics";

type RequestAccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

const departmentOptions = [
  "Production",
  "Casting",
  "Directing",
  "Camera",
  "Art Department",
  "Costume",
  "Hair & Makeup",
  "Sound",
  "Post-Production",
  "Stunts",
  "Performer",
  "Other",
];

export function RequestAccessModal({
  open,
  onOpenChange,
  onClose,
}: RequestAccessModalProps) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setFormValues({
        name: "",
        email: "",
        department: "",
      });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent className="max-w-2xl border-white/10 bg-[#09111b] p-0 text-white sm:max-w-2xl">
        <DialogHeader className="border-b border-white/10 px-6 py-5 pr-14">
          <DialogTitle className="text-xl font-semibold text-white">
            Request Access
          </DialogTitle>
          <DialogDescription className="text-sm text-white/60">
            Step into the future of filmmaking. Tell us who you are and which department you belong to.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {status === "submitted" ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Request received
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Thank you! Your submission has been received.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                This local form is ready for backend wiring. For now, we’re storing the flow client-side so the experience is complete while we connect Supabase later.
              </p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                setStatus("submitted");
                trackEvent("request_access_submit", {
                  department: formValues.department,
                  location: "request_access_modal",
                });
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="request-access-name">
                  Name
                </label>
                <Input
                  id="request-access-name"
                  name="name"
                  value={formValues.name}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Your full name"
                  required
                  className="h-12 border-white/10 bg-white/[0.04] text-white placeholder:text-white/25"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="request-access-email">
                  Email
                </label>
                <Input
                  id="request-access-email"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="me@company.com"
                  required
                  className="h-12 border-white/10 bg-white/[0.04] text-white placeholder:text-white/25"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="request-access-department">
                  Which film department do you belong to?
                </label>
                <select
                  id="request-access-department"
                  name="department"
                  value={formValues.department}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, department: event.target.value }))
                  }
                  required
                  className="h-12 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/50"
                >
                  <option value="" disabled>
                    Select your department
                  </option>
                  {departmentOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#09111b] text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/40">
                  We&apos;ll connect this form to Supabase next.
                </p>
                <button
                  type="submit"
                  data-analytics-event="cta_click"
                  data-analytics-label="Submit Request Access"
                  data-analytics-location="request_access_modal"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                  Request Invitation
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
