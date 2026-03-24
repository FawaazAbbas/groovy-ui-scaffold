import { useState, useMemo } from 'react';
import { mockCalendarEvents, CalendarEvent } from '@/lib/mocks/calendar';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const sourceColors: Record<string, string> = {
  groovy: 'bg-primary/15 text-primary border-primary/20',
  google: 'bg-electric-muted text-electric border-electric/30',
  apple: 'bg-comfort text-comfort-text border-comfort',
  agent: 'bg-warning/10 text-warning border-warning/20',
};

const hours = Array.from({ length: 14 }, (_, i) => i + 7);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-03-17'));
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const weekStart = useMemo(() => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay() + 1);
    return d;
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const miniCalDays = useMemo(() => {
    const first = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDay = first.getDay() || 7;
    const days: (Date | null)[] = [];
    for (let i = 1; i < startDay; i++) days.push(null);
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    return days;
  }, [currentDate]);

  const getEventsForDay = (date: Date) => {
    return mockCalendarEvents.filter(e => {
      const eDate = new Date(e.start);
      return eDate.toDateString() === date.toDateString();
    });
  };

  const prevWeek = () => setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() - 7); return n; });
  const nextWeek = () => setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() + 7); return n; });

  return (
    <div className="flex h-full">
      {/* Left mini calendar */}
      <div className="hidden lg:block w-64 shrink-0 border-r border-border glass p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-body-sm font-semibold text-text-primary">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <div className="flex gap-1">
            <button onClick={() => setCurrentDate(d => { const n = new Date(d); n.setMonth(n.getMonth() - 1); return n; })} className="rounded-lg p-1 hover:bg-white/40 transition-colors"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => setCurrentDate(d => { const n = new Date(d); n.setMonth(n.getMonth() + 1); return n; })} className="rounded-lg p-1 hover:bg-white/40 transition-colors"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} className="text-caption text-text-secondary py-1">{d}</span>
          ))}
          {miniCalDays.map((day, i) => (
            <button
              key={i}
              onClick={() => day && setCurrentDate(day)}
              className={`rounded-lg py-1 text-caption transition-all duration-200 ${
                !day ? '' :
                day.toDateString() === currentDate.toDateString() ? 'bg-primary text-white font-medium shadow-glass-sm' :
                day.toDateString() === new Date().toDateString() ? 'bg-comfort text-comfort-text' :
                'text-text-primary hover:bg-white/40'
              }`}
            >
              {day?.getDate() || ''}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 space-y-2">
          <p className="text-caption font-medium text-text-secondary">Sources</p>
          {Object.entries({ Groovy: 'bg-primary', Google: 'bg-electric', Apple: 'bg-comfort', 'AI Agent': 'bg-warning' }).map(([label, color]) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${color}`} />
              <span className="text-caption text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main calendar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border glass px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={prevWeek} className="rounded-xl p-1.5 hover:bg-white/40 transition-colors"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="text-body font-semibold text-text-primary">
              {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h2>
            <button onClick={nextWeek} className="rounded-xl p-1.5 hover:bg-white/40 transition-colors"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-border-solid bg-white/40 p-0.5">
            {(['month', 'week', 'day'] as const).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)} className={`rounded-lg px-3 py-1 text-caption font-medium capitalize transition-all duration-200 ${viewMode === mode ? 'bg-primary text-white shadow-glass-sm' : 'text-text-secondary hover:text-text-primary'}`}>{mode}</button>
            ))}
          </div>
        </div>

        {/* Week grid */}
        <div className="flex-1 overflow-y-auto">
          {/* Day headers */}
          <div className="sticky top-0 z-10 grid grid-cols-7 border-b border-border glass">
            {weekDays.map((day, i) => (
              <div key={i} className={`px-2 py-2 text-center border-r border-border last:border-r-0 ${day.toDateString() === new Date('2026-03-17').toDateString() ? 'bg-primary/5' : ''}`}>
                <p className="text-caption text-text-secondary">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className={`text-body-sm font-semibold ${day.toDateString() === new Date('2026-03-17').toDateString() ? 'text-primary' : 'text-text-primary'}`}>{day.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="relative">
            {hours.map(hour => (
              <div key={hour} className="grid grid-cols-7 border-b border-border/30">
                {weekDays.map((day, di) => {
                  const dayEvents = getEventsForDay(day).filter(e => new Date(e.start).getHours() === hour);
                  return (
                    <Popover key={di}>
                      <PopoverTrigger asChild>
                        <div className="relative h-16 border-r border-border/30 last:border-r-0 px-1 py-0.5 hover:bg-white/20 cursor-pointer transition-colors">
                          {di === 0 && (
                            <span className="absolute -left-0 -top-2 text-[10px] text-text-secondary">{hour}:00</span>
                          )}
                          {dayEvents.map(evt => (
                            <button
                              key={evt.id}
                              onClick={(e) => { e.stopPropagation(); setSelectedEvent(evt); }}
                              data-tour={evt.id === 'evt_04' ? 'first-calendar-event' : undefined}
                              className={`w-full rounded-lg px-1.5 py-0.5 text-[10px] font-medium truncate border text-left ${sourceColors[evt.source]}`}
                            >
                              {evt.title}
                            </button>
                          ))}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-3 glass shadow-glass-lg border-border rounded-2xl">
                        <p className="text-body-sm font-medium text-text-primary mb-1">Quick Create</p>
                        <p className="text-caption text-text-secondary">{day.toLocaleDateString()} at {hour}:00</p>
                        <input placeholder="Event title..." className="mt-2 w-full rounded-xl border border-border-solid bg-white/60 px-3 py-1.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                        <button className="mt-2 w-full rounded-xl bg-primary py-1.5 text-caption font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm">Create Event</button>
                      </PopoverContent>
                    </Popover>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event detail panel */}
      {selectedEvent && (
        <div className="w-80 shrink-0 border-l border-border glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-body font-semibold text-text-primary">Event Details</h3>
            <button onClick={() => setSelectedEvent(null)} className="text-text-secondary hover:text-text-primary transition-colors">✕</button>
          </div>
          <div className={`rounded-2xl border p-3 mb-4 ${sourceColors[selectedEvent.source]}`}>
            <p className="text-body-sm font-medium">{selectedEvent.title}</p>
          </div>
          <div className="space-y-3 text-body-sm">
            <div>
              <p className="text-caption text-text-secondary">Time</p>
              <p className="text-text-primary">{new Date(selectedEvent.start).toLocaleString()} — {new Date(selectedEvent.end).toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="text-caption text-text-secondary">Description</p>
              <p className="text-text-primary">{selectedEvent.description}</p>
            </div>
            {selectedEvent.location && (
              <div>
                <p className="text-caption text-text-secondary">Location</p>
                <p className="text-text-primary">{selectedEvent.location}</p>
              </div>
            )}
            <div>
              <p className="text-caption text-text-secondary">Source</p>
              <p className="text-text-primary capitalize">{selectedEvent.source}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
