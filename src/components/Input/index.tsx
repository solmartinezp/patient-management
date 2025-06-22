import "./styles.css";

type InputProps = {
  value: string;
  handleChange: (e: any) => void;
  type?: string;
  placeholder: string;
}

export const Input = ({
  value, handleChange, type, placeholder
}: InputProps) => (
       <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => handleChange(e.target.value)}
            className="input"
        />
);
