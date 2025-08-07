import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;                
  setSearchTerm: (term: string) => void; 
  setFilterType: (type: string) => void; 
  onAddClick: () => void;         
}

export const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  setFilterType,
  onAddClick
}: SearchFilterProps) => (

  // Container for search input, filter dropdown, and add button
  <div className="flex flex-col sm:flex-row gap-3 mb-8">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

      {/* Controlled input for typing search query */}
      <Input
        placeholder="Search updates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9 w-full md:w-64 rounded-lg border-2 text-sm"
      />
    </div>

    {/* Dropdown to select filter type */}
    <Select onValueChange={setFilterType} defaultValue="all">
      {/* Trigger button to open the dropdown */}
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      
      {/* Dropdown options */}
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="hackathon">Hackathon</SelectItem>
        <SelectItem value="news">News</SelectItem>
        <SelectItem value="internship">Internship</SelectItem>
        <SelectItem value="job">Job</SelectItem>
      </SelectContent>
    </Select>

    {/* Button that triggers adding a new update */}
    <Button
      onClick={onAddClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-4 rounded-lg"
    >
      {/* Plus icon and label, label hidden on very small screens */}
      <PlusCircle className="w-4 h-4 mr-2" />
      <span className="hidden sm:inline">Add Update</span>
    </Button>
  </div>
);
