export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border p-3 rounded mb-3 focus:outline-blue-500"
    />
  );
}
