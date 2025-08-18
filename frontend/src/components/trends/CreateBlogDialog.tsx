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
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const CreateBlogDialog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmitBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.tags) {
      toast.error("Please fill in all fields before publishing.");
      return;
    }

    try {
      setLoading(true);

      await dispatch(
        addTrend({
          title: newBlog.title,
          description: newBlog.content,
          tag: newBlog.tags,
        })
      ).unwrap();

      await dispatch(getTrends());

      toast.success("Trend published successfully! 🎉");

      setNewBlog({ title: "", content: "", tags: "" });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to publish trend. Try again later.");
    } finally {
      setLoading(false);
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
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
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
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitBlog} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;
