interface TagProps {
  content?: string;
  style?: string;
}

const Tag = ({ content, style }: TagProps) => {
  return (
    <div className={`${style && style}`}>
      {content && <p className="text-sm px-2 py-1">{content}</p>}
    </div>
  );
};

export default Tag;
