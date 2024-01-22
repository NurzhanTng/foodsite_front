import { ProductTag } from "../Types.ts";

type ProductTagProps = {
  tag: ProductTag;
};

const ProductTag = ({ tag }: ProductTagProps) => {
  return (
    <div
      style={{ backgroundColor: tag.tag_color }}
      className="w-fit rounded-[6px] p-1 text-xs text-white"
    >
      {tag.tag_name}
    </div>
  );
};

export default ProductTag;
