function InputField({ label, name, value, onChange, required, placeholder, icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-2.5 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
            icon ? "pl-9" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default InputField;
