import { ProductTag } from "../Types.ts";
import { twMerge } from "tailwind-merge";

interface ProductTagProps {
  tag: ProductTag;
  className?: string;
}

const ProductTag = ({ tag, className = '' }: ProductTagProps) => {
  return (
    <div
      style={{ backgroundColor: tag.tag_color }}
      className={twMerge("w-fit rounded-[6px] p-1 text-xs text-white " + className)}
    >
      {tag.tag_name}
    </div>
  );
};

export default ProductTag;
