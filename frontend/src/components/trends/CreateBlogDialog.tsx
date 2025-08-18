import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store/store";
import { addTrend, getTrends } from "@/redux/features/trends/trendsSlice";
import { useToast } from "@/components/ui/use-toast";

const CreateBlogDialog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmitBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.tags) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before publishing.",
        variant: "destructive",
      });
      return;
    }

    try {
      // create trend
      await dispatch(
        addTrend({
          title: newBlog.title,
          description: newBlog.content,
          tag: newBlog.tags,
        })
      ).unwrap();

      // refetch trends
      await dispatch(getTrends());

      toast({
        title: "Trend published",
        description: "Your trend was successfully created!",
      });

      // reset + close dialog
      setNewBlog({ title: "", content: "", tags: "" });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish trend. Try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Button
              variant="outline"
              onClick={() => setNewBlog({ title: "", content: "", tags: "" })}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitBlog}>Publish</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;
