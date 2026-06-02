import { Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-obsidian py-8 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          
          {/* Developer Info */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-200">
              Developer
            </h3>
            <p className="text-sm">Abhijeet Kishor</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-200">
              Contact
            </h3>
            <a
              href="mailto:abhijeetkishor24@gmail.com"
              className="inline-flex flex-wrap items-center justify-center gap-2 text-sm transition-colors hover:text-sky-300 md:justify-start"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="break-all">
                abhijeetkishor24@gmail.com
              </span>
            </a>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-200">
              Legal
            </h3>
            <p className="text-sm">
              © {currentYear} Abhijeet Kishor
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}