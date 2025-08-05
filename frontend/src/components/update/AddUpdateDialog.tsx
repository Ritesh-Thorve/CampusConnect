'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTypeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddUpdateDialog = ({
  open,
  onOpenChange,
  formData,
  onChange,
  onTypeChange,
  onSubmit
}: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Add New Update</DialogTitle>
        <DialogDescription>
          Share the latest opportunities with the campus community
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="grid gap-4 py-4">
        <div>
          <Label>Title</Label>
          <Input name="title" value={formData.title} onChange={onChange} required />
        </div>
        <div>
          <Label>Type</Label>
          <Select onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="job">Job</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Short Description (for preview)</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Brief description shown on the card..."
            rows={2}
          />
        </div>
        <div>
          <Label>Full Details</Label>
          <Textarea name="detail" value={formData.detail} onChange={onChange} required />
        </div>
        <div>
          <Label>Link</Label>
          <Input name="link" value={formData.link} onChange={onChange} required />
        </div>
        <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
          Submit
        </Button>
      </form>
    </DialogContent>
  </Dialog>
);
