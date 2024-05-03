import { Avatar } from "./BlogCard";
export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex justify-center flex-col">BlogApp</div>
      <div>
        <Avatar />
      </div>
    </div>
  );
};
