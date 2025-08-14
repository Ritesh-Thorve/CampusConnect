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
  onOpenChange: (open: boolean) => void; // Callback to handle dialog open state change
  formData: any; // Object holding form field values
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  onTypeChange: (value: string) => void; 
  onSubmit: (e: React.FormEvent) => void; // Form submission handler
}

export const AddUpdateDialog = ({
  open,
  onOpenChange,
  formData,
  onChange,
  onTypeChange,
  onSubmit
}: Props) => (
  
  // Dialog wrapper controlled by `open` prop
  <Dialog open={open} onOpenChange={onOpenChange}>
    {/* Dialog content panel with max width styling */}
    <DialogContent className="sm:max-w-[625px]">
      
      {/* Dialog header with title and description */}
      <DialogHeader>
        <DialogTitle>Add New Update</DialogTitle>
        <DialogDescription>
          Share the latest opportunities with the campus community
        </DialogDescription>
      </DialogHeader>

      {/* Form for adding update with spacing */}
      <form onSubmit={onSubmit} className="grid gap-4 py-4">
        
        {/* Title input field */}
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={onChange}
            required
          />
        </div>

        {/* Type select dropdown */}
        <div>
          <Label>Type</Label>
          <Select onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {/* Options for type selection */}
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="job">Job</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Full details textarea, required */}
        <div>
          <Label>Full Details</Label>
          <Textarea
            name="detail"
            value={formData.detail}
            onChange={onChange}
            required
          />
        </div>

        {/* Link input field, required */}
        <div>
          <Label>Link</Label>
          <Input
            name="link"
            value={formData.link}
            onChange={onChange}
            required
          />
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
          Submit
        </Button>
      </form>
    </DialogContent>
  </Dialog>
);
