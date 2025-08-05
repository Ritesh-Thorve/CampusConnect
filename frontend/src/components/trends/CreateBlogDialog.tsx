'use client';

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';

interface CreateBlogDialogProps {
  newBlog: { title: string; content: string; tags: string };
  setNewBlog: (value: { title: string; content: string; tags: string }) => void;
  handleSubmitBlog: () => void;
}

const CreateBlogDialog = ({ newBlog, setNewBlog, handleSubmitBlog }: CreateBlogDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-10 px-4 rounded-lg shadow">
          <PlusCircle className="w-4 h-4 mr-2" />
          <span className="sr-only sm:not-sr-only">Write Blog</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Write a New Blog Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Blog title..."
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <Textarea
            placeholder="Share your thoughts..."
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            className="min-h-[120px]"
          />
          <Input
            placeholder="Tags (comma separated)"
            value={newBlog.tags}
            onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setNewBlog({ title: '', content: '', tags: '' })}>Cancel</Button>
            <Button onClick={handleSubmitBlog} className="bg-gradient-to-r from-indigo-600 to-purple-600">
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;
