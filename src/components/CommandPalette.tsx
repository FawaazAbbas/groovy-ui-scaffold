import { useEffect } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MessageSquare, CheckSquare, Bot, FolderOpen, Zap, Clock } from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-glass-xl border-border max-w-lg !rounded-2xl glass">
        <Command className="bg-transparent">
          <CommandInput placeholder="Type a command or search..." className="border-none focus:ring-0" />
          <CommandList className="max-h-80">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recent">
              <CommandItem><Clock className="mr-2 h-4 w-4 text-text-secondary" /> Q2 Planning Kickoff</CommandItem>
              <CommandItem><Clock className="mr-2 h-4 w-4 text-text-secondary" /> TechNova Lead Brief</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Chats">
              <CommandItem><MessageSquare className="mr-2 h-4 w-4 text-text-secondary" /> LeadScout</CommandItem>
              <CommandItem><MessageSquare className="mr-2 h-4 w-4 text-text-secondary" /> #general</CommandItem>
              <CommandItem><MessageSquare className="mr-2 h-4 w-4 text-text-secondary" /> Marcus Johnson</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Agents">
              <CommandItem><Bot className="mr-2 h-4 w-4 text-agent" /> LeadScout</CommandItem>
              <CommandItem><Bot className="mr-2 h-4 w-4 text-agent" /> TicketSolver</CommandItem>
              <CommandItem><Bot className="mr-2 h-4 w-4 text-agent" /> CodeReviewer</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Tasks">
              <CommandItem><CheckSquare className="mr-2 h-4 w-4 text-text-secondary" /> Update API rate limiting</CommandItem>
              <CommandItem><CheckSquare className="mr-2 h-4 w-4 text-text-secondary" /> Implement SSO</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Files">
              <CommandItem><FolderOpen className="mr-2 h-4 w-4 text-text-secondary" /> Q1 Marketing Report.pdf</CommandItem>
              <CommandItem><FolderOpen className="mr-2 h-4 w-4 text-text-secondary" /> Architecture Diagram.png</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem><Zap className="mr-2 h-4 w-4 text-warning" /> Create new task</CommandItem>
              <CommandItem><Zap className="mr-2 h-4 w-4 text-warning" /> Start new chat</CommandItem>
              <CommandItem><Zap className="mr-2 h-4 w-4 text-warning" /> Upload file</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
