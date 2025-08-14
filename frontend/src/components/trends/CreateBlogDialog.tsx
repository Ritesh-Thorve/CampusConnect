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

const CreateBlogDialog = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [newTrend, setNewTrend] = useState({
    title: '',
    description: '',
    tag: '',
  });

  const handleSubmitTrend = () => {
    if (!newTrend.title || !newTrend.description || !newTrend.tag) {
      alert('Please fill all fields');
      return;
    }

    dispatch(addTrend(newTrend));
    setNewTrend({ title: '', description: '', tag: '' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-10 px-4 rounded-lg shadow">
          <PlusCircle className="w-4 h-4 mr-2" />
          <span className="sr-only sm:not-sr-only">Create Trend</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Create a New Trend</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Trend title..."
            value={newTrend.title}
            onChange={(e) => setNewTrend({ ...newTrend, title: e.target.value })}
          />
          <Textarea
            placeholder="Trend description..."
            value={newTrend.description}
            onChange={(e) => setNewTrend({ ...newTrend, description: e.target.value })}
            className="min-h-[120px]"
          />
          <Input
            placeholder="Tag"
            value={newTrend.tag}
            onChange={(e) => setNewTrend({ ...newTrend, tag: e.target.value })}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setNewTrend({ title: '', description: '', tag: '' })}>
              Cancel
            </Button>
            <Button onClick={handleSubmitTrend} className="bg-gradient-to-r from-indigo-600 to-purple-600">
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;
