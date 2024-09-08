import { twMerge } from "tailwind-merge";

export type ProductTag = {
  name: string;
  tag_color: string;
};

interface ProductTagProps {
  tag: ProductTag;
  className?: string;
}

const ProductTag = ({ tag, className = "" }: ProductTagProps) => {
  return (
    <div
      style={{ backgroundColor: tag.tag_color }}
      className={twMerge(
        "w-fit rounded-[6px] p-1 px-2 text-xs text-white " + className,
      )}
    >
      {tag.name}
    </div>
  );
};

export default ProductTag;
