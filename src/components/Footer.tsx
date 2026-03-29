import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { AnimatedGroovyLogo } from '@/components/ui/AnimatedGroovyLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-solid/50 py-12 lg:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <AnimatedGroovyLogo className="text-primary" />
            </Link>
            <p className="text-sm text-text-secondary max-w-xs mb-8 leading-relaxed">
              The intelligent AI workspace that automates your workflows and supercharges your team's productivity.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#C800DF] transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#C800DF] transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#C800DF] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 tracking-wider uppercase">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Features</Link></li>
              <li><Link to="/integrations" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Integrations</Link></li>
              <li><Link to="/pricing" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Pricing</Link></li>
              <li><Link to="/changelog" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 tracking-wider uppercase">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Blog</Link></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">About</Link></li>
              <li><Link to="/terms" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Privacy Policy</Link></li>
              <li><a href="mailto:contact@groovy.work" className="text-sm text-text-secondary hover:text-[#C800DF] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary/80">
            &copy; {currentYear} Groovy Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
