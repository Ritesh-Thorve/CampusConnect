import { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { createUpdate, clearError } from '../../redux/features/updates/updatesSlice';
import toast from 'react-hot-toast';

interface AddUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddUpdateDialog = ({ open, onOpenChange }: AddUpdateDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.updates);

  // Local form state
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    details: '',
    link: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle type select change
  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.title || !formData.type || !formData.details) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    await dispatch(
      createUpdate({
        title: formData.title,
        type: formData.type,
        details: formData.details,
        link: formData.link
      })
    ).unwrap();

    toast.success("Update added successfully!");

    // Reset form and close dialog
    setFormData({ title: '', type: '', details: '', link: '' });
    onOpenChange(false);
  } catch (err: any) {
    toast.error(err?.message || "Failed to add update");
  }
};


  // Clear error when dialog opens/closes
  useEffect(() => {
    dispatch(clearError());
  }, [open, dispatch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Update</DialogTitle>
          <DialogDescription>
            Share the latest opportunities with the campus community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Type</Label>
            <Select onValueChange={handleTypeChange} value={formData.type}>
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
            <Label>Full detailss</Label>
            <Textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Link</Label>
            <Input
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
