import ProductTag from "./ProductTag.tsx";
import { twMerge } from "tailwind-merge";

type TagContainerProps = {
  tags: { name: string; tag_color: string }[];
  className: string;
};

const TagContainer = ({ tags, className }: TagContainerProps) => {
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      {tags.map((tag, index) => (
        <ProductTag className={"ml-auto text-sm"} key={index} tag={tag} />
      ))}
    </div>
  );
};

export default TagContainer;
