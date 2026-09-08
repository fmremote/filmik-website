import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { trackEvent } from "../../lib/analytics";
import { siteContent } from "../../content/siteContent";

type RequestAccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

export function RequestAccessModal({
  open,
  onOpenChange,
  onClose,
}: RequestAccessModalProps) {
  const { requestAccess } = siteContent;
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    department: "",
    marketingOptIn: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setFormValues({
        name: "",
        email: "",
        department: "",
        marketingOptIn: false,
      });
      setError("");
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
            {requestAccess.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-white/60">
            {requestAccess.description}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {status === "submitted" ? (
            <div className="border-l-2 border-primary bg-white/[0.035] px-6 py-7 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {requestAccess.successEyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {requestAccess.successHeading}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
                {requestAccess.successDescription}
              </p>
              <p className="mt-5 text-sm text-white/40">
                A confirmation has been sent from info@filmik.io.
              </p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={async (event) => {
                event.preventDefault();
                setStatus("submitting");
                setError("");
                trackEvent("request_access_intent", {
                  department: formValues.department,
                  location: "request_access_modal",
                });

                try {
                  const response = await fetch("/api/request-access", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...formValues,
                      company: (event.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value || "",
                      pageUrl: window.location.href,
                      referrer: document.referrer,
                    }),
                  });
                  const payload = await response.json().catch(() => ({}));

                  if (!response.ok) throw new Error(payload.error || "Unable to submit your request.");

                  setStatus("submitted");
                  trackEvent("request_access_submit", {
                    department: formValues.department,
                    location: "request_access_modal",
                  });
                  trackEvent("generate_lead", {
                    lead_type: "request_access",
                    department: formValues.department,
                    location: "request_access_modal",
                  });
                } catch (submissionError) {
                  setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your request.");
                  setStatus("error");
                }
              }}
            >
              <input name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="request-access-name">
                  {requestAccess.fields.name}
                </label>
                <Input
                  id="request-access-name"
                  name="name"
                  value={formValues.name}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder={requestAccess.fields.namePlaceholder}
                  required
                  className="h-12 border-white/10 bg-white/[0.04] text-white placeholder:text-white/25"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="request-access-email">
                  {requestAccess.fields.email}
                </label>
                <Input
                  id="request-access-email"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder={requestAccess.fields.emailPlaceholder}
                  required
                  className="h-12 border-white/10 bg-white/[0.04] text-white placeholder:text-white/25"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="request-access-department">
                  {requestAccess.fields.department}
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
                    {requestAccess.fields.departmentPlaceholder}
                  </option>
                  {requestAccess.departments.map((option) => (
                    <option key={option} value={option} className="bg-[#09111b] text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-sm text-white/55">
                <input
                  type="checkbox"
                  checked={formValues.marketingOptIn}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, marketingOptIn: event.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary/50"
                />
                <span>Send me Filmik product and industry updates by email.</span>
              </label>

              {status === "error" && (
                <p role="alert" className="text-sm text-rose-300">{error}</p>
              )}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/40">
                  {requestAccess.note}
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  data-analytics-event="cta_click"
                  data-analytics-label="Submit Request Access"
                  data-analytics-location="request_access_modal"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : requestAccess.submitCta}
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
