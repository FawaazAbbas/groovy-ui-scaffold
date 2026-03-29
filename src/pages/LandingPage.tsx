import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Target, Layers, PlayCircle, Plus, CheckCircle2, Building2, UserCircle } from 'lucide-react';
import { GroovyLogo } from '@/components/ui/GroovyLogo';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  return (
    <div className="w-full">
      {/*
        HERO SECTION
      */}
      <section className="relative w-full min-h-[calc(100vh-72px)] flex flex-col items-center bg-background">
        {/* Fixed parallax background layer */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full opacity-30 bg-[radial-gradient(circle,rgba(200,0,223,0.15)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply animate-pulse" />
          <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full opacity-30 bg-[radial-gradient(circle,rgba(0,183,255,0.15)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply" />
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            style={{
              fontFamily: '"Monoton", display',
              fontSize: '50em',
              lineHeight: 1,
              color: 'rgba(200, 0, 223, 0.35)',
              filter: 'blur(40px)',
            }}
          >
            G
          </span>
        </div>

        {/* Main hero content — vertically centered in the remaining space above trust badges */}
        <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-6 items-center text-center pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Groovy Space is now in Beta
          </div>

          <h1 className="text-[48px] md:text-[72px] lg:text-[80px] font-bold text-text-primary tracking-tight leading-[1.05] max-w-[1000px] mb-6 animate-in slide-in-from-bottom-8 duration-700 fade-in">
            Ready-made AI employees, <br className="hidden md:block" />
            <span className="text-primary">2 clicks away.</span>
          </h1>

          <p className="text-lg md:text-[22px] text-text-secondary max-w-[660px] mb-10 font-medium leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-150 fade-in fill-mode-both">
            No developers, no complex training, no massive overhead. Plug in narrow-spec agents that do actual work for your SME.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-300 fade-in fill-mode-both">
            {user ? (
              <Link
                to="/space/marketplace"
                className="flex items-center justify-center gap-2.5 h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover text-white text-[17px] font-semibold transition-all shadow-[0_4px_16px_rgba(200,0,223,0.25)] hover:shadow-[0_8px_32px_rgba(200,0,223,0.35)] hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Go to Workspace <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2.5 h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover text-white text-[17px] font-semibold transition-all shadow-[0_4px_16px_rgba(200,0,223,0.25)] hover:shadow-[0_8px_32px_rgba(200,0,223,0.35)] hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Start Free Trial <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/marketplace"
                  className="flex items-center justify-center gap-2.5 h-14 px-10 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/60 text-text-primary hover:bg-white/70 text-[17px] font-semibold transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Explore Agents
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Trust badges — pinned to the bottom of the hero */}
        <div className="relative z-10 w-full pb-10 pt-8">
          <div className="container mx-auto px-6 flex flex-col items-center animate-in fade-in duration-1000 delay-500 fill-mode-both">
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border-solid/60 to-transparent mb-8" />
            <p className="text-caption font-semibold text-text-secondary uppercase tracking-widest mb-5">Built for forward-thinking SMEs</p>
            <div className="flex items-center gap-10 md:gap-16 opacity-50 grayscale">
              <div className="flex items-center gap-2 font-bold text-lg"><Building2 className="h-5 w-5" /> NexusCorp</div>
              <div className="flex items-center gap-2 font-bold text-lg"><Layers className="h-5 w-5" /> AltF4</div>
              <div className="flex items-center gap-2 font-bold text-lg"><Target className="h-5 w-5" /> Vanguard</div>
            </div>
          </div>
        </div>
      </section>

      {/*
        THE PROBLEM SECTION
      */}
      <section className="py-24 bg-surface-elevated relative overflow-hidden z-10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-[40px] font-bold text-text-primary mb-6 tracking-tight">The E-commerce SME Dilemma</h2>
            <p className="text-[20px] text-text-secondary leading-relaxed">
              Small businesses are stuck in the past, using rigid tools and unable to upgrade their systems without massively increasing overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-[28px] hover:-translate-y-2 transition-transform duration-300">
              <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-destructive">84%</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Jack of all trades</h3>
              <p className="text-text-secondary">SME founders and early employees are stretched dangerously thin across domains they don't specialize in.</p>
            </div>
            
            <div className="glass-card p-8 rounded-[28px] hover:-translate-y-2 transition-transform duration-300">
              <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-amber-500">$500+</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Priced Out of AI</h3>
              <p className="text-text-secondary">Building or configuring a single custom AI employee currently costs thousands of dollars in consulting.</p>
            </div>

            <div className="glass-card p-8 rounded-[28px] hover:-translate-y-2 transition-transform duration-300">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Layers className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Rigid Legacy Tools</h3>
              <p className="text-text-secondary">Existing systems don't talk to each other, forcing humans to act as expensive API glue between platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/*
        THE SOLUTION / VALUE PROP SECTION
      */}
      <section className="py-32 relative overflow-hidden z-10 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-semibold tracking-wide uppercase">
                The Groovy Approach
              </div>
              <h2 className="text-[48px] font-bold text-text-primary leading-[1.1] tracking-tight">
                Hire <span className="text-primary">Narrow-Spec</span> Agents instantly.
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                We don't build confusing, do-it-all chatbox assistants. We build highly specialized, narrow-scope AI employees that execute precise tasks perfectly, out of the box.
              </p>
              
              <div className="space-y-6 pt-4">
                {[
                  { title: "2-Click Integration", desc: "Connect natively to Slack, Teams, or Lark instantly without developer help." },
                  { title: "Groovy Space", desc: "A unified, institutional-grade workspace built specifically for SMEs lacking infrastructure." },
                  { title: "Deterministic Guardrails", desc: "Strict, pre-configured safety bounds so your agents never go off-script with customers." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-text-primary">{feature.title}</h4>
                      <p className="text-text-secondary mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-cyan/20 rounded-[40px] filter blur-3xl transform rotate-3" />
              <div className="relative glass-card bg-white/60 p-2 rounded-[40px] shadow-glass-xl border border-white/80 overflow-hidden transform transition-transform hover:scale-[1.02]">
                {/* Mock UI Interface for visual appeal */}
                <div className="w-full h-[500px] bg-background rounded-[32px] border border-border-solid/30 overflow-hidden flex flex-col">
                  {/* Fake UI Header */}
                  <div className="h-14 border-b border-border-solid/30 bg-surface-elevated px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-amber-400"/><div className="w-3 h-3 rounded-full bg-green-400"/></div>
                      <div className="px-4 py-1.5 rounded-md bg-white/50 text-xs font-medium text-text-secondary">space/marketplace</div>
                    </div>
                  </div>
                  {/* Fake UI Body */}
                  <div className="flex-1 p-6 flex flex-col gap-4 bg-gradient-to-b from-transparent to-surface-solid">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff0f7b] to-[#f89b29] p-3 flex items-center justify-center shrink-0">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="h-5 w-48 bg-text-primary/10 rounded mb-2" />
                        <div className="h-3 w-64 bg-text-secondary/10 rounded" />
                      </div>
                      <div className="ml-auto px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium">Install</div>
                    </div>
                    <div className="h-px w-full bg-border-solid/40 my-2" />
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00c6ff] to-[#0072ff] p-3 flex items-center justify-center shrink-0">
                        <UserCircle className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="h-5 w-40 bg-text-primary/10 rounded mb-2" />
                        <div className="h-3 w-56 bg-text-secondary/10 rounded" />
                      </div>
                      <div className="ml-auto px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium">Install</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        FINAL CTA
      */}
      <section className="py-24 relative z-10 bg-background">
        <div className="container mx-auto px-6">
          <div className="glass-card rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-electric/10 border border-primary/20">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-[40px] md:text-[56px] font-bold text-text-primary tracking-tight leading-tight mb-6">
                Ready to scale your team without the headcount?
              </h2>
              <p className="text-xl text-text-secondary mb-10">
                Join thousands of modern SMEs hiring from the Groovy Marketplace. Connect your first agent in under 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {user ? (
                  <Link to="/space/marketplace" className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover text-white text-lg font-bold transition-all shadow-glass-large flex items-center justify-center gap-2">
                    Enter Groovy Space
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover text-white text-lg font-bold transition-all shadow-glass-large flex items-center justify-center gap-2">
                      Deploy Your First Agent
                    </Link>
                    <Link to="/contact" className="h-14 px-10 rounded-2xl glass-card text-text-primary hover:bg-white/60 text-lg font-bold transition-all shadow-glass-sm flex items-center justify-center">
                      Talk to Sales
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
