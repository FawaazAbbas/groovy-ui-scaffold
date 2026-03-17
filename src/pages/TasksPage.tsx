import { useState } from 'react';
import { mockTasks, Task } from '@/lib/mocks/tasks';
import { mockUsers } from '@/lib/mocks/users';
import {
  DndContext, closestCorners, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';
import { Calendar, MessageCircle, LayoutGrid, List, Table2, X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const columns = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'in_review', label: 'In Review' },
  { id: 'done', label: 'Done' },
] as const;

const priorityColors: Record<string, string> = {
  urgent: 'border-l-destructive',
  high: 'border-l-warning',
  medium: 'border-l-primary',
  low: 'border-l-border',
};

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const assignees = mockUsers.filter(u => task.assigneeIds.includes(u.id));

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`cursor-grab rounded-lg border border-border border-l-4 ${priorityColors[task.priority]} bg-surface p-3 shadow-sm hover:shadow-md transition-shadow active:cursor-grabbing`}
    >
      <h4 className="text-body-sm font-medium text-text-primary mb-2">{task.title}</h4>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {task.labels.map(label => (
          <span key={label} className="rounded-full bg-surface-elevated px-2 py-0.5 text-[10px] font-medium text-text-secondary">{label}</span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {assignees.slice(0, 3).map(u => (
            <div key={u.id} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-primary text-[9px] font-medium text-white">
              {u.name.split(' ').map(n => n[0]).join('')}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-caption text-text-secondary">
          {task.dueDate && (
            <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          )}
          {task.commentCount > 0 && (
            <span className="flex items-center gap-0.5"><MessageCircle className="h-3 w-3" />{task.commentCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Column({ id, label, tasks, onTaskClick }: { id: string; label: string; tasks: Task[]; onTaskClick: (t: Task) => void }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-body-sm font-semibold text-text-primary">{label}</h3>
        <span className="rounded-full bg-surface-elevated px-2 py-0.5 text-caption text-text-secondary">{tasks.length}</span>
      </div>
      <div ref={setNodeRef} className="flex-1 space-y-2 rounded-xl bg-surface-elevated/50 p-2 min-h-[200px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'table'>('kanban');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = (e: DragStartEvent) => setActiveId(e.active.id as string);

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id as string;
    let newStatus: string;

    // Check if dropped on a column
    if (columns.some(c => c.id === over.id)) {
      newStatus = over.id as string;
    } else {
      // Dropped on another task — find that task's column
      const overTask = tasks.find(t => t.id === over.id);
      if (!overTask) return;
      newStatus = overTask.status;
    }

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as Task['status'] } : t));
  };

  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-3">
        <h1 className="text-heading font-semibold text-text-primary">Tasks</h1>
        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
          {[
            { mode: 'kanban' as const, icon: LayoutGrid },
            { mode: 'list' as const, icon: List },
            { mode: 'table' as const, icon: Table2 },
          ].map(({ mode, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`rounded-md p-1.5 ${viewMode === mode ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-6">
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-4">
            {columns.map(col => (
              <Column
                key={col.id}
                id={col.id}
                label={col.label}
                tasks={tasks.filter(t => t.status === col.id)}
                onTaskClick={setSelectedTask}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className={`w-72 rounded-lg border border-primary border-l-4 ${priorityColors[activeTask.priority]} bg-surface p-3 shadow-xl`}>
                <h4 className="text-body-sm font-medium text-text-primary">{activeTask.title}</h4>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Task detail sheet */}
      <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-surface">
          {selectedTask && (
            <div className="space-y-6 pt-6">
              <div>
                <h2 className="text-heading-sm font-semibold text-text-primary">{selectedTask.title}</h2>
                <p className="text-body-sm text-text-secondary mt-2">{selectedTask.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-caption font-medium text-text-secondary mb-1">Status</p>
                  <span className="rounded-full bg-surface-elevated px-3 py-1 text-body-sm text-text-primary capitalize">{selectedTask.status.replace('_', ' ')}</span>
                </div>
                <div>
                  <p className="text-caption font-medium text-text-secondary mb-1">Priority</p>
                  <span className={`rounded-full px-3 py-1 text-body-sm capitalize ${selectedTask.priority === 'urgent' ? 'bg-destructive/10 text-destructive' : selectedTask.priority === 'high' ? 'bg-warning/10 text-warning' : 'bg-surface-elevated text-text-primary'}`}>{selectedTask.priority}</span>
                </div>
                <div>
                  <p className="text-caption font-medium text-text-secondary mb-1">Due Date</p>
                  <span className="text-body-sm text-text-primary">{selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : 'No due date'}</span>
                </div>
                <div>
                  <p className="text-caption font-medium text-text-secondary mb-1">Comments</p>
                  <span className="text-body-sm text-text-primary">{selectedTask.commentCount}</span>
                </div>
              </div>
              <div>
                <p className="text-caption font-medium text-text-secondary mb-2">Assignees</p>
                <div className="flex flex-wrap gap-2">
                  {mockUsers.filter(u => selectedTask.assigneeIds.includes(u.id)).map(u => (
                    <div key={u.id} className="flex items-center gap-2 rounded-full border border-border px-3 py-1">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[8px] text-white">{u.name.split(' ').map(n => n[0]).join('')}</div>
                      <span className="text-caption text-text-primary">{u.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-caption font-medium text-text-secondary mb-2">Labels</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTask.labels.map(l => (
                    <span key={l} className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-caption text-text-secondary">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
