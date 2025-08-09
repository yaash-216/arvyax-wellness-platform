const Heading = ({ text }: { text: string }) => {
  return (
    <h2 className="text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">
      {text}
    </h2>
  );
};

export default Heading;