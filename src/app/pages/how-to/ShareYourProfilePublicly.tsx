import { useEffect, useState } from "react";

const howToPath = "/how-to/share-your-profile-publicly";
const landscapeVideo = "/media/how-to/share-your-profile-publicly/landscape.mp4";
const portraitVideo = "/media/how-to/share-your-profile-publicly/portrait.mp4";
const landscapePoster = "/media/how-to/share-your-profile-publicly/landscape-poster.jpg";
const portraitPoster = "/media/how-to/share-your-profile-publicly/portrait-poster.jpg";

function usePortraitVideo() {
  const [isPortrait, setIsPortrait] = useState(() => window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateVideoFormat = () => setIsPortrait(mediaQuery.matches);

    updateVideoFormat();
    mediaQuery.addEventListener("change", updateVideoFormat);
    return () => mediaQuery.removeEventListener("change", updateVideoFormat);
  }, []);

  return isPortrait;
}

export function ShareYourProfilePublicly() {
  const isPortrait = usePortraitVideo();
  const videoSource = isPortrait ? portraitVideo : landscapeVideo;
  const videoPoster = isPortrait ? portraitPoster : landscapePoster;

  useEffect(() => {
    const previousTitle = document.title;
    const robots = document.querySelector('meta[name="robots"]');
    const googlebot = document.querySelector('meta[name="googlebot"]');
    const previousRobots = robots?.getAttribute("content");
    const previousGooglebot = googlebot?.getAttribute("content");

    document.title = "How to Share Your Profile Publicly | Filmik";
    robots?.setAttribute("content", "noindex, nofollow, noarchive");
    googlebot?.setAttribute("content", "noindex, nofollow, noarchive");

    return () => {
      document.title = previousTitle;
      if (previousRobots) robots?.setAttribute("content", previousRobots);
      if (previousGooglebot) googlebot?.setAttribute("content", previousGooglebot);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08111c] px-5 py-6 text-white sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-[130px]" />
        <div className="absolute -right-48 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sky-400/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <a href="/" aria-label="Filmik home" className="inline-flex w-fit items-center opacity-90 transition hover:opacity-100">
          <img src="/filmik-logo-white.svg" alt="Filmik" className="h-7 w-auto sm:h-8" />
        </a>

        <section className="flex flex-1 flex-col items-center justify-center py-12 sm:py-16">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Filmik How-To</p>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              How to Share Your Profile Publicly
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              A quick walkthrough for making your Filmik profile ready to share.
            </p>
          </div>

          <div className={`mt-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-black/30 ${isPortrait ? "max-w-[28rem]" : "max-w-6xl"}`}>
            <video
              key={videoSource}
              controls
              playsInline
              preload="metadata"
              poster={videoPoster}
              className="block h-auto w-full"
            >
              <source src={videoSource} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </section>

        <p className="text-center text-xs text-white/35">Filmik how-to guide</p>
      </div>
    </main>
  );
}

export { howToPath };
