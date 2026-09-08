import type { ReactNode } from "react";

type BrowserFrameProps = {
  src: string;
  alt: string;
  status?: ReactNode;
  className?: string;
  imageClassName?: string;
};

export function BrowserFrame({ src, alt, status, className = "", imageClassName = "" }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/[0.1] bg-[#0d1621] shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:rounded-2xl ${className}`}>
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.08] bg-[#111b28] px-3 sm:h-10 sm:px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-amber-300 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
        </div>
        <div className="mx-2 flex h-5 flex-1 items-center justify-center rounded-md bg-white/[0.06] px-3 sm:mx-4 sm:h-6">
          <span className="truncate font-mono text-[8px] text-white/45 sm:text-[9px]">app.filmik.io</span>
        </div>
        {status && <div className="max-w-[40%] truncate rounded-full border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-300 sm:px-2 sm:text-[9px]">{status}</div>}
      </div>
      <img src={src} alt={alt} className={`block w-full ${imageClassName}`} />
    </div>
  );
}
