const InputBox = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  min,
  max,
  maxLength,
}) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "6px" }}>{label}</label>
      )}

      <input
        className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...(type === "number" ? { min, max } : {})}
        {...(type !== "number" && maxLength ? { maxLength } : {})}
      />
    </div>
  );
};

export default InputBox;
