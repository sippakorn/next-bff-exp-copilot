"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import type { Task } from '@/data/mock-tasks';

interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getTypeBadgeVariant = (type: Task['type']) => {
    switch (type) {
      case 'Regular':
        return 'blue';
      case 'Expedited':
        return 'red';
      case 'Best Effort':
        return 'gray';
      default:
        return 'default';
    }
  };

  const truncateDescription = (description: string, expanded: boolean) => {
    if (expanded) return description;

    // Split by lines
    const lines = description.split('\n');
    if (lines.length <= 2) {
      // Check if first line is too long
      const firstLine = lines[0];
      if (firstLine.length <= 100) {
        return description;
      }
      return firstLine.slice(0, 100);
    }

    // Return first 2 lines, but also check character limit
    const twoLines = lines.slice(0, 2).join('\n');
    if (twoLines.length > 150) {
      return twoLines.slice(0, 150);
    }
    return twoLines;
  };

  const needsTruncation = (description: string) => {
    const lines = description.split('\n');
    if (lines.length > 2) return true;
    if (lines[0] && lines[0].length > 100) return true;
    const twoLines = lines.slice(0, 2).join('\n');
    return twoLines.length > 150;
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task Id</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Reviewer</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => {
            const isExpanded = expandedRows.includes(task.id);
            const showToggle = needsTruncation(task.description);

            return (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell className="max-w-md">
                  <div className="whitespace-pre-wrap">
                    {truncateDescription(task.description, isExpanded)}
                    {showToggle && !isExpanded && '...'}
                  </div>
                  {showToggle && (
                    <button
                      onClick={() => toggleExpanded(task.id)}
                      className="text-blue-600 hover:underline text-sm mt-1"
                    >
                      {isExpanded ? 'See less' : 'See more'}
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {task.assignee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {task.reviewer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.reviewer.name}</span>
                  </div>
                </TableCell>
                <TableCell>{task.createDate}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={getTypeBadgeVariant(task.type)}>
                    {task.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
