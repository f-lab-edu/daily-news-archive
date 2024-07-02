interface TabProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const Tab = ({ label, onClick, isActive }: TabProps) => {
  return (
    <button
      className={`px-5 pt-3 cursor-pointer border-b-2 ${isActive ? 'border-b-2px border-[#007bff]' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
