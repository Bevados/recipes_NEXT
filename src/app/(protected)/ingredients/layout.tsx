interface IProps {
  children: React.ReactNode;
}

const IngredientsLayout = ({ children }: IProps) => {
  return <section className="w-full">{children}</section>;
};

export default IngredientsLayout;
