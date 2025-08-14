import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store/store';
import { addTrend } from '@/redux/features/trends/trendsSlice';

interface CreateBlogDialogProps {
  newBlog: {
    title: string;
    content: string;
    tags: string;
  };
  setNewBlog: React.Dispatch<React.SetStateAction<{
    title: string;
    content: string;
    tags: string;
  }>>;
  handleSubmitBlog: () => void;
}


const CreateBlogDialog: React.FC<CreateBlogDialogProps> = ({ newBlog, setNewBlog, handleSubmitBlog }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 h-10 px-4 rounded-lg shadow">
          Create Trend
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Trend</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Trend title..."
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <Textarea
            placeholder="Trend description..."
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          />
          <Input
            placeholder="Tag"
            value={newBlog.tags}
            onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setNewBlog({ title: '', content: '', tags: '' })}>
              Cancel
            </Button>
            <Button onClick={handleSubmitBlog}>
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;

